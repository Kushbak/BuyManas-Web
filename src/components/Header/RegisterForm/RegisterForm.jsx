import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { getLocale } from '../../../i18next';
import { Input, Phone } from '../../common/FormsControls/FormsControls'
import { maxLengthCreator, minLengthCreator, required, emailValid, regMatchInput } from '../../../utils/validators/validators'
import { useTranslation } from 'react-i18next';
import styles from '../Header.module.css';

const RegisterForm = (props) => {
    const { t } = useTranslation();
    const facultyName = 'facultyName' + getLocale().charAt(0).toUpperCase() + getLocale().slice(1);
    const maxLength30 = maxLengthCreator(30);
    const minLength8 = minLengthCreator(8); 
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Input} name='name' type="text" placeholder={t('yourName')} validate={[required]} />
            <Field component={Input} name='username' type="text" placeholder={t('yourUsername')} validate={[required, maxLength30]} />
            <Field component={Input} name='email' type="text" placeholder={t('yourEmail')} validate={[required, emailValid]} />
            <Field component={Phone} name='number' validate={[required]} />
            <Field component="select" name="faculty" className={styles.yourFaculty}>
                <option></option>
                {props.faculties.map(f => <option key={f.id} value={f.id}>{f[facultyName]}</option>)}
            </Field>
            <Field component={Input} name='regPassword' type="password" placeholder={t('password')} validate={[required, minLength8]} />
            <Field component={Input} name='confirmPassword' type="password" placeholder={t('confirmPass')} validate={[required, regMatchInput]} />
            { props.error && <div className={styles.wrongData}>{ props.error }</div> }
            <button> {props.isFetching ? t('loading') : t('signUp')} </button>
            <p className={styles.signUp}>
                {t('haveAcc')}
                <span className={styles.clickableLink} onClick={props.toggleModalLoginAuth}>
                    {t('login')}
                </span>
            </p>
        </form>
    )
}

export default reduxForm({ form: 'register' })(RegisterForm);
