import React from 'react';
import styles from './MyPosts.module.css';
import { IMAGES_URL } from '../../../constants';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const MyPosts = (props) => { 
    const {t} = useTranslation();
    const LastPostsArray = [];

    props.posts.sort((a, b) => {
        return new Date(b.publishedAt) - new Date(a.publishedAt);
    }).forEach(p => LastPostsArray.push(p));
    
    return (
        <div className={styles.myPostsWrapper}>
            <h3>{t('myPosts')}</h3>
            <div className={styles.myPosts}>
                {LastPostsArray.length
                    ? LastPostsArray.map(l => <NavLink to={`posts/${l.id}`} key={l.id}>
                        <div className={styles.myPostItem} key={l.id}>
                            <div className={styles.imgBlock}>
                                {l.images.length
                                    ? <img src={IMAGES_URL + l.images[0].url} alt="categoryIcon" />
                                    : <img src={require('../../../assets/images/logo.png')} alt="categoryIcon" />
                                }
                            </div>
                            <p className={styles.postTitle}>{l.title}</p>
                        </div>
                    </NavLink>)
                    : <p className={styles.nullPosts}>{t('noPostsNow')}</p>
                }
            </div>
            {props.hasMore && props.posts.length && <div className='loader'>{t('loading')}</div>}
        </div>
    )
}

export default MyPosts;