import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/app/components/Nav/Nav";
import Link from "next/link";
import Provider from "./components/Helps/Provider";
// import YandexMetrika from 'next-yandex-metrika'
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script'


const oswald = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hires Studio - студия видеозаписи в Санкт-Петербурге. Подкасты, интервью, Reels/Shorts и разговорные ролики на высочайшем уровне",
  description: "Студия видеозаписи в Санкт-Петербурге Hires Studio. Удобное расположение - Московский пр-кт 22М. Аренда с оператором и без. 4К-камеры. Топовые микрофоны Shure. Онлайн-бронирование. Проф. оборудование. Комната отдыха/ожидания.",
  icons: {
    icon: '/icons/logo.svg'
  },
  robots: "index, nofollow",
  alternates: {
    canonical: "https://hires.studio"
  },
  openGraph: {
    title: 'Hires Studio - студия видеозаписи в Санкт-Петербурге. Подкасты, интервью, Reels/Shorts и разговорные ролики на высочайшем уровне',
    description: 'Студия видеозаписи в Санкт-Петербурге Hires Studio. Удобное расположение - Московский пр-кт 22М. Аренда с оператором и без. 4К-камеры. Топовые микрофоны Shure. Онлайн-бронирование. Проф. оборудование. Комната отдыха/ожидания.',
    url: 'https://hires.studio',
    siteName: 'hires.studio',
    images: [
      {
        url: '/bg/800x600.jpg', // Dynamic og route
        width: 800,
        height: 600,
      },
      {
        url: '/bg/1800x1600.jpg', // Dynamic og route
        width: 1800,
        height: 1600,
        alt: 'Hires Studio - студия видеозаписи в Санкт-Петербурге',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
    <head>
      {/* <link
          href="https://blogfonts.com/css/aWQ9MjI5NDAxJnN1Yj00MDEmYz1jJnR0Zj1DeWdyZS1CbGFjay1CRjYzZWVlYmYzOTQyYjIudHRmJm49Y3lncmUtYmxhY2s/Cygre Black.ttf"
          rel="stylesheet" type="text/css"/> */}
          
    </head>
    <body className={oswald.className}>
      <Provider>
        {children}
      </Provider>
      {/* <YandexMetrika yid={9616197} clickmap={true} trackLinks={true} accurateTrackBounce={true} webvisor={true}/> */}
      <GoogleTagManager gtmId="GTM-TM23NG99" />
      <GoogleAnalytics gaId="G-25GSH2FVLW"/>
      
      <Script src="//cdn.callibri.ru/callibri.js" />
      {/* <Script src="https://www.googletagmanager.com/gtag/js?id=AW-16649332877" /> */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-16649332877"
      />
    </body>
    </html>
  );
}
