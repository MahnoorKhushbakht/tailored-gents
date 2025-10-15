"use client";

import React, { useState, useEffect } from "react";
import { getCartData } from "@/lib/categories";
import { Button, Spinner } from "@chakra-ui/react";
import Link from "next/link";
import CartTableSkeleton from "./CartTableSkeleton";

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
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete cart item");

      setData((prev) => prev.filter((cart) => cart._id !== cartId));
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const filteredData = data.filter((cart) => cart.user_id === userId);

  return (
    <>
      {loading ? (
        <CartTableSkeleton />
      ) : (
        <div className="flex flex-col items-center py-8 px-4 text-white">
          {/* 🛒 Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">
            Your Shopping Cart
          </h1>

          {/* 📦 Table */}
          <div className="w-full max-w-5xl overflow-x-auto bg-gray-900/70 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-700">
            <table className="table-auto w-full text-sm md:text-base">
              <thead>
                <tr className="bg-gray-800 text-gray-200">
                  <th className="px-4 py-3 text-left font-semibold">Product</th>
                  <th className="px-4 py-3 text-center font-semibold">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-center font-semibold">Price</th>
                  <th className="px-4 py-3 text-center font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((cart, index) => (
                    <tr
                      key={index}
                      className="border-t border-gray-700 hover:bg-gray-800/60 transition-all duration-200"
                    >
                      <td className="px-4 py-3">{cart.product}</td>
                      <td className="px-4 py-3 text-center">
                        {cart.quantity}
                      </td>
                      <td className="px-4 py-3 text-center text-gray-300 font-semibold">
                        {`${cart.price} Rs`}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Button
                          colorScheme="red"
                          size="sm"
                          onClick={() => handleDelete(cart._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-6 text-gray-400 italic"
                    >
                      Your cart is empty.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* 💳 Checkout Button */}
          <div className="mt-6">
            {filteredData.length > 0 ? (
              <Link href="/checkout">
                <button
                  type="button"
                  className="bg-gradient-to-r from-gray-700 to-gray-900 rounded-xl px-6 py-2 text-gray-200 font-semibold hover:scale-105 hover:from-gray-600 hover:to-gray-800 transition-all duration-300 shadow-lg"
                >
                  Proceed to Checkout
                </button>
              </Link>
            ) : (
              <button
                type="button"
                disabled
                className="bg-gray-700 text-gray-400 rounded-xl px-6 py-2 cursor-not-allowed opacity-70"
              >
                Proceed to Checkout
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
