import React from 'react';
import styled from 'styled-components';
import IconButton from '../../buttons/IconButton/IconButton';
import VisibleToggle from '../../VisibleToggle/VisibleToggle';

const Wrapper = styled.div`
    display: flex;
    justify-center: space-between;
    max-width: 400px;
    background-color: #f9f9f9;
    border-radius: 10px;
    align-items: center;
    padding: 15px 20px;
`;
const Avatar = styled.img`
    display: inline-block;
    border-radius: 50%;
    margin-right: 15px;
    width: 40px;
    height: 40px;
`;

const MemberTitle = styled.strong`
    color: #121212;
    &:hover{
        color: #3b54a3;
    }
    font-size: 1.1rem;
    margin: 0;
    display: block;
`;

const MemberFullname = styled.small`
    color: #434343;
    display: block;
    line-height: 1;
`;

const IconWrapper = styled.div`
    margin-left: auto;
`;

const MemberMenu = styled.ul`
    display: flex;
    flex-direction: column;
    white-space: nowrap;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 1px 1px 5px 1px rgba(0,0,0,.1);
`

const MemberMenuItem = styled.li`
    display: block;
    background-color: #fff;
    cursor: pointer;
    padding: 10px 15px;
    &:hover {
        background-color: #eee;
    }
`;

const CheckboxJoined = styled.input`
    display: block;
    margin-right: 15px;
`

function MeetingMember(props) {
    const { enroller, joined } = props.data;

    async function handleRemoveMember() {

    }

    function renderHiddenMenu() {
        return (
            <MemberMenu>
                <MemberMenuItem>
                    Remove from meeting
                </MemberMenuItem>
            </MemberMenu>
        )
    }

    return (
        <Wrapper>
            <CheckboxJoined type='checkbox' checked={joined} readOnly disabled />
            <Avatar src={`https://ui-avatars.com/api/?name=${enroller.first_name + " " + enroller.last_name}&background=0D8ABC&color=fff`} />
            <div>
                <a href="#">
                    <MemberTitle>
                        {enroller.username}
                    </MemberTitle>
                </a>
                <MemberFullname>
                    {`${enroller.first_name} ${enroller.last_name}`}
                </MemberFullname>
            </div>
            {
                props.isHost && (
                    <IconWrapper>
                        <VisibleToggle toggler={
                            <IconButton>
                                <ion-icon name="ellipsis-vertical-outline"></ion-icon>
                            </IconButton>
                        }>
                            {renderHiddenMenu()}
                        </VisibleToggle>
                    </IconWrapper>
                )
            }
        </Wrapper>
    )
}

export default MeetingMember;