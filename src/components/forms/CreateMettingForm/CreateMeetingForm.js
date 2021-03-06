import React, { useState, useEffect } from 'react';
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
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import mapboxgl from 'mapbox-gl';
import { MAP_BOX_KEY } from '../../../config/keys';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
const Form = styled.form`
    width: 60%;
    max-width: 600px;
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
    const [location, setLocation] = useState('');
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );

    useEffect(() => {
        mapboxgl.accessToken = MAP_BOX_KEY;
        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            placeholder: 'Enter location',

        });

        geocoder.addTo('#location_geocoder');

        // Get the geocoder results container.
        const results = document.getElementById('location_result');

        geocoder.on('loading', function (e) {
            setLocation(e.query);
        })

        // Add geocoder result to container.
        geocoder.on('result', function (e) {
            setLocation(e.result.text);
        });

        // Clear results container when search is cleared.
        geocoder.on('clear', function () {
            results.innerText = '';
        });
    }, [])

    async function onSubmit(data) {
        setLoading(true);
        const description = (draftToHtml(convertToRaw(editorState.getCurrentContent())));
        const body = { ...data, description, location }
        const accessToken = JSON.parse(localStorage.getItem('access'));
        const token = accessToken.data;
        try {
            const result = await createNewMeeting(token, body);
            const newMeeting = result.data;
            history.push(`/meeting/${newMeeting.id}`)
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
                        defaultValue={`${dayjs(currentDatetime).format("HH:mm")}`}
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
                        defaultValue={`${dayjs(currentDatetime).add(30, 'm').format("HH:mm")}`}
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
                    min={dayjs(currentDatetime).format("YYYY-MM-DD")}
                    defaultValue={dayjs(currentDatetime).format("YYYY-MM-DD")}
                />
            </div>

            <div className='form-col'>
                <label htmlFor='location_geocoder'>
                    Location
                </label>
                <div>
                    <div id='location_geocoder'></div>
                    <pre id='location_result'></pre>
                </div>
            </div>

            <div className='form-col'>
                <label htmlFor='desc'>
                    Description
                </label>
                <Editor
                    editorClassName='edit-text edit-text--wysiiwyg'
                    placeholder='Enter meeting description'
                    name='description'
                    EditorState={editorState}
                    onEditorStateChange={setEditorState}
                    stripPastedStyles={true}
                />
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