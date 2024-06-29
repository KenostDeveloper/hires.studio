'use client'
import React from 'react';
import styles from './Card.module.scss'


const TransparentCard = ({item}: any) => {

    return (
       <div className={styles.TransparentCard}>
            <div className={styles.TransparentCardFlex}>
                <img src={item.icon} alt={item.title} />
                <b>{item.title}</b>
            </div>
            <p>{item.text}</p>
       </div> 
    );
};

export default TransparentCard;