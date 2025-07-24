import { Plus_Jakarta_Sans as FontSans } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import { Toaster } from "react-hot-toast";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Nusa Visual",
  description: "A way to visualize Nusantara's heritage",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} antialiased`}>
        <Providers>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                border: "1px solid #4caf50",
                padding: "12px",
                color: "#333",
              },
              success: {
                iconTheme: {
                  primary: "#4caf50",
                  secondary: "#fff",
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
