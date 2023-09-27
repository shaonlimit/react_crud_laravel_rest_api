import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import Product from './Product';

const ProductList = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        // Handle the error here
        return <div>Something went wrong please try later</div>;
      }
    };

    fetchData();
  }, []);
  if (loading) {
    return <Loading />;
  }

  return (
    <div className='container'>
      <div className='card'>
        <div className='card-header d-flex justify-content-between'>
          <h5>Products List</h5>
          <Link to='/products/create' className='btn btn-sm btn-success '>
            Add Product
          </Link>
        </div>
        <div className='card-body'>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>SL No</th>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.data.map((product, index) => (
                <Product key={index} product={product} sl={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
