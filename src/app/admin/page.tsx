'use client'
import { useEffect, useState } from "react";
import styles from "./admin.module.css";
import {signIn, signOut, useSession} from "next-auth/react";
import Loading from "../components/Helps/Loading";
import Link from "next/link";
import {Toaster, toast} from 'react-hot-toast'
import axios from "axios";
import { Type } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';

export default function Photo() {

    interface IPhoto{
        id: string,
        name: string,
        alt: string
    }

    interface IPortfolio{
        id: string,
        iframeLink: string,
        image: string,
        type: Type
    }

    const {data: session} = useSession();
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);

    //ФОТО
    const [selectedFile, setSelectedFile] = useState<File>();
    const [alt, setAlt] = useState("");

    // Потфолио
    const [selectedFilePortfolio, setSelectedFilePortfolio] = useState<File>();
    const [addPortfolio, setAddPortfolio] = useState({
        iframeLink: "",
        type: "Podcasts"
    })
    const [portfolios, setPortfolios] = useState<any>([]);

    //Подгрузка по скролу
    const [photos, setPhotos] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [fetching, setFetching] = useState(true);
    const [totalCount, setTotalCount] = useState(1);

    const [newPriceCategory, setNewPriceCategory] = useState("");

    const [price, setPrice] = useState([
        {
            id: uuidv4(),
            name: "",
            prices: [
                {
                    id: uuidv4(),
                    name: "",
                    price: ""
                }
            ]
        }
    ]);


    //Добавление фото
    const onSubmit = async(event: any) => {
        event.preventDefault();
        try{
            if(!selectedFile) return;

            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("alt", alt);
            const res = await fetch('/api/photo', {
                method: 'POST',
                body: formData
            })

            const resJSON = await res.json();

            if(resJSON.success == false){
                toast.error(resJSON.message)
            }else{
                toast.success(resJSON.message)
                setPhotos([resJSON.newPhoto, ...photos])
                // console.log(resJSON.newPhoto)
            }
        }catch(e: any){
            console.log(e.response?.data);
        }
    }

    //Добавление портфолио
    const onSubmitPortfolio = async(event: any) => {
        event.preventDefault();
        try{
            if(!selectedFilePortfolio) return;

            const formData = new FormData();
            formData.append("file", selectedFilePortfolio);
            formData.append("iframeLink", addPortfolio.iframeLink);
            formData.append("type", addPortfolio.type);

            const res = await fetch('/api/portfolio', {
                method: 'POST',
                body: formData
            })

            const resJSON = await res.json();

            if(resJSON.success == false){
                toast.error(resJSON.message)
            }else{
                toast.success(resJSON.message)
                setPortfolios([resJSON.newPortfolio, ...portfolios])
                // console.log(resJSON.newPhoto)
            }
        }catch(e: any){
            console.log(e.response?.data);
        }
    }

    useEffect(() => {
        if(typeof(session) == "object"){
            setLoading(false)
        }
    }, [session]);


    //Удаление фото
    const deletePhoto = async(id: string) => {
        axios.delete(`/api/photo?id=${id}`).then(res => {
            if(res.data.success){
                toast.success(res.data.message)
                setPhotos(photos.filter((photo: IPhoto) => photo.id !== id))
            }else{
                toast.error(res.data.message)
            }
        })
    }

    
    //Удаление фото
    const deletePortfolio = async (id: string) => {
        axios.delete(`/api/portfolio?id=${id}`).then(res => {
            if(res.data.success){
                toast.success(res.data.message)
                setPortfolios(portfolios.filter((portfolio: IPortfolio) => portfolio.id !== id))
            }else{
                toast.error(res.data.message)
            }
        })
    }

    

    //Подгрузка по скролу

    const scrollHander = (e: any) => {
        if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100)
        {
            setFetching(true)
        }
    }

    useEffect(() => {
        if(fetching && photos.length < totalCount){
            axios.get(`/api/photo?limit=10&page=${currentPage}`).then(res => {
                // console.log('fetching')
                setPhotos([...photos, ...res.data.Photo])
                setCurrentPage(currentPage + 1)
                setTotalCount(res.data.PhotoCount)
            }).finally(() => setFetching(false));
        }
    }, [fetching])

    useEffect(() => {
        axios.get(`/api/portfolio`).then(res => {
            setPortfolios([...portfolios, ...res.data.Portfolio])
        });
        window.addEventListener("scroll", scrollHander);
        return () => window.removeEventListener("scroll", scrollHander);
    }, [])

    const addPriceCategory = async () => {
        axios.post(`/api/prices/category`, {name: newPriceCategory}).then(res => {
            if(res.data.success){
                toast.success(res.data.message)
                axios.get(`/api/prices`).then(res => {
                    if(res.data.success){
                        setPrice(res.data.prices)
                    }
                })
            }else{
                toast.error(res.data.message)
            }
        })
    }

    const addPrice = async (id: any) => {
        const nextShapes = price.map((characteristic: any) => {
            if (characteristic.id != id) {
            // No change
            return characteristic;
            } else {
                // Return a new circle 50px below

                let obj = characteristic.prices;

                obj.push({id: uuidv4(), name: "", price: ""})

                return {
                ...characteristic,
                    prices: obj,
                };
            }
        });
        setPrice(nextShapes);
    }

    const editPrice = async (id: any, index: any, name:  any, value: any) => {
        const nextShapes = price.map((characteristic: any) => {
            if (characteristic.id != id) {
            // No change
            return characteristic;
            } else {
                // Return a new circle 50px below

                let obj = characteristic.prices;

                // console.log("clildren", obj)

                for(let i = 0; i < obj.length; i++){
                    if(i == index){
                        if(name == "price"){
                            obj[i].price = value
                        }

                        if(name == "name"){
                            obj[i].name = value
                        }
                    }
                }

                return {
                ...characteristic,
                prices: obj,
                };
            }
        });
        setPrice(nextShapes);
    }

    const editCategoryName = async (id: any, value: any) => {
        const nextShapes = price.map((characteristic: any) => {
            if (characteristic.id != id) {
            // No change
            return characteristic;
            } else {
                // Return a new circle 50px below

                return {
                ...characteristic,
                    name: value,
                };
            }
        });
        setPrice(nextShapes);
    }

    const savePrice = async (item: any) => {
        axios.post(`/api/prices`, {item: item}).then(res => {
            if(res.data.success){
                toast.success(res.data.message)
                
            }else{
                toast.error(res.data.message)
            }
        })
    }

    const deletePrice = async (id: any) => {
        axios.delete(`/api/prices/category?id=${id}`).then(res => {
            if(res.data.success){
                toast.success(res.data.message)
                axios.get(`/api/prices`).then(res => {
                    if(res.data.success){
                        setPrice(res.data.prices)
                    }
                })
            }else{
                toast.error(res.data.message)
            }
        })
    }

    useEffect(() => {
        axios.get(`/api/prices`).then(res => {
            if(res.data.success){
                setPrice(res.data.prices)
            }
        })
    }, [])

    useEffect(() => {
        console.log(price)
    }, [price])

    const deleteOnePrice = async (id: any) => {
        axios.delete(`/api/prices?id=${id}`).then(res => {
            if(res.data.success){
                toast.success(res.data.message)
                axios.get(`/api/prices`).then(res => {
                    if(res.data.success){
                        setPrice(res.data.prices)
                    }
                })
            }else{
                toast.error(res.data.message)
            }
        })
    }

    // ---подгрузка по скроллу

    if(loading){
        return <Loading/>
    }

    if(session?.user.role != "ADMIN"){
        if(session?.user?.role == "USER"){
            return(
                <div className={styles.auth}>
                    <img src="/icons/logo.svg" alt="" />
                    <p>У вас недостаточно прав, обратитесь к администратору!</p>
                    <Link href="/">На главную</Link>
                </div>
            )
        }else{
            return(
                <div className={styles.auth}>
                    <img src="/icons/logo.svg" alt="" />
                    <p className={styles.btn} onClick={() => signIn('yandex')}>Войти <img src="/bg/admin.png" alt="" /></p>
                </div>
            )
        }
        
    }else{
        return (
            <div className={styles.main}>
                <Toaster
                    position="bottom-right"
                    reverseOrder={false}
                />
                <nav className={styles.nav}>
                    <ul>
                        <Link href="/"><img src="/icons/logo.svg" alt="" /></Link>
                        <div>Вы вошли как <span>{session.user.name}</span></div>
                        <li onClick={() => setPage(0)}>Фото</li>
                        <li onClick={() => setPage(1)}>Портфолио</li>
                        <li onClick={() => setPage(2)}>Цены</li>
                    </ul>
                    <div className={styles.close} onClick={() => signOut()}>Выйти</div>
                </nav>
                {page == 0? 
                <div className={styles.window}>
                    <h2>Загрузить фото</h2>
                    <form className={styles.form} onSubmit={onSubmit}>
                        <input type="text" name="alt" placeholder="Описание" value={alt} onChange={(e) => setAlt(e.target.value)}/>
                        <input type="file" name="file" onChange={
                            ({target}) => {
                                if(target.files){
                                    const file = target.files[0];
                                    setSelectedFile(file)
                                }
                            }
                        }/>
                        <input type="submit" value="Загрузить фото" />
                    </form>

                    <div className={styles.photos}>
                        {photos.map((photo: IPhoto) => 
                            <div className={styles.photo} key={photo.id}>
                                <img src={`${process.env.BASE_PATH_IMAGE}photo/${photo.name}`} alt={photo.alt} />
                                <div>
                                    <p>Описание: {photo.alt}</p>
                                    <div onClick={() => deletePhoto(photo.id)} className={styles.btnDelete}>Удалить</div>
                                </div>
                            </div>    
                        )}
                    </div>

                </div>
                :
                page == 1 ?<div className={styles.window}>
                    <h2>Портфолио</h2>
                    <form className={styles.form} onSubmit={onSubmitPortfolio}>
                        <input type="text" name="iframeLink" placeholder="Ссылка" value={addPortfolio.iframeLink} onChange={(e) => setAddPortfolio({...addPortfolio, iframeLink: e.target.value})}/>
                        <p>Обложка</p>
                        <input type="file" name="file" onChange={
                            ({target}) => {
                                if(target.files){
                                    const file = target.files[0];
                                    setSelectedFilePortfolio(file)
                                }
                            }
                        }/>
                        <p>Тип</p>
                        <select value={addPortfolio.type} name="type" onChange={(e) => setAddPortfolio({...addPortfolio, type: e.target.value})}>
                            <option value="Podcasts">Подкаст</option>
                            <option value="LiveBroadcasts">Прямой эфир</option>
                            <option value="Interview">Интервью</option>
                            <option value="ConversationalVideos">Разговорные видео</option>
                        </select>
                        <input type="submit" value="Добавить" />
                    </form>

                    <div className={styles.photos}>
                        {portfolios.map((portfolio: IPortfolio) => 
                            <div className={styles.photo} key={portfolio.id}>
                                <img src={`${process.env.BASE_PATH_IMAGE}portfolio/${portfolio.image}`} />
                                <div>
                                    <p className={styles.mb1}>Ссылка: <a href={portfolio.iframeLink} target="_blank">{portfolio.iframeLink}</a></p>
                                    <p>Тип: {portfolio.type == "Podcasts" ? "Подкаст" : portfolio.type == "ConversationalVideos" ? "Разговорные видео" : portfolio.type == "Interview" ? "Интервью" : "Прямой эфир"}</p>
                                    <div onClick={() => deletePortfolio(portfolio.id)} className={styles.btnDelete}>Удалить</div>
                                </div>
                            </div>    
                        )}
                    </div>

                </div>
                :
                <div className={styles.window}>
                    <h2>Управление ценами</h2>
                    <div style={{maxWidth: "700px"}} className={styles.form}>
                        
                        <div>
                            <input style={{width: "50%"}} type="text" name="priceNameCategory" placeholder="Название категории" value={newPriceCategory} onChange={(e) => setNewPriceCategory(e.target.value)}/>
                            <input onClick={() => addPriceCategory()} style={{marginLeft: "10px"}} type="submit" value="+" />
                        </div>

                        <div className={styles.priceCategory}>
                            {price.map((item: any) => 
                                <>
                                <p style={{marginTop: "20px"}}>Категория</p>
                                <div>
                                    <input style={{width: "50%"}} type="text" name="priceNameCategory" placeholder="Название категории" value={item.name} onChange={(e) => editCategoryName(item.id, e.target.value)}/>
                                </div>
                                {
                                    item.prices.map((el: any, index: any) => 
                                        <div key={item.id} className={styles.shops__el}>
                                            <div>
                                                <input style={{width: "40%"}} type="text" name="priceNameCategory" placeholder="Название услуги" value={el.name} onChange={(e) => editPrice(item.id, index, "name", e.target.value)}/>
                                                <input style={{width: "40%", marginLeft: "10px"}} type="text" name="priceNameCategory" placeholder="Цена" value={el.price} onChange={(e) => editPrice(item.id, index, "price", e.target.value)}/>
                                                <input style={{marginLeft: "10px"}} type="submit" onClick={() => deleteOnePrice(el.id)} value="-" />
                                                {index + 1 == item.prices.length? 
                                                    <input onClick={() => addPrice(item.id)} style={{marginLeft: "10px"}} type="submit" value="+" />
                                                :
                                                ""
                                                }
                                            </div>
                                        </div>
                                    )
                                }
                                <div>
                                    <input onClick={() => savePrice(item)} type="submit" value="Сохранить" />
                                    <input onClick={() => deletePrice(item.id)} style={{marginLeft: "10px", marginTop: "4px"}} type="submit" value="Удалить" />
                                </div>
                                </>
                            )}
                            
                        </div>
                    </div>
                </div>
                }
                
            </div>
            
        )
    }
}
