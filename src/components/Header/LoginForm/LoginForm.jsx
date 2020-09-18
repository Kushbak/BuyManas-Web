import React from 'react';
import { reduxForm, Field } from 'redux-form';
import {Input} from '../../common/FormsControls/FormsControls'
import { useTranslation } from 'react-i18next';
import styles from '../Header.module.css';


const LoginForm = (props) => {
    const { t } = useTranslation(); 
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Input} type="text" placeholder={t('yourUsername')} name='username' />
            <Field component={Input} type="password" placeholder={t('password')} name='logPassword' />
            <p className={styles.forgotPass}>{t('forgotPassword')}</p>
            { props.error && <div className={styles.wrongData}>{ props.error }</div> }
            <button disabled={props.pristine || props.submitting}> {props.isFetching ? t('loading') : t('login')} </button>
            <p className={styles.signUp}>
                {t('or ')} 
                <span className={styles.clickableLink} onClick={props.toggleModalLoginAuth}>
                    {t('signUp')}
                </span>
            </p>
            <p className={styles.withWord}>{t('with')}</p>
            <p className={styles.withSocialNet}>
                <a href="https://facebook.com">F</a>
                <a href="https://twitter.com">T</a>
                <a href="https://google.com">G</a>
            </p>
        </form>
    )
}


export default reduxForm({ form: 'login' })(LoginForm);