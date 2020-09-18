import React from 'react';
import styles from './TopPosts.module.css'
import { useTranslation } from 'react-i18next';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { IMAGES_URL } from '../../../constants';
import { NavLink } from 'react-router-dom';
import Preloader from '../../common/Preloader/Preloader';

const TopPosts = (props) => {

    const { t } = useTranslation();
    let settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1
    };

    const topPostsArray = [],
        postsWithRating = [];
 
    function takeNsort() {
        for (let i = 0; i < props.allPosts.length; i++) {
            if (props.allPosts[i].ratings.length && props.allPosts[i].ratings[0].rating !== 0) {
                postsWithRating.push(props.allPosts[i])
            }
        }
    }
    takeNsort();
    
    postsWithRating.sort((a, b) => b.ratings[0].rating - a.ratings[0].rating).forEach(p => {
        if (topPostsArray.length <= 9)
            topPostsArray.push(p);
    }) 
    if(!topPostsArray.length){
        return <Preloader />
    }
    return (
        <div className={styles.topPosts}>
            <div className="wrapper">
                <div className={ styles.topPostsBlock }>
                    <h3>{t('postsTop')}</h3>

                    <div className={styles.topPostsSlider} >
                        <Slider className={styles.slidersStyle} {...settings} >
                            {
                                topPostsArray.map(p => <NavLink to={`posts/${p.id}`} key={p.id}>
                                    <div className={styles.topPostItem} key={p.id}>
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
                                </NavLink>)
                            }
                        </Slider>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default TopPosts;