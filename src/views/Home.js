import React, { useEffect } from 'react';
import Container from '../components/Container/Container';
import Header from '../components/Header/Header';
import MeetingItem from '../components/items/MeetingItem/MeetingItem';
import { MEETING_LIST } from '../constants/datas';
function HomePage() {

    return (
        <div className='home-page'>
            <Header />
            <Container>
                <ul className='attendance-list'>
                    {
                        MEETING_LIST.map(item => (
                            <li key={item.id}>
                                <MeetingItem data={item} />
                            </li>
                        ))
                    }
                </ul>
            </Container>
        </div>
    )
}

export default HomePage;