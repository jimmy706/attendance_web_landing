import React from 'react';
import styled from 'styled-components';
import Notiflix from "notiflix";
import dayjs from 'dayjs';
const ShareMeetingContainer = styled.div`
    display: flex;
    align-items: center;
    font-size: .8rem;
`;

const CopyKeyContainer = styled.div`
    display: flex;
    border-radius: 5px;
    width: 150px;
    margin-left: 10px;
    border: 1px solid #ddd;
    box-sizing:border-box;
`;

const CopyButton = styled.button`
    background: white;
    cursor: pointer;
    border: 0;
    padding: 0;
    border-left: 1px solid #ddd;
    padding: 5px;
`

const CopyInput = styled.input`
    border: 0;
    flex: 1;
    display: inline-block;
    width: 80px;
    padding-left: 10px;
`;

const DatetimeContainer = styled.div`
    margin-top: 20px;
    display: flex;
    color: #586069;
`;

const DescriptionContainer = styled.div`
    margin-top: 40px;
    color: #121212;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 15px;
    line-height: 1.4;
`

function MeetingDetailOverview(props) {
    const { start_time, end_time, day, attendance_key, description } = props.meetingDetail;

    function handleCopyToClipboard() {
        const copyText = document.getElementById('share-meeting-key');
        copyText.select();
        copyText.setSelectionRange(0, 99999);

        document.execCommand("copy");
        Notiflix.Notify.Success('Share key copied to clipboard');
    }

    return (
        <div className='meeting-detail__overview'>
            <ShareMeetingContainer>
                <span>Share this meeting: </span>
                <CopyKeyContainer>
                    <CopyInput id='share-meeting-key' value={attendance_key} readOnly />
                    <CopyButton onClick={handleCopyToClipboard}>
                        <ion-icon name="copy-outline"></ion-icon>
                    </CopyButton>
                </CopyKeyContainer>
            </ShareMeetingContainer>

            <DatetimeContainer>
                <ion-icon style={{ color: '#000' }} name="calendar-outline"></ion-icon>
                <span style={{ marginLeft: '5px' }}>
                    {`${dayjs(day).format("ddd/MM/YYYY")} ${start_time} - ${end_time}`}
                </span>
            </DatetimeContainer>

            <DescriptionContainer dangerouslySetInnerHTML={{ __html: description }} />
        </div>
    )
}

export default MeetingDetailOverview;