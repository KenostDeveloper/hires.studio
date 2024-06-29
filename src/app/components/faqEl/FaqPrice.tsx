'use client'
import React from 'react';
import styles from './Faq.module.css'


const FaqPrice = ({props}: any) => {
    return (
        <div className={styles.FaqPrice}>
            <p>{props.name}</p>
            <b>{props.price} {props.price? "₽" : ""}</b>
        </div>
    );
};

export default FaqPrice;