import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { URL } from '../../../constant';
import { colors, padding } from '../../../styles';
import LogoImage from '../../../assets/pokemonBall.svg';

interface BrandLogoProps {
  style: {
    padding: string;
  };
}

const BrandLogo = ({ style }: BrandLogoProps) => {
  const { padding } = style;

  return (
    <Link to={URL.index.link}>
      <S.Logo padding={padding}>
        <div className="logo-image">
          <img src={LogoImage} alt="" />
        </div>
        <div className="logo-text">Pokemon ERP</div>
      </S.Logo>
    </Link>
  );
};

const S = {
  Logo: styled.article<BrandLogoProps['style']>`
    display: flex;
    align-items: center;
    /* justify-content: center; */
    gap: ${padding.md};
    height: 80px;
    padding: ${(props) => props.padding};

    .logo-image {
      height: 40px;

      img {
        height: 100%;
      }
    }

    .logo-text {
      color: ${colors.semantic.text.dark};
      font-weight: 500;
      font-size: 20px;
      line-height: 1;
    }
  `,
};

export default BrandLogo;
