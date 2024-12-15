import styled from 'styled-components';
import { colors, padding, border } from '../../../../styles';
import PokemonLogo from '../../../../assets/pokemonBall.svg';

const BrandLogo = ({ style }: BrandLogoProps) => {
  const { padding } = style;

  return (
    <S.Logo padding={padding}>
      <div className="logo-image">
        <img src={PokemonLogo} alt="Pokemon ERP" />
      </div>
      <div className="logo-text">Pokemon ERP</div>
    </S.Logo>
  );
};

type BrandLogoProps = {
  style: {
    padding: string;
  };
};

type LogoProps = {
  padding: string;
};

const S = {
  Logo: styled.article<LogoProps>`
    display: flex;
    align-items: center;
    gap: ${padding.md};
    border-bottom: ${border.default};
    height: 80px;
    padding: ${(props) => props.padding};

    .logo-image {
      height: 40px;

      img {
        height: 100%;
      }
    }

    .logo-text {
      color: ${colors.semantic.primary};
      font-weight: 500;
      font-size: 24px;
    }
  `,
};

export default BrandLogo;
