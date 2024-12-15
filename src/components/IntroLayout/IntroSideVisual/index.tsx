import { styled } from 'styled-components';
import { colors, font, padding } from '../../../styles';
import pokemonBall from '../../../assets/pokemonball.svg';

const IntroSideVisual = () => {
  return (
    <S.VisualContainer>
      <figure>
        <img src={pokemonBall} alt="사이트 로고" />
        <figcaption>Pokemon-ERP</figcaption>
      </figure>
    </S.VisualContainer>
  );
};

const S = {
  VisualContainer: styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${padding.md};
    background-color: ${colors.semantic.primary};
    color: ${colors.semantic.text.light};
    text-align: center;
    font-size: ${font.size.heading};
    font-weight: ${font.weight.heading};

    @media (max-width: 768px) {
      height: 80px;
    }

    figure {
      width: 80%;
      height: 100%;
      max-width: 400px;
      display: flex;
      flex-direction: column;
      gap: ${padding.xl};
      align-items: center;
      justify-content: center;

      img {
        width: 100%;
      }

      @media (max-width: 768px) {
        width: 100%;
        flex-direction: row;

        img {
          height: 100%;
          flex-basis: content;
        }
      }
    }
  `,
};

export default IntroSideVisual;
