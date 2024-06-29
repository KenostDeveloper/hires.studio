
'use client'
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import styles from './Swiper.module.scss'
import {Pagination, Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import ModalPhoto from '../ModalPhoto/ModalPhoto';


const SwiperPrice = ({setActive}:any) => {
    return (
        <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={50}
            loop={true}
            className={styles.SwiperPrice}
            // autoplay={{ delay: 3000 }}
            navigation
            initialSlide={1}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            centeredSlides={true}
            breakpoints={{
                0: {
                    slidesPerView: 1.1,
                    spaceBetween: 30
                },
                577: {
                    slidesPerView: 1.5,
                    spaceBetween: 30
                }
            }}
            >

            <SwiperSlide className={styles.SwiperPriceSlide}>
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
                    
                    <div className={styles.pricesCardTariffButton} onClick={() => setActive(true)}>ЗАБРОНИРОВАТЬ</div>
                </div>
            </SwiperSlide>

            <SwiperSlide className={styles.SwiperPriceSlide}>
                <div className={styles.pricesCardTariff}>
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
                    
                    <div className={styles.pricesCardTariffButton} onClick={() => setActive(true)}>ЗАБРОНИРОВАТЬ</div>
                </div>
            </SwiperSlide>

            <SwiperSlide className={styles.SwiperPriceSlide}>
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
                    <p className={styles.pricesCardTariffPriceMini}>3 часа - 15.000 ₽</p>
                    
                    <div className={styles.pricesCardTariffButton} onClick={() => setActive(true)}>ЗАБРОНИРОВАТЬ</div>
                </div>
            </SwiperSlide>

            <SwiperSlide className={styles.SwiperPriceSlide}>
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
                    
                    <div className={styles.pricesCardTariffButton} onClick={() => setActive(true)}>ЗАБРОНИРОВАТЬ</div>
                </div>
            </SwiperSlide>

            <SwiperSlide className={styles.SwiperPriceSlide}>
                <div className={styles.pricesCardTariff}>
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
                    
                    <div className={styles.pricesCardTariffButton} onClick={() => setActive(true)}>ЗАБРОНИРОВАТЬ</div>
                </div>
            </SwiperSlide>

            <SwiperSlide className={styles.SwiperPriceSlide}>
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
                    <p className={styles.pricesCardTariffPriceMini}>3 часа - 15.000 ₽</p>
                    
                    <div className={styles.pricesCardTariffButton} onClick={() => setActive(true)}>ЗАБРОНИРОВАТЬ</div>
                </div>
            </SwiperSlide>
        
        </Swiper>
    );
};

export default SwiperPrice;
