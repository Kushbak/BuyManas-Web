import React from 'react'
import { Field, reduxForm } from 'redux-form';
import { Input, Phone } from '../../../common/FormsControls/FormsControls';
import Modal from '../../../common/Modal/Modal';
import { emailValid } from '../../../../utils/validators/validators'
import { useTranslation } from 'react-i18next';
import styles from '../Description.module.css';
import { getLocale } from '../../../../i18next'; 

const EditProfileModal = (props) => {
    const { t } = useTranslation();
    const facultyName = 'facultyName' + getLocale().charAt(0).toUpperCase() + getLocale().slice(1); 

    const uploadImage = e => {
        if(e.target.files.length){
            props.newAvatar(e.target.files[0]);
        }  
    } 
    const submit = (values) => {
        let obj = { 
            name: values.name ? values.name :  props.name,
            email: values.email ? values.email :  props.email,
            phone: values.phone && values.phone !== '+996' ? values.phone :  props.phone,
            faculty: values.faculty ? `/api/faculties/${values.faculty}` :  `/api/faculties/${props.faculty.id}`,
            avatar: props.avatar
        }
        props.editProfile(props.id, obj); 
    }
    return (
        <div>
            <Modal onClose={props.toggleModalWindowEditProfile}>
                <form onSubmit={props.handleSubmit(submit)}>
                    <Field component={Input} name="name" type="text" placeholder={t('yourName')} value={props.name} />
                    <Field component={Input} name="email" type="text" placeholder={t('yourEmail')} value={props.email} validate={[emailValid]} />
                    <Field component='select' name="faculty" className={styles.editFaculty} id="faculties">
                        <option></option>
                        {props.faculties.map(f => <option key={f.id} value={f.id}>{f[facultyName]}</option>)}
                    </Field>
                    <Field component={Phone} name='phone' type="phone" placeholder={t('yourNumber')} value={props.phone} />
                    <div className={styles.newAvatar}>{t('Avatar')}<input onChange={uploadImage} type="file" /></div>
                    <button> {props.isFetching ? <span>{t('loading')}</span> : t('saveChanges')} </button>
                    {props.error && <div className={styles.successSubmit}>{props.error}</div>}
                </form>
            </Modal>
        </div>
    )
}

export default reduxForm({form: 'editProfile'})(EditProfileModal); 