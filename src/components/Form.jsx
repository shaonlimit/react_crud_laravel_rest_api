const Form = () => {
return (
<form action="" method="POST">
    <div className='row g-3'>
        <div className="col-md-12 form-group">
            <label htmlFor="first_name">Product Name:</label>
            <input type="text" className='form-control' name='first_name' id='first_name' placeholder='First name' />
        </div>
        <div className="col-md-12 form-group">
            <label htmlFor="description">Product Description:</label>
            <textarea className="form-control" name="description" id="description" cols="30" rows="5"></textarea>
        </div>
        <div className="col-md-4 mt-4">
            <button type="submit" className='btn btn-success btn-sm'>Save</button>
        </div>

    </div>
</form>
)
}

export default Form
