import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessages, HintMessages } from '../../../constants/messages';
import classnames from 'classnames';
import CommonButton from '../../buttons/CommonButton/CommonButton';
import { EMAIL_REGEX, PASSWORD_REGEX, USERNAME_REGEX } from '../../../constants/regex';
import MAJORS from '../../../constants/majors';
import { createAccountAPI } from '../../../APIs/auth';
import { getErrorMessage } from '../../../helpers/string-handle';
import MessageBox from '../../MessageBox/MessageBox';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

function RegisterForm() {
    const { register, handleSubmit, errors } = useForm();
    const [loading, setLoading] = useState(false);
    const [requestError, setRequestError] = useState("");
    const history = useHistory();

    async function onSubmit(data) {
        setLoading(true);
        setRequestError('');
        try {
            const result = await createAccountAPI(data);
            console.log(result);
            history.push("/");
        }
        catch (err) {
            setRequestError(getErrorMessage(err));
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {requestError && (
                <div style={{ marginBottom: '20px' }}>
                    <MessageBox
                        title=''
                        message={requestError}
                    />
                </div>
            )}
            <div className='form-row'>
                <div className='form-col'>
                    <label htmlFor='first_name'>First name</label>
                    <input className={
                        `edit-text ${classnames({ 'edit-text--error': errors.first_name })}`
                    }
                        ref={register({
                            required: ErrorMessages.FIRST_NAME_REQUIRED
                        })}
                        id='first_name'
                        name='first_name'
                        placeholder="First name" />
                    <p className='error-text'>{errors.first_name?.message}</p>
                </div>
                <div className='form-col'>
                    <label htmlFor='last_name'>Last name</label>
                    <input
                        className={`edit-text ${classnames({ 'edit-text--error': errors.last_name })}`}
                        ref={register({
                            required: ErrorMessages.LAST_NAME_REQUIRED
                        })}
                        id='last_name'
                        name='last_name'
                        placeholder="Last name" />
                    <p className='error-text'>{errors.last_name?.message}</p>
                </div>
            </div>
            <div className='form-col'>
                <label htmlFor='username'>
                    Username
                </label>
                <input
                    id='username'
                    className={
                        `edit-text ${classnames({ 'edit-text--error': errors.username })}`
                    } placeholder="Username"
                    ref={
                        register({
                            required: ErrorMessages.USERNAME_REQUIRED,
                            pattern: {
                                value: USERNAME_REGEX,
                                message: ErrorMessages.USERNAME_WRONG_FORMAT
                            }
                        })
                    }
                    name='username' />
                <p className='error-text'>{errors.username?.message}</p>
            </div>

            <div className='form-col'>
                <label htmlFor='email'>Email</label>
                <input type='email' name='email'
                    placeholder='Your email address'
                    id='email'
                    className={`edit-text ${classnames({ 'edit-text--error': errors.email })}`}
                    ref={
                        register({
                            required: ErrorMessages.EMAIL_REQUIRED,
                            pattern: {
                                value: EMAIL_REGEX,
                                message: ErrorMessages.WRONG_EMAIL_FORMAT
                            }
                        })
                    }
                />
                <p className='error-text'>{errors.email?.message}</p>
            </div>

            <div className='form-col'>
                <label htmlFor='password'>Password</label>
                <input type='password' className={`edit-text ${classnames({ 'edit-text--error': errors.password })}`}
                    placeholder='Password' id='password' name='password' ref={register({
                        required: ErrorMessages.PASSWORD_REQUIRED,

                    })} />
                <p className='error-text'>{errors.password?.message}</p>
            </div>

            <div className='form-col'>
                <label htmlFor='major'>Major</label>
                <select id='major' ref={register()} name='major' className='edit-text'>
                    {MAJORS.map(m => (<option value={m.value}>{m.name}</option>))}
                </select>
            </div>

            <div className='form-col'>
                <label htmlFor='description'>Description</label>
                <textarea
                    className='edit-text'
                    style={{
                        width: '100%',
                        height: '100px'
                    }}
                    placeholder="Introduce about yourself"
                    id='description'
                    ref={register()}
                    name='description'
                >

                </textarea>
            </div>

            <p>
                Already have account? Login <Link to="/"><a className='link'>here.</a></Link>
            </p>
            <CommonButton loading={loading} type='submit' width='100%'>CREATE ACCOUNT</CommonButton>
        </form>
    )
}

export default RegisterForm;