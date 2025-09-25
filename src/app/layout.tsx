import type { Metadata } from 'next';
import '../styles/globals.css';
import Navbar from '@/components/Navbar/Navbar';
import AuthLoader from '@/components/common/Loading/AuthLoader/AuthLoader';
import { ToastContainer } from 'react-toastify';

export const metadata: Metadata = {
  title: 'RedSeam Clothing',
  description: 'Your one-stop shop for the latest fashion trends',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="relative">
          <AuthLoader>
            <Navbar />
            {children}
          </AuthLoader>
          <ToastContainer position="bottom-right" pauseOnHover={false} autoClose={2000} />
        </div>
      </body>
    </html>
  );
}
