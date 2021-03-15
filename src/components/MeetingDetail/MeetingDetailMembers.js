import React, { useState, useEffect } from 'react';
import { getMeetingMembers } from '../../APIs/meetings';
import styled from 'styled-components';
import MeetingMember from '../items/MeetingMember/MeetingMember';
import MemberLoadingPlaceholder from '../placeholders/MemberLoadingPlaceHolder';

const MemberListWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2,1fr);
    grid-gap: 30px;
`

function MeetingDetailMembers(props) {
    const [loading, setLoading] = useState(true);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        fetchMeetingMembers()
    }, []);

    function renderMeetingMembers() {
        return members.map(member => <MeetingMember isHost={props.meeting.is_host} key={member.id} data={member} />)
    }

    async function fetchMeetingMembers() {
        try {
            const result = await getMeetingMembers(props.meeting.id);
            setMembers(result.data)
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    }

    function renderLoading() {
        let result = [];
        for (let i = 0; i < 6; i++) {
            result.push(<MemberLoadingPlaceholder />)
        }

        return result;
    }


    return (
        <div className='meeting-detail__members'>
            {

                <MemberListWrapper>
                    {loading ? renderLoading() : renderMeetingMembers()}
                </MemberListWrapper>
            }
        </div>
    )
}

export default MeetingDetailMembers;