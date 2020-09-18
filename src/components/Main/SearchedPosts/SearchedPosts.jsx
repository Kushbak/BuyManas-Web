import React from 'react';
import styles from './SearchedPosts.module.css'
import { useTranslation } from 'react-i18next';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IMAGES_URL } from '../../../constants';
import { NavLink } from 'react-router-dom';

const SearchedPosts = (props) => {

    const { t } = useTranslation();


    // cicle for top 10 posts 
    const LastPostsArray = [];
    props.searchedPost.sort((a, b) => {
        return new Date(b.publishedAt) - new Date(a.publishedAt);
    }).forEach(p => LastPostsArray.push(p));




    return (
        <div >
            <h3>Результаты поиска</h3>

            <div className={styles.searchedPosts} >
                {
                    LastPostsArray.map(p => <NavLink to={`posts/${p.id}`}>
                        <div className={styles.searchedPostItem} key={p.id}>
                            <div className={styles.imgBlock}>
                                {p.images.length ?
                                    <img src={IMAGES_URL + p.images[0].url} alt="categoryIcon" />
                                    :
                                    <img src={require('../../../assets/images/logo.png')} alt="categoryIcon" />
                                }
                            </div>
                            <div className={styles.descriptionBlock}>
                                <p className={styles.postTitle}>{p.title}</p>
                                <p className={styles.description}>{p.description}</p>
                                <p className={styles.cost}> {p.cost != null ? p.cost + t('som') : t('contract')}</p>
                            </div>
                        </div>
                    </NavLink>)
                }
            </div>
        </div>
    );
}

export default SearchedPosts;