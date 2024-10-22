// LoadingContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

interface LoadingContextType {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
      {loading && <LoadingSpinner />} {/* 로딩 컴포넌트 표시 */}
    </LoadingContext.Provider>
  );
};

const LoadingSpinner = () => (
  <div className="loading-spinner">
    <Spin indicator={<LoadingOutlined spin />} size="small" />
  </div>
);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
