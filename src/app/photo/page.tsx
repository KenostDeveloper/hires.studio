
import { useState } from "react";
import PhotoImage from "../components/Photo/Photo";
import Title from "../components/Title/Title";
import styles from "./photo.module.css";
import PhotoComponents from "./PhotoComponents";
import Footer from "../components/footer/Footer";



export const metadata = {
    title: "HiRes Studio — Фото из студий",
    description: "Студия записи подкастов и интервью в Санкт-Петербурге Hires Studio. Удобное расположение - Московский пр-кт 22М. Аренда с оператором и без. 4К-камеры. Топовые микрофоны Shure. Онлайн-бронирование. Проф. оборудование. Комната отдыха/ожидания.",
    icons: {
        icon: '/icons/logo.svg'
    },
    robots: "index, nofollow",
    alternates: {
      canonical: "https://hires.studio/photo"
    }
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
