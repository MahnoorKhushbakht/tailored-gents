"use client";

import "@/app/css/style.css";
import Image from "next/image";
import { useEffect, useState, Suspense } from "react";
import ShareLinkButton from "@/components/ShareLinkButton";
import SpecsBtn from "@/components/SpecsBtn";
import Cart from "@/components/Cart";
import CommentForm from "@/views/CommentForm";
import CommentList from "@/components/CommentList";
import CommentListSkeleton from "@/components/CommentListSkeleton";
import { notFound } from "next/navigation";

// 🧩 Static data
// 🧩 Static data
const allCategories = {
  "formal-wear": [
    {
      id: 1,
      title: { rendered: "Classic Black Suit" },
      slug: "classic-black-suit",
      content: {
        rendered: `
          <p>Perfect for formal occasions. Tailored to perfection with premium fabric.</p>
          <img src="https://images.unsplash.com/photo-1602810318383-e386cc2a3d3d" />
          <p>Price: 8999</p>
        `,
      },
    },
    {
      id: 2,
      title: { rendered: "Navy Blue Blazer" },
      slug: "navy-blue-blazer",
      content: {
        rendered: `
          <p>A timeless navy blazer that combines style and sophistication.</p>
          <img src="https://images.unsplash.com/photo-1593032465171-8b02e8d49e29" />
          <p>Price: 6999</p>
        `,
      },
    },
  ],
  "casual-wear": [
    {
      id: 3,
      title: { rendered: "Denim Jacket" },
      slug: "denim-jacket",
      content: {
        rendered: `
          <p>Lightweight denim jacket — perfect for casual evenings.</p>
          <img src="https://images.unsplash.com/photo-1533670801800-93afd7b3e9b6" />
          <p>Price: 4999</p>
        `,
      },
    },
    {
      id: 4,
      title: { rendered: "Graphic T-Shirt" },
      slug: "graphic-tshirt",
      content: {
        rendered: `
          <p>Trendy graphic tee for your everyday look.</p>
          <img src="https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb" />
          <p>Price: 1999</p>
        `,
      },
    },
  ],
  accessories: [
    {
      id: 5,
      title: { rendered: "Leather Belt" },
      slug: "leather-belt",
      content: {
        rendered: `
          <p>Genuine leather belt with a modern buckle design.</p>
          <img src="https://images.unsplash.com/photo-1600185365483-26d7a2f3b6b8" />
          <p>Price: 1499</p>
        `,
      },
    },
    {
      id: 6,
      title: { rendered: "Classic Wristwatch" },
      slug: "classic-wristwatch",
      content: {
        rendered: `
          <p>Elegant wristwatch that adds sophistication to your outfit.</p>
          <img src="https://images.unsplash.com/photo-1504051771394-dd2e66b2e08f" />
          <p>Price: 5999</p>
        `,
      },
    },
  ],
};

// 🧩 Extract image, summary, price
function parseHTMLContent(html) {
  const imgMatch = html.match(/<img[^>]+src="([^">]+)"/);
  const imageUrl = imgMatch ? imgMatch[1] : "https://via.placeholder.com/300";
  const text = html.replace(/<[^>]+>/g, "").replace(/Price:.*/, "").trim();
  const priceMatch = html.match(/Price:\s*(\d+)/);
  const price = priceMatch ? priceMatch[1] : "N/A";
  return { imageUrl, summary: text, price };
}

export default function Details({ params: { slug } }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 🔐 Check if user JWT exists (from localStorage)
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const userData = JSON.parse(atob(token.split(".")[1]));
        setUser(userData);
      } catch (err) {
        console.error("Invalid JWT token", err);
      }
    }
  }, []);

  // Find which category contains the clicked product
  const category = Object.values(allCategories).find(cat =>
    cat.some(item => item.slug === slug)
  );

  if (!category) notFound();

  const post = category.find(item => item.slug === slug);
  const content = parseHTMLContent(post.content.rendered);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-950 text-white flex flex-col items-center">
      <div className="flex flex-col p-4 md:p-8 w-full md:w-3/4">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="relative w-[300px] h-[300px] mt-6">
            <Image
              src={content.imageUrl}
              alt={post.title.rendered}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>

          <div className="md:ml-8 mt-6 md:mt-0 flex flex-col items-start">
            <div className="flex flex-row items-center gap-3">
              <h2 className="text-xl font-bold uppercase">{post.title.rendered}</h2>
              <ShareLinkButton />
            </div>

            <p className="mt-2 text-gray-200">{content.summary}</p>

            <SpecsBtn>
              <div className="text-white bg-gray-900 rounded p-2 w-auto mt-4 inline-block">
                <p>No extra specifications available.</p>
              </div>
            </SpecsBtn>

            <p className="bg-gray-600 text-white p-2 rounded w-40 mt-4 text-center text-lg shadow-lg">
              {`Price: ${content.price}`} Rs
            </p>

            {/* 🛒 Add to Cart (disabled if not signed in) */}
            <div className="mt-4 w-full flex justify-start">
              {user ? (
                <Cart itemName={post.title.rendered} price={content.price} />
              ) : (
                <button
                  disabled
                  className="bg-gray-600 text-gray-300 px-4 py-2 rounded cursor-not-allowed opacity-60"
                >
                  Sign in to add to cart
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 💬 Review Section */}
        <div className="mt-8 w-full">
          <h2 className="text-lg font-bold text-white uppercase mb-2">Reviews</h2>
          {user ? (
            <>
              <CommentForm slug={slug} userName={user?.name || "Guest"} />
              <Suspense fallback={<CommentListSkeleton />}>
                <CommentList slug={slug} />
              </Suspense>
            </>
          ) : (
            <p className="text-gray-400 text-center border border-gray-600 rounded-md p-3">
              Sign in to comment
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
