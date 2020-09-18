import React from 'react';
import styles from './../Navbar.module.css'
import { useTranslation } from 'react-i18next';
import { getLocale } from '../../../../i18next';
import { NavLink } from 'react-router-dom';


const Categories = (props) => {
    const { t } = useTranslation();



    const facultyName = 'facultyName' + getLocale().charAt(0).toUpperCase() + getLocale().slice(1);
    
    return (
        <div className={styles.categoriesBlock}>
            {
                props.faculties.map(f => <div className={styles.categoriesItem} key={f.id}>
                    <NavLink to={`/facultiesPosts/${f.id}`}>
                        <div className={styles.icon} ><img src={require('../../../../assets/images/' + f.id + '.png')} alt="categoryIcon" /></div>
                        <p className={styles.facultyName}> {f[facultyName]} </p>
                    </NavLink>
                </div>)
            }
            <div className={styles.categoriesItem}>
                <NavLink to={`/facultiesPosts/0`}>
                    <div className={styles.icon} ><img src={require('../../../../assets/images/14.png')} alt="categoryIcon" /></div>
                    <p className={styles.facultyName}>{t('others')}</p> 
                </NavLink>
            </div>
        </div>
    )
}

export default Categories;
