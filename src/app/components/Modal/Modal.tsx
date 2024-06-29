import React, { useEffect } from 'react';
import style from './Modal.module.css'

const Modal = ({active, setActive, children}: any) => {

    // active? document.body.style.overflowY = "hidden" : document.body.style.overflowY = 'auto';
    
    useEffect(() => {
        if (active) {
          document.body.classList.add("overflow-y-hidden")
        } else {
          document.body.classList.remove("overflow-y-hidden")
        }
    }, [active]);

    return (
        <div className={active ? `${style.modal} ${style.active}` : style.modal} onClick={() => setActive(false)}>
            <div className={style.modal__content} onClick={(e) => e.stopPropagation()}>
                <div onClick={() => setActive(false)} className={style.modal__close}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" fill="none">
                        <path
                            d="M43 22H26V5C26 4.46957 25.7893 3.96086 25.4142 3.58579C25.0391 3.21071 24.5304 3 24 3C23.4696 3 22.9609 3.21071 22.5858 3.58579C22.2107 3.96086 22 4.46957 22 5V22H5C4.46957 22 3.96086 22.2107 3.58579 22.5858C3.21071 22.9609 3 23.4696 3 24C3 24.5304 3.21071 25.0391 3.58579 25.4142C3.96086 25.7893 4.46957 26 5 26H22V43C22 43.5304 22.2107 44.0391 22.5858 44.4142C22.9609 44.7893 23.4696 45 24 45C24.5304 45 25.0391 44.7893 25.4142 44.4142C25.7893 44.0391 26 43.5304 26 43V26H43C43.5304 26 44.0391 25.7893 44.4142 25.4142C44.7893 25.0391 45 24.5304 45 24C45 23.4696 44.7893 22.9609 44.4142 22.5858C44.0391 22.2107 43.5304 22 43 22Z"
                            fill="#5D576B"/>
                    </svg>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;
