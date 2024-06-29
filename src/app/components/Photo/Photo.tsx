import React from 'react';
import Image from 'next/image'
import styles from './Photo.module.css'


const PhotoImage = ({props}: any) => {
    return (
        <div className={styles.photoContainer}>
            <img className={styles.photo} src="/bg/portfilio.png"
                alt="Picture of the author"
            />
        </div>
    );
};

export default PhotoImage;