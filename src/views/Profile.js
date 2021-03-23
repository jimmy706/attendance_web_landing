import React, { useEffect } from "react";
import Header from "../components/Header/Header";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Container from "../components/Container/Container";
import CommonButton from "../components/buttons/CommonButton/CommonButton";

const ProfilePageContent = styled.div`
  margin-top: 60px;
`;

const ProfileWrapper = styled.div`
  position: relative;
  background-color: #fff;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
`;

const Background = styled.div`
  background-color: #ddd;
  width: 100%;
  height: 200px;
  position: relative;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid #fff;
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translate(-50%, -50%);
`;

const UpdateProfileButtonWrapper = styled.div`
  position: absolute;
  top: 140px;
  right: 20px;
`;

const ProfileInfoWrapper = styled.div`
  margin: 60px auto 30px auto;
  width: 400px;
  text-align: center;
  .username {
    margin: 5px 0;
    line-height: 1;
  }
  .full_name {
      color: #131313;
      margin: 0;
      line-height: 1;
  }
  .description{
    margin-top: 30px;
  }
`;

function ProfilePage() {
  useEffect(() => {}, []);

  return (
    <div className="profile-page">
      <Header />
      <ProfilePageContent>
        <Container>
          <ProfileWrapper>
            <Background>
              <UpdateProfileButtonWrapper>
                <CommonButton buttonType="outline">Update profile</CommonButton>
              </UpdateProfileButtonWrapper>
              <Avatar
                src={`https://ui-avatars.com/api/?name=Dung Dang&background=0D8ABC&color=fff`}
              />
            </Background>

            <ProfileInfoWrapper>
              <h2 className='username'>B1709272</h2>
              <p className='full_name'>Dang Quoc Dung</p>
              <div className='description'>
              Etiam dignissim diam quis enim lobortis scelerisque. Nunc mattis enim ut tellus elementum sagittis. Elit pellentesque habitant morbi tristique senectus et netus et. Cras ornare arcu dui vivamus arcu felis. Ipsum dolor sit amet consectetur. Leo urna molestie at elementum eu. Ut lectus arcu bibendum at varius vel. Amet consectetur adipiscing elit duis tristique.
              </div>
            </ProfileInfoWrapper>
          </ProfileWrapper>
        </Container>
      </ProfilePageContent>
    </div>
  );
}

export default ProfilePage;
