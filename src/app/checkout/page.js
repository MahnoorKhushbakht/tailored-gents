"use client";

import React, { useEffect, useState } from "react";
import { getCartData } from "@/lib/categories";

export default function CheckoutPage() {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCart() {
      try {
        setLoading(true);
        const result = await getCartData();

        if (result && result.data) {
          setCartData(result.data);
        } else {
          setCartData([]);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, []);

  const total = cartData.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full bg-gray-900/80 rounded-2xl shadow-2xl p-6 border border-gray-700">
        {/* 🧾 Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">
          Checkout
        </h1>
        <p className="text-gray-400 text-center mb-6">
          Review your order before confirming.
        </p>

        {/* 📦 Order Summary */}
        <div className="space-y-3 border-t border-b border-gray-700 py-4">
          {loading ? (
            <p className="text-gray-400 text-center italic py-3">
              Loading your cart...
            </p>
          ) : cartData.length > 0 ? (
            cartData.map((item, index) => (
              <div
                key={index}
                className="flex justify-between border-b border-gray-800 py-2"
              >
                <span>{item.product}</span>
                <span>
                  {item.quantity} × {item.price} Rs
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center italic py-3">
              Your cart is empty.
            </p>
          )}

          {!loading && cartData.length > 0 && (
            <div className="flex justify-between text-gray-300 font-semibold border-t border-gray-700 pt-3">
              <span>Total</span>
              <span>{total} Rs</span>
            </div>
          )}
        </div>

        {/* 🧍‍♀️ Checkout Form */}
        {cartData.length > 0 && (
          <form className="mt-6 space-y-4">
            <div>
              <label className="block text-gray-300 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-gray-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Address</label>
              <input
                type="text"
                placeholder="Enter your address"
                className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-gray-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Payment Method</label>
              <select className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-gray-500 focus:outline-none">
                <option>Cash on Delivery</option>
                <option>Credit / Debit Card</option>
                <option>Bank Transfer</option>
              </select>
            </div>

            <button
              type="button"
              className="w-full mt-4 bg-gradient-to-r from-gray-700 to-gray-900 py-2 rounded-xl hover:scale-105 transition-all duration-300 font-semibold text-gray-200 shadow-md"
            >
              Confirm Order
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
