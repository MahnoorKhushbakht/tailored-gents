import "./globals.css";

import NavBar from '../components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "@/components/Footer";

export const metadata = {
  title: "Tailored Gents",
  description: "Discover the epitome of men's fashion with our exclusive collection of meticulously curated clothing. Elevate your style quotient with timeless classics and the latest trends tailored for the modern gentleman. From sophisticated formal wear to laid-back casual attire and a plethora of accessories, our men's clothing website offers an unparalleled shopping experience. Explore our diverse range of high-quality garments designed to complement every occasion and personality. Unleash your sartorial flair and redefine your wardrobe with our premium selection of menswear, crafted to inspire confidence and sophistication.",
};

export default function RootLayout({ children }) {
  // const setInitialTheme = process.env.noflash;
  return (
    <html lang="en">
      {/* <head>
      <meta charSet='utf-8' />
            <script type="text/javascript" dangerouslySetInnerHTML={{ __html: process.env.noflash}} />
      </head> */}
      <body  >
        <header>
          <NavBar/>
        </header>
        <main style={{ flex: '1 0 auto',backgroundColor: '#111827' }}>
          {children}
        </main>
        <footer style={{ margintop: 'auto' }}>
          <Footer/>
        </footer>
      </body>
    </html>
  );
}
// className="bg-gradient-to-r from-gray-800 to-gray-950"