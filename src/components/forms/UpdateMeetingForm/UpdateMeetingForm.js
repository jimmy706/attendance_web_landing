import React, { useState, useEffect } from 'react';
import CommonButton from '../../buttons/CommonButton/CommonButton';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { ErrorMessages } from '../../../constants/messages';
import classnames from 'classnames';
import { getErrorMessage } from '../../../helpers/string-handle';
import MessageBox from '../../MessageBox/MessageBox';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { updateMeeting } from '../../../APIs/meetings';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import mapboxgl from 'mapbox-gl';
import { MAP_BOX_KEY } from '../../../config/keys';

const Form = styled.form`
    width: 60%;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    box-sizing: border-box
`

function UpdateMeetingForm(props) {
    const { handleSubmit, errors, register } = useForm();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(props.meeting.description))));
    const [location, setLocation] = useState('');
    async function onSubmit(data) {
        setLoading(true);
        const description = (draftToHtml(convertToRaw(editorState.getCurrentContent())));
        const body = { ...data, description, location }
        const accessToken = JSON.parse(localStorage.getItem('access'));
        const token = accessToken.data;
        try {
            const result = await updateMeeting(token, props.meeting.id, body);
            window.location.reload();
        }
        catch (err) {
            setErrorMessage(getErrorMessage(err));
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        mapboxgl.accessToken = MAP_BOX_KEY;
        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            placeholder: 'Enter location',

        });

        geocoder.addTo('#location_geocoder');
        geocoder.setInput(props.meeting.location);

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
                    defaultValue={props.meeting.title}
                />
                <p className='error-text'>{errors.title?.message}</p>
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

            <div className='form-row'>
                <div className='form-col'>
                    <label htmlFor='start_time' className='required'>Start time</label>
                    <input
                        name='start_time'
                        type='time'
                        className={`edit-text ${classnames({ 'edit-text--error': errors.start_time })}`}
                        id='start_time'
                        ref={register({
                            required: ErrorMessages.START_TIME_REQUIRED
                        })}
                        defaultValue={props.meeting.unformat_start_time}
                    />
                    <p className='error-text'>{errors.start_time?.message}</p>
                </div>
                <div className='form-col'>
                    <label htmlFor='end_time' className='required'>End time</label>
                    <input
                        name='end_time'
                        type='time'
                        className={`edit-text ${classnames({ 'edit-text--error': errors.end_time })}`}
                        id='end_time'
                        ref={register({
                            required: ErrorMessages.END_TIME_REQUIRED
                        })}
                        defaultValue={props.meeting.unformat_end_time}
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
                    defaultValue={props.meeting.day}
                />
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
                    defaultEditorState={editorState}
                />
            </div>

            <CommonButton
                width='100%'
                type='submit'
                loading={loading}
            >
                Update meeting
            </CommonButton>
        </Form>
    )
}

export default UpdateMeetingForm;