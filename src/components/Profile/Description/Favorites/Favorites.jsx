import React from 'react'
import styles from './Favorites.module.css'
import { NavLink } from 'react-router-dom'
import { IMAGES_URL } from '../../../../constants'
import { useTranslation } from 'react-i18next'

const Favorites = (props) => {
    const { t } = useTranslation();
    return (
        <div className={styles.favoritePosts}>
            {props.favoritePosts.length
                ? props.favoritePosts.map(p => <NavLink to={`/posts/${p.poster[0].id}`}>
                    <div className={styles.favoritePostItem} key={p.poster[0].id}>
                        <div className={styles.imgBlock}>
                            {p.poster[0].images.length ?
                                <img src={IMAGES_URL + p.poster[0].images[0].url} alt="categoryIcon" />
                                :
                                <img src={require('../../../../assets/images/logo.png')} alt="categoryIcon" />
                            }
                        </div>
                        <div className={styles.descriptionBlock}>
                            <p className={styles.postTitle}>{p.poster[0].title}</p>
                            <p className={styles.cost}> {p.poster[0].cost != null ? p.poster[0].cost + t('som') : t('contract')}</p>
                        </div>

                    </div>
                </NavLink>)
                : <p className={styles.nullPosts}>{t('noPostsNow')}</p>
            }
            {props.hasMore && props.favoritePosts.length && <div className='loader'>{t('loading')}</div>}
        </div>
    )
}

export default Favorites