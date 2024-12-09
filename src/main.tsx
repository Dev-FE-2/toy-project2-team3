import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { SWRConfig } from 'swr';
import store from '@store';
import App from './App.tsx';
import './index.css';

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <SWRConfig
        value={{
          fetcher,
          revalidateOnFocus: false, // 포커스 시 재검증 비활성화
          shouldRetryOnError: true, // 오류 시 자동 재시도 활성화
          errorRetryInterval: 3000, // 재시도 간격
        }}
      >
        <App />
      </SWRConfig>
    </Provider>
  </StrictMode>
);
