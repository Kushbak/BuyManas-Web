import React from 'react'; 
import styles from './FormsControls.module.css'; 
import { useTranslation } from 'react-i18next';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export const Input = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error
    return(
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '') }>
            <div> <input type="text" {...input} {...props} autoComplete="off"/> </div>
            { hasError && <span>{meta.error}</span> } 
        </div>
    )
}


export const Textarea = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error
    return(
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '') }>
            <div> <textarea type="text" {...input} {...props} autoComplete="off"/> </div>
            { hasError && <span>{meta.error}</span> } 
        </div>
    )
}

export const Phone = ({input, meta, ...props}) => { 
    const {t} = useTranslation();
    return(
        <div className={styles.formControl}>
            <div> 
                <PhoneInput {...input} {...props} country={'kg'} onlyCountries={['kg', 'kz', 'ru']} placeholder={t('yourNumber')} /> 
            </div> 
        </div>
    )
}