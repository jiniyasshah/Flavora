import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { firestore } from "../../firebase.config";

// Saving new Item
export const saveItem = async (data) => {
  await setDoc(doc(firestore, "foodItems", `${Date.now()}`), data, {
    merge: true,
  });
};

// Saving new Item
export const saveOrder = async (orderData) => {
  try {
    await setDoc(doc(firestore, "orders", `${Date.now()}`), orderData, {
      merge: true,
    });
    console.log('Order saved successfully:', orderData);
  } catch (error) {
    console.error('Error saving order:', error);
    throw new Error('Failed to save order');
  }
};
// getall food items
export const getAllFoodItems = async () => {
  const items = await getDocs(
    query(collection(firestore, "foodItems"), orderBy("id", "desc"))
  );

  return items.docs.map((doc) => doc.data());
};