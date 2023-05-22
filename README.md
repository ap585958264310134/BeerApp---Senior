# Beer App

## Tasks

- [DONE] Beer page ~ style a cool beer page
    - Information about beer added
    - Preview map added (provided by leaflet)
- [DONE] Home page favourites ~ add a list of favourite beers, do not clean after page reload
- [DONE] Beer list filtering + pagination + sorting
    - Filter by name added
    - Filter by type added (multiselect)
    - Sort by name added
- [DONE] Progressive Web App, offline

## Technical information

Tested on node@18 (windows env).

## Development directions ( What could I do if I have more time :) )

- More unit tests (not only for hooks and one component)
- More strict eslint rules (or priettier) to have consistent code style
    - e.g. import order rule :) 
- Add e2e cypress test to have more confident that code works correctly
- Publishing to Github pages
    - Require handling router and paths for service worker
- Improve service workers handling

## Other remarks

- Breweries API has an error. "Random with size parameter" return always the same items. 
    - Try it https://api.openbrewerydb.org/v1/breweries/random?size=3

