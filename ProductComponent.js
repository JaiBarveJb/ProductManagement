import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductComponent() {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({ name: '', description: '', price: '', quantity: '' });

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const result = await axios.get('http://localhost:8080/api/products');
        setProducts(result.data);
    };

    const createProduct = async () => {
        await axios.post('http://localhost:8080/api/products', product);
        loadProducts();
    };

    const updateProduct = async (id) => {
        await axios.put(`http://localhost:8080/api/products/${id}`, product);
        loadProducts();
    };

    const deleteProduct = async (id) => {
        await axios.delete(`http://localhost:8080/api/products/${id}`);
        loadProducts();
    };

    return (
        <div>
            <h2>Product Management</h2>
            <form onSubmit={(e) => { e.preventDefault(); createProduct(); }}>
                <input type="text" placeholder="Name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
                <input type="text" placeholder="Description" value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} />
                <input type="number" placeholder="Price" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} />
                <input type="number" placeholder="Quantity" value={product.quantity} onChange={(e) => setProduct({ ...product, quantity: e.target.value })} />
                <button type="submit">Add Product</button>
            </form>

            <h3>Product List</h3>
            <ul>
                {products.map((prod) => (
                    <li key={prod.id}>
                        {prod.name} - {prod.description} - {prod.price} - {prod.quantity}
                        <button onClick={() => setProduct(prod)}>Edit</button>
                        <button onClick={() => deleteProduct(prod.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductComponent;
