import React from 'react';

export interface LoadingProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Loading: React.FC<LoadingProps> = ({ message = 'Loading...', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full border-t-2 border-b-2 border-blue-500 border-opacity-50">
        <div className={`${sizeClasses[size]} rounded-full`}></div>
      </div>
      {message && size !== 'sm' && (
        <p className="mt-2 text-gray-600">{message}</p>
      )}
    </div>
  );
};

export default Loading; 