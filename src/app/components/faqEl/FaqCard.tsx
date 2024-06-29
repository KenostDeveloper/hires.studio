'use client'
import React from 'react';
import styles from './Faq.module.css'


const FaqCard = ({props}: any) => {
    return (
        <div className={styles.faqCard}>
            <div className={styles.faqCardImg}>
                <img src={props.img} alt="" />
            </div>
            <p><b>{props.name}</b> - {props.description}</p>
        </div>
    );
};

export default FaqCard;