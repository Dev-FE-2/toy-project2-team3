import styled from 'styled-components';
import { border, colors, padding } from '../../../../../styles';
import AddScheduleModalContents from './AddScheduleModalContents';
import { MouseEvent } from 'react';

type AddScheduleModalProps = {
  setIsAddScheduleModalOpen: (isOpen: boolean) => void;
};

const AddScheduleModal = ({
  setIsAddScheduleModalOpen,
}: AddScheduleModalProps) => {
  const handleOnCloseModal = () => {
    setIsAddScheduleModalOpen(false);
  };

  const handleBackgroundClick = () => {
    handleOnCloseModal();
  };

  const handleWrapperClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <S.ModalBackground onClick={handleBackgroundClick}>
      <S.ModalWrapper onClick={handleWrapperClick}>
        <S.CloseIcon
          onClick={handleOnCloseModal}
          className="material-symbols-outlined"
        >
          close
        </S.CloseIcon>
        <AddScheduleModalContents />
      </S.ModalWrapper>
    </S.ModalBackground>
  );
};

const S = {
  ModalBackground: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100dvw;
    height: 100dvh;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
  `,
  ModalWrapper: styled.div`
    position: relative;
    background-color: ${colors.semantic.light};
    width: 333px;
    /* height: 555px; */
    border-radius: ${border.radius.xs};
    padding: ${padding.md};
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,

  CloseIcon: styled.div`
    position: absolute;
    right: 16px;
    cursor: pointer;
  `,
};

export default AddScheduleModal;
