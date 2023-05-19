import React from 'react';
import { render, screen } from '@testing-library/react';
import BeerCard, { type BeerCardProps } from './index';

jest.mock('../MapPreview', () => () => {
  return <div>Map</div>
});

const data = {
  "id": "5128df48-79fc-4f0f-8b52-d06be54d0cec",
  "name": "(405) Brewing Co",
  "brewery_type": 'micro',
  "address_1": "1716 Topeka St",
  "address_2": null,
  "address_3": null,
  "city": "Norman",
  "state_province": "Oklahoma",
  "postal_code": "73069-8224",
  "country": "United States",
  "longitude": "-97.46818222",
  "latitude": "35.25738891",
  "phone": "4058160490",
  "website_url": "http://www.405brewing.com",
  "state": "Oklahoma",
  "street": "1716 Topeka St"
} as unknown as BeerCardProps;

describe('MapPreview', () => {
  it('renders welcome message', () => {
    render(
      <BeerCard 
        {...data}
      />
    );

    expect(screen.getByText('(405) Brewing Co')).toBeInTheDocument();

    expect(screen.getByRole('link', { name: 'Website' })).toHaveAttribute('href', 'http://www.405brewing.com')
    expect(screen.getAllByRole('button')).toHaveLength(2);
    
    expect(screen.getByText('Map')).toBeInTheDocument();
  });
});
