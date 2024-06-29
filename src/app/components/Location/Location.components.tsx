'use client'
import React from 'react';
import styles from './Location.module.scss'


const Location = ({item}: any) => {
    return (
       <div className={styles.Location}>
            <img src={item.icon} alt={item.title} />
            <p>{item.title}</p>
       </div> 
    );
};

export default Location;