import axios from 'axios';
import { Link } from 'react-router-dom';

const Product = ({ product, sl }) => {
  const deleteProduct = async (e, id) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;
    thisClicked.innerText = 'Deleteing.....';
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/products/${id}`);

      thisClicked.closest('tr').remove();
    } catch (error) {
      // Handle the error here
      thisClicked.innerText = 'Delete';
    }
  };

  return (
    <>
      <tr>
        <td>{sl + 1}</td>
        <td>{product.name}</td>
        <td>{product.description}</td>
        <td className='text-white'>
          <Link to={`/products/show/${product.id}`} className='btn btn-info btn-sm'>
            Show
          </Link>
          <Link to={`/products/edit/${product.id}`} className='btn btn-warning btn-sm'>
            Edit
          </Link>
          <button type='button' onClick={(e) => deleteProduct(e, product.id)} className='btn btn-danger btn-sm'>
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default Product;
