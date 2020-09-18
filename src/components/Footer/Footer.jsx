import React from 'react';
import styles from './Footer.module.css'
import { useTranslation } from 'react-i18next'; 
import logo from './../../assets/images/logo.png'



const Footer = (props) => {
    const { t } = useTranslation();
    return(
        <div className={styles.footerWrapper}>
            <div className={styles.rightSide}> 
                <img className={styles.logo} src={logo} alt="logo" /> 
                <p className={styles.copyright}>© 2020 {t('copyright')}</p>
            </div>

            <div className={styles.leftSide}>
                <div className={styles.mediaLinks}>
                    <a href="https://facebook.com">Facebook</a>
                    <a href="https://instagram.com">Instagram</a>
                </div>
            </div>
        </div>
    )
}

export default Footer;