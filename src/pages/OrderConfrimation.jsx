import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { cartActions } from '../store/cartSlicer';

const OrderConfirmation = () => {
  const user = useSelector((store) => store.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleReset = () => {
    dispatch(cartActions.clearCart());
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <h1 className="text-3xl font-semibold mb-4">Order Confirmed!</h1>
        <p className="text-lg mb-4">Thank you for your order. Your order has been confirmed.</p>
        
        {/* Glitter Animation */}
        <div className="relative inline-block">
          
          <p className="text-lg mt-4">Your order is on its way!</p>
        </div>
        
        <Link to="/" onClick={() => handleReset()} className="inline-block mt-8 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out">Back to Home</Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
