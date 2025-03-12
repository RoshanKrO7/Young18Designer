import { useCallback } from 'react';
import toast from 'react-hot-toast';

interface ApiError extends Error {
  status?: number;
  code?: string;
}

export const useApiError = () => {
  const handleError = useCallback((error: ApiError) => {
    console.error('API Error:', error);

    let message = 'An unexpected error occurred. Please try again later.';

    if (typeof error.status === 'number') {
      if (error.status === 401) {
        message = 'Please log in to continue.';
      } else if (error.status === 403) {
        message = 'You do not have permission to perform this action.';
      } else if (error.status === 404) {
        message = 'The requested resource was not found.';
      } else if (error.status === 422) {
        message = 'Invalid input. Please check your data and try again.';
      } else if (error.status >= 500) {
        message = 'Server error. Please try again later.';
      }
    }

    toast.error(message);
  }, []);

  const withErrorHandling = useCallback(async <T>(promise: Promise<T>): Promise<T> => {
    try {
      return await promise;
    } catch (error) {
      handleError(error as ApiError);
      throw error;
    }
  }, [handleError]);

  return {
    handleError,
    withErrorHandling,
  };
}; 