import React, { useEffect, useState } from 'react';
import { listMeetingsAPI } from '../APIs/meetings';
import Container from '../components/Container/Container';
import Header from '../components/Header/Header';
import MeetingItem from '../components/items/MeetingItem/MeetingItem';
import ReactPlaceholder from 'react-placeholder';
import CommonButton from '../components/buttons/CommonButton/CommonButton';

function HomePage() {
    const [mettingList, setMeetingList] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalPage, setTotalPage] = useState(1);


    useEffect(() => {
        fetchMeeting();
    }, []);

    async function fetchMeeting() {
        const accessToken = JSON.parse(localStorage.getItem('access'));
        if (accessToken) {
            setLoading(true);
            try {
                const result = await listMeetingsAPI(accessToken.data);
                setMeetingList(result.data.results);
                setTotalPage(result.data.num_pages);
            }
            catch (err) {
                console.log(err);
            }
            finally {
                setLoading(false);
            }
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

    return (
        <div className='home-page'>
            <Header />
            <Container>
                <ul className='attendance-list'>
                    {
                        loading ? (
                            renderPlaceholder()
                        )
                            : mettingList.map(item => (
                                <li key={item.id}>
                                    <MeetingItem data={item} />
                                </li>
                            ))
                    }
                    {
                        totalPage > page ? (
                            <li>
                                <CommonButton width='100%' >Load more</CommonButton>
                            </li>
                        )
                            : null
                    }
                </ul>
            </Container>
        </div>
    )
}

export default HomePage;