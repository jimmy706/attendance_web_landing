import React, { useState } from 'react';
import CommonButton from '../../buttons/CommonButton/CommonButton';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { ErrorMessages } from '../../../constants/messages';
import dayjs from 'dayjs';
import classnames from 'classnames';
import { createNewMeeting } from '../../../APIs/meetings';
import { getErrorMessage } from '../../../helpers/string-handle';
import MessageBox from '../../MessageBox/MessageBox';
import { useHistory } from 'react-router';
const Form = styled.form`
    width: 60%;
    max-width: 450px;
    margin-left: auto;
    margin-right: auto;
    box-sizing: border-box
`

function CreateMeetingForm() {
    const { handleSubmit, errors, register } = useForm();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const currentDatetime = new Date();
    const history = useHistory();
    async function onSubmit(data) {
        setLoading(true);
        const accessToken = JSON.parse(localStorage.getItem('access'));
        const token = accessToken.data;
        try {
            const result = await createNewMeeting(token, data);
            const newMeeting = result.data;
            history.push(`/meeting/${newMeeting}`)
        }
        catch (err) {
            setErrorMessage(getErrorMessage(err));
        }
        finally {
            setLoading(false);
        }
    }


    return (
        <Form className='form' onSubmit={handleSubmit(onSubmit)}>
            {errorMessage && (
                <div style={{ marginBottom: '20px' }}>
                    <MessageBox
                        title=''
                        message={errorMessage}
                    />
                </div>
            )}
            <div className='form-col'>
                <label className='required' htmlFor='title'>Title</label>
                <input
                    className={`edit-text ${classnames({ 'edit-text--error': errors.title })}`}
                    ref={register({
                        required: ErrorMessages.TITLE_REQUIRED
                    })}
                    name='title'
                    placeholder="Enter meeting title"
                    id='title'
                />
                <p className='error-text'>{errors.title?.message}</p>
            </div>
            <div className='form-row'>
                <div className='form-col'>
                    <label htmlFor='start_time' className='required'>Start time</label>
                    <input
                        name='start_time'
                        type='time'
                        defaultValue={`${dayjs(currentDatetime).format("hh:mm")}`}
                        className={`edit-text ${classnames({ 'edit-text--error': errors.start_time })}`}
                        id='start_time'
                        ref={register({
                            required: ErrorMessages.START_TIME_REQUIRED
                        })}
                    />
                    <p className='error-text'>{errors.start_time?.message}</p>
                </div>
                <div className='form-col'>
                    <label htmlFor='end_time' className='required'>End time</label>
                    <input
                        name='end_time'
                        type='time'
                        defaultValue={`${dayjs(currentDatetime).add(30, 'm').format("hh:mm")}`}
                        className={`edit-text ${classnames({ 'edit-text--error': errors.end_time })}`}
                        id='end_time'
                        ref={register({
                            required: ErrorMessages.END_TIME_REQUIRED
                        })}
                    />
                    <p className='error-text'>{errors.end_time?.message}</p>
                </div>
            </div>
            <div className='form-col'>
                <label className='required' htmlFor='day'>Day</label>
                <input className='edit-text' ref={register({
                    require: ErrorMessages.DAY_REQUIRED
                })}
                    name='day'
                    id='day'
                    type='date'
                    defaultValue={dayjs(currentDatetime).format("YYYY-MM-DD")}
                />
            </div>

            <div className='form-col'>
                <label htmlFor='desc'>
                    Description
                </label>
                <textarea
                    style={{
                        width: '100%',
                        height: '100px'
                    }}
                    placeholder="Write meeting's description"
                    id='desc'
                    name='description'
                    ref={register()}
                    className='edit-text'
                >

                </textarea>
            </div>

            <CommonButton
                width='100%'
                type='submit'
                loading={loading}
            >
                Create meeting
            </CommonButton>
        </Form>
    )
}

export default CreateMeetingForm;