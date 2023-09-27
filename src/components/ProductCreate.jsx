import axios from 'axios';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const ProductCreate = () => {
  const navigate = useNavigate();
  const [nameError, setNameError] = useState();
  const [descriptionError, setDescriptionError] = useState();
  const [product, setProduct] = useState({
    name: '',
    description: '',
  });
  const handleInput = (e) => {
    e.persist();
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: product.name,
      description: product.description,
    };

    axios
      .post('http://127.0.0.1:8000/api/products', data)
      .then((response) => {
        // Handle the successful response

        toast.success('Product added successfully!');
        navigate('/');
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.data) {
          if (error.response.data.data.description) {
            const description = error.response.data.data.description[0];
            setDescriptionError(description);
          }
          if (error.response.data.data.name) {
            const name = error.response.data.data.name[0];
            setNameError(name);
          }
        } else {
          toast.error('Something wrong!');
        }
      });
  };

  return (
    <section className='container mt-5'>
      <form onSubmit={handleSubmit}>
        <div className='card'>
          <div className='card-header d-flex justify-content-between'>
            <h4>Add Product</h4>
            <div>
              <Link to='/' className='btn btn-primary btn-sm me-2'>
                Back
              </Link>
              <button type='submit' className='btn btn-success btn-sm'>
                Save
              </button>
            </div>
          </div>

          <div className='card-body'>
            <input
              type='text'
              className='form-control'
              name='name'
              placeholder='Product name'
              onChange={handleInput}
              value={product.name}
            />
            <div className='text-danger mb-3'>{nameError}</div>
            <textarea
              name='description'
              id=''
              cols='30'
              rows='10'
              className='form-control'
              placeholder='Product description'
              onChange={handleInput}
              value={product.description}
            ></textarea>
            <div className='text-danger'>{descriptionError}</div>
          </div>
        </div>
      </form>
      <div>
        <Toaster position='top-center' reverseOrder={false} />
      </div>
    </section>
  );
};

export default ProductCreate;
