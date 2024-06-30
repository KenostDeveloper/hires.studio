'use client'
import React from 'react';
import styles from './Packet.module.scss'
import Link from 'next/link';
import SwiperPrice from '../Swiper/SwiperPrice';


const Packet = ({setModal, modal}:any) => {
    return (
        <>
            <SwiperPrice className={styles.pricesCardMobile} setActive={setModal}/>
                
            <div className={styles.pricesCard}>
                <div className={styles.shadowOne}></div>
                <div className={styles.pricesCardTariff}>
                    <div className={styles.icon}>
                        <img src="/icons/prices/1.svg" alt="" />
                    </div>
                    <b>Тариф &quot;Эксперт&quot;</b>
                    <ul className={styles.pricesCardTariffOne}>
                        <li>- Светлая или темная студия</li>
                        <li>- 1 час съемки с оператором, камерой, микрофоном, телесуфлером, специальным светом для Reels/Shorts</li>
                        <li>- Монтаж 3 Reels</li>
                    </ul>
                    <p className={styles.pricesCardTariffPrice}>10.000 ₽</p>
                    
                    <div className={styles.pricesCardTariffButton} onClick={() => setModal(true)}>ЗАБРОНИРОВАТЬ</div>
                </div>

                <div className={`${styles.pricesCardTariff} ${styles.pricesCardTariffCenter}`}>
                    <div className={styles.icon}>
                        <img src="/icons/prices/2.svg" alt="" />
                    </div>
                    <b>Тариф &quot;Максимум&quot;</b>
                    <ul className={styles.pricesCardTariffTwo}>
                        <li>- Аренда до 2х часов</li>
                        <li>- Съемка на 3 камеры с оператором</li>
                        <li>- Монтаж</li>
                        <li>- Создание превью</li>
                    </ul>
                    <p className={styles.pricesCardTariffDesc}><img src="/icons/box.png" alt="Подарок" />3 Reels/Shorts по вашим таймкодам - в подарок</p>
                    <p className={styles.pricesCardTariffPrice}>30.000 ₽</p>
                    
                    <div className={styles.pricesCardTariffButton} onClick={() => setModal(true)}>ЗАБРОНИРОВАТЬ</div>
                </div>

                <div className={styles.pricesCardTariff}>
                    <div className={styles.icon}>
                        <img src="/icons/prices/3.svg" alt="" />
                    </div>
                    <b>Тариф &quot;База&quot;</b>
                    <ul className={styles.pricesCardTariffTwo}>
                        <li>- Аренда студии</li>
                        <li>- Съемка на 3 камеры с оператором</li>
                    </ul>
                    <p className={`${styles.pricesCardTariffPriceMini} ${styles.pricesCardTariffPriceMiniLine}`}>1 час - 6.000 ₽</p>
                    <p className={styles.pricesCardTariffPriceMini}>2 часа - 11.000 ₽</p>
                    <p className={`${styles.pricesCardTariffPriceMini} ${styles.pricesCardTariffPriceMiniPadding}`}>3 часа - 15.000 ₽</p>
                    
                    <div className={styles.pricesCardTariffButton} onClick={() => setModal(true)}>ЗАБРОНИРОВАТЬ</div>
                </div>
            </div>
        </>
    );
};

export default Packet;