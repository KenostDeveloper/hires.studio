
import { useState } from "react";
import PhotoImage from "../components/Photo/Photo";
import Title from "../components/Title/Title";
import styles from "./business.module.scss";
import BusinessComponents from "./BusinessComponents";
import Footer from "../components/footer/Footer";



export const metadata = {
    title: "HiRes Studio — Видео-контент для вашего бизнеса. Подкасты, интервью, Reels/Shorts и разговорные ролики на высочайшем уровне",
    description: "Видео-контент для бизнеса от студии Hires Studio в Санкт-Петербурге. Поможем с контентом вашему бизнесу!",
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
            <BusinessComponents />
        </div>
    </div>
    
  )
}
