import { FC, MouseEvent } from 'react';
import { styled } from 'styled-components';

type UserProfilePhotoProps = {
  width: string;
  userName: string;
  imageUrl: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
};

const UserProfilePhoto: FC<UserProfilePhotoProps> = ({
  width,
  userName,
  imageUrl,
  onClick,
}) => {
  return (
    <S.ProfilePhoto>
      <img
        width={width}
        height={width}
        src={imageUrl}
        alt={`${userName}의 프로필 사진`}
        {...(onClick ? { onClick, role: 'button', tabIndex: 0 } : {})}
      />
    </S.ProfilePhoto>
  );
};

const S = {
  ProfilePhoto: styled.div`
    display: flex;
    border-radius: 50%;
    overflow: hidden;
    /* width: 40px;
        height: 40px; */

    img {
      width: 100%;
    }
  `,
};

export default UserProfilePhoto;
