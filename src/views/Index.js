import React, { useEffect } from 'react';
import LoginForm from '../components/forms/LoginForm/LoginForm';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import qs from 'query-string';

function IndexPage() {
    const userState = useSelector(state => state.userState);
    const { redir } = (qs.parse(window.location.search))
    const history = useHistory();

    useEffect(() => {
        if (userState.isLogin) {
            history.push(redir ? redir : '/home');
        }
    }, []);


    return (
        <div className='index-page'>
            <div style={{
                width: '100%',
                maxWidth: '400px'
            }}>
                <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>LOGIN</h2>
                <LoginForm />
            </div>
        </div>
    )
}

export default IndexPage;