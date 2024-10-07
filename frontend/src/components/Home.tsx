import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  id?: number;
  productName: string;
  description: string;
  price: number;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState<Product>({
    productName: '',
    description: '',
    price: 0,
  });

  // Fetch products from the backend
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products'); 
      setProducts(response.data); 
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault(); 
  
    if (!newProduct.productName || !newProduct.description || newProduct.price <= 0) {
      alert('Please fill all fields and ensure the price is valid.');
      return;
    }
  
    console.log("Sending product:", newProduct); 
  
    try {
      const response = await axios.post('http://localhost:5000/api/products', newProduct);
      setProducts([...products, response.data]);
      setShowModal(false);
      setNewProduct({ productName: '', description: '', price: 0 });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      
      <button
        className="bg-blue-500 text-white px-4 py-2 mb-4"
        onClick={() => setShowModal(true)}
      >
        Add Product
      </button>

      
      <table className="table-auto w-full text-left">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td className="border p-2">{product.productName}</td>
                <td className="border p-2">{product.description}</td>
                <td className="border p-2">${product.price}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="border p-2 text-center">No products available</td>
            </tr>
          )}
        </tbody>
      </table>

      
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <form
            onSubmit={handleAddProduct}
            className="bg-white p-6 rounded shadow-lg w-96"
          >
            <h2 className="text-2xl mb-4">Add New Product</h2>
            <div className="mb-4">
              <label className="block mb-1">Product Name</label>
              <input
                type="text"
                className="w-full border p-2"
                value={newProduct.productName}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, productName: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Description</label>
              <textarea
                className="w-full border p-2"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Price</label>
              <input
                type="number"
                className="w-full border p-2"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    price: parseFloat(e.target.value),
                  })
                }
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 mr-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
