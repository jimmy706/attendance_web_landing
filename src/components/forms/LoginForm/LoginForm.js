import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import CommonButton from '../../buttons/CommonButton/CommonButton';
import { ErrorMessages } from '../../../constants/messages';
import { loginAPI } from '../../../APIs/auth';
import { useHistory } from 'react-router-dom';
import { getDay } from '../../../helpers/date-handle';
import { Link } from 'react-router-dom';
import { getErrorMessage } from '../../../helpers/string-handle';
import MessageBox from '../../MessageBox/MessageBox';
import { useDispatch } from 'react-redux';
import { loginAndFetchProfile } from '../../../redux/actions/user.action';
import qs from 'query-string';
function LoginForm() {
    const { handleSubmit, register, errors } = useForm();
    const [loading, setLoading] = useState(false);
    const [requestError, setRequestError] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();
    const { redir } = (qs.parse(window.location.search))

    async function onSubmit(data) {
        setLoading(true);
        setRequestError('');
        try {
            const loginResult = await loginAPI(data.username, data.password);
            const { access, refresh } = loginResult.data;
            localStorage.setItem('access', JSON.stringify({
                data: access,
                expire: getDay(1)
            }));
            dispatch(loginAndFetchProfile(access));
            localStorage.setItem('refresh', JSON.stringify({
                data: refresh,
                expire: getDay(2)
            }));
            if (redir) {
                history.push(redir);
            }
            else {
                history.push("/home");
            }
        }
        catch (err) {
            setRequestError(getErrorMessage(err));
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='form'

        >
            {requestError && (
                <div style={{ marginBottom: "20px" }}>
                    <MessageBox title="" message={requestError} />
                </div>
            )}
            <div className='form-col'>
                <label htmlFor='Username'>Username</label>
                <input
                    ref={register({
                        required: ErrorMessages.USERNAME_REQUIRED
                    })}
                    className={`edit-text ${errors.username ? 'edit-text--error' : ''}`} name='username' placeholder="Username" />
                <p className='error-text'>{errors.username?.message}</p>
            </div>
            <div className='form-col'>
                <label htmlFor='password'>Password</label>
                <input className={`edit-text ${errors.password ? 'edit-text--error' : ''}`} name="password" placeholder="Password"
                    ref={register({
                        required: ErrorMessages.PASSWORD_REQUIRED
                    })}
                    type='password' />
                <p className='error-text'>{errors.password?.message}</p>
            </div>
            <p>
                Don't have account? Create<Link to="/register"><a className='link'> here.</a></Link>
            </p>
            <CommonButton loading={loading} width='100%' type='submit'>Login</CommonButton>
        </form>
    )
}

export default LoginForm;