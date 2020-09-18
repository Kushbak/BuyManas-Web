import React, { useState } from 'react';
import styles from './NewPost.module.css';
import { Field, reduxForm } from 'redux-form';
import { Input, Textarea } from '../../../common/FormsControls/FormsControls';
import { required, maxLengthCreator } from '../../../../utils/validators/validators';
import { compose } from 'redux';
import { withAuthRedirect } from '../../../../hoc/withAuthRedirect';
import { getLocale } from '../../../../i18next'; 
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router-dom';


const NewPost = (props) => {
    const facultyName = 'facultyName' + getLocale().charAt(0).toUpperCase() + getLocale().slice(1);
    const depName = 'dep_name_' + getLocale().charAt(0).toLowerCase() + getLocale().slice(1);
    const {t} = useTranslation();

    const [state, setState] = useState({
        faculty: null,
        department: null,
        departmentList: [...props.departments]
    }); 

    const changeFaculty = (item) => { 
        setState({
                faculty: parseInt(item.target.value), 
                department: state.departmentList.filter( i => i.faculty.id === parseInt(item.target.value) ),
                departmentList: [...props.departments] 
            })
    }   

    const maxLength40 = maxLengthCreator(30);
    
    let date = new Date(); 

    const uploadImage = e => {
        if(e.target.files.length){
            props.newCurrentImage(e.target.files[0]);
        }  
    } 
    let submit = (value) => {
        let obj = {
            ...value,
            publishedAt: date,
            author: `/api/users/${props.userId}`, 
            rating: 0,
            images: props.image
        }
        props.newPostImage(obj);
        value.title = ' ';
        value.description = ' ';
        value.cost = ''; 
    };

    console.log(props.error)
    return(
        <div className={styles.newPostWrapper}>
            <form onSubmit={props.handleSubmit(submit)}>
                <div className={styles.newImage}>
                    <p className={styles.blockName}>{t('loadPics')}</p>                
                    <div className={styles.inputs}><input onChange={uploadImage} type='file'/></div>
                </div>

                <div className={styles.newTitle}>
                    <p className={styles.blockName}>{t('NameOfPost')}<sup>*</sup> </p>                
                    <div className={styles.inputs}>
                        <Field component={Input} name='title' type='text' placeholder={t('NameOfPost')} validate={[required, maxLength40]} />
                    </div>
                </div>

                <div className={styles.newDescr}>
                    <p className={styles.blockName}>{t('Description')} <sup>*</sup></p>                
                    <div className={styles.inputs}>
                        <Field component={Textarea} name='description' type='text' placeholder={t('Description')} validate={[required]} />
                    </div>
                </div> 

                <div className={styles.newFaculty}>
                    <p className={styles.blockName}>{t('chooseFac')}</p>
                    <div className={styles.inputs}>
                        <Field component='select' name='faculty' className={styles.newPostSelect} onChange={item => changeFaculty(item)} >
                            <option></option>
                            { props.faculties.map(f => <option key={f.id} value={f.id} > {f[facultyName]} </option>) }
                        </Field>
                    </div>
                </div>
                                
                {state.faculty
                    ? <div className={styles.newDep}>
                        <p className={styles.blockName}>{t('chooseDep')}</p>
                        <div className={styles.inputs}>
                            <Field component='select' name='department' className={styles.newPostSelect}>
                                {state.department.map(item => <option key={item.id} value={item.id} > {item[depName]} </option>)}
                            </Field>
                        </div>
                    </div>
                    : null}
                <div className={styles.newCost}>
                    <p className={styles.blockName}>{t('cost')}</p>                
                    <div className={styles.inputs}>
                        <Field component={Input} name='cost' type='number' placeholder={t('contract')} />
                    </div>
                </div> 
                { props.isFetching && <div className={styles.postingPost}>{t('Loading')}</div> }
                { props.error && <Redirect to='/profile' /> }
                <div className={styles.submit}>
                    <button>{t('Post')}</button>
                </div>
            </form>
        </div>  
    )
}

export default compose( withAuthRedirect, reduxForm({form: 'newPost'}) ) (NewPost);