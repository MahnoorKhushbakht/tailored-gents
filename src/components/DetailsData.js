"use client";

import "@/app/css/style.css";
import Image from "next/image";
import { Suspense } from "react";
import ShareLinkButton from "@/components/ShareLinkButton";
import SpecsBtn from "@/components/SpecsBtn";
import Cart from "@/components/Cart";
import CommentForm from "@/views/CommentForm";
import CommentList from "@/components/CommentList";
import CommentListSkeleton from "@/components/CommentListSkeleton";
import { notFound } from "next/navigation";

/* 
  🧩 FALLBACK DATA NOTICE:
  The following `allCategories` object serves as a local fallback 
  in case the WordPress API is unavailable or fails to fetch data.
  It helps maintain site functionality and user experience offline 
  or during API downtime.
*/
const fallbackCategories = {
  "formal-wear": [
    {
      id: 1,
      title: { rendered: "Classic Black Suit" },
      slug: "classic-black-suit",
      content: {
        rendered: `
          <p>Perfect for formal occasions. Tailored to perfection with premium fabric.</p>
          <img src="/images/classic-black-suit.jpg" />
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
          <img src="/images/navy-blue-blazer.jpg" />
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
          <img src="/images/denim-jacket.jpg" />
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
          <img src="/images/graphic-tshirt.jpg" />
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
          <img src="/images/leather-belt.jpg" />
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
          <img src="/images/classic-wristwatch.jpg" />
          <p>Price: 5999</p>
        `,
      },
    },
  ],
};

// 🧠 Helper Function — Parse HTML safely
function parseHTMLContent(html) {
  const imgMatch = html.match(/<img[^>]+src="([^">]+)"/);
  const imageUrl = imgMatch ? imgMatch[1] : "/images/placeholder.jpg";
  const text = html.replace(/<[^>]+>/g, "").replace(/Price:.*/, "").trim();
  const priceMatch = html.match(/Price:\s*(\d+)/);
  const price = priceMatch ? priceMatch[1] : "N/A";
  return { imageUrl, summary: text, price };
}

// 🖼️ Main Component
export default function DetailsData({ params: { slug }, user }) {
  // Normally, you'd fetch data from your WordPress API here.
  // If that fails, fallbackCategories will be used.
  // Example:
  // const data = (await fetchWordPressData()) || fallbackCategories;

  const category = Object.values(fallbackCategories).find(cat =>
    cat.some(item => item.slug === slug)
  );

  if (!category) notFound();

  const post = category.find(item => item.slug === slug);
  const content = parseHTMLContent(post.content.rendered);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-950 text-white flex flex-col items-center">
      <div className="flex flex-col p-4 md:p-8 w-full md:w-3/4">
        <div className="flex flex-col md:flex-row justify-center items-center">
          {/* 🖼️ Product Image */}
          <div className="relative w-[300px] h-[300px] mt-6 rounded-xl overflow-hidden shadow-2xl">
            <Image
              src={content.imageUrl}
              alt={post.title.rendered}
              fill
              className="object-cover rounded-xl transition-transform duration-300 hover:scale-105"
              priority
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>

          {/* 📄 Product Info */}
          <div className="md:ml-8 mt-6 md:mt-0 flex flex-col items-start space-y-3">
            <div className="flex flex-row items-center gap-3">
              <h2 className="text-xl font-bold uppercase">{post.title.rendered}</h2>
              <ShareLinkButton />
            </div>

            <p className="text-gray-300 leading-relaxed">{content.summary}</p>

            <SpecsBtn>
              <div className="text-white bg-gray-900 rounded p-2 w-auto mt-4 inline-block">
                <p>No extra specifications available.</p>
              </div>
            </SpecsBtn>

            <p className="bg-gray-700 text-white p-2 rounded w-40 mt-4 text-center text-lg shadow-md">
              Price: {content.price} Rs
            </p>

            <div className="mt-4 w-full flex justify-start">
              {user ? (
                <Cart itemName={post.title.rendered} price={content.price} />
              ) : (
                <button
                  disabled
                  className="bg-gray-700 text-gray-400 px-4 py-2 rounded cursor-not-allowed opacity-60"
                >
                  Sign in to add to cart
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 💬 Reviews Section */}
        <div className="mt-10 w-full">
          <h2 className="text-lg font-bold uppercase mb-3 border-b border-gray-600 pb-1">
            Reviews
          </h2>
          {user ? (
            <>
              <CommentForm slug={slug} userName={user?.name || "Guest"} />
              <Suspense fallback={<CommentListSkeleton />}>
                <CommentList slug={slug} />
              </Suspense>
            </>
          ) : (
            <p className="text-gray-400 text-center border border-gray-700 rounded-md p-3 mt-4">
              Sign in to comment
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
