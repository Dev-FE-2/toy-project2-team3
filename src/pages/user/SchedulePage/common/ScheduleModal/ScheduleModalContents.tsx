import { useState } from 'react';
import { saveDataToDB } from '../../../../../utils';
import FileUploading from '../../../../../components/FileUploading';
import Button from '../../../../../components/form/Button';
import { border, colors, padding } from '../../../../../styles';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../../../state/store';
import { setModalType } from '../../../../../slices/schedule/scheduleSlice';
import type { ModalType } from '../../../../../types/schedule';
import { useFetchUserInfo } from '../../../../../hooks';
import { COLLECTION_NAME } from '../../../../../constant';
import { Loading } from '../../../../../components';
import { useSchedule } from '../../../../../hooks/useSchedule';
import { useScheduleValidation } from '../../../../../hooks/useScheduleValidation';
import { useScheduleForm } from '../../../../../hooks/useScheduleForm';

interface ScheduleModalContentsProps {
  handleOnCloseModal: () => void;
}

const ScheduleModalContents = ({
  handleOnCloseModal,
}: ScheduleModalContentsProps) => {
  const dispatch = useDispatch();
  const { targetSchedule, modalType } = useSelector(
    (state: RootState) => state.schedule
  );
  const {
    userInfo,
    isLoading: isUserFetchLoading,
    error: userFetchError,
  } = useFetchUserInfo();
  const {
    scheduleData = [],
    isLoading: isScheduleFetchLoading,
    error: scheduleFetchError,
    mutate,
  } = useSchedule();
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isFetchLoading = isUserFetchLoading || isScheduleFetchLoading;
  const hasFetchError = userFetchError || scheduleFetchError;
  const { isValidSchedule, timeError } = useScheduleValidation();
  const {
    title,
    setTitle,
    startedAt,
    setStartedAt,
    endedAt,
    setEndedAt,
    detail,
    documentName,
    setDocumentName,
    documentUrl,
    setDocumentUrl,
    titleError,
    detailError,
    textareaRef,
    resetForm,
    onChangeTextarea,
    validateForm,
    scheduleDataEntry,
  } = useScheduleForm(
    modalType === 'R' || modalType === 'U'
      ? { initialSchedule: targetSchedule }
      : {}
  );

  const handleFileDownload = (fileUrl: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const editSchedule = async () => {
    try {
      if (isUploading) return;

      setIsLoading(true);

      if (!validateForm()) return;

      const newScheduleEntry = {
        ...scheduleDataEntry,
        documentName: documentName || '',
        documentUrl: documentUrl || '',
        updatedAt: '',
      };

      if (modalType === 'C') {
        const userId = userInfo && userInfo.userId;

        const existingUserSchedule = scheduleData.find(
          (data) => data.userId === userId
        );

        if (
          existingUserSchedule &&
          !isValidSchedule(existingUserSchedule.scheduleList, newScheduleEntry)
        ) {
          return;
        }

        if (existingUserSchedule) {
          await saveDataToDB({
            table: COLLECTION_NAME.schedule,
            key: `${existingUserSchedule.id}/scheduleList`,
            data: [...existingUserSchedule.scheduleList, newScheduleEntry],
          });
        } else {
          await saveDataToDB({
            table: COLLECTION_NAME.schedule,
            data: {
              userId,
              scheduleList: [newScheduleEntry],
            },
          });
        }
      } else if (modalType === 'U') {
        const updatedScheduleEntry = {
          ...newScheduleEntry,
          createdAt: targetSchedule.createdAt,
          updatedAt: new Date().toISOString(),
        };

        if (!isValidSchedule([targetSchedule], updatedScheduleEntry)) {
          return;
        }

        const updatedScheduleList = scheduleData
          .find((data) => data.id === targetSchedule.id)
          ?.scheduleList.map((schedule) => {
            if (schedule.createdAt === targetSchedule.createdAt) {
              return updatedScheduleEntry;
            }
            return schedule;
          });

        await saveDataToDB({
          table: COLLECTION_NAME.schedule,
          key: `${targetSchedule.id}/scheduleList`,
          data: updatedScheduleList,
        });
      }

      resetForm();
      handleOnCloseModal();
      await mutate();
    } catch (error) {
      console.error('일정 등록 및 수정 중 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSchedule = async () => {
    try {
      setIsLoading(true);

      const clearScheduleEntry = {
        title: '',
        startedAt: '',
        endedAt: '',
        detail: '',
        documentName: '',
        documentUrl: '',
        createdAt: '',
        updatedAt: '',
      };

      const updatedScheduleList = scheduleData
        .find((data) => data.id === targetSchedule.id)
        ?.scheduleList.map((schedule) => {
          if (schedule.createdAt === targetSchedule.createdAt) {
            return clearScheduleEntry;
          }
          return schedule;
        });

      if (confirm('일정을 삭제하시겠습니까?')) {
        await saveDataToDB({
          table: 'Schedule',
          key: `${targetSchedule.id}/scheduleList`,
          data: updatedScheduleList,
        });
      }

      await mutate();
      handleOnCloseModal();
    } catch (error) {
      console.error('일정 삭제 중 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditMode = () => {
    dispatch(setModalType('U'));
  };

  if (isFetchLoading) return <Loading />;
  if (hasFetchError) return <div>오류 발생</div>;

  return (
    <>
      <div style={{ fontSize: '20px', fontWeight: '700' }}>
        {modalType === 'R' && `${targetSchedule.name}님의 일정`}
        {modalType === 'C' && `새로운 일정 등록`}
        {modalType === 'U' && `${targetSchedule.name}님의 일정 수정`}
      </div>
      <div>제목</div>
      <S.Input
        modalType={modalType}
        readOnly={modalType === 'R'}
        value={modalType === 'R' ? targetSchedule.title : title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="일정 제목"
      />
      <div style={{ color: colors.semantic.danger, fontSize: '12px' }}>
        {titleError}
      </div>
      <div>시작 시간</div>
      <S.Input
        modalType={modalType}
        readOnly={modalType === 'R'}
        value={modalType === 'R' ? targetSchedule.startedAt : startedAt}
        onChange={(e) => setStartedAt(e.target.value)}
        type="datetime-local"
      />
      <div>종료 시간</div>
      <S.Input
        modalType={modalType}
        readOnly={modalType === 'R'}
        value={modalType === 'R' ? targetSchedule.endedAt : endedAt}
        onChange={(e) => setEndedAt(e.target.value)}
        type="datetime-local"
      />
      <div style={{ color: colors.semantic.danger, fontSize: '12px' }}>
        {timeError}
      </div>
      <div>첨부 파일</div>

      {modalType === 'R' || modalType === 'U' ? (
        <S.Input
          documentName={targetSchedule.documentName}
          modalType={modalType}
          value={
            targetSchedule.documentName
              ? targetSchedule.documentName
              : '첨부파일이 없습니다'
          }
          onClick={() =>
            targetSchedule.documentName &&
            targetSchedule.documentUrl &&
            handleFileDownload(
              targetSchedule.documentUrl,
              targetSchedule.documentName
            )
          }
          className="hasDocument"
          readOnly
        />
      ) : (
        <FileUploading
          filePath="schedule-doc"
          setUrl={setDocumentUrl}
          setName={setDocumentName}
          setIsLoading={setIsUploading}
        />
      )}
      <div>내용</div>
      <S.Textarea
        modalType={modalType}
        readOnly={modalType === 'R'}
        value={modalType === 'R' ? targetSchedule.detail : detail}
        onChange={onChangeTextarea}
        name="content"
        id=""
        placeholder="일정 내용"
        ref={textareaRef}
      ></S.Textarea>
      <div style={{ color: colors.semantic.danger, fontSize: '12px' }}>
        {detailError}
      </div>
      {modalType === 'C' && (
        <Button
          color={isUploading || isLoading ? 'disabled' : 'success'}
          text="등록"
          onClick={editSchedule}
        />
      )}
      {modalType === 'U' && (
        <Button
          color={isUploading || isLoading ? 'disabled' : 'success'}
          text="수정"
          onClick={editSchedule}
        />
      )}
      {modalType === 'R' && (
        <S.ButtonWrapper>
          <Button color="primary" text="수정" onClick={handleEditMode} />
          <Button
            color={isLoading ? 'disabled' : 'danger'}
            text="삭제"
            onClick={deleteSchedule}
          />
        </S.ButtonWrapper>
      )}
    </>
  );
};

const S = {
  Input: styled.input<{ modalType: ModalType; documentName?: string }>`
    width: 100%;
    height: 40px;
    line-height: 1;
    padding: 0 ${padding.md};
    border: ${border.default};
    border-radius: ${border.radius.xs};
    margin: -6px 0 0 0;
    ${(props) => props.documentName && `cursor: pointer;`};

    ${(props) =>
      props.modalType === 'R' || props.documentName
        ? `background-color: ${colors.semantic.background.light};
          outline: none;
          border: none;
          `
        : `outline-color: ${colors.semantic.hover.primary};`};

    &.hasDocument {
      background-color: ${colors.semantic.background.light};
      color: ${(props) => (props.documentName ? colors.semantic.primary : '')};
      outline: none;
      border: none;
    }
  `,
  Textarea: styled.textarea<{ modalType: ModalType }>`
    width: 100%;
    min-height: 104px;
    max-height: 176px;
    line-height: 1;
    padding: ${padding.md};
    border: ${border.default};
    border-radius: ${border.radius.xs};
    resize: none;

    ${(props) =>
      props.modalType === 'R'
        ? `background-color: ${colors.semantic.background.light};
          outline: none;
          border: none;
          `
        : `outline-color: ${colors.semantic.hover.primary};`}
  `,
  ButtonWrapper: styled.button`
    display: flex;
    justify-content: space-between;
  `,
};

export default ScheduleModalContents;
