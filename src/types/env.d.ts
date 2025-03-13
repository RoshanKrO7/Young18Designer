declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    REACT_APP_SUPABASE_URL: string;
    REACT_APP_SUPABASE_ANON_KEY: string;
    REACT_APP_API_URL?: string;
    REACT_APP_STRIPE_PUBLIC_KEY?: string;
  }
} 

console.log('Environment:', process.env.NODE_ENV); 