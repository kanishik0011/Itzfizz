import "./globals.css";

export const metadata = {
  title: "Itzfizz Scroll Car Animation",
  description:
    "A GSAP ScrollTrigger recreation of a scroll-driven hero car animation."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
