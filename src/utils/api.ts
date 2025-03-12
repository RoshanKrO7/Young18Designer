// interface ApiResponse<T> {
//   data: T | null;
//   error: Error | null;
// }

// export const handleApiResponse = async <T>(
//   promise: Promise<{ data: T; error: any }>
// ): Promise<ApiResponse<T>> => {
//   try {
//     const { data, error } = await promise;
    
//     if (error) {
//       return {
//         data: null,
//         error: new Error(error.message || 'An unexpected error occurred'),
//       };
//     }

//     return {
//       data,
//       error: null,
//     };
//   } catch (error) {
//     return {
//       data: null,
//       error: error instanceof Error ? error : new Error('An unexpected error occurred'),
//     };
//   }
// };

// export const isApiError = (error: unknown): error is Error => {
//   return error instanceof Error;
// };

// const fetchData = async <T>(url: string): Promise<ApiResponse<T>> => {
//   const response = await fetch(url);
//   const data = await response.json();
  
//   return handleApiResponse<T>(Promise.resolve({ data, error: null }));
// };