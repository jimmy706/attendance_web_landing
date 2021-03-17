import React, { useState, useEffect } from 'react';
import ReactPlaceholder from 'react-placeholder/lib';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { listMyMeetingsAPI } from '../../APIs/meetings';
import CommonButton from '../buttons/CommonButton/CommonButton';

const Wrapper = styled.div`
    background-color: #fff;
    padding: 40px 20px;
    width: 350px;
    position: relative;
    height: 100vh;
    background-color: #f9f9f9;
    overflow: auto;
`;

const SidebarHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    .button {
        display: flex;
        align-items:center;
        font-size: .9rem;
        text-transform: initial;
        padding: 5px 10px;
        ion-icon{
            margin-right: 5px;
            font-size: 1.1rem;
        }
    }
`;

const SidebarMeetingList = styled.ul`
    margin-top: 20px;
`;

const SidebarMeetingItem = styled.li`
    display: block;
    line-height: 2;
    a{
        display: flex;
        align-items: center;        
    }
    span {
        margin-left: 5px;
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #3b54a3;
        &:hover {
            text-decoration: underline;
        }
    }
`

function MyMeetingSidebar(props) {
    const [loading, setLoading] = useState(true);
    const [meetings, setMeetings] = useState([]);
    const [allMeetings, setAllMeetings] = useState([]);
    useEffect(() => {
        fetchMyMeetings()
    }, []);

    async function fetchMyMeetings() {
        const accessToken = JSON.parse(localStorage.getItem('access'));
        if (accessToken) {
            try {
                const result = await listMyMeetingsAPI(accessToken.data);
                setMeetings(result.data.results);
                setAllMeetings(result.data.results);
            }
            catch (err) {
                console.log(err);
            }
            finally {
                setLoading(false)
            }
        }
    }

    function handleSearch(e) {
        const value = e.target.value;
        const pattern = new RegExp(value, 'i');
        setMeetings(allMeetings.filter(meeting => pattern.test(meeting.title)));
    }

    function renderMeetings() {
        return meetings.map(meeting => (
            <SidebarMeetingItem key={meeting.id}>
                <Link title={meeting.title} to={`/meeting/${meeting.id}`}>
                    <ion-icon name="folder-open-outline"></ion-icon>
                    <span>{meeting.title}</span>
                </Link>
            </SidebarMeetingItem>
        ))
    }

    return (
        <Wrapper>
            <SidebarHeader>
                <h4>
                    My meetings
                </h4>
                <Link to='/create-new'>
                    <CommonButton buttonType='success'>
                        <ion-icon name="document-text-outline"></ion-icon> New
                    </CommonButton>
                </Link>
            </SidebarHeader>
            <div>
                <input onChange={handleSearch} type='text' className='edit-text' placeholder='Find a meeting' />
            </div>
            <SidebarMeetingList>
                {!loading ? renderMeetings() : <ReactPlaceholder type='text' rows={6} />}
            </SidebarMeetingList>
        </Wrapper>
    )
}

export default MyMeetingSidebar;