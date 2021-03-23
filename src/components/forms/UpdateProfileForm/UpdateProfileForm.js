import React from 'react';
import { useForm } from 'react-hook-form';
import CommonButton from '../../buttons/CommonButton/CommonButton';
import { useSelector } from 'react-redux';

function UpdateProfileForm(props) {
    const { register, handleSubmit, errors } = useForm();
    const userState = useSelector(state => state.userState);
    return (
        <form>
            <CommonButton type='submit' width='100%'>
                Update profile
            </CommonButton>
        </form>
    )
}

export default UpdateProfileForm