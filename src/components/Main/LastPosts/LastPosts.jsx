import React from 'react';
import styles from './LastPosts.module.css'
import { useTranslation } from 'react-i18next';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IMAGES_URL } from '../../../constants';
import { NavLink } from 'react-router-dom';
import Preloader from '../../common/Preloader/Preloader';

const LastPosts = (props) => {

    const { t } = useTranslation();
    const LastPostsArray = [];
    props.posts.sort((a, b) => {
        return new Date(b.publishedAt) - new Date(a.publishedAt);
    }).forEach(p => LastPostsArray.push(p));

    return (
        <div className={styles.LastPostsWrapper}>
            <h3>{t('postsLast')}</h3>

            <div className={styles.lastPosts} >
                    {LastPostsArray.map(p => (
                        <NavLink to={`posts/${p.id}`} key={p.id}>
                            <div className={styles.lastPostItem} key={p.id}>
                                <div className={styles.imgBlock}>
                                    {p.images
                                        ? p.images.length ?
                                            <img src={IMAGES_URL + p.images[0].url} alt="categoryIcon" />
                                            :
                                            <img src={require('../../../assets/images/logo.png')} alt="categoryIcon" />
                                        : <Preloader />
                                    }
                                </div>

                                <p className={styles.cost}> {p.cost != null ? p.cost + t('som') : t('contract')}</p>
                                <p className={styles.postTitle}>{p.title}</p>
                            </div>
                        </NavLink>
                    ))} 

            </div>
            {props.hasMore && <div className='loader'>{t('loading')}</div>}
        </div>
    );
}

export default LastPosts;