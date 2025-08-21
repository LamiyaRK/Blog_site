// app/(without-nav)/layout.js
export default function WithoutNav({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
