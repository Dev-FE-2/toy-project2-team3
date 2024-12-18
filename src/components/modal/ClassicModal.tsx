import { ReactNode } from 'react';
import { styled } from 'styled-components';
import { colors } from '../../styles';

interface ClassicModalProps {
  children: ReactNode;
}

const ClassicModal = ({ children }: ClassicModalProps) => {
  return <S.ClassicModal>{children}</S.ClassicModal>;
};

const S = {
  ClassicModal: styled.dialog`
    width: 100%;
    background-color: ${colors.semantic.background.light};
  `,
};

export default ClassicModal;
