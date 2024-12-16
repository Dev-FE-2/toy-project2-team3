import { useState } from 'react';
import { useSaveData } from '../../../hooks';
import { COLLECTION_NAME } from '../../../constant';

interface FormData {
  name: string;
  email: string;
}

const ProfileForm = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '' });
  const { saveData, isSaving, error } = useSaveData<FormData>({
    table: COLLECTION_NAME.users,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const savedKey = await saveData(formData);

    if (savedKey) {
      alert(`데이터가 성공적으로 저장되었습니다! ID: ${savedKey}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">이름:</label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="이름 입력"
        />
      </div>
      <div>
        <label htmlFor="email">이메일:</label>
        <input
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="이메일 입력"
        />
      </div>
      <button type="submit" disabled={isSaving}>
        {isSaving ? '저장 중...' : '저장하기'}
      </button>
      {error && <p>에러 발생: {error.message}</p>}
    </form>
  );
};

export default ProfileForm;
