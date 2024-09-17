
import { useState } from "react";
import PhotoImage from "../../components/Photo/Photo";
import Title from "../../components/Title/Title";
import styles from "../photo.module.css";
import PhotoComponents from "./PhotoComponents";
import Footer from "../../components/footer/Footer";



export const metadata = {
    title: "HiRes Studio — Фото из студий видеозаписи в Санкт-Петербурге. Подкасты, интервью, Reels/Shorts и разговорные ролики на высочайшем уровне",
    description: "Фото из студий видеозаписи в Санкт-Петербурге Hires Studio.",
    icons: {
      icon: '/icons/logo.svg'
    },
    robots: "index, nofollow",
    alternates: {
      canonical: "https://hires.studio"
    },
    openGraph: {
      title: 'Hires Studio - студия видеозаписи в Санкт-Петербурге. Подкасты, интервью, Reels/Shorts и разговорные ролики на высочайшем уровне',
      description: 'Студия видеозаписи в Санкт-Петербурге Санкт-Петербурге Hires Studio. Удобное расположение - Московский пр-кт 22М. Аренда с оператором и без. 4К-камеры. Топовые микрофоны Shure. Онлайн-бронирование. Проф. оборудование. Комната отдыха/ожидания.',
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
  

export default function Photo() {

  return (
    <div>
        <div className={styles.main}>
            <PhotoComponents />
        </div>
    </div>
    
  )
}
