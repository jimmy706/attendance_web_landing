import React from 'react';
import ReactPlaceholder from 'react-placeholder';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
`;

const ContentWrapper = styled.div`
    margin-left: 10px;
    display: block
`

function MemberLoadingPlaceHolder() {
    return (
        <Wrapper>
            <ReactPlaceholder showLoadingAnimation={true} type='round' style={{ width: 40, height: 40 }} />
            <ContentWrapper>
                <ReactPlaceholder showLoadingAnimation={true} type='textRow' style={{ width: 100, height: 10, marginBottom: '5px' }} />
                <ReactPlaceholder showLoadingAnimation={true} type='textRow' style={{ width: 60, height: 10, margin: 0 }} />
            </ContentWrapper>
        </Wrapper>
    )
}

export default MemberLoadingPlaceHolder;