import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Add login logic here
        navigate('/dashboard');
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        // Add registration logic here
        navigate('/dashboard');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
            <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <img src={require('../images/NewwhiteBgColor.png')} alt="Young18Designer" className="h-13 w-13 w-auto" />
                </div>
                <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
                    {isLogin ? 'Login' : 'Register'}
                </h2>
                <form onSubmit={isLogin ? handleLogin : handleRegister}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 border rounded-lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border rounded-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {!isLogin && (
                        <div className="mb-4">
                            <label className="block text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                className="w-full px-3 py-2 border rounded-lg"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    )}
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
                    >
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <button
                        className="text-indigo-600 hover:underline"
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError('');
                        }}
                    >
                        {isLogin ? 'Create an account' : 'Already have an account? Login'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Auth;