import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { login, register, reset } from '../store/authSlice';
import { useToast } from '../context/ToastContext';

export const AuthCard = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { name, email, password } = formData;
  
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  
  const { isLoading, isError, message } = useAppSelector((state) => state.auth);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      dispatch(login({ email, password }));
    } else {
      if (!name) return showToast('Name is required', 'error');
      dispatch(register({ name, email, password }));
    }
  };

  // Handle Errors and cleanup
  useEffect(() => {
    if (isError && message) {
      showToast(message, 'error');
      dispatch(reset());
    }
  }, [isError, message, dispatch, showToast]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden w-full max-w-md mx-auto lg:ml-auto">
      
      {/* Tabs */}
      <div className="flex border-b border-slate-100 dark:border-slate-700">
        <button 
          onClick={() => setIsLogin(true)}
          className={`flex-1 py-4 text-sm font-bold transition-colors ${
            isLogin 
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50 dark:bg-slate-700' 
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-700/50'
          }`}
        >
          Log In
        </button>
        <button 
          onClick={() => setIsLogin(false)}
          className={`flex-1 py-4 text-sm font-bold transition-colors ${
            !isLogin 
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50 dark:bg-slate-700' 
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-700/50'
          }`}
        >
          Sign Up
        </button>
      </div>

      <div className="p-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          {isLogin ? 'Welcome back' : 'Get started free'}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
          {isLogin ? 'Enter your details to access your workspace.' : 'No credit card required.'}
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          
          {/* Name Field (Signup Only) */}
          <div className={`transition-all duration-300 overflow-hidden ${isLogin ? 'h-0 opacity-0' : 'h-auto opacity-100'}`}>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                name="name"
                value={name}
                onChange={onChange}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white"
                placeholder="John Doe"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Work Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="email" 
                name="email"
                value={email}
                onChange={onChange}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white"
                placeholder="you@company.com"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="password" 
                name="password"
                value={password}
                onChange={onChange}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-lg transition-all active:scale-95 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:active:scale-100"
          >
            {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : (isLogin ? 'Log In' : 'Create Account')}
            {!isLoading && <ArrowRight size={18} />}
          </button>
        </form>
      </div>
    </div>
  );
};