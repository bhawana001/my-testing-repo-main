import "./globals.css";

export const metadata = {
  title: "Acme — Landing Page",
  description: "A simple landing page built with Next.js App Router.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
