import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { searchMeeting } from '../../APIs/meetings';

const SearchFormWrapper = styled.form`
    position: relative;
`;

const SearchInput = styled.input`
    width: 200px;
    transition: width .3s ease;
    &:focus {
        width: 400px;
    }
`;

const SearchIcon = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    height: calc(100%- 2px);
    transform: translateY(-50%);
    top: 50%;
    right: 5px;
    display: flex;
    align-items: center;
    background-color: white;
`;

const SearchResultList = styled.ul`
    position: absolute;
    top: 110%;
    box-shadow: 0 0 5px 2px rgba(0,0,0,.1);
    border-radius: 3px;
    overflow: hidden;
    z-index: 50;
    width: 100%;
`;

const SearchResultItem = styled.li`
    cursor: pointer;
    a {
        display: block;
        width: 100%;
        padding: 2px 10px;
        background: #fff;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &:hover {
            background: #3b54a3;
            color: #fff;
        }
    }
`;

function HeaderSearch() {
    const [searchValue, setSearchValue] = useState("");
    const [meetings, setMeetings] = useState([]);
    async function handleSearch(e) {
        const value = e.target.value;
        setSearchValue(value);
        if (value !== '') {
            try {
                const searchResult = await searchMeeting(value);
                setMeetings(searchResult.data);
            }
            catch (err) {
                console.log(err);
            }
        }
        else {
            setMeetings([])
        }
    }

    function renderMeeting() {
        return meetings.map(meeting => (
            <SearchResultItem key={meeting.id}>
                <Link to={`/meeting/${meeting.id}`}>
                    {meeting.creator.account.username}/{meeting.title}
                </Link>
            </SearchResultItem>
        ))
    }

    return (
        <SearchFormWrapper className='header__search'>
            <SearchInput value={searchValue} onChange={handleSearch} className='edit-text' placeholder='Search meeting' />
            <SearchIcon>
                <ion-icon name="search-outline"></ion-icon>
            </SearchIcon>
            {meetings.length > 0 && (
                <SearchResultList>
                    {renderMeeting()}
                </SearchResultList>
            )}
        </SearchFormWrapper>
    )
}

export default HeaderSearch;