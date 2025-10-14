'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Cart({ itemName, price }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    product: itemName,
    quantity: 1,
    price: price,
  });

  const increment = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      quantity: prevFormData.quantity + 1,
    }));
  };

  const decrement = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      quantity: prevFormData.quantity > 1 ? prevFormData.quantity - 1 : 1,
    }));
  };

 

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: parseInt(value, 10),
    }));
  };

  const apiUrl = process.env.NEXT_PUBLIC_API_URL_Cart;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Data saved', formData);
        router.push('/cart');
      } else {
        throw new Error('Server responded with an error');
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <div className="backdrop-opacity-10 text-white flex ">
      <form className="flex flex-col gap-2 items-start" onSubmit={handleSubmit}>
        <div className="flex w-2/5">
          <input
            id="productField"
            name="product"
            type="hidden"
            onChange={handleChange}
            className="border px-2 text-white py-1 rounded w-full bg-inherit"
            value={formData.product}
          />
        </div>

        <div className="flex items-center ">
          <button
            type="button"
            className="bg-inherit border border-gray-400 text-gray-200 h-10 w-10 rounded-r focus:outline-none hover:bg-gray-800"
            onClick={decrement}
          >
            -
          </button>
          <input
            id="quantityField"
            name="quantity"
            type="number"
            onChange={handleChange}
            value={formData.quantity}
            readOnly
            className="text-center w-12 h-10 border-t border-b border-gray-400 focus:outline-none text-white bg-gray-800"
          />
          <button
            type="button"
            className="bg-inherit border border-gray-400 text-gray-200 h-10 w-10 rounded-r focus:outline-none hover:bg-gray-800"
            onClick={increment}
          >
            +
          </button>
        </div>

        <div className="flex w-full">
          <input
            id="priceField"
            name="price"
            type="hidden"
            onChange={handleChange}
            value={formData.price}
            className="border px-2 text-black py-1 rounded w-full bg-inherit"
          />
        </div>

        <button
          type="submit"
          className="bg-gray-400 rounded py-1 text-gray-800 w-32 hover:bg-gray-300 disabled:bg-slate-500 disabled:cursor-not-allowed"
        >
          Add to Cart
        </button>
      </form>
    </div>
  );
}
