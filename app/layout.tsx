import type { Metadata } from 'next';
import { Graduate } from 'next/font/google';
import './globals.css';

const graduate = Graduate({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-graduate',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Singular Solutions — Desenvolvedores Associados',
  description:
    'Tecnologia sob medida, construída por especialistas. ERPs, CRM, integrações com IA, websites e landing pages e todo tipo de solução tecnológica.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={graduate.variable}>
      <body>{children}</body>
    </html>
  );
}
