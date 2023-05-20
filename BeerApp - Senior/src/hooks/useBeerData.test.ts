import { renderHook, waitFor } from '@testing-library/react';

import { useBeerData } from './useBeerData';

import { getBeerList } from 'api';
import handleMock from 'utils/error';

jest.mock('api', () => {
  return {
    getBeerList: jest.fn()
  }
});
jest.mock('utils/error', () => jest.fn());

describe('useBeerData', () => {
  it('returns data', async () => {
    const mockData = {
      data: [{
        someData: 1
      }]
    }
    const mockedGetBeerList = getBeerList as jest.MockedFunction<typeof getBeerList>;
    mockedGetBeerList.mockResolvedValue(mockData as any);

    const { result } = renderHook(() => useBeerData());

    await waitFor(() => expect(result.current.beerData).toEqual([{
      someData: 1
    }]))
    expect(result.current.isLoading).toBeFalsy();
  });

  it('throws an error', async () => {
    const mockedGetBeerList = getBeerList as jest.MockedFunction<typeof getBeerList>;
    mockedGetBeerList.mockRejectedValue('rejected');

    const { result } = renderHook(() => useBeerData());

    await(waitFor(() => expect(result.current.isLoading).toBeFalsy()));
    expect(handleMock).toBeCalledTimes(1);
  }); 
})