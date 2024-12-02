import React from 'react';
import styled from 'styled-components';

const BottomContainer = styled.div`
  position: absolute; 
  bottom: 0; 
  width: 80%; 
  height: 10vh; // 높이 조정
  background-color: #FF5449;
  display: flex; 
  align-items: center; 
  padding: 10px; 
  box-sizing: border-box; // padding을 포함한 크기 계산
`;

const ProfileImage = styled.img`
  width: 50px; // 프로필 이미지 크기 조정
  height: 50px; // 프로필 이미지 크기 조정
  border-radius: 50%; // 원형으로 만들기
  margin-right: 10px; // 이미지와 이름 사이 간격
`;

const UserInfo = styled.div`
  display: flex; // 플렉스 박스 사용
  flex-direction: column; // 세로로 쌓이게 설정
`
const Name = styled.span`
  font-size: 1.2em; // 이름 크기 조정
  color: #fff; // 텍스트 색상
`;
const Schedule = styled.span`
  font-size: 0.6em; // 이름 크기 조정
  color: #fff; // 텍스트 색상
`
const Photo = styled.img`
  width: 50px; // 사진 크기 조정
  height: 50px; // 사진 크기 조정
  margin-left: 10px; // 이름과 사진 사이 간격
`;

const SideBarBottom = () => {
  return (
    <BottomContainer>
      <ProfileImage src="path_to_profile_image.jpg" alt="Profile" />
      <UserInfo>
        <Name>이름</Name>
        <Schedule>스케쥴(현재 스케쥴)</Schedule>
      </UserInfo>
      <Photo src="/assets/icons/logout.png" alt="logout" />
    </BottomContainer>
  );
}

export default SideBarBottom;
