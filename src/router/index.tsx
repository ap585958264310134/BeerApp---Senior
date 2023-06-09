import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from 'views/Home';
import BeerList from 'views/BeerList';
import Beer from 'views/Beer';
import Footer from 'components/Footer';
import Menu from 'components/Menu';

const Router = () => (
  <BrowserRouter>
    <Menu>
      <Routes>
        <Route index element={<Home />} />
        <Route path='beer'>
          <Route index element={<BeerList />} />
          <Route path=':id' element={<Beer />} />
        </Route>
        <Route path='*' element={<Home />} />
      </Routes>
      <Footer />
    </Menu>
  </BrowserRouter>
);

export default Router;
