import '../styles/globals.css';
import Background from './background';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative">
        <Background />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
