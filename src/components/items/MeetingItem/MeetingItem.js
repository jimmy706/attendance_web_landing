import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CommonButton from '../../buttons/CommonButton/CommonButton';
import dayjs from 'dayjs';
import { joinMeeting, leaveMeeting } from '../../../APIs/meetings';
function MeetingItem(props) {

    const {
        title,
        description,
        start_time,
        end_time,
        day,
        creator,
        id,
        is_registered
    } = props.data;
    const [loading, setLoading] = useState(false);
    const [isJoined, setIsJoined] = useState(is_registered);

    async function handleJoinBtnClick(e) {
        setLoading(true);
        e.preventDefault();
        const accessToken = JSON.parse(localStorage.getItem('access'));
        const token = accessToken.data;
        try {
            if (!isJoined) {
                const result = await joinMeeting(token, id);
                console.log(result);
            }
            else {
                const result = await leaveMeeting(token, id);
                console.log(result);
            }
            setIsJoined(!isJoined);
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className='meeting-item'>
            <div className='meeting-item__creator'>
                <Link
                    to={`/user/${creator.account.username}`}
                >
                    <img className='avatar' src={`https://ui-avatars.com/api/?name=${creator.full_name}&background=0D8ABC&color=fff`} />
                </Link>
                <div>
                    <Link to={`/user/${creator.account.username}`}>
                        {creator.account.username}
                    </Link>
                    <small>
                        {creator.full_name}
                    </small>
                </div>
            </div>
            <div
                className='meeting-item__header'
            >
                <h4 className='meeting-item__title'>
                    <Link
                        to={`/meeting/${id}`}
                    >
                        {title}
                    </Link>
                </h4>
                <div>
                    <CommonButton onClick={handleJoinBtnClick} loading={loading} buttonType={isJoined ? 'outlined' : 'default'}>
                        {isJoined ? "Leave" : "Join"}
                    </CommonButton>
                </div>
            </div>
            <div className='meeting-item__body'>
                <div className='meeting-item__time'>
                    <ion-icon name="calendar-outline"></ion-icon>
                    <span>
                        {`${dayjs(day).format("ddd/MM/YYYY")}, ${start_time} - ${end_time}`}
                    </span>
                </div>
                <p className='meeting-item__desc'>
                    {description}
                </p>
            </div>
        </div>
    )
}

export default MeetingItem;