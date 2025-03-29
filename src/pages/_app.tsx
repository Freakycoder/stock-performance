import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import '../styles/globals.css';
import { AppProps } from 'next/app';
import { StockProvider } from '@/lib/context';

const inter = Inter({ subsets: ['latin'] });

export default function MyApp({ Component, pageProps } : AppProps) {
  return (
    <html className={inter.className}>
      <ThemeProvider attribute="class">
        <StockProvider>
          <Component {...pageProps} />
        </StockProvider>
      </ThemeProvider>
    </html>
  );
}