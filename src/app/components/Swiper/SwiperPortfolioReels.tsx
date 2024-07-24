
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
import Link from 'next/link';


const SwiperPortfolioReels = ({portfolio, handlePortfolioClick, type}:any) => {
    return (
        <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={50}
            slidesPerView={2}
            loop={true}
            // autoplay={{ delay: 3000 }}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            breakpoints={{
                0: {
                    slidesPerView: 2.2,
                    spaceBetween: 30
                },
                // when window width is >= 640px
                640: {
                  slidesPerView: 2.4,
                },
                // when window width is >= 768px
                768: {
                    spaceBetween: 30,
                    slidesPerView: 2.5,
                },
                1300: {
                    slidesPerView: 3,
                  },
            }}
            // onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={() => console.log('slide change')}
            >

            {portfolio.map((port: any) => (
                port.type == type ?
                <SwiperSlide key={port.id}>
                    <Link target="_blank" href={port.iframeLink} className={styles.slidePortfilio}>
                        <div className={styles.reels}>REELS/SHORTS</div>
                        <img
                            className={styles.slidePortfilioImg}
                            src={`${process.env.NEXT_PUBLIC_BASE_PATH_IMAGE}portfolio/${port.image}`}
                            alt=""
                        />
                        <svg className={styles.slidePortfilioPlay} width="73" height="77" viewBox="0 0 73 77" xmlns="http://www.w3.org/2000/svg">
                            <path d="M65.0888 23.2731C73.5123 27.065 74.6722 38.5536 67.1766 43.9526L24.904 74.4015C17.4084 79.8005 6.87901 75.0607 5.95109 65.8698L0.717935 14.0362C-0.209983 4.84534 9.15949 -1.90348 17.583 1.88836L65.0888 23.2731Z"/>
                        </svg>
                    </Link>
                </SwiperSlide>
                :
                null
            ))}
        
        </Swiper>
    );
};

export default SwiperPortfolioReels;
