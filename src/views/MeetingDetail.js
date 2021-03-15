import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import { useParams } from 'react-router-dom';
import { getMeetingDetail } from '../APIs/meetings';
import Tabs from '../components/Tabs/Tabs';
import styled from 'styled-components';
import ReactPlaceholder from 'react-placeholder/lib';
import { Link } from 'react-router-dom';
import CommonButton from '../components/buttons/CommonButton/CommonButton';
import MeetingDetailOverview from '../components/MeetingDetail/MeetingDetailOverview';
import Container from '../components/Container/Container';
import MeetingDetailMembers from '../components/MeetingDetail/MeetingDetailMembers';
import MemberLoadingPlaceHolder from '../components/placeholders/MemberLoadingPlaceHolder';

const TabContainer = styled.div`
    margin-top: 20px;
    margin-bottom: 40px;
`;
const IntroContentContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items:center;
`

const meetingOptions = [
    {
        content: 'Overview',
        icon: <ion-icon name="eye-outline"></ion-icon>
    },
    {
        content: 'Members',
        icon: <ion-icon name="people-outline"></ion-icon>
    },
]

const ACTIVE_TAB_VALUES = {
    OVERVIEW: 0,
    MEMBERS: 1,
    SETTINGS: 2
}

function MeetingDetailPage() {
    const { meetingId } = useParams();
    const [loading, setLoading] = useState(true);
    const [meetingDetail, setMeetingDetail] = useState(null);
    const [activeTab, setActiveTab] = useState(ACTIVE_TAB_VALUES.OVERVIEW);

    useEffect(() => {
        const accessToken = JSON.parse(localStorage.getItem('access'));
        if (accessToken) {
            const token = accessToken.data;
            fetchMeetingDetail(token);
        }
    }, []);

    async function fetchMeetingDetail(token) {
        try {
            const result = await getMeetingDetail(token, meetingId);
            setMeetingDetail(result.data);
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    }

    function handleChangeTab(position) {
        setActiveTab(position);
    }

    function getMeetingTabs() {
        let results = [...meetingOptions];
        if (meetingDetail != null && meetingDetail.is_host) {
            results.push({
                content: 'Settings',
                icon: <ion-icon name="settings-outline"></ion-icon>
            })
        }
        return results;
    }

    function renderTabContent() {
        switch (activeTab) {
            default:
                return !loading && meetingDetail ? (<MeetingDetailOverview meetingDetail={meetingDetail} />) : <ReactPlaceholder showLoadingAnimation={true} type='text' rows={6} />
            case ACTIVE_TAB_VALUES.MEMBERS:
                return <MeetingDetailMembers meeting={meetingDetail} />
        }
    }

    return (
        <div className='meeting-detail'>
            <Header />
            <div className='meeting-detail__content'>
                <div className='meeting-detail__header'>
                    {
                        !loading && meetingDetail ? (
                            <div className='meeting-detail__intro container1'>
                                <h2>{meetingDetail.title}</h2>
                                <IntroContentContainer>
                                    <div className='creator'>
                                        <Link to={`/user/${meetingDetail.creator.account.id}`}>
                                            <img src={`https://ui-avatars.com/api/?name=${meetingDetail.creator.full_name}&background=0D8ABC&color=fff`} />
                                        </Link>
                                        <div>
                                            <strong>
                                                <Link to={`/user/${meetingDetail.creator.account.id}`}>
                                                    {meetingDetail.creator.account.username}
                                                </Link>
                                            </strong>
                                            <small>
                                                {meetingDetail.creator.full_name}
                                            </small>
                                        </div>
                                    </div>
                                    <CommonButton
                                        buttonType={meetingDetail.is_registered ? 'outlined' : 'default'}
                                    >
                                        {meetingDetail.is_registered ? 'Leave' : 'Join'}
                                    </CommonButton>
                                </IntroContentContainer>
                            </div>
                        )
                            : (
                                <div className='container1'>
                                    <ReactPlaceholder type='textRow' style={{ width: 200, marginBottom: '10px' }} />
                                    <MemberLoadingPlaceHolder />
                                </div>
                            )
                    }
                    <TabContainer>
                        <Tabs
                            tabs={getMeetingTabs()}
                            activePosition={activeTab}
                            onChangeTab={handleChangeTab}
                        />
                    </TabContainer>
                </div>
                <div className='meeting-detail__body'>
                    <Container>
                        {renderTabContent()}
                    </Container>
                </div>

            </div>
        </div>
    )
}

export default MeetingDetailPage;