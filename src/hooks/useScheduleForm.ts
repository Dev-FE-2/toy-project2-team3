import { useState, useRef } from 'react';
import { ScheduleList } from '../types/schedule';

interface UseScheduleFormParams {
  initialSchedule?: Partial<ScheduleList>;
}

export const useScheduleForm = ({
  initialSchedule = {},
}: UseScheduleFormParams = {}) => {
  const [title, setTitle] = useState(initialSchedule.title || '');
  const [startedAt, setStartedAt] = useState(initialSchedule.startedAt || '');
  const [endedAt, setEndedAt] = useState(initialSchedule.endedAt || '');
  const [detail, setDetail] = useState(initialSchedule.detail || '');
  const [documentName, setDocumentName] = useState(
    initialSchedule.documentName || ''
  );
  const [documentUrl, setDocumentUrl] = useState(
    initialSchedule.documentUrl || ''
  );

  const [titleError, setTitleError] = useState('');
  const [detailError, setDetailError] = useState('');

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const resetForm = () => {
    setTitle('');
    setStartedAt('');
    setEndedAt('');
    setDetail('');
    setDocumentName('');
    setDocumentUrl('');
    setTitleError('');
    setDetailError('');
  };

  const onChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDetail(e.target.value);

    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = '0px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + 'px';
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (!title.trim()) {
      setTitleError('제목을 입력해주세요.');
      isValid = false;
    } else {
      setTitleError('');
    }

    if (!detail.trim()) {
      setDetailError('내용을 입력해주세요.');
      isValid = false;
    } else {
      setDetailError('');
    }

    return isValid;
  };

  const scheduleDataEntry = {
    title,
    startedAt,
    endedAt,
    detail,
    documentName,
    documentUrl,
    createdAt: new Date().toISOString(),
  };

  return {
    title,
    setTitle,
    startedAt,
    setStartedAt,
    endedAt,
    setEndedAt,
    detail,
    setDetail,
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
  };
};
