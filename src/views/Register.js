import React from 'react';
import RegisterForm from '../components/forms/RegisterForm/RegisterForm';


function RegisterPage() {

    return (
        <div className='register-page'>
            <div style={{
                width: '100%',
                maxWidth: '400px'
            }}>
                <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>CREATE ACCOUNT</h2>
                <RegisterForm />
            </div>
        </div>
    )
}

export default RegisterPage;
