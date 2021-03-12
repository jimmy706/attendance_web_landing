import React from 'react';
import Container from '../components/Container/Container';
import CreateMeetingForm from '../components/forms/CreateMettingForm/CreateMeetingForm';
import Header from '../components/Header/Header';

function CreateMeeting() {
    return (
        <div className='create-metting-page'>
            <Header />
            <Container>
                <div style={{ margin: '60px 0' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '60px' }}>Create new meeting</h2>
                    <CreateMeetingForm />
                </div>
            </Container>
        </div>
    )
}

export default CreateMeeting;