<<<<<<< HEAD
=======
import { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cloudplay-Drive",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

>>>>>>> 56dc9cf (Initial commit)
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
<<<<<<< HEAD
      <body>{children}</body>
=======
      <body className={`${poppins.variable} font-poppins antialiased`}>
        {children}
      </body>
>>>>>>> 56dc9cf (Initial commit)
    </html>
  );
}
