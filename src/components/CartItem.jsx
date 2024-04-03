import React from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cartSlicer";

const CartItem = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const handleCart = (productId, action) => {
    action === 'increment' ? dispatch(cartActions.increment(productId)) : dispatch(cartActions.decrement(productId))
  };
  

  return (
    <>
      {cartItems.map((data) => (
        <div key={data.id} className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2">
          <img src={data.imageURL} alt={data.title} className="w-12 h-12 object-cover rounded bg-white" />
          <div className="flex-grow">
            <h3 className="text-sm font-medium text-white">{data.title}</h3>
            <p className="text-xs text-white">${data.price}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleCart(data.id, "decrement")}
              className="text-sm text-gray-500"
            >
              <BiMinus />
            </button>
            <span className="text-sm text-white">{data.qty}</span>
            <button
              onClick={() => handleCart(data.id, "increment")}
              className="text-sm text-gray-500"
            >
              <BiPlus />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default CartItem;
