import { motion } from "framer-motion";
import { categories } from "../utils/data";
import { useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { MdShoppingBasket } from "react-icons/md";
import { cartActions } from "../store/cartSlicer";
import { toast } from "react-toastify";

function MenuContainer() {
  // User
  const userDetails = useSelector((store) => store.user);

  const [filter, setFilter] = useState("rice");
  const data = useSelector((store) => store.product);
  const cart = useSelector((store) => store.cart);

  const dispatch = useDispatch();

  const notify = (message, type) => {
    if (type) {
      toast.error(message);
    } else {
      toast(message);
    }
  };

  const handleCart = (id) => {
    // Check if any item in the cart has the same id
    const itemExists = cart.some((item) => item.id === id);
    if (userDetails) {
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
    } else {
      notify("User need to be loggedin", "danger");
    }
  };

  const filteredData = filter
    ? data.filter((item) => item.category === filter)
    : data;

  return (
    <>
      <section className="w-full my-6" id="menu">
        <div className="w-full flex flex-col items-center justify-center">
          <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto">
            Our Hot Dishes
          </p>

          <div className="w-full flex items-center justify-start lg:justify-start gap-10 py-6 overflow-x-scroll scrollbar-none">
            {categories &&
              categories.map((category) => (
                <motion.div
                  whileTap={{ scale: 0.75 }}
                  key={category.id}
                  className={`group ${
                    filter === category.urlParamName
                      ? "bg-cartNumBg"
                      : "bg-card"
                  } w-24 min-w-[150px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-cartNumBg `}
                  onClick={() => setFilter(category.urlParamName)}
                >
                  <div
                    className={`w-10 h-10 rounded-full shadow-lg ${
                      filter === category.urlParamName
                        ? "bg-white"
                        : "bg-cartNumBg"
                    } group-hover:bg-white flex items-center justify-center`}
                  >
                    <IoFastFood
                      className={`${
                        filter === category.urlParamName
                          ? "text-textColor"
                          : "text-white"
                      } group-hover:text-textColor text-lg`}
                    />
                  </div>
                  <p
                    className={`text-sm ${
                      filter === category.urlParamName
                        ? "text-white"
                        : "text-textColor"
                    } group-hover:text-white`}
                  >
                    {category.name}
                  </p>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      <div
        id="fruitsContainer"
        className={`w-full flex items-center gap-3 my-12 scroll-smooth overflow-x-auto scrollbar-none`}
        style={{ scrollBehavior: "smooth", scrollSnapType: "x mandatory" }}
      >
        {filteredData && filteredData.length > 0 ? (
          filteredData.map((item) => (
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
                    <span className="text-sm text-red-500">Rs.</span>{" "}
                    {item?.price}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full flex flex-col items-center justify-center">
            <p className="text-xl text-headingColor font-semibold my-2">
              Items Not Available
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default MenuContainer;
