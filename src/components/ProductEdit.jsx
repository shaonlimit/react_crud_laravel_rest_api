import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loading from './Loading';

const ProductEdit = () => {
  let { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [nameError, setNameError] = useState();
  const [descriptionError, setDescriptionError] = useState(true);
  const navigate = useNavigate();
  //data fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/products/${id}`);

        setProduct(response.data.data);
        setLoading(false);
      } catch (error) {
        // Handle the error here

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
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }
  //input function
  const handleInput = (e) => {
    e.preventDefault();
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  //database update
  const handleUpdate = (e) => {
    e.preventDefault();

    const data = {
      name: product.name,
      description: product.description,
    };

    axios
      .put(`http://127.0.0.1:8000/api/products/${id}`, data)
      .then((response) => {
        // Handle the successful response

        toast.success('Product updated successfully!');
        navigate('/');
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.data) {
          if (error.response.data.data.description) {
            const description = error.response.data.data.description[0];
            setDescriptionError(description);
          } else if (error.response.data.data.name) {
            const name = error.response.data.data.name[0];
            setNameError(name);
          } else {
            toast.error('Something wrong!');
          }
        } else {
          toast.error('Something wrong!');
        }
      });
  };
  return (
    <section className='container mt-5'>
      <form onSubmit={handleUpdate}>
        <div className='card'>
          <div className='card-header d-flex justify-content-between'>
            <h4>Edit Product</h4>
            <div>
              <Link to='/' className='btn btn-primary btn-sm me-2'>
                Back
              </Link>
              <button type='submit' className='btn btn-success btn-sm'>
                Update
              </button>
            </div>
          </div>

          <div className='card-body'>
            <input type='text' className='form-control' name='name' placeholder='Product name' value={product.name} onChange={handleInput} />
            <div className='text-danger mb-3'>{nameError}</div>
            <textarea name='description' id='' cols='30' rows='10' className='form-control' onChange={handleInput} placeholder='Product description' value={product.description}></textarea>
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

export default ProductEdit;
