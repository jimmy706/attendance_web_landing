import React, { useEffect, useState } from 'react';
import { listMyRegisteredMeeting } from '../APIs/meetings';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import Container from '../components/Container/Container';
import ReactPlaceholder from 'react-placeholder/lib';
import MeetingItem from '../components/items/MeetingItem/MeetingItem';

const ContentWrapper = styled.div`
    margin-top: 60px;
    margin-bottom: 60px;
`

function RegisteredMeetingPage() {
    const [loading, setLoading] = useState(true);
    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        fetchRegisteredMeetings();
    }, []);

    async function fetchRegisteredMeetings() {
        const accessToken = JSON.parse(localStorage.getItem('access'));
        try {
            const result = await listMyRegisteredMeeting(accessToken.data);
            setMeetings(result.data);
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    }

    function renderPlaceholder() {
        const results = [];
        for (let i = 0; i < 5; i++) {
            results.push(
                <li style={{ marginBottom: '20px' }} key={i}>
                    <ReactPlaceholder type='media' />
                </li>
            )
        }
        return results;
    }

    function renderMeeting() {
        return (
            meetings.map(item => (
                <li key={item.id}>
                    <MeetingItem data={{ ...item, is_registered: true }} />
                </li>
            ))
        )
    }

    return (
        <div className='registered-meetings-page'>
            <Header />
            <ContentWrapper>
                <Container>
                    <ul>
                        {
                            loading ? renderPlaceholder() : renderMeeting()
                        }
                    </ul>
                </Container>
            </ContentWrapper>
        </div>
    )
}

export default RegisteredMeetingPage;