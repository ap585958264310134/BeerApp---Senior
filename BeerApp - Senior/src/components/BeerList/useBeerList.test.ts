/* eslint-disable testing-library/render-result-naming-convention */
import { act, renderHook, waitFor } from '@testing-library/react';
import { Beer } from 'types/beer';

import { ExtendedBeer, useBeerList } from './useBeerList';

const TEST_DATA = JSON.parse('[{"id":"5128df48-79fc-4f0f-8b52-d06be54d0cec","name":"(405) Brewing Co","brewery_type":"micro","address_1":"1716 Topeka St","address_2":null,"address_3":null,"city":"Norman","state_province":"Oklahoma","postal_code":"73069-8224","country":"United States","longitude":"-97.46818222","latitude":"35.25738891","phone":"4058160490","website_url":"http://www.405brewing.com","state":"Oklahoma","street":"1716 Topeka St"},{"id":"9c5a66c8-cc13-416f-a5d9-0a769c87d318","name":"(512) Brewing Co","brewery_type":"micro","address_1":"407 Radam Ln Ste F200","address_2":null,"address_3":null,"city":"Austin","state_province":"Texas","postal_code":"78745-1197","country":"United States","longitude":null,"latitude":null,"phone":"5129211545","website_url":"http://www.512brewing.com","state":"Texas","street":"407 Radam Ln Ste F200"},{"id":"ef970757-fe42-416f-931d-722451f1f59c","name":"10 Barrel Brewing Co","brewery_type":"large","address_1":"1501 E St","address_2":null,"address_3":null,"city":"San Diego","state_province":"California","postal_code":"92101-6618","country":"United States","longitude":"-117.129593","latitude":"32.714813","phone":"6195782311","website_url":"http://10barrel.com","state":"California","street":"1501 E St"},{"id":"6d14b220-8926-4521-8d19-b98a2d6ec3db","name":"10 Barrel Brewing Co","brewery_type":"large","address_1":"62970 18th St","address_2":null,"address_3":null,"city":"Bend","state_province":"Oregon","postal_code":"97701-9847","country":"United States","longitude":"-121.281706","latitude":"44.08683531","phone":"5415851007","website_url":"http://www.10barrel.com","state":"Oregon","street":"62970 18th St"}]');


async function basicRender() {
  window.localStorage.clear();

  const {
    result
  } = renderHook(() => useBeerList({
    beers: TEST_DATA as Beer[],
    elementsPerPage: 2
  }));
  
  await waitFor(() => expect(result.current.state).toBeTruthy());

  return result;
}

function mockFavs(beers: Beer[], valueToApply: boolean = false): ExtendedBeer[] {
  return beers.map((beer: Beer) => ({
    ...beer,
    isFavourite: valueToApply
  }))
}

describe('useBeerList', () => {
  it('returns something', async () => {
    const result = await basicRender();

    const state = result.current.state;

    expect(state.noOfPages).toEqual(2);
    expect(state.elementsToDisplay).toEqual(
      mockFavs(TEST_DATA.slice(0, 2))
    );
    expect(state.currentPage).toEqual(1);
  });

  it('dispatches page changing', async () => {
    const result = await basicRender();

    act(() => {
      result.current.dispatch({
        type: 'setCurrentPage',
        payload: 2
      });
    })

    await waitFor(() => expect(result.current.state.currentPage).toEqual(2));
    expect(result.current.state.elementsToDisplay).toEqual(
      mockFavs(TEST_DATA.slice(2, 4))
    )
  })

  it('filters names', async () => {
    const result = await basicRender();

    act(() => {
      result.current.dispatch({
        type: 'setNameFilter',
        payload: '405'
      });
    });

    await waitFor(() => expect(result.current.state.currentPage).toEqual(1));
    expect(result.current.state.nameFilter).toEqual('405');
    expect(result.current.state.noOfPages).toEqual(1);
    expect(result.current.state.elementsToDisplay).toEqual(
      mockFavs(TEST_DATA.slice(0, 1))
    )
  });

  it('sets favs', async () => {
    const result = await basicRender();

    act(() => {
      result.current.dispatch({
        type: 'setFavs',
        payload: ['9c5a66c8-cc13-416f-a5d9-0a769c87d318']
      })
    });

    await waitFor(() => expect(result.current.state.favs).toHaveLength(1));
    console.log(result.current.state)
    expect(result.current.state.elementsToDisplay).toEqual([
      ...mockFavs(TEST_DATA.slice(0, 1)),
      ...mockFavs(TEST_DATA.slice(1, 2), true)
    ]);
  });
  
});

export {};
