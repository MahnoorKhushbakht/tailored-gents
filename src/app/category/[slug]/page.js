"use client"; // 👈 Forces full client-side rendering

import "@/app/css/style.css";
import { Box } from "@chakra-ui/react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardData from "@/components/CardContent";
import Link from "next/link";
import { useMemo } from "react";

// 🧩 Static category data
const allCategories = {
  "formal-wear": [
    {
      id: 1,
      title: { rendered: "Classic Black Suit" },
      slug: "classic-black-suit",
      content: {
        rendered: `<p>Perfect for formal occasions. Tailored to perfection with premium fabric.</p>`,
      },
    },
    {
      id: 2,
      title: { rendered: "Navy Blue Blazer" },
      slug: "navy-blue-blazer",
      content: {
        rendered: `<p>A timeless navy blazer that combines style and sophistication.</p>`,
      },
    },
  ],
  "casual-wear": [
    {
      id: 3,
      title: { rendered: "Denim Jacket" },
      slug: "denim-jacket",
      content: {
        rendered: `<p>Lightweight denim jacket — perfect for casual evenings.</p>`,
      },
    },
    {
      id: 4,
      title: { rendered: "Graphic T-Shirt" },
      slug: "graphic-tshirt",
      content: {
        rendered: `<p>Trendy graphic tee for your everyday look.</p>`,
      },
    },
  ],
  accessories: [
    {
      id: 5,
      title: { rendered: "Leather Belt" },
      slug: "leather-belt",
      content: {
        rendered: `<p>Genuine leather belt with a modern buckle design.</p>`,
      },
    },
    {
      id: 6,
      title: { rendered: "Classic Wristwatch" },
      slug: "classic-wristwatch",
      content: {
        rendered: `<p>Elegant wristwatch that adds sophistication to your outfit.</p>`,
      },
    },
  ],
};

// 🧩 Parse plain text
function parseHTMLContent(html) {
  return html.replace(/<[^>]+>/g, "").slice(0, 120) + "...";
}

export default function ReviewPage({ params }) {
  const slug = params?.slug;
  const posts = useMemo(() => allCategories[slug] || [], [slug]);

  if (posts.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen text-white text-xl">
        Category not found
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-950 min-h-screen py-12 px-6 flex flex-col items-center">
      {/* Page Title */}
      <h1 className="text-center text-white text-3xl font-semibold mb-10 capitalize">
        {slug.replace("-", " ")}
      </h1>

      {/* Cards Grid */}
      <div className="flex justify-center w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl w-full place-items-center">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/details/${post.slug}`}
              className="no-underline w-full sm:w-auto flex justify-center"
            >
              <Box className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 w-80 flex flex-col justify-between cursor-pointer text-center">
                <CardData>
                  <CardContent className="flex flex-col justify-between h-full text-center">
                    {/* Product Title */}
                    <Typography
                      variant="h6"
                      component="div"
                      className="font-semibold text-lg mb-3"
                      dangerouslySetInnerHTML={{
                        __html: post.title.rendered,
                      }}
                    />

                    {/* Product Description */}
                    <Typography
                      variant="body2"
                      className="text-gray-300 mb-6 text-center"
                    >
                      {parseHTMLContent(post.content.rendered)}
                    </Typography>

                    {/* Add to Cart Button */}
                    <div className="flex justify-center mt-auto">
                      <Link href="/cart">
                        <button className="px-5 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-all shadow-md">
                          Add to Cart
                        </button>
                      </Link>
                    </div>
                  </CardContent>
                </CardData>
              </Box>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
