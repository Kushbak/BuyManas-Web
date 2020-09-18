import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
    componentWillMount() {
        this.root = document.createElement('div');
        modalRoot.appendChild(this.root);
        modalRoot.classList.add("modalWrapper");
    }
    componentWillUnmount() {
        modalRoot.removeChild(this.root);
        modalRoot.classList.remove("modalWrapper");
    }

    render() {
        return ReactDOM.createPortal(
            <div className={styles.modalWrapper}>
                <div className={styles.btnCloseBlock} ><button className={styles.btnClose} onClick={this.props.onClose}>x</button></div>
                <div className={styles.logoBlock}>
                    <img src={require('../../../assets/images/logo.png')} alt="LOGO" />
                </div> 
                <div className={styles.modalBody}>
                    {this.props.children}
                </div>
            </div>,
            this.root
        )
    }
}

export default Modal;