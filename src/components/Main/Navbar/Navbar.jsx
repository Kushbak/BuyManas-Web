import React, {useState} from 'react';
import styles from './Navbar.module.css'
import { useTranslation } from 'react-i18next';
import CategoriesContainer from './Categories/CategoriesContainer';
import { setPostByTitle } from '../../../actions/posts'
import { useDispatch} from 'react-redux';

const Navbar = (props) => {
    const [searchText, setSearchText] = useState('');
    const dispatch = useDispatch();

    function onClickSearch(search){
        if(search){
            dispatch(setPostByTitle(search));
            setSearchText('')
        } 
    }

    const { t } = useTranslation();
    return (
        <div className={styles.navbar}>
            <div className="wrapper">
                <div className={ styles.navbarBlock }>
                    <div className={styles.search}>
                        <input
                            type="search"
                            placeholder={t('searchPlaceHolder')}
                            value={searchText}
                            onChange={e => setSearchText(e.target.value)}
                        />
                        <button onClick={() => onClickSearch(searchText)}>{t('searchButton')}</button>
                    </div>
                    <CategoriesContainer />
                </div>
            </div>

        </div>
    )
}

export default Navbar;
