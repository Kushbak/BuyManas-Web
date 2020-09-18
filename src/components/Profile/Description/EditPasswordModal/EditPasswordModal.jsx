import React from 'react'
import { Field, reduxForm } from 'redux-form';
import { Input } from '../../../common/FormsControls/FormsControls';
import Modal from '../../../common/Modal/Modal';
import { useTranslation } from 'react-i18next';
import styles from '../Description.module.css';
import { required, newPassMatchInput, checkOldPass, newCannotBeOld, minLengthCreator } from '../../../../utils/validators/validators';

const EditPasswordModal = (props) => {
    const { t } = useTranslation();
    const checkPass = checkOldPass(props.password);
    const minLength8 = minLengthCreator(8);

    const submit = (values) => { 
        props.editPassword(props.id, values);
    }
    return (
        <div>
            <Modal onClose={props.toggleModalWindowEditPassword}>
                <form onSubmit={props.handleSubmit(submit)}>
                    <Field component={Input} name="oldPassword" type="password" placeholder={t('yourOldPass')} validate={[required, checkPass]} />
                    <Field component={Input} name="newPassword" type="password" placeholder={t('yourNewPass')} validate={[required, minLength8]} />
                    <Field component={Input} name="confNewPassword" type="password" placeholder={t('confirmNewPass')} validate={[required, newPassMatchInput, newCannotBeOld]} />
                    <button> {props.isFetching ? <span>{t('loading')}</span> : t('saveChanges')} </button>
                    {props.error && <div className={styles.successSubmit}>{props.error}</div>}
                </form>
            </Modal>
        </div>
    )
}

export default reduxForm({ form: 'editPassword' })(EditPasswordModal); 