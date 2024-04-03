import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight, MdShoppingBasket } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cartSlicer";
import { toast } from 'react-toastify';

function Fruits() {
  // User
  const userDetails = useSelector((store) => store.user)
  // Function to display toast notifications
  const notify = (message, type) => {
    if(type){
      toast.error(message);
    }else{
      toast(message);
    }
  }

  const data = useSelector((store) => store.product);
  
  const cart = useSelector((store) => store.cart);

  const dispatch = useDispatch();
  const handleCart = (id) => {  

    if(userDetails){
// Check if any item in the cart has the same id
const itemExists = cart.some((item) => item.id === id);
  
if (itemExists) {
  // Item with the id already exists in the cart
  notify("Already in Cart", "danger");
} else {
  // Find the item with the matching id in the data array
  const foundItem = data.find((item) => item.id === id);

  if (foundItem) {
    // Dispatch action to add the item to the cart
    dispatch(cartActions.addToCart(foundItem));
    notify("Added to Cart");
  } else {
    // Item with the id does not exist in the data array
    console.error(`Item with id ${id} not found.`);
  }
}
    }else{
      notify("User need to be loggedin", 'danger');
    }
    
  };
  
  
  const handleScroll = (value) => {
    const container = document.getElementById("fruitsContainer");
    if (container) {
      container.scrollLeft += value;
    }
  };

  return (
    <section className="w-full my-6">

      <div className="w-full flex items-center justify-between">
        <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
          Our fresh & healthy fruits
        </p>

        <div className="hidden md:flex gap-3 items-center">
          <motion.div
            whileTap={{ scale: 0.75 }}
            className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer  hover:shadow-lg flex items-center justify-center"
            onClick={() => handleScroll(-200)}
          >
            <MdChevronLeft className="text-lg text-white" />
          </motion.div>
          <motion.div
            whileTap={{ scale: 0.75 }}
            className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
            onClick={() => handleScroll(200)}
          >
            <MdChevronRight className="text-lg text-white" />
          </motion.div>
        </div>
      </div>

      <div id="fruitsContainer" className={`w-full flex items-center gap-3 my-12 scroll-smooth overflow-x-auto scrollbar-none`} style={{ scrollBehavior: "smooth", scrollSnapType: "x mandatory" }}>
        {data && data.length > 0 ? (
          data.map((item) => (
            <div
              key={item?.id}
              className="w-275 h-[225px] min-w-[275px] md:w-300 md:min-w-[300px]  bg-cardOverlay rounded-lg py-2 px-4 my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative"
            >
              <div className="w-full flex items-center justify-between">
                <motion.div
                  className="w-40 h-40 -mt-8 drop-shadow-2xl"
                  whileHover={{ scale: 1.2 }}
                >
                  <img
                    src={item?.imageURL}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </motion.div>
                <motion.div
                  whileTap={{ scale: 0.75 }}
                  className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
                  onClick={() => handleCart(item.id)}
                >
                  <MdShoppingBasket className="text-white" />
                </motion.div>
              </div>

              <div className="w-full flex flex-col items-end justify-end -mt-8">
                <p className="text-textColor font-semibold text-base md:text-lg">
                  {item?.title}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {item?.calories} Calories
                </p>
                <div className="flex items-center gap-8">
                  <p className="text-lg text-headingColor font-semibold">
                    <span className="text-sm text-red-500">$</span>{" "}
                    {item?.price}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full flex flex-col items-center justify-center">
            <img src="" className="h-340" alt="Not Found" />
            <p className="text-xl text-headingColor font-semibold my-2">
              Items Not Available
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Fruits;
