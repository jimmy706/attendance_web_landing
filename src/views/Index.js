import React from 'react';
import LoginForm from '../components/forms/LoginForm/LoginForm';

function IndexPage() {
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