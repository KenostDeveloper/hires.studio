'use client'
import React from 'react';
import styles from './Title.module.css'


const Title = ({text, id, padding}: any) => {

    return (
        <h2 id={id} className={padding? `${styles.title} ${styles.padding}` : `${styles.title}`}>{text}</h2>
    );
};

export default Title;