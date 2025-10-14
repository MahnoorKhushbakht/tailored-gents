'use client';
import React, { useState, useEffect } from 'react';
import { getCartData } from '@/lib/categories';
import { ChakraProvider, Button } from '@chakra-ui/react';
import CartTableSkeleton from './CartTableSkeleton';
import Layout from './Layout';

export default function CartTable({ userId }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const result = await getCartData();

      if (result && result.data) {
        setData(result.data);
      } else {
        setData([]);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  const handleDelete = async (cartId) => {
    try {
      const response = await fetch(`/api/cart?id=${cartId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete cart item');
      }

      const result = await response.json();
      console.log('Delete Result:', result);

      setData(data.filter(cart => cart._id !== cartId));
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  const filteredData = data.filter(cart => cart.user_id === userId);

  return (
    <>
      {loading ? (
        <CartTableSkeleton />
      ) : (
    <>
    <div className='flex bg-transparent justify-center text-2xl md:text-4xl py-2'>
  <h1>Cart</h1>
</div>
          <div className="overflow-x-auto mx-3 md:mx-6">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-2 py-1">Product Name</th>
                  <th className="px-2 py-1">Quantity</th>
                  <th className="px-2 py-1">Price</th>
                  <th className="px-2 py-1">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((cart, index) => (
                    <tr key={index}>
                      <td className="border px-2 py-1">{cart.product}</td>
                      <td className="border px-2 py-1">{cart.quantity}</td>
                      <td className="border px-2 py-1">{`${cart.price} Rs`}</td>
                      <td className="border px-2 py-1">
                        <Button colorScheme='red' onClick={() => handleDelete(cart._id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="border px-4 py-2 text-center">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <button
            type="submit"
            className="bg-gray-800 rounded mt-2 px-2 py-1 self-center text-gray-300 w-32 hover:bg-gray-900 disabled:bg-slate-500 disabled:cursor-not-allowed"
            isDisabled={filteredData.length === 0}
          >
            CheckOut
          </button>
       </>
      )}
    </>
  );
}
