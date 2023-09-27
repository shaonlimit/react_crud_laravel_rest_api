import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const ProductShow = () => {
  let { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/products/${id}`);

        setProduct(response.data.data);
      } catch (error) {
        // Handle the error here
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return (
    <section className='mt-5'>
      <div className='container'>
        <div className='card'>
          <div className='card-header d-flex  justify-content-between'>
            <h2>{product.name}</h2>
            <div>
              <Link to='/' className='btn btn-primary btn-sm'>
                Back
              </Link>
            </div>
          </div>
          <div className='card-body'>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShow;
