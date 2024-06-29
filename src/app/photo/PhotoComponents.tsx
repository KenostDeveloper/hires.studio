'use client'
import { useEffect, useState } from "react";
import styles from "./photo.module.css";
import Modal from "../components/Modal/Modal";
import Nav from "../components/Nav/Nav";
import Image from 'next/image'
import Link from "next/link";
import axios from "axios";
import Loading from "../components/Helps/Loading";
import Footer from "../components/footer/Footer";

export default function PhotoComponents() {
    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState(true)

    const [photo, setPhoto] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [fetching, setFetching] = useState(true);
    const [totalCount, setTotalCount] = useState(1);

    const URL = "https://hires.studio/"


    interface IPhoto{
        id: string,
        name: string,
        alt: string
    }
    
    //Подгрузка по скролу

    const scrollHander = (e: any) => {
        if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100)
        {
            setFetching(true)
        }
    }

    useEffect(() => {
        if(fetching && photo.length < totalCount){
            axios.get(`/api/photo?limit=20&page=${currentPage}`).then(res => {
                // console.log('fetching')
                setPhoto([...photo, ...res.data.Photo])
                setCurrentPage(currentPage + 1)
                setTotalCount(res.data.PhotoCount)
            }).finally(() => {
                setFetching(false)
                setLoading(false)
            });
        }
    }, [fetching])

    useEffect(() => {
        window.addEventListener("scroll", scrollHander);
        return () => window.removeEventListener("scroll", scrollHander);
    }, [])

    // ---подгрузка по скроллу

  const [modelPhoto, setModelPhoto] = useState(false)
  const [tempSrc, setTempSrc] = useState('');

  const getImg = (imgSrc:any) => {
    setTempSrc(imgSrc)
    setModelPhoto(true);
  }
  
  if(loading){
    return <Loading/>
  }

  return (
    <div>
        <Nav setModal={setModal}/>
        <Modal active={modal} setActive={setModal} >
            <iframe height="100%" width="500px"  id="ms_booking_iframe" src="https://n1025717.yclients.com/"></iframe>
        </Modal>

        <div className={modelPhoto? `${styles.modelPhoto} ${styles.open}` : `${styles.modelPhoto}`} onClick={() => {
            setModelPhoto(false)
            setTimeout(() => {
                setTempSrc("");
            }, 500)
        }}>
            <div className={styles.PhotoClose} onClick={() => {
                setModelPhoto(false)
                setTimeout(() => {
                    setTempSrc("");
                }, 500)
            }}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="icon/close">
                <path id="icon" fillRule="evenodd" clipRule="evenodd" d="M22.7595 20L35.1774 32.4178L32.4178 35.1774L20 22.7595L7.58216 35.1774L4.82263 32.4178L17.2405 20L4.82263 7.58215L7.58216 4.82263L20 17.2405L32.4178 4.82263L35.1774 7.58215L22.7595 20Z" fill="#312C2C"/>
                </g>
                </svg>
            </div>
            <img src={tempSrc} onClick={(e) => e.stopPropagation()} />
        </div>


        <div className={styles.gallery}>
            {photo.map((photoOne: IPhoto) => (
                // <Link
                // key={id}
                // href={`/?photoId=${id}`}
                // as={`/p/${id}`}
                // //   ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
                // shallow
                // >
                    // <Image
                    //     onClick={() => getImg(`${URL}/images/photo/${photoOne.name}`)}
                    //     key={photoOne.id}
                    //     alt={photoOne.alt}
                    //     src={`${URL}/images/photo/${photoOne.name}`}
                    //     width={720}
                    //     height={380}
                    //     quality={75}
                    //     blurDataURL="/images/path-to-blur-image.jpg"
                    //     placeholder="blur"
                    //     sizes="(max-width: 640px) 100vw,
                    //     (max-width: 1280px) 50vw,
                    //     (max-width: 1536px) 33vw,
                    //     25vw"
                    // />
                // </Link>
                <img
                    key={photoOne.id}
                    onClick={() => getImg(`${URL}${process.env.BASE_PATH_IMAGE}photo/${photoOne.name}`)}
                    src={`${URL}${process.env.BASE_PATH_IMAGE}photo/${photoOne.name}`}
                    alt={photoOne.alt}
                />
            ))}
        </div>
        <Footer/>

    </div>
  )
}
