import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import CommonButton from '../../buttons/CommonButton/CommonButton';
import { ErrorMessages } from '../../../constants/messages';
import { loginAPI } from '../../../APIs/auth';
import { useHistory } from 'react-router-dom';
import { getDay } from '../../../helpers/date-handle';

function LoginForm() {
    const { handleSubmit, register } = useForm();
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function onSubmit(data) {
        setLoading(true);
        try {
            const loginResult = await loginAPI(data.username, data.password);
            const { access, refresh } = loginResult.data;
            localStorage.setItem('access', JSON.stringify({
                data: access,
                expire: getDay(1)
            }));
            localStorage.setItem('refresh', JSON.stringify({
                data: refresh,
                expire: getDay(2)
            }));
            history.push("/home");
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='form'
            style={{
                width: '100%',
                maxWidth: '500px'
            }}
        >
            <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>LOGIN</h2>
            <div className='form-row'>
                <label htmlFor='Username'>Username</label>
                <input
                    ref={register({
                        required: ErrorMessages.USERNAME_REQUIRED
                    })}
                    className='edit-text' name='username' placeholder="Password" />
            </div>
            <div className='form-row'>
                <label htmlFor='password'>Password</label>
                <input className='edit-text' name="password" placeholder="Password"
                    ref={register({
                        required: ErrorMessages.PASSWORD_REQUIRED
                    })}
                    type='password' />
            </div>
            <CommonButton loading={loading} width='100%' type='submit'>Login</CommonButton>
        </form>
    )
}

export default LoginForm;