import { useEffect, useRef, useState } from 'react';
import { saveDataToDB } from '../../../../../../firebase/saveDataToDB';
import { fetchDataFromDB } from '../../../../../../firebase/fetchDataFromDB';
import FileUploading from '../../../../../../components/FileUploading';
import Button from '../../../../../../components/form/Button';
import { border, colors, padding } from '../../../../../../styles';
import { fetchUserInfo } from '../../../../../../firebase';
import { User } from '../../../../../../types/interface';
import styled from 'styled-components';

interface ScheduleList {
  createdAt: string;
  detail: string;
  endedAt: string;
  startedAt: string;
  title: string;
  updatedAt: string;
}

interface ScheduleData {
  id: string;
  scheduleList: ScheduleList[];
  userId: string;
}

interface TargetSchedule extends ScheduleList {
  id: string;
  index: number;
  name: string;
  userId: string;
  documentName: string;
  documentUrl: string;
}

interface NewScheduleEntry {
  title: string;
  startedAt: string;
  endedAt: string;
  detail: string;
  documentName: string;
  documentUrl: string;
  createdAt: string;
  updatedAt: string;
}

type ModalType = 'C' | 'R' | 'U' | 'D';

interface ScheduleModalContentsProps {
  targetSchedule: TargetSchedule;
  modalType: ModalType;
  setModalType: (type: ModalType) => void;
  handleOnCloseModal: () => void;
}

const ScheduleModalContents = ({
  modalType,
  setModalType,
  targetSchedule,
  handleOnCloseModal,
}: ScheduleModalContentsProps) => {
  const [title, setTitle] = useState('');
  const [startedAt, setStartedAt] = useState('');
  const [endedAt, setEndedAt] = useState('');
  const [detail, setDetail] = useState('');
  const [documentName, setDocumentName] = useState('');
  const [documentUrl, setDocumentUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [titleError, setTitleError] = useState('');
  const [detailError, setDetailError] = useState('');
  const [timeError, setTimeError] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unSubscribe = fetchUserInfo((info) => {
      setCurrentUser(info);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const isValidSchedule = (
    existingSchedules: ScheduleList[],
    newSchedule: NewScheduleEntry
  ) => {
    const newStartedAt = new Date(newSchedule.startedAt).getTime();
    const newEndedAt = new Date(newSchedule.endedAt).getTime();

    if (newEndedAt < newStartedAt) {
      setTimeError('종료 시간은 시작 시간보다 과거일 수 없습니다.');
      return false;
    }

    existingSchedules.map((schedule) => {
      const existingStartedAt = new Date(schedule.startedAt).getTime();
      const existingEndedAt = new Date(schedule.endedAt).getTime();

      if (
        (newStartedAt >= existingStartedAt && newStartedAt < existingEndedAt) ||
        (newEndedAt > existingStartedAt && newEndedAt <= existingEndedAt) ||
        (newStartedAt <= existingStartedAt && newEndedAt >= existingEndedAt)
      ) {
        setTimeError('기존 일정과 겹치는 시간대입니다. 일정을 확인해주세요.');
        return false;
      }
    });

    setTimeError('');

    return true;
  };

  const editSchedule = async () => {
    try {
      if (isUploading) return;

      setIsLoading(true);

      if (!title.trim()) {
        setTitleError('제목을 입력해주세요.');
        return;
      }

      setTitleError('');

      if (!detail.trim()) {
        setDetailError('내용을 입력해주세요.');
        return;
      }

      setDetailError('');

      const SCHEDULE_DATA = (await fetchDataFromDB({
        table: 'Schedule',
      })) as ScheduleData[];

      const newScheduleEntry = {
        title,
        startedAt,
        endedAt,
        detail,
        documentName,
        documentUrl,
        createdAt: new Date().toISOString(),
        updatedAt: '',
      };

      if (modalType === 'C') {
        const userId = currentUser ? currentUser.userId : null;

        const existingUserSchedule = SCHEDULE_DATA.find(
          (data) => data.userId === userId
        );

        if (
          existingUserSchedule &&
          !isValidSchedule(existingUserSchedule.scheduleList, newScheduleEntry)
        ) {
          return;
        }

        if (existingUserSchedule) {
          // 이미 존재하는 유저의 스케줄 등록의 경우
          await saveDataToDB({
            table: 'Schedule',
            key: existingUserSchedule
              ? `${existingUserSchedule.id}/scheduleList`
              : '',
            data: existingUserSchedule
              ? [...existingUserSchedule.scheduleList, newScheduleEntry]
              : '',
          });
        } else {
          // 존재하지 않던 유저의 스케줄 등록의 경우
          await saveDataToDB({
            table: 'Schedule',
            data: {
              userId,
              scheduleList: [newScheduleEntry],
            },
          });
        }
      } else if (modalType === 'U') {
        if (!isValidSchedule([targetSchedule], newScheduleEntry)) {
          return;
        }
        // 유저의 스케줄 수정의 경우
        await saveDataToDB({
          table: 'Schedule',
          key: targetSchedule.id
            ? `${targetSchedule.id}/scheduleList/${targetSchedule.index}`
            : '',
          data: newScheduleEntry,
        });
      }

      setTitle('');
      setStartedAt('');
      setEndedAt('');
      setDetail('');
    } catch (error) {
      console.error('Schedule creation failed:', error);
    } finally {
      handleOnCloseModal();
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

      await saveDataToDB({
        table: 'Schedule',
        key: targetSchedule.id
          ? `${targetSchedule.id}/scheduleList/${targetSchedule.index}`
          : '',
        data: clearScheduleEntry,
      });
    } catch (error) {
      console.error('데이터 삭제 중 오류:', error);
    } finally {
      setIsLoading(false);
      handleOnCloseModal();
    }
  };

  const handleEditMode = () => {
    setTitle(targetSchedule.title);
    setStartedAt(targetSchedule.startedAt);
    setEndedAt(targetSchedule.endedAt);
    setDetail(targetSchedule.detail);
    setDocumentUrl(targetSchedule.documentUrl);
    setDocumentName(targetSchedule.documentName);
    setModalType('U');
  };

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const onChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDetail(e.target.value);

    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = '0px';
      const scrollHeight = textareaRef.current.scrollHeight;

      textareaRef.current.style.height = scrollHeight + 'px';
    }
  };

  const handleFileDownload = (fileUrl: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
            handleFileDownload(
              targetSchedule.documentUrl,
              targetSchedule.documentName
            )
          }
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
          <Button color="success" text="수정" onClick={handleEditMode} />
          <Button
            color={isLoading ? 'disabled' : 'success'}
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

    ${(props) => props.documentName && `cursor: pointer;`};

    ${(props) =>
      props.modalType === 'R' || props.documentName
        ? `background-color: ${colors.scale.neutral.s95};
          outline: none
          `
        : `outline-color: ${colors.semantic.hover.primary};`};
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
        ? `background-color: ${colors.scale.neutral.s95};
          outline: none
          `
        : `outline-color: ${colors.semantic.hover.primary};`}
  `,
  ButtonWrapper: styled.button`
    display: flex;
    justify-content: space-between;
  `,
};

export default ScheduleModalContents;
