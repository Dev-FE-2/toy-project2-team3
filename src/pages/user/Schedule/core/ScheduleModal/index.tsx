import styled from 'styled-components';
import { border, colors, padding } from '../../../../../styles';
import { MouseEvent } from 'react';
import ScheduleModalContents from './ScheduleModalContents';
import { useDispatch } from 'react-redux';
import { setIsModalOpen } from '../../../../../slices/schedule/scheduleSlice';

const ScheduleModal = () => {
  const dispatch = useDispatch();

  const handleOnCloseModal = () => {
    dispatch(setIsModalOpen(false));
  };

  const handleWrapperClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <S.ModalBackground onClick={handleOnCloseModal}>
      <S.ModalWrapper onClick={handleWrapperClick}>
        <S.CloseIcon
          onClick={handleOnCloseModal}
          className="material-symbols-outlined"
        >
          close
        </S.CloseIcon>
        <ScheduleModalContents handleOnCloseModal={handleOnCloseModal} />
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

export default ScheduleModal;
