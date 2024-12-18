import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import type { RootState } from '../../../state/store';
import { colors, font, padding } from '../../../styles';
import UserProfilePhoto from '../../UserProfilePhoto';
import LoggoutButton from './LoggoutButton';
import defaultImage from 'public/avatar.svg';

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
    navigate('/editProfile');
  };

  return isLoggedIn ? (
    <S.UserStatusWrap padding={padding}>
      <S.UserStatus>
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
      <LoggoutButton />
    </S.UserStatusWrap>
  ) : (
    <p>사용자 정보가 없습니다.</p>
  );
};

const S = {
  UserStatusWrap: styled.article<UserStatusProps['style']>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${(props) => props.padding};
  `,
  UserStatus: styled.article`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${padding.md};

    .user-state {
      display: flex;
      flex-direction: column;
      gap: ${padding.sm};
      line-height: 1;

      .user-name {
        font-weight: 500;
      }

      .state-info {
        font-size: ${font.size.info};
        color: ${colors.semantic.info};
      }
    }
  `,
  LoggoutButton: styled.button`
    .material-symbols-outlined {
      font-size: 42px; // 아이콘 크기 조정
      margin-left: 10px; // 왼쪽 여백 추가
      cursor: pointer; // 커서 변경
    }
  `,
};

export default UserStatus;
