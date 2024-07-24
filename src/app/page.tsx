"use client";
import styles from "./page.module.scss";
import Link from "next/link";
import {useEffect, useState } from "react";
import Title from "./components/Title/Title";
import SwiperJS from "./components/Swiper/Swiper";
import FaqEl from "./components/faqEl/FaqEl";
import FaqCard from "./components/faqEl/FaqCard";
import FaqPrice from "./components/faqEl/FaqPrice";
import SwiperPortfolio from "./components/Swiper/SwiperPortfolio";
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import Modal from "./components/Modal/Modal";
import Nav from "./components/Nav/Nav";
import ModalPhoto from "./components/ModalPhoto/ModalPhoto";
import Footer from "./components/footer/Footer";
import axios from "axios";
import { Type } from "@prisma/client";
import SwiperPrice from "./components/Swiper/SwiperPrice";
import Packet from "./components/Packet/Packet";

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import {Pagination, Navigation, Autoplay, EffectFade  } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import SwiperPortfolioReels from "./components/Swiper/SwiperPortfolioReels";




export default function Home() {
  const [clickedIndex, setClickedIndex] = useState(0);

  const [portfilioList, setPortfolioList] = useState(0);
  const [modal, setModal] = useState(false)

  interface IPortfolio{
    id: string,
    iframeLink: string,
    image: string,
    type: Type,
    isModal: boolean
  }

  const [subscription, setSubscription] = useState(false);

  function toggleSubscription () {
      setSubscription(!subscription)
  }

  function updateSwiper(activeSlide: number) {
    setClickedIndex(activeSlide);
  }

  const scrolltoHash = function (element_id: string) {
    const element = document.getElementById(element_id)
    element?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
}

  const [video1, setVidio1] = useState(false);
  const [video2, setVidio2] = useState(false);


  const [faqs, setFaq] = useState([
    {
      id: 0,
      name: "Видео оборудование",
      active: false,
      card: [
        {
          id: 0,
          name: "FUJIFILM X-T3 (3 шт)",
          description:
            "это камера с высоким качеством изображения благодаря 26,1-мегапиксельному сенсору, процессору обработки изображений X-Processor 4, улучшенной системе автофокусировки с 425 фазовыми точками, возможности съемки видео в 4K.",
          img: "./bg/faq/1.png",
        },
        {
          id: 1,
          name: "Видеоштатив Falcon Eyes (3 шт)",
          description:
            "обладает прочной конструкцией, что обеспечивает стабильность и надежность во время съемки. Кроме того, его регулируемая высота и надежные фиксации позволяют легко настроить желаемое положение камеры. Видеоштатив также оснащен гидравлическими головками, которые обеспечивают плавные движения при съемке видео.",
          img: "./bg/faq/2.png",
        },
      ],
    },
    {
      id: 1,
      name: "Звуковое оборудование",
      active: false,
      card: [
        {
          id: 0,
          name: "Микрофоны Shure SM7B на компактных стойках (3 шт)",
          description:
            "благодаря встроенной подавлению шумов и вибраций, микрофон идеально подходит для студийной записи.",
          img: "./bg/faq/5.png",
        },
        {
          id: 1,
          name: "Петличная радиосистема sennheiser g3 ew100 (2 шт)",
          description:
            "обеспечивает высокое качество звука, надежную связь и удобство, а также имеет широкий диапазон частот.",
          img: "./bg/faq/6.jpg",
        },
        {
          id: 2,
          name: "Звуковая карта Solid State Logic SSL 2",
          description:
            "обеспечивает отличное звучание благодаря студийному качеству записи и воспроизведения, высокой частоте дискретизации и низкому уровню шума.",
          img: "./bg/faq/9.png",
        },
        {
          id: 3,
          name: "Предусилитель (активатор) t-decor (1шт) ",
          description:
            "обеспечивает высокую чувствительность, широкий диапазон усиления и низкий уровень шума, что делает его идеальным для записи голоса в высоком качестве.",
          img: "./bg/faq/11.png",
        },
      ],
    },
    {
      id: 2,
      name: "Осветительные приборы",
      active: false,
      card: [
        {
          id: 0,
          name: "Видеосвет Amaran 100x, 200x Godox sl60",
          description:
            "благодаря своей большой мощности и регулируемой яркости, данные модели видеосвета идеально подходят для профессиональных видео и фотосъемок в различных условиях.",
          img: "./bg/faq/3.png",
        },
        {
          id: 1,
          name: "RGB осветители (палки) Godox TL30 (4 шт)",
          description:
            "позволяют создавать разнообразные световые эффекты и настроить освещение в соответствии с требованиями съемки, добавляя креативность и уникальность визуальным проектам.",
          img: "./bg/faq/4.jpeg",
        },
        {
          id: 2,
          name: "Студийная вспышка Godox MS200V (2 шт)",
          description:
            "обеспечивает высокую мощность и точное распределение света.",
          img: "./bg/faq/7.png",
        },
      ],
    },
    {
      id: 3,
      name: "Техническое оборудование",
      active: false,
      card: [
        {
          id: 0,
          name: "Рекордер Zoom H6",
          description:
            "оборудован шестью входами для микрофонов, он обеспечивает высокое качество звука и гибкость при записи с различных источников.",
          img: "./bg/faq/8.jpg",
        },
        {
          id: 2,
          name: "Предусилитель DBX 286 s (2 шт) ",
          description:
            "обеспечивает высокое качество звука, благодаря технологии обработки сигнала и встроенному компрессору, эквалайзеру, декессору и усилителю.",
          img: "./bg/faq/10.png",
        },
      ],
    },
  ]);

  const [nav, setNav] = useState<any>([
    {
        id: 0,
        text: "О нас",
        scrollTo: "about"
    },
    {
        id: 0,
        text: "Аренда студии",
        scrollTo: "services"
    },
    {
        id: 0,
        text: "Пакеты под ключ",
        scrollTo: "packet"
    },
    {
        id: 0,
        text: "Цены и услуги",
        scrollTo: "price"
    },
    {
        id: 0,
        text: "Контакты",
        scrollTo: "contacts"
    },
  ])

  // const [price, setPrice] = useState([
  //   {
  //     id: 0,
  //     name: "Студия подкастов",
  //     active: false,
  //     card: [
  //       {
  //         id: 0,
  //         name: "Аренда студии подкастов на 2 часа",
  //         price: "5000",
  //       },
  //       {
  //         id: 1,
  //         name: "Аренда студии подкастов на 3 часа",
  //         price: "7000",
  //       },
  //       {
  //         id: 2,
  //         name: "Каждый последующий час аренды студии подкастов (при аренде свыше 3-х часов)",
  //         price: "1500",
  //       },
  //       {
  //         id: 3,
  //         name: "Запись видео-подкаста с оператором на 2 часа",
  //         price: "11000",
  //       },
  //       {
  //         id: 4,
  //         name: "Запись видео-подкаста с оператором на 3 часа",
  //         price: "15000",
  //       },
  //       {
  //         id: 5,
  //         name: "Каждый последующий час записи видео-подкаста с оператором (при аренде свыше 3-х часов)",
  //         price: "4000",
  //       },
  //       {
  //         id: 6,
  //         name: "Прямая трансляция на YouTube или другой потоковый сервис с одной видеокамеры 1 час",
  //         price: "8000",
  //       },
  //       {
  //         id: 7,
  //         name: "Прямая трансляция на YouTube или другой потоковый сервис с трех камер 1 час",
  //         price: "10000",
  //       },
  //     ],
  //   },
  //   {
  //     id: 1,
  //     name: "Интерьерная студия",
  //     active: false,
  //     card: [
  //       {
  //         id: 0,
  //         name: "Аренда интерьерной студии на 1 час (фотосъемка)",
  //         price: "1200",
  //       },
  //       {
  //         id: 1,
  //         name: "Аренда интерьерной студии на 1 час (видеосъемка)",
  //         price: "1500",
  //       },
  //       {
  //         id: 2,
  //         name: "Аренда интерьерной студии на 4 часа (видеосъемка)",
  //         price: "5000",
  //       },
  //       {
  //         id: 3,
  //         name: "Запись интервью на 3 камеры с оператором 1 час",
  //         price: "6000",
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: "Студия с цветными фонами",
  //     active: false,
  //     card: [
  //       {
  //         id: 0,
  //         name: "Аренда студии с цветным фоном (фотосъемка) на 1 час",
  //         price: "1200",
  //       },
  //       {
  //         id: 1,
  //         name: "Аренда студии с цветным фоном (видеосъемка) на 1 час",
  //         price: "1500",
  //       },
  //       {
  //         id: 2,
  //         name: "Запись видео в студии с цветными фонами с оператором 1 час",
  //         price: "4000",
  //       },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     name: "Доп. услуги",
  //     active: false,
  //     card: [
  //       {
  //         id: 0,
  //         name: "Аренда 2-х RGB-палок (на всю съемку)",
  //         price: "500",
  //       },
  //       {
  //         id: 1,
  //         name: "Аренда суфлера (на всю съемку)",
  //         price: "1000",
  //       },
  //     ],
  //   },
  // ]);

  // const [portfolio, setPortfolio] = useState([
  //   {
  //     id: 0,
  //     img: '/portfolio/1.png',
  //     isModal: false,
  //     iframe: <iframe width="100%" height="100%" src="https://www.youtube.com/embed/cHcdBXYnRc4?si=PLtpbE1OFFHo2C5t" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
  //   },
  //   {
  //     id: 1,
  //     img: '/portfolio/3.jpg',
  //     isModal: false,
  //     iframe: <iframe width="100%" height="100%" src="https://www.youtube.com/embed/gxS4uwpi7QQ?si=Xl2A6BG8fEb_luHU" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
  //   },
  //   {
  //     id: 2,
  //     img: '/portfolio/2.jpg',
  //     isModal: false,
  //     iframe: <iframe width="100%" height="100%" src="https://www.youtube.com/embed/lSYx-LODN1A?si=UGKmNwi9PJbEueTS" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
  //   },
  // ]); 

  // const [price, setPrice] = useState<any>([]);

  // useEffect(() => {
  //   axios.get(`/api/prices`).then(res => {
  //     if(res.data.success){
  //       setPrice(res.data.prices)
  //     }
  //   })
  // }, [])

  const [price, setPrice] = useState<any>([]);

  useEffect(() => {
    axios.get(`/api/prices`).then(res => {
      if(res.data.success){
        setPrice(res.data.prices)
      }
    })
  }, [])

  const [portfolio, setPortfolio] = useState<any>([]);

  useEffect(() => {
    axios.get(`/api/portfolio`).then(res => {
      console.log(111, res.data)
      setPortfolio([...portfolio, ...res.data.Portfolio])
    })
  }, [])

  function handlePortfolioClick(id: string) {
    console.log(123)

    const nextShapes = portfolio.map((portfolio: IPortfolio) => {
      if (portfolio.id != id) {
        // No change
        return portfolio;
      } else {
        // Return a new circle 50px below
        return {
          ...portfolio,
          isModal: !portfolio.isModal,
        };
      }
    });

    setPortfolio(nextShapes);
  }

  function handlePriceClick(id: number) {
    const nextShapes = price.map((price: any) => {
      if (price.id != id) {
        // No change
        return price;
      } else {
        // Return a new circle 50px below
        return {
          ...price,
          active: !price.active,
        };
      }
    });

    setPrice(nextShapes);
  }

  function handleFaqClick(id: number) {
    const nextShapes = faqs.map((faq) => {
      if (faq.id != id) {
        // No change
        return faq;
      } else {
        // Return a new circle 50px below
        return {
          ...faq,
          active: !faq.active,
        };
      }
    });

    setFaq(nextShapes);
  }

  return (
    <div>
      <div className={styles.main}>
        {/* Modal 1 */}
        <ModalPhoto active={video1} setActive={setVidio1}>
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/mgaCjo1LAFc?si=A9PyuZ_eVS6ZsQEX" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
        </ModalPhoto>

        {/* Modal 2 */}
        <ModalPhoto active={video2} setActive={setVidio2}>
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/30uR3XZfDwI?si=NRBHjrzzKG9Rhgce" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
        </ModalPhoto>

        {/* Portfolio modal */}
        {/* {portfolio.map((port: any) => (
          <ModalPhoto isIframe={true} key={port.id} active={port.isModal} setActive={handlePortfolioClick} id={port.id}>
            <iframe
              width="100%"
              height="100%"
              src={port.iframeLink}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </ModalPhoto>
        ))} */}

        {/* Nav */}
        <Nav setModal={setModal} items={nav}/>

        {/* Modal yclients */}
        <Modal active={modal} setActive={setModal} >
          <iframe height="100%" width="100%"  id="ms_booking_iframe" src="https://n1025717.yclients.com/"></iframe>
        </Modal>

        {/* SVG */}
        <div className={styles.lines}>
          <svg width="3161" height="755" viewBox="0 0 3161 755" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.365288 516.156L2901.06 753.013M130.169 259.078L3030.87 495.935M259.973 2.00006L3160.67 238.857" stroke="url(#paint0_linear_500_661)" strokeWidth="3"/>
            <defs>
              <linearGradient id="paint0_linear_500_661" x1="3006.72" y1="348.348" x2="-405.657" y2="-1615.83" gradientUnits="userSpaceOnUse">
                <stop stopColor="#4A0EB9"/>
                <stop offset="1" stopColor="white" stopOpacity="0"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Первый блок */}
        <div className={`container ${styles.container}`}>
          <div className={styles.imgMain}>
          <Swiper
            className={styles.mainSwiper}
            modules={[Autoplay, EffectFade]}
            effect="fade"
            spaceBetween={0}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            autoplay={{ delay: 3000 }}

            breakpoints={{
                0: {
                  centeredSlides: true,
                  slidesPerView: 1,
                },
            }}

            // onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={() => console.log('slide change')}
            >
            <SwiperSlide className={styles.mainImage}>
              <img className="" src="/bg/bg1.ARW" alt="Студия видео и звуко записи в Санкт-Петербурге" />
              <h1>
              Студия подкастов <span>в Санкт-Петербурге</span>
              </h1>
            </SwiperSlide>
            <SwiperSlide className={styles.mainImage}>
              <img src="/bg/bg1.JPG" alt="Студия видео и звуко записи в Санкт-Петербурге" />
              <h1>
              Студия подкастов <span>в Санкт-Петербурге</span>
              </h1>
            </SwiperSlide>
            <SwiperSlide className={styles.mainImage}>
              <img src="/bg/bg2.JPG" alt="Студия видео и звуко записи в Санкт-Петербурге" />
              <h1>
              Студия подкастов <span>в Санкт-Петербурге</span>
              </h1>
            </SwiperSlide>
            <SwiperSlide className={styles.mainImage}>
              <img src="/bg/bg3.JPG" alt="Студия видео и звуко записи в Санкт-Петербурге" />
              <h1>
              Студия подкастов <span>в Санкт-Петербурге</span>
              </h1>
            </SwiperSlide>
            <SwiperSlide className={styles.mainImage}>
              <img src="/bg/bg5.JPG" alt="Студия видео и звуко записи в Санкт-Петербурге" />
              <h1 className={styles.mainH1Mini}>
              Интерьерная студия <span>в Санкт-Петербурге</span>
              </h1>
            </SwiperSlide>
            <SwiperSlide className={styles.mainImage}>
              <img src="/bg/bg6.JPG" alt="Студия видео и звуко записи в Санкт-Петербурге" />
              <h1 className={styles.mainH1Mini}>
              Интерьерная студия <span>в Санкт-Петербурге</span>
              </h1>
            </SwiperSlide>
            <SwiperSlide className={styles.mainImage}>
              <img src="/bg/bg7.JPG" alt="Студия видео и звуко записи в Санкт-Петербурге" />
              <h1 className={styles.mainH1Mini}>
              Интерьерная студия <span>в Санкт-Петербурге</span>
              </h1>
            </SwiperSlide>
            <SwiperSlide className={styles.mainImage}>
              <img src="/bg/bg8.JPG" alt="Студия видео и звуко записи в Санкт-Петербурге" />
              <h1 className={styles.mainH1Mini}>
              Интерьерная студия <span>в Санкт-Петербурге</span>
              </h1>
            </SwiperSlide>
          </Swiper>
            {/* <img src="/bg/main.jpg" alt="Студия видео и звуко записи в Санкт-Петербурге" />

            <h1>
              Студия подкастов <span>в Санкт-Петербурге</span>
            </h1> */}
          </div>

          <div className={styles.mainLeft}>
            <div className={styles.mainButtons}>
              <div onClick={() => setModal(true)} className={styles.mainButtonOne}>
                ЗАБРОНИРОВАТЬ
              </div>

              <div onClick={() => scrolltoHash('price')} className={styles.mainButtonTwo}>
                ЦЕНЫ И УСЛУГИ
              </div>
            </div>

            <Link href="/photo" className={styles.showPhoto}>
              <img src="/bg/showPhoto.jpg" alt="Фото экрана с изображением с разных камер" />

              <p>
                Фото <br /> со студии
              </p>

              <svg
                viewBox="0 0 177 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="Arrow 1"
                  d="M2 10.5C1.17157 10.5 0.5 11.1716 0.5 12C0.5 12.8284 1.17157 13.5 2 13.5L2 10.5ZM176.061 13.0606C176.646 12.4749 176.646 11.5251 176.061 10.9393L166.515 1.39338C165.929 0.807597 164.979 0.807597 164.393 1.39338C163.808 1.97917 163.808 2.92892 164.393 3.5147L172.879 12L164.393 20.4853C163.808 21.0711 163.808 22.0208 164.393 22.6066C164.979 23.1924 165.929 23.1924 166.515 22.6066L176.061 13.0606ZM2 13.5L175 13.5L175 10.5L2 10.5L2 13.5Z"
                  fill="white"
                />
              </svg>
            </Link>
          </div>
        </div>

        <div className={styles.kenost}>
          <div className="container">

            {/* Почему мы */}
            <Title id="about" text="Почему мы?" />

            <div className={styles.fact}>
              <div className={styles.shadowOne}></div>

              <div className={`${styles.fact__el} ${styles.fact__center}`}>
                <img src="/icons/locate.svg" alt="" />

                <p>
                  Удобное <span className={styles.fact_a} onClick={() => scrolltoHash('contacts')}>расположение</span>
                </p>
              </div>

              <div className={`${styles.fact__el} ${styles.fact__center}`}>
                <img src="/icons/lamp.svg" alt="" />
                <p>Комната подготовки к подкасту</p>
              </div>

              <div className={styles.fact__el}>
                <img src="/icons/micro.svg" alt="" />

                <p>
                  Современное, качественное <span className={styles.fact_a} onClick={() => scrolltoHash('equipment')}>оборудование</span>
                </p>
              </div>

              <div className={styles.fact__el}>
                <img src="/icons/cum.svg" alt="" />

                <p>
                  Полный спектр услуг: от аренды студии до{" "}
                  <span className={styles.fact_a} onClick={() => scrolltoHash('podcast')}>создания подкаста под ключ</span>
                </p>
              </div>

              <div className={`${styles.fact__el} ${styles.fact__center}`}>
                <img src="/icons/stream.svg" alt="" />
                <p>Самая медийная студия, транслируем жизнь на <Link target="_blank" href="https://www.youtube.com/playlist?list=PL-KZ_UK8GyY5RKbjxrQA23nWD_U4NUSwN" className={styles.fact_a}>YouTube</Link></p>
              </div>

              <div className={`${styles.fact__el}`}>
                <img src="/icons/comfort.svg" alt="" />
                <p>Вам не будет жарко, ведь во всех студиях работает бесшумный кондиционер</p>
              </div>
            </div>

            {/* Наши услуги */}
            <Title id="services" text="Наши студии" />

            <div className={styles.swiperServices}>
              <SwiperJS setModal={setModal}/>
            </div>

            {/* Наше оборудование */}
            <Title id="equipment" text="Наше оборудование" />

            <div className={styles.faq}>
              {faqs.map((faq) => (
                <FaqEl
                  handleFaqClick={handleFaqClick}
                  active={faq.active}
                  key={faq.id}
                  name={faq.name}
                  id={faq.id}
                >
                  {faq.card.map((card) => (
                    <FaqCard key={card.id} props={card} />
                  ))}
                </FaqEl>
              ))}
            </div>

            {/* Подкасты */}
            {/* <div className={styles.turnkey} id="podcast">
              <div className={styles.lines2}>
                <svg width="3161" height="755" viewBox="0 0 3161 755" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.365288 516.156L2901.06 753.013M130.169 259.078L3030.87 495.935M259.973 2.00006L3160.67 238.857" stroke="url(#paint0_linear_500_661)" strokeWidth="3"/>
                  <defs>
                  <linearGradient id="paint0_linear_500_661" x1="3006.72" y1="348.348" x2="-405.657" y2="-1615.83" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4A0EB9"/>
                  <stop offset="1" stopColor="white" stopOpacity="0"/>
                  </linearGradient>
                  </defs>
                </svg>
              </div>

              <h2>Подкасты под ключ</h2>

              <div className={styles.turnkeyContainer}>
                <div className={styles.turnkeyLeft}>
                  <h4>1 этап</h4>
                  <p>от идеи к реальности</p>
                </div>

                <div className={styles.turnkeyRight}>
                  <b>Создания концепции</b>
                  <p className={styles.mb}>
                    В самом начале вашего подкаста лежит уникальная идея. Мы
                    поможем вам проработать концепцию, которая будет не только
                    отражать вашу экспертность, но и привлекать внимание аудитории
                  </p>

                  <b>Написания сценария</b>
                  <p>
                    Мы создадим для вас не просто текст, а историю, которая звучит
                    именно так, как если бы вы рассказывали ее своим близким
                    друзьям
                  </p>
                  <p>
                    Каждый эпизод станет ярким отражением вашей уникальной истории
                  </p>
                </div>
              </div>
            </div> */}

            {/* 2 этап */}
            {/* <div className={styles.turnkeyTwo}>
              <div className={styles.turnkeyContainer}>
                <div className={styles.turnkeyLeft}>
                  <h4>2 этап</h4>
                  <p>воплощения истории</p>
                </div>

                <div className={styles.turnkeyRight}>
                  <b>Проведение съемки</b>
                  <p>
                    Опытные сотрудники и современное оборудование помогут создать
                    высококачественный визуальный контент
                  </p>
                  <p>
                    Мы делаем акцент на комфорте и профессионализме, чтобы ваша
                    запись проходила легко и результат был именно таким, как вы
                    задумали
                  </p>
                </div>
              </div>
            </div> */}

            {/* 3 этап */}
            {/* <div className={styles.turnkeyTree}>
              <div className={styles.turnkeyContainer}>
                <div className={styles.turnkeyLeft}>
                  <h4>3 этап</h4>
                  <p>создание конфетки</p>
                </div>

                <div className={styles.turnkeyRight}>
                  <b>Сведение материала</b>
                  <p className={styles.mb}>
                    Мы гарантируем, что ваш подкаст будет звучать наилучшим
                    образом, чтобы каждый момент был воспроизведен точно так, как
                    задумано
                  </p>
                  <b>Монтаж</b>
                  <p className={styles.mb}>
                    Наш монтажер работают тесно с вашим материалом, чтобы создать
                    гармоничную картинку, котораяцепляет с первых минут
                  </p>
                  <b>Подготовка материала для соцсетей</b>
                  <p>
                    Вырежем самые сочные моменты с подкаста, самое то, чтобы
                    порадовать подписчиков
                  </p>
                </div>
              </div>
            </div> */}

            <Title text="Пакеты под ключ" id="packet"/>

            <Packet setModal={setModal} modal={modal}/>

            {/* Прайс */}
            <Title id="price" text="Цены и услуги" />

            <div className={styles.price}>
              <div className={styles.shadowTwo}></div>

              {price.map((priceOne: any) => (
                <FaqEl
                  handleFaqClick={handlePriceClick}
                  active={priceOne.active}
                  key={priceOne.id}
                  name={priceOne.name}
                  id={priceOne.id}
                >
                  {priceOne.prices.map((card: any) => (
                    <FaqPrice key={card.id} props={card} />
                  ))}
                </FaqEl>
              ))}

              <FaqEl
                  handleFaqClick={toggleSubscription}
                  active={subscription}
                  name="Абонементы"
                  textSelect={true}
              >
                  <div className={styles.SeasonTicket}>
                      <div className={styles.SeasonTicketEl}>
                          <b>Стандартный пакет:</b>
                      </div>
                      <div className={styles.SeasonTicketEl}>
                          <p>4 подкаста в месяц</p>
                          <p>Каждый по 2 часа, 2 спикера.</p>
                      </div>
                      <div className={`${styles.SeasonTicketEl} ${styles.SeasonTicketElLast}`}>
                          <span>Цена 40.000 ₽</span>
                          <p style={{paddingTop: "8px"}}>скидка составит</p>
                          <b>4.000 ₽</b>
                      </div>
                  </div>
                  <div className={`${styles.SeasonTicket} ${styles.SeasonTicketLine}`}>
                      <div className={styles.SeasonTicketEl}>
                          <b>Увеличенный пакет:</b>
                          <p className={styles.SeasonTicketMobileMargin}>8-ой подкаст бесплатно</p>
                      </div>
                      <div className={styles.SeasonTicketEl}>
                          <p>8 подкастов в месяц</p>
                          <p>Каждый по 2 часа, 2 спикера.</p>
                      </div>
                      <div className={`${styles.SeasonTicketEl} ${styles.SeasonTicketElLast}`}>
                          <span>Цена 76.000 ₽</span>
                          <p style={{paddingTop: "8px"}}>скидка составит</p>
                          <b>12.000 ₽</b>
                      </div>
                  </div>

                  <div className={`${styles.SeasonTicket} ${styles.SeasonTicketMobile}`}>
                      <div className={styles.SeasonTicketEl}>
                          <b>Стандартный пакет:</b>
                          <p>4 подкаста в месяц</p>
                          <p>Каждый по 2 часа, 2 спикера.</p>
                      </div>
                      <div className={`${styles.SeasonTicketEl} ${styles.SeasonTicketElLast}`}>
                          <span>Цена 40.000 ₽</span>
                          <p style={{paddingTop: "8px"}}>скидка составит</p>
                          <b>4.000 ₽</b>
                      </div>
                  </div>

                  <div className={`${styles.SeasonTicket} ${styles.SeasonTicketLine} ${styles.SeasonTicketMobile}`}>
                      <div className={styles.SeasonTicketEl}>
                          <b>Увеличенный пакет:</b>
                          <p>8 подкастов в месяц</p>
                          <p>Каждый по 2 часа, 2 спикера.</p>
                          <p className={styles.SeasonTicketMobileMargin}>8-ой подкаст бесплатно</p>
                      </div>
                      <div className={`${styles.SeasonTicketEl} ${styles.SeasonTicketElLast}`}>
                          <span>Цена 76.000 ₽</span>
                          <p style={{paddingTop: "8px"}}>скидка составит</p>
                          <b>12.000 ₽</b>
                      </div>
                  </div>

                  <div className={styles.SeasonTicketButtonContainer}>
                    <Link href="https://o5272.yclients.com/loyalty" target="_blank" className={styles.SeasonTicketButton}>Приобрести абонемент</Link>
                  </div>
              </FaqEl>
            </div>

            {/* Наши клиенты / портфолио */}
            <Title text="Снято у нас" />

            {portfilioList == 0 ? 
              <div className={styles.clients}>
                <div className={styles.clients__el} onClick={() => setPortfolioList(1)}>
                  <img src="/bg/portfolio/1.png" alt="Разговорные видео" />
                  <p>Подкасты</p>
                </div>
                <div className={styles.clients__el} onClick={() => setPortfolioList(2)}>
                  <img src="/bg/portfolio/2.png" alt="Прямые эфиры" />
                  <p>Прямые эфиры</p>
                </div>
                <div className={styles.clients__el} onClick={() => setPortfolioList(3)}>
                  <img src="/bg/portfolio/3.png" alt="Интервью" />
                  <p>Интервью</p>
                </div>
                <div className={styles.clients__el} onClick={() => setPortfolioList(4)}>
                  <img src="/bg/portfolio/5.png" alt="Reels/Shorts" />
                  <p>Reels/Shorts</p>
                </div>
              </div>
            : portfilioList == 1 ?
              <div>
                <img className={styles.ClientBack} src="/icons/back.svg" alt="Назад" onClick={() => setPortfolioList(0)}/>
                <SwiperPortfolio type={"Podcasts"} portfolio={portfolio} handlePortfolioClick={handlePortfolioClick}/>
                <div className={styles.shadowTree}></div>
              </div>
            : portfilioList == 2 ?
              <div>
                <img className={styles.ClientBack} src="/icons/back.svg" alt="Назад" onClick={() => setPortfolioList(0)}/>
                <SwiperPortfolio type={"LiveBroadcasts"} portfolio={portfolio} handlePortfolioClick={handlePortfolioClick}/>
                <div className={styles.shadowTree}></div>
              </div>
            : portfilioList == 3 ?
              <div>
                <img className={styles.ClientBack} src="/icons/back.svg" alt="Назад" onClick={() => setPortfolioList(0)}/>
                <SwiperPortfolio type={"Interview"} portfolio={portfolio} handlePortfolioClick={handlePortfolioClick}/>
                <div className={styles.shadowTree}></div>
              </div>
            :
              <div>
                <img className={styles.ClientBack} src="/icons/back.svg" alt="Назад" onClick={() => setPortfolioList(0)}/>
                <SwiperPortfolioReels type={"ConversationalVideos"} portfolio={portfolio} handlePortfolioClick={handlePortfolioClick}/>
                <div className={styles.shadowTree}></div>
              </div>
            }

            {/* Контакты */}
            <Title id="contacts" text="Контакты" />

            <div className={styles.contact}>
              <div className={styles.contactLeft}>
                <YMaps>
                  <div className={styles.contactMap}>
                    <Map width="100%" height="100%" defaultState={{ center: [59.92038, 30.31974], zoom: 17}} >
                      <Placemark geometry={[59.92038, 30.31974]}

                      options={{
                        iconLayout: 'default#image',
                        iconImageHref: '/icons/logo.svg',
                        iconImageSize: [30, 30]
                      }}>
                      </Placemark>
                    </Map>
                  </div>
                </YMaps>
              </div>

              <div className={styles.contactRight}>
                <Link href="tel:+79939731212">+7 (993) 973-12-12</Link>

                <div className={styles.contactSocials}>
                  <Link href="tel:+79939731212" className={styles.contactSocialsMobile}>
                    +7 (993) 973-12-12
                  </Link>
                  <Link target="_blank" href="https://vk.com/hires.studio">
                    <svg width="24" height="14" viewBox="0 0 24 14" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.8728 12.5092C23.8437 12.4466 23.8166 12.3946 23.7915 12.353C23.3751 11.6031 22.5793 10.6826 21.4047 9.59123L21.3799 9.56624L21.3675 9.55399L21.3549 9.54143H21.3423C20.8093 9.03325 20.4717 8.69156 20.3303 8.51662C20.0716 8.18338 20.0137 7.84607 20.1551 7.50429C20.2549 7.24606 20.6301 6.70073 21.2797 5.86753C21.6214 5.42597 21.892 5.07207 22.0918 4.80544C23.5331 2.88932 24.158 1.66489 23.9663 1.13168L23.8919 1.00708C23.8418 0.932059 23.7127 0.863432 23.5047 0.800845C23.2962 0.738389 23.0297 0.728061 22.7047 0.769683L19.106 0.794542C19.0477 0.773884 18.9645 0.77581 18.856 0.800845C18.7477 0.82588 18.6935 0.838441 18.6935 0.838441L18.6309 0.869734L18.5812 0.90733C18.5395 0.93219 18.4937 0.975913 18.4436 1.03841C18.3939 1.10069 18.3523 1.17378 18.319 1.25707C17.9272 2.26507 17.4817 3.20225 16.9818 4.06858C16.6735 4.58516 16.3904 5.03285 16.1319 5.41192C15.8737 5.79085 15.6571 6.07004 15.4823 6.24901C15.3073 6.42815 15.1493 6.57166 15.0074 6.68007C14.8657 6.78852 14.7575 6.83435 14.6827 6.81758C14.6076 6.80082 14.5369 6.78419 14.47 6.76756C14.3534 6.69254 14.2597 6.59052 14.189 6.46141C14.118 6.3323 14.0702 6.16979 14.0452 5.97402C14.0204 5.77812 14.0057 5.60962 14.0015 5.46794C13.9976 5.32644 13.9994 5.1263 14.0078 4.86807C14.0165 4.60971 14.0204 4.43491 14.0204 4.34326C14.0204 4.02665 14.0265 3.68303 14.0389 3.31233C14.0515 2.94162 14.0617 2.6479 14.0703 2.43152C14.0788 2.21491 14.0827 1.98575 14.0827 1.74416C14.0827 1.50256 14.068 1.31309 14.0389 1.17558C14.0102 1.03824 13.9661 0.904923 13.9081 0.775679C13.8496 0.646566 13.7641 0.54669 13.6519 0.475787C13.5395 0.404972 13.3997 0.348775 13.2333 0.307022C12.7917 0.207102 12.2295 0.153049 11.5462 0.144646C9.99683 0.128015 9.00126 0.228066 8.55974 0.444669C8.3848 0.536186 8.22649 0.661228 8.08495 0.819402C7.93496 1.00274 7.91404 1.10279 8.02232 1.11925C8.52223 1.19414 8.87613 1.37327 9.08442 1.65649L9.15948 1.80657C9.21786 1.91485 9.27616 2.10655 9.3345 2.3814C9.39275 2.65626 9.43035 2.96031 9.44689 3.29338C9.48847 3.90161 9.48847 4.42226 9.44689 4.85538C9.40518 5.28867 9.36579 5.62598 9.3282 5.86758C9.2906 6.10917 9.23441 6.30494 9.15948 6.45484C9.08442 6.60479 9.03448 6.69644 9.00944 6.7297C8.98445 6.76296 8.96362 6.78393 8.94707 6.79216C8.83879 6.83365 8.72618 6.85479 8.60963 6.85479C8.4929 6.85479 8.35136 6.7964 8.18478 6.67972C8.01825 6.56304 7.84541 6.40276 7.66628 6.19863C7.48714 5.99446 7.28511 5.70914 7.0601 5.34264C6.83527 4.97613 6.60199 4.54297 6.3604 4.04315L6.16052 3.68067C6.03556 3.44748 5.86487 3.10794 5.64827 2.66234C5.43153 2.21658 5.23996 1.78538 5.07343 1.36885C5.00686 1.19392 4.90685 1.06073 4.77358 0.969086L4.71104 0.931489C4.66946 0.898227 4.60272 0.862906 4.51116 0.825267C4.41946 0.787671 4.32379 0.76071 4.22374 0.744123L0.799886 0.768983C0.450013 0.768983 0.21262 0.848244 0.0876216 1.00655L0.0375959 1.08144C0.0126049 1.12315 0 1.18976 0 1.28145C0 1.3731 0.024991 1.48558 0.0750167 1.61876C0.574836 2.79347 1.11838 3.92638 1.70564 5.01767C2.29291 6.10895 2.80323 6.98801 3.23631 7.65406C3.66947 8.32059 4.11099 8.94965 4.56087 9.54094C5.01076 10.1325 5.30855 10.5115 5.45425 10.6781C5.60012 10.8449 5.7147 10.9696 5.79799 11.0529L6.11045 11.3528C6.31037 11.5527 6.60396 11.7922 6.99135 12.0712C7.37881 12.3504 7.80778 12.6253 8.27845 12.8963C8.7492 13.1668 9.29686 13.3875 9.92172 13.5583C10.5465 13.7292 11.1546 13.7978 11.7461 13.7647H13.1832C13.4746 13.7395 13.6954 13.6479 13.8455 13.4897L13.8952 13.4271C13.9286 13.3773 13.9599 13.3001 13.9888 13.1961C14.0181 13.092 14.0326 12.9773 14.0326 12.8525C14.024 12.4944 14.0513 12.1716 14.1136 11.8842C14.1759 11.5969 14.2469 11.3803 14.3263 11.2345C14.4057 11.0887 14.4952 10.9657 14.5949 10.866C14.6947 10.7661 14.7659 10.7056 14.8077 10.6848C14.8491 10.6638 14.8823 10.6496 14.9073 10.641C15.1072 10.5744 15.3425 10.6389 15.6135 10.8349C15.8843 11.0306 16.1383 11.2724 16.3758 11.5597C16.6133 11.8472 16.8985 12.1698 17.2317 12.528C17.5651 12.8862 17.8566 13.1526 18.1064 13.3278L18.3562 13.4777C18.523 13.5778 18.7396 13.6694 19.0063 13.7527C19.2724 13.8359 19.5056 13.8568 19.7058 13.8151L22.9046 13.7653C23.221 13.7653 23.4672 13.7129 23.6419 13.6089C23.8168 13.5048 23.9208 13.3901 23.9543 13.2653C23.9877 13.1404 23.9895 12.9987 23.9607 12.8402C23.931 12.6822 23.9018 12.5717 23.8728 12.5092Z"/>
                    </svg>
                  </Link>
                  <Link target="_blank" href="https://t.me/hiresstud">
                    <svg width="28" height="24" viewBox="0 0 28 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25.6129 0.872658C25.6129 0.872658 28.2031 -0.137342 27.9872 2.31552C27.9153 3.32553 27.2677 6.86053 26.7641 10.6841L25.0373 22.0106C25.0373 22.0106 24.8934 23.6699 23.5983 23.9585C22.3031 24.247 20.3605 22.9485 20.0007 22.6599C19.7129 22.4435 14.6045 19.197 12.8057 17.6099C12.3021 17.177 11.7265 16.3113 12.8777 15.3013L20.4325 8.087C21.2959 7.22126 22.1593 5.20126 18.5617 7.65413L8.48873 14.5077C8.48873 14.5077 7.33753 15.2291 5.17907 14.5799L0.502281 13.137C0.502281 13.137 -1.22453 12.0549 1.72543 10.9727C8.92047 7.58193 17.7703 4.11906 25.6129 0.872658Z" />
                    </svg>
                  </Link>
                  <Link target="_blank" href="https://api.whatsapp.com/send?phone=79939731212">
                    <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                    <g id="Watshapp">
                    <path id="Vector" d="M44.7 37.1446C44.0455 36.8373 40.9107 35.3012 40.3251 35.0622C39.7395 34.8232 39.3261 34.755 38.8783 35.4036C38.4305 36.0522 37.2248 37.4518 36.8459 37.8956C36.4669 38.3394 36.1224 38.3735 35.4679 37.8956C33.588 37.148 31.8518 36.0856 30.3352 34.755C28.9623 33.474 27.8 31.9882 26.8904 30.3513C26.5115 29.7368 26.8904 29.3954 27.166 29.0541C27.4415 28.7127 27.786 28.3372 28.1305 27.9617C28.3824 27.6369 28.5908 27.2812 28.7506 26.9034C28.836 26.7277 28.8804 26.5352 28.8804 26.3402C28.8804 26.1451 28.836 25.9526 28.7506 25.7769C28.7506 25.4697 27.3038 22.3632 26.7526 21.1001C26.2014 19.837 25.7191 20.0077 25.3402 20.0077H23.9623C23.3059 20.0331 22.6865 20.3155 22.2399 20.7929C21.5191 21.4745 20.9482 22.2963 20.5629 23.2068C20.1775 24.1173 19.9862 25.0969 20.0008 26.0841C20.177 28.5078 21.0763 30.8249 22.5844 32.7409C25.3518 36.8149 29.138 40.1082 33.5733 42.2993C35.089 42.9479 36.2602 43.3234 37.1903 43.6306C38.4964 44.0218 39.8769 44.1037 41.2208 43.8696C42.1133 43.6901 42.9591 43.3309 43.7057 42.8142C44.4524 42.2974 45.0839 41.6341 45.5612 40.8655C45.9584 39.9163 46.0893 38.8783 45.9401 37.8614C45.7679 37.6225 45.3545 37.4518 44.7 37.1446Z"/>
                    <path id="Vector_2" d="M50.3267 13.5581C47.9129 11.138 45.0356 9.22249 41.8645 7.92455C38.6934 6.62662 35.2927 5.97253 31.863 6.00088C27.3197 6.0245 22.8621 7.23164 18.9355 9.50175C15.0089 11.7719 11.7507 15.0255 9.48623 18.9376C7.22182 22.8498 6.03047 27.2836 6.03118 31.7961C6.03189 36.3087 7.22464 40.7421 9.49029 44.6536L6 58L19.7517 54.5334C23.5535 56.5881 27.8141 57.6609 32.1423 57.6533H31.863C37.0214 57.6867 42.0729 56.1934 46.3733 53.3639C50.6738 50.5344 54.0283 46.4969 56.0092 41.7662C57.99 37.0355 58.5074 31.8261 57.4953 26.8022C56.4832 21.7783 53.9876 17.1676 50.3267 13.5581ZM31.863 53.2161C27.9907 53.2191 24.1904 52.1767 20.8686 50.2001L20.1008 49.7495L11.9335 51.8641L14.0975 43.9602L13.6088 43.1629C10.8213 38.7043 9.77863 33.3845 10.6786 28.2129C11.5785 23.0413 14.3584 18.3777 18.4909 15.1069C22.6234 11.8362 27.821 10.1858 33.0974 10.4691C38.3738 10.7523 43.3621 12.9493 47.1156 16.6434C49.1279 18.6259 50.7228 20.9864 51.8074 23.5872C52.892 26.1881 53.4446 28.9773 53.433 31.7924C53.4238 37.4715 51.1483 42.9154 47.1051 46.9311C43.062 50.9468 37.5809 53.2069 31.863 53.2161Z"/>
                    </g>
                    </svg>
                  </Link>
                  <Link target='_blank' href="https://instagram.com/hires.studio">
                      <svg className={styles.LinkInstagram} height="40px" width="40px" enable-background="new 0 0 128 128" id="Social_Icons" version="1.1" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
                          <g id="_x37__stroke">
                              <g id="Instagram_1_">
                              <rect clip-rule="evenodd" fill="none" fill-rule="evenodd" height="128" width="128"/>
                              <radialGradient cx="19.1111" cy="128.4444" gradientUnits="userSpaceOnUse" id="Instagram_2_" r="163.5519">
                              <stop offset="0" />
                              <stop offset="0.2559" />
                              <stop offset="0.599"/>
                              <stop offset="1" />
                              </radialGradient>
                              <path clip-rule="evenodd" d="M105.843,29.837    c0,4.242-3.439,7.68-7.68,7.68c-4.241,0-7.68-3.438-7.68-7.68c0-4.242,3.439-7.68,7.68-7.68    C102.405,22.157,105.843,25.595,105.843,29.837z M64,85.333c-11.782,0-21.333-9.551-21.333-21.333    c0-11.782,9.551-21.333,21.333-21.333c11.782,0,21.333,9.551,21.333,21.333C85.333,75.782,75.782,85.333,64,85.333z M64,31.135    c-18.151,0-32.865,14.714-32.865,32.865c0,18.151,14.714,32.865,32.865,32.865c18.151,0,32.865-14.714,32.865-32.865    C96.865,45.849,82.151,31.135,64,31.135z M64,11.532c17.089,0,19.113,0.065,25.861,0.373c6.24,0.285,9.629,1.327,11.884,2.204    c2.987,1.161,5.119,2.548,7.359,4.788c2.24,2.239,3.627,4.371,4.788,7.359c0.876,2.255,1.919,5.644,2.204,11.884    c0.308,6.749,0.373,8.773,0.373,25.862c0,17.089-0.065,19.113-0.373,25.861c-0.285,6.24-1.327,9.629-2.204,11.884    c-1.161,2.987-2.548,5.119-4.788,7.359c-2.239,2.24-4.371,3.627-7.359,4.788c-2.255,0.876-5.644,1.919-11.884,2.204    c-6.748,0.308-8.772,0.373-25.861,0.373c-17.09,0-19.114-0.065-25.862-0.373c-6.24-0.285-9.629-1.327-11.884-2.204    c-2.987-1.161-5.119-2.548-7.359-4.788c-2.239-2.239-3.627-4.371-4.788-7.359c-0.876-2.255-1.919-5.644-2.204-11.884    c-0.308-6.749-0.373-8.773-0.373-25.861c0-17.089,0.065-19.113,0.373-25.862c0.285-6.24,1.327-9.629,2.204-11.884    c1.161-2.987,2.548-5.119,4.788-7.359c2.239-2.24,4.371-3.627,7.359-4.788c2.255-0.876,5.644-1.919,11.884-2.204    C44.887,11.597,46.911,11.532,64,11.532z M64,0C46.619,0,44.439,0.074,37.613,0.385C30.801,0.696,26.148,1.778,22.078,3.36    c-4.209,1.635-7.778,3.824-11.336,7.382C7.184,14.3,4.995,17.869,3.36,22.078c-1.582,4.071-2.664,8.723-2.975,15.535    C0.074,44.439,0,46.619,0,64c0,17.381,0.074,19.561,0.385,26.387c0.311,6.812,1.393,11.464,2.975,15.535    c1.635,4.209,3.824,7.778,7.382,11.336c3.558,3.558,7.127,5.746,11.336,7.382c4.071,1.582,8.723,2.664,15.535,2.975    C44.439,127.926,46.619,128,64,128c17.381,0,19.561-0.074,26.387-0.385c6.812-0.311,11.464-1.393,15.535-2.975    c4.209-1.636,7.778-3.824,11.336-7.382c3.558-3.558,5.746-7.127,7.382-11.336c1.582-4.071,2.664-8.723,2.975-15.535    C127.926,83.561,128,81.381,128,64c0-17.381-0.074-19.561-0.385-26.387c-0.311-6.812-1.393-11.464-2.975-15.535    c-1.636-4.209-3.824-7.778-7.382-11.336c-3.558-3.558-7.127-5.746-11.336-7.382c-4.071-1.582-8.723-2.664-15.535-2.975    C83.561,0.074,81.381,0,64,0z" fill="url(#Instagram_2_)" fill-rule="evenodd" id="Instagram"/>
                              </g>
                          </g>
                      </svg>
                  </Link>
                </div>

                <p>САНКТ-ПЕТЕРБУРГ, МОСКОВСКИЙ ПРОСП., 22М, ЭТАЖ 2, ОФИС 4Н</p>

                <Link target="_blank" href="https://yandex.ru/maps/2/saint-petersburg/?from=api-maps&ll=30.319483%2C59.920375&mode=routes&origin=jsapi_2_1_79&rtext=~59.920380%2C30.319740&rtt=mt&ruri=~&z=17" className={styles.bronButton}>ПОСТРОИТЬ МАРШРУТ <img src="/icons/lineButton.svg" alt="" /></Link>
              </div>
            </div>

            {/* Советуем посмотреть */}
            <p className={styles.contactInfo}>По прибытии на место, советуем посмотреть</p>

            <div className={styles.contactButtons}>
              <p onClick={() => setVidio2(true)}>Как проехать</p>
              <p onClick={() => setVidio1(true)}>Как пройти</p>
            </div>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
}
