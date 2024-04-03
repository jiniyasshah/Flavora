import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { saveOrder } from '../utils/firebaseFunctions';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const cartItems = useSelector((store) => store.cart);
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const [orderSaved, setOrderSaved] = useState(false); // Define orderSaved state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const orderData = {
      ...formData,
      foods: cartItems.map(item => ({
        id: item.id,
        title: item.title,
        quantity: item.qty
      }))
    };

    try {
      await saveOrder(orderData);
      console.log('Order saved successfully!');
      setOrderSaved(true);

    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  useEffect(() => {
    
    if (user.length === 0) {
      navigate('/');
    }
  }, [user, navigate]);


  useEffect(() => {
    if (orderSaved) {
      setOrderSaved(true); // Set orderSaved to true after successful save
      navigate('/order-confirmation');
    }
  }, [orderSaved, navigate]);


  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8 text-center">Checkout</h1>

      {/* Shipping Information Form */}
      <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <textarea id="address" name="address" value={formData.address} onChange={handleChange} rows="3" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>
        <div className="mb-4">
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
          <input type="text" id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">Expiry Date</label>
            <input type="text" id="expiry" name="expiry" value={formData.expiry} onChange={handleChange} placeholder="MM/YY" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
            <input type="text" id="cvv" name="cvv" value={formData.cvv} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 mt-8 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
