import React from 'react';
import styles from './Description.module.css';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { IMAGES_URL } from '../../../constants';
import Preloader from '../../common/Preloader/Preloader';
import EditProfileModal from './EditProfileModal/EditProfileModal';
import EditPasswordModal from './EditPasswordModal/EditPasswordModal';

const Description = (props) => {
    const { t } = useTranslation();

    let ratingArr = []
    let total = 0;
    for (let i = 0; i < props.posters.length; i++) {
        if(props.posters[i].ratings.length){
            ratingArr.push(props.posters[i].ratings[0].rating)
        }
    }
    for (let i = 0; i < ratingArr.length; i++) {
        total += ratingArr[i]
    }
    if (!props.username || !props.name) {
        return <Preloader />
    }
    return (
        <div className={styles.descriptionWrapper}>
            <div className={styles.avatarBlock}>
                {props.myAvatar[0]
                    ? <img className={styles.avatar} src={IMAGES_URL + props.myAvatar[0].url} alt="avatar" />
                    : <img className={styles.avatar} src={require('../../../assets/images/avatar.jpg')} alt="avatar" />
                }
            </div>
            <div className={styles.about}>
                <div className={styles.names}>
                    <p className={styles.name}> {props.name} </p>
                    <p className={styles.username}> @{props.username} </p>
                </div>
                <div className={styles.iDontKnow}>

                    <div className={styles.faculty}>
                        {props.faculty
                            ? <img src={require(`../../../assets/images/${props.faculty.id}.png`)} alt="Faculty" />
                            : <img src={require(`../../../assets/images/logo.png`)} alt="Faculty" />
                        }
                    </div>
                    <div className={styles.postLength}>
                        <p> {props.posters.length ? props.posters.length : 0} </p>
                        <span> {t('postsLength')} </span>
                    </div>
                    <div className={styles.rating}>
                        <p> {total} </p>
                        <span> {t('rating')} </span>
                    </div>
                </div>
            </div>
            <div className={styles.someButtons}>
                <NavLink to={'/newPost'}> <button className={styles.addPostBtn}> {t('Sell')} </button></NavLink>
                <NavLink to={'/favoritePosts'}> <button className={styles.favoritePosts}> {t('Favorites')} </button></NavLink>
                <button className={styles.favoritePosts} onClick={props.toggleModalWindowEditPassword}> {t('changePass')} </button>
            </div>
            <button className={styles.editProfile} onClick={props.toggleModalWindowEditProfile}> {t('editProfile')} </button>
            <div className={styles.phoneNumber}> {props.phone} </div> 

            {
                props.editProfileModalOpen &&
                <EditProfileModal {...props} />
            }

            {
                props.editPasswordModalOpen &&
                <EditPasswordModal {...props} />
            }

        </div>
    )
}

export default Description;