import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';
import ProductCreate from './ProductCreate';
import ProductEdit from './ProductEdit';
import ProductShow from './ProductShow';

const MyRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/products/create' element={<ProductCreate />} />
          <Route path='/products/edit/:id' element={<ProductEdit />} />
          <Route path='/products/show/:id' element={<ProductShow />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default MyRouter;
