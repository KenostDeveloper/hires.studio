'use client'
import { useEffect, useState } from "react";
import styles from "./business.module.scss";
import Modal from "../components/Modal/Modal";
import Nav from "../components/Nav/Nav";
import Image from 'next/image'
import Link from "next/link";
import axios from "axios";
import Loading from "../components/Helps/Loading";
import Footer from "../components/footer/Footer";
import Title from "../components/Title/Title";
import ColoredCard from '../components/Card/ColoredCard.components';
import TransparentCard from '../components/Card/TransparentCard.components';
import { Type } from "@prisma/client";
import SwiperPortfolio from "../components/Swiper/SwiperPortfolio";
import Location from '../components/Location/Location.components'
import ModalPhoto from "../components/ModalPhoto/ModalPhoto";
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import FaqEl from "../components/faqEl/FaqEl";
import FaqPrice from "../components/faqEl/FaqPrice";
import SwiperPrice from "../components/Swiper/SwiperPrice";

export default function BusinessComponents() {
    const [modal, setModal] = useState(false)
    const [portfilioList, setPortfolioList] = useState(0);
    const [video1, setVidio1] = useState(false);
    const [video2, setVidio2] = useState(false);

    const [subscription, setSubscription] = useState(false);

    function toggleSubscription () {
        setSubscription(!subscription)
    }

    const [portfolio, setPortfolio] = useState<any>([]);

    useEffect(() => {
        axios.get(`/api/portfolio`).then(res => {
        console.log(111, res.data)
        setPortfolio([...portfolio, ...res.data.Portfolio])
        })
    }, [])

    interface IPortfolio{
        id: string,
        iframeLink: string,
        image: string,
        type: Type,
        isModal: boolean
    }

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

    const [price, setPrice] = useState<any>([]);

    useEffect(() => {
        axios.get(`/api/prices`).then(res => {
        if(res.data.success){
            setPrice(res.data.prices)
        }
        })
    }, [])

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

    const [coloredCardItems, setColoredCardItems] = useState<any>([
        {
            id: 1,
            title: "Продвижение в соц.сетях",
            text: "Используйте смонтированные длинные и короткие видео в ваших соц.сетях: Reels, Shorts, VK-клипы",
            icon: "/icons/coloredCard/c_1.svg"
        },
        {
            id: 2,
            title: "Реклама и продвижение",
            text: "Используйте смонтированные видеоролики в контекстной и таргетированной рекламе.",
            icon: "/icons/coloredCard/c_2.svg"
        },
        {
            id: 3,
            title: "Видео-визитка компании",
            text: "Расскажите о вашей компании и ее преимуществах в видео, которое можно разместить на сайте и в соц.сетях.",
            icon: "/icons/coloredCard/c_3.svg"
        },
        {
            id: 4,
            title: "Ответы на частые вопросы",
            text: "Снимите видео с ответами на частые вопросы ваших клиентов и поместите его на сайт.",
            icon: "/icons/coloredCard/c_4.svg"
        },
    ])

    const [locations, setLocations] = useState<any>([
        {
            id: 1,
            title: "Подкаст-студия",
            icon: "/bg/locations/3.jpg"
        },
        {
            id: 2,
            title: "Студия для Reels",
            icon: "/bg/locations/2.jpg"
        },
    ])

    const [transparentCardItems, setTransparentCardItems] = useState<any>([
        {
            id: 1,
            title: "Профессиональное оборудование",
            text: "В нашем арсенале топовые микрофоны, 4к-камеры, профессиональный свет",
            icon: "/icons/transparentCard/t_1.svg"
        },
        {
            id: 2,
            title: "Гримерная комната",
            text: "В нашей студии есть отдельная гримерная комната, где гости могут подготовиться к съемке или отдохнуть в перерывах.",
            icon: "/icons/transparentCard/t_2.svg"
        },
        {
            id: 3,
            title: "2 локации в одном месте",
            text: "В нашей студии есть 2 разных локации для съемки: за один визит можно снять контент сразу во всех.",
            icon: "/icons/transparentCard/t_3.svg"
        },
        {
            id: 4,
            title: "Монтаж видео",
            text: "Помимо съемки, мы занимаемся и монтажом видео, поэтому вам не придется искать монтажера или монтировать самим.",
            icon: "/icons/transparentCard/t_4.svg"
        },
    ])

    const [nav, setNav] = useState<any>([
        {
            id: 0,
            text: "Портфолио",
            scrollTo: "portfolio"
        },
        {
            id: 0,
            text: "Цены",
            scrollTo: "prices"
        },
        {
            id: 0,
            text: "Локации",
            scrollTo: "studios"
        },
        {
            id: 0,
            text: "Преимущества HiRes",
            scrollTo: "benefits"
        }
    ])
    
  return (
    <div className={styles.main}>
        <Nav textWhite={true} setModal={setModal} items={nav}/>
        <Modal active={modal} setActive={setModal} >
            <iframe height="100%" width="500px"  id="ms_booking_iframe" src="https://n1025717.yclients.com/"></iframe>
        </Modal>

         {/* Modal 1 */}
        <ModalPhoto active={video1} setActive={setVidio1}>
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/mgaCjo1LAFc?si=A9PyuZ_eVS6ZsQEX" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
        </ModalPhoto>

        {/* Modal 2 */}
        <ModalPhoto active={video2} setActive={setVidio2}>
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/30uR3XZfDwI?si=NRBHjrzzKG9Rhgce" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
        </ModalPhoto>

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


        <div className={styles.home}>
            <video playsInline loop autoPlay={true} muted preload="auto" className={styles.videoDesktop} poster="/bg/poster.png">
                <source src="/video/desktop.mov" type="video/mp4" />
            </video>

            <video playsInline loop autoPlay={true} muted preload="auto" className={styles.videoMobile}  poster="/bg/poster.png">
                <source src="/video/mobile.mov" type="video/mp4" />
            </video>

            <div className="container">
                <div className={styles.homeText}>
                    <h1>Видео-контент для вашего бизнеса</h1>
                    <p>Hires Studio - студия видеозаписи в Санкт-Петербурге. Снимем и смонтируем видео для вашего бизнеса.</p>
                </div>
            </div>
        </div>

        <div className={styles.landing}>
            <div className="container">
                <Title text="Зачем бизнесу видео-контент?" />
                <div className={styles.ColoredCard}>
                    {coloredCardItems.map((item: any) => <ColoredCard key={item.id} item={item}/>)}
                </div>

                <Title text="Наши клиенты" id="portfolio"/>
                {portfilioList == 0 ? 
                    <div className={styles.clients}>
                        <div className={styles.clients__el} onClick={() => setPortfolioList(1)}>
                            <img src="/bg/portfolio/1.png" alt="Подкасты" />
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
                            <img src="/bg/portfolio/4.png" alt="Разговорные видео" />
                            <p>Разговорные видео</p>
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
                    <SwiperPortfolio type={"ConversationalVideos"} portfolio={portfolio} handlePortfolioClick={handlePortfolioClick}/>
                    <div className={styles.shadowTree}></div>
                    </div>
                }

                <Title text="Наши локации" id="studios"/>
                <div className={styles.Location}>
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
                    {locations.map((item:any) => <Location key={item.id} item={item} />)}
                </div>

                <Title text="Цены" id="prices"/>

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

                <Title text="Полный прайс"/>
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

                <Title text="Почему HiRes Studio?" id="benefits"/>
                <div className={styles.ColoredCard}>
                    {transparentCardItems.map((item: any) => <TransparentCard key={item.id} item={item}/>)}
                </div>

                <Title text="Не знаете, о чем вам снимать?"/>

                <div className={styles.twoColums}>
                    <div className={styles.shadowOne}></div>
                    <p>Для вас мы подготовили ГАЙД по подготовке к съемке, выбору жанра, тем для съемки.</p>
                    <Link href="https://t.me/hiresstudio_bot" target="_blank">
                        <svg width="73" height="47" viewBox="0 0 73 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M61.0222 20.5555C61.0222 20.5555 62.3774 2.28501 45.6274 0.201555C31.2678 -1.26334 26.8988 12.0691 26.8988 12.0691C26.8988 12.0691 22.5759 7.91474 16.7074 11.3085C11.458 14.5475 12.3845 20.4782 12.3845 20.4782C12.3845 20.4782 0.722778 22.7414 0.722778 34.6215C0.984204 46.4849 13.3862 46.604 13.3862 46.604H37.1258L26.6688 36.1553H32.943V23.617H41.3086V36.1553H47.5828L37.1258 46.604H59.0165C59.0165 46.604 70.5611 46.6165 72.1819 35.3299C72.9537 22.9879 61.0222 20.5555 61.0222 20.5555Z" fill="white"/>
                        </svg>
                        <span>Скачать Гайд</span>
                    </Link>
                </div>
                

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
                        </div>

                        <p>САНКТ-ПЕТЕРБУРГ, МОСКОВСКИЙ ПРОСП., 22М, ЭТАЖ 2, ОФИС 4Н</p>

                        <Link target="_blank" href="https://yandex.ru/maps/2/saint-petersburg/?from=api-maps&ll=30.319483%2C59.920375&mode=routes&origin=jsapi_2_1_79&rtext=~59.920380%2C30.319740&rtt=mt&ruri=~&z=17" className={styles.bronButton}>ПОСТРОИТЬ МАРШРУТ <img src="/icons/lineButton.svg" alt="" /></Link>
                    </div>
                </div>

                {/* Советуем посмотреть */}
                <p className={styles.contactInfo}>По прибытию на место, советуем посмотреть</p>

                <div className={styles.contactButtons}>
                <p onClick={() => setVidio2(true)}>Как проехать</p>
                <p onClick={() => setVidio1(true)}>Как пройти</p>
                </div>
                
            </div>
        </div>


        <Footer/>

    </div>
  )
}
