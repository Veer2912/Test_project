// src/services/authService.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Backend URL for auth
const PRODUCT_API_URL = 'http://localhost:5000/api/products'; // Backend URL for products

// Register user
export const register = async (username: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, email, password });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw new Error('Registration failed');
  }
};

// Login user
export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw new Error('Login failed');
  }
};

// Logout user
export const logout = () => {
  localStorage.removeItem('user');
};


export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user') || '{}');
};


export const getToken = () => {
  const user = getCurrentUser();
  return user?.token || null;
};




export const fetchProducts = async () => {
  try {
    const response = await axios.get(PRODUCT_API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
};


export const addProduct = async (productData: { productName: string; description: string; price: number }) => {
  try {
    const token = getToken();
    const response = await axios.post(PRODUCT_API_URL, productData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to add product');
  }
};


export const updateProduct = async (id: number, productData: { productName: string; description: string; price: number }) => {
  try {
    const token = getToken();
    const response = await axios.put(`${PRODUCT_API_URL}/${id}`, productData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update product');
  }
};


export const deleteProduct = async (id: number) => {
  try {
    const token = getToken();
    const response = await axios.delete(`${PRODUCT_API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete product');
  }
};
