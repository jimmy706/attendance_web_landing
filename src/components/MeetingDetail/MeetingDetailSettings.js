import React, { useState } from 'react';
import styled from 'styled-components';
import IconButton from '../buttons/IconButton/IconButton';
import Notiflix from 'notiflix';
import { useHistory } from 'react-router-dom';
import { deleteMeeting } from '../../APIs/meetings';
import UpdateMeetingForm from '../forms/UpdateMeetingForm/UpdateMeetingForm';
const SettingSection = styled.div`
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 1;
    margin-bottom: 20px;
    ion-icon {
        font-size: 1.2rem;
    }
`;

const SettingSectionDanger = styled(SettingSection)`
    border-color: #ef5350;
    color: #f73131;
    ion-icon {
        color: #f73131;
    }
`;

function MeetingDetailSetting(props) {
    const history = useHistory();
    const accessToken = JSON.parse(localStorage.getItem('access'));
    const [openUpdateForm, setOpenUpdateForm] = useState(false);

    function handpeUpdateButtonClick() {
        setOpenUpdateForm(!openUpdateForm);
    }

    function handleDeleteMeeting() {
        Notiflix.Confirm.Show('Delete Confirm', 'Are you sure want to delete this meeting?', 'Yes', 'No',
            async function () {
                // Yes call back
                Notiflix.Loading.Standard('Deleting meeting...');

                try {
                    await deleteMeeting(accessToken.data, props.meeting.id);
                    history.push("/home");
                }
                catch (err) {
                    console.log(err);
                }
                finally {
                    Notiflix.Loading.Remove();
                }
            },
            function () {
                // No call back
            });
    }

    return (
        <div className='meeting-detail__settings'>
            <div>
                <div style={{ marginBottom: '20px' }}>
                    <SettingSection>
                        <h4>
                            Update meeting content
                        </h4>
                        <IconButton onClick={handpeUpdateButtonClick}>
                            <ion-icon name="pencil-outline"></ion-icon>
                        </IconButton>
                    </SettingSection>
                    {
                        openUpdateForm && (
                            <div>
                                <UpdateMeetingForm meeting={props.meeting} />
                            </div>
                        )
                    }
                </div>

                <SettingSectionDanger>
                    <h4>
                        Delete this meeting
                    </h4>
                    <IconButton onClick={handleDeleteMeeting}>
                        <ion-icon name="trash-outline"></ion-icon>
                    </IconButton>
                </SettingSectionDanger>
            </div>
        </div>
    )
}

export default MeetingDetailSetting;