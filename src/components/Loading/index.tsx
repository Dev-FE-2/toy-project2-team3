import { styled, keyframes } from 'styled-components';
import { padding, colors } from '../../styles';

const Loading = () => {
  return (
    <S.SpinnerContainer>
      <div className="spinner"></div>
    </S.SpinnerContainer>
  );
};

const spin = keyframes`
  0% {
      transform: rotate(0deg);
  }

  100% {
      transform: rotate(360deg);
  }
`;

const S = {
  SpinnerContainer: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${padding.xl};

    .spinner {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 5px solid ${colors.semantic.border};
      border-top: 5px solid ${colors.semantic.tertiary};
      animation: ${spin} 1s linear infinite;
    }
  `,
};

export default Loading;