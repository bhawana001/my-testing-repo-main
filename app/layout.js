import "./globals.css";

export const metadata = {
  title: "Real Evals: a testing playground of realistic web-app clones",
  description:
    "Realistic web-app clones across 8 industries with live UI flows and REST APIs, a playground for any kind of testing: functional, end-to-end, UI/visual, browser automation, API, performance and accessibility.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
