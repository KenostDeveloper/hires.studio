import React from 'react';
import style from './Helps.module.css'
import Link from 'next/link';


const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footerLeft">
                    <p>ИП МЕРЕНКОВ ДЕНИС ИГОРЕВИЧ</p>
                    <Link href="/privacity" className="footerLink">ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</Link>
                </div>
                <p>2024</p>
            </div>
        </footer>
    );
};

export default Footer;