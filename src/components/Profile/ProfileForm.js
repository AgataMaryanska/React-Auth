import {useRef, useContext} from 'react';

import classes from './ProfileForm.module.css';
import AuthContext from "../../store/auth-context";
import {useHistory} from "react-router-dom";
import axios from "axios";

const ProfileForm = () => {
    const history = useHistory();
    const newPasswordInputRef = useRef();
    const authCtx = useContext(AuthContext);

    const submitHandler = (event) => {
        event.preventDefault();
            const enteredNewPassword = newPasswordInputRef.current.value;
            const url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBiPMi1skc4AHy4-p-eW_sfNovj1zzLXwk'

            axios.post(url,{
                    idToken: authCtx.token,
                    password: enteredNewPassword,
                    returnSecureToken: false,
                headers: {
                'Content-Type': 'application/json'
            }
        }
            ).then(res => {
                history.replace('/');
            });
    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor='new-password'>New Password</label>
                <input type='password' id='new-password' minLength="7" ref={newPasswordInputRef}/>
            </div>
            <div className={classes.action}>
                <button>Change Password</button>
            </div>
        </form>
    );
};

export default ProfileForm;
