
'use client'
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import styles from './Swiper.module.scss'
import {Pagination, Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const SwiperJS = ({setModal}: any) => {


    return (
        <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            // autoplay={{ delay: 3000 }}

            breakpoints={{
                0: {
                    centeredSlides: true,
                    slidesPerView: 1,
                },
                // when window width is >= 640px
                640: {
                    slidesPerView: 1.1,
                    spaceBetween: 50,
                    centeredSlides: true,
                },
                // when window width is >= 768px
                768: {
                    spaceBetween: 30,
                    slidesPerView: 1.4,
                    centeredSlides: true,
                },
                1001: {
                    centeredSlides: false,
                    spaceBetween: 50,
                    slidesPerView: 1,
                },

            }}

            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            // onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={() => console.log('slide change')}
            >
            <SwiperSlide>
                <div className={styles.slider}>
                    <div className={styles.sliderImg}>
                    <img src="/bg/slider/podcastred.png" alt="" />
                    </div>
                    <div className={styles.sliderText}>
                        <h3>Аренда студии подкастов</h3>
                        <p>Cтудия, оборудованная под запись видео и аудио подкастов.</p>
                        <p>В стоимость аренды входят 2 настроенных микрофона Shure sm7b, видеосвет, цветные RGB лампы и 3 видеоштатива</p>
                        <p>Исходный звук вы получаете на съемный носитель или на облако (Яндекс.Диск/Google Drive)</p>
                        <p>Обратите внимание, что камеры и работа оператора не входят в стоимость и бронируются отдельно в услугах</p>

                        <div onClick={() => setModal(true)} className={styles.bronButton}>ЗАБРОНИРОВАТЬ <img src="/icons/lineButton.svg" alt="" /></div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className={styles.slider}>
                    <div className={styles.sliderImg}>
                    <img src="/bg/slider/3.jpg" alt="" />
                    </div>
                    <div className={styles.sliderText}>
                        <h3>Аренда интерьерной студии</h3>
                        <p>Интерьерная минималистичная фото-видеостудия, чтобы вы смогли записать видео-интервью, видео-визитку, любые разговорные видео.</p>
                        <p>В студии проведена аудиоподготовка, минимизировано эхо, установлены звукопоглощающие панели.</p>
                        <p>Аренда студии без оператора включает 2 постоянных видео-света Amaran 100 и 200 или, в случае аренды для фотосъемки предоставляется фото-свет.</p>

                        <div onClick={() => setModal(true)} className={styles.bronButton}>ЗАБРОНИРОВАТЬ <img src="/icons/lineButton.svg" alt="" /></div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className={styles.slider}>
                    <div className={styles.sliderImg}>
                    <img src="/bg/slider/4.png" alt="" />
                    </div>
                    <div className={styles.sliderText}>
                        <h3>Прямая трансляция на YouTube или другой потоковый сервис</h3>
                        <p>Проведение профессионального прямого эфира с одной камеры. Выводим картинку на YouTube или любой другой сервис потокового вещания у нас в студии. В кадре - один человек, микрофон Shure Sm7b.</p>
                        <p>У нас высокая скорость интернета, что обеспечивает максимальное качество трансляции.</p>

                        <div onClick={() => setModal(true)} className={styles.bronButton}>ЗАБРОНИРОВАТЬ <img src="/icons/lineButton.svg" alt="" /></div>
                    </div>
                </div>
            </SwiperSlide>

            <SwiperSlide>
                <div className={styles.slider}>
                    <div className={styles.sliderImg}>
                    <img src="/bg/slider/5.png" alt="" />
                    </div>
                    <div className={styles.sliderText}>
                        <h3>Запись подкаста с оператором</h3>
                        <p>В стоимость входит работа видеооператора, запись подкаста на 3 профессиональные 4к камеры с выставленным светом.</p>
                        <p>Исходный звук и материалы вы получаете на съемный носитель или на облако.</p>

                        <div onClick={() => setModal(true)} className={styles.bronButton}>ЗАБРОНИРОВАТЬ <img src="/icons/lineButton.svg" alt="" /></div>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    );
};

export default SwiperJS;
