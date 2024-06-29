'use client'
import React, { useEffect, useRef } from 'react';
import styles from './Faq.module.css'


const FaqEl = ({handleFaqClick, active, name, id, children, textSelect}: any) => {

    const contentRef = useRef<any>(null);

    useEffect(() => {
        contentRef.current.style.maxHeight = active
          ? `${contentRef.current.scrollHeight}px`
          : "0px";
      }, [contentRef, active]);

    return (
        <div className={active? `${styles.faqEl} ${styles.active}` : `${styles.faqEl}`}>
            <div className={styles.faqQuestion} onClick={() => handleFaqClick(id)}>
                <p className={textSelect? `${styles.textSelect}` : ``}>{name}</p>
                <img className={active? `${styles.faqImage}` : ""} src="/icons/chevron-down.svg" alt="" />
            </div>
            <div className={active? `${styles.faqContent} ${styles.active}` : `${styles.faqContent}`} ref={contentRef}>
                {children}
            </div>
        </div>
    );
};

export default FaqEl;