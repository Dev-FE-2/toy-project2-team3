import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import type { RootState } from '../../../state/store';
import { colors, font, padding } from '../../../styles';
import UserProfilePhoto from '../../UserProfilePhoto';
import defaultImage from 'public/avatar.svg';
import { URL } from '../../../constant';

type UserStatusProps = {
  style: {
    padding: string;
  };
};

const UserStatus = ({ style }: UserStatusProps) => {
  const { padding } = style;

  const navigate = useNavigate();
  const { isLoggedIn, userInfo } = useSelector(
    (state: RootState) => state.user
  );

  const handleProfile = () => {
    navigate(URL.profile.link);
  };

  return isLoggedIn ? (
    <S.UserStatus padding={padding}>
      <UserProfilePhoto
        width="50"
        imageUrl={userInfo.profileImgUrl ?? defaultImage}
        userName={userInfo.name ?? '알 수 없는 사용자'}
        onClick={handleProfile}
      />
      <div className="user-state">
        <span className="user-name">
          {userInfo.name} {userInfo.position}
        </span>
        <span className="state-info">
          {userInfo.team} {userInfo.department}
        </span>
      </div>
    </S.UserStatus>
  ) : (
    <p>사용자 정보가 없습니다.</p>
  );
};

const S = {
  UserStatus: styled.article<{ padding: string }>`
    display: flex;
    align-items: center;
    gap: ${padding.md};
    padding: ${(props) => props.padding};

    .user-state {
      display: flex;
      flex-direction: column;
      gap: ${padding.sm};
      line-height: 1;

      .user-name {
        font-weight: 500;
        color: ${colors.semantic.text.dark};
      }

      .state-info {
        font-size: ${font.size.info};
      }
    }
  `,
};

export default UserStatus;
