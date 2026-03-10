import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [localError, setLocalError] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const { login, session, isLoggingIn, loginError } = useAuth();

    const from = (location.state as any)?.from?.pathname || '/dashboard';

    useEffect(() => {
        if (session) {
            navigate(from, { replace: true });
        }
    }, [session, navigate, from]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError('');

        login({
            email,
            password,
            callbackURL: from,
        }, {
            onError: (err: any) => {
                setLocalError(err.message || 'Invalid email or password');
            }
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 p-8">
                    <div className="flex flex-col items-center mb-8">
                        <div className="size-12 bg-primary rounded-xl flex items-center justify-center text-white mb-4 shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined text-3xl">account_balance_wallet</span>
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome Back</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Please enter your details to sign in</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {(localError || loginError) && (
                            <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg flex items-center gap-2 animate-shake">
                                <span className="material-symbols-outlined text-lg">error</span>
                                {localError || (loginError as any)?.message || 'An error occurred'}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="email">
                                Email Address
                            </label>
                            <div className="relative group">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                                    mail
                                </span>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
                                    placeholder="name@company.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="password">
                                    Password
                                </label>
                                <Link to="#" className="text-xs font-bold text-primary hover:underline">
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="relative group">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                                    lock
                                </span>
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoggingIn}
                            className="w-full py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
                        >
                            {isLoggingIn ? (
                                <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <p className="text-center mt-8 text-sm text-slate-500 dark:text-slate-400">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-bold text-primary hover:underline">
                            Create an account
                        </Link>
                    </p>
                </div>

                <p className="text-center mt-6 text-xs text-slate-400 dark:text-slate-500">
                    © 2026 Finansia Enterprise. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Login;
