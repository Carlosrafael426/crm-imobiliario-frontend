import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import api from '../services/api';

const USERNAME_REGEX = /^[A-Za-z]+$/;

export default function Login() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const next = {};
    if (!usuario.trim()) {
      next.usuario = 'O usuário é obrigatório.';
    } else if (!USERNAME_REGEX.test(usuario)) {
      next.usuario = 'O usuário deve conter apenas letras.';
    } else if (usuario.length < 4 || usuario.length > 8) {
      next.usuario = 'O usuário deve ter entre 4 e 8 letras.';
    }

    if (!password) {
      next.password = 'A senha é obrigatória.';
    } else if (password.length < 6) {
      next.password = 'A senha deve ter no mínimo 6 caracteres.';
    }

    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setGeneralError(null);
    setIsLoading(true);
    try {
      const response = await api.post('/auth/login', { usuario, password });
      const { token } = response.data;
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem('crm_token', token);
      navigate('/');
    } catch (err) {
      console.error('Erro ao autenticar', err);
      setGeneralError('Usuário ou senha inválidos.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-app-bg p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-100 p-8 md:p-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary tracking-tight">CRM.Elite</h1>
          <p className="text-gray-500 text-sm mt-2">Gestão inteligente de leads e imóveis</p>
        </div>

        {generalError && (
          <div className="mt-6 flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl">
            <AlertCircle size={16} className="shrink-0" />
            {generalError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
          <div>
            <label htmlFor="usuario" className="block text-xs font-semibold text-gray-500 mb-1.5">
              Usuário
            </label>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="usuario"
                type="text"
                value={usuario}
                maxLength={8}
                onChange={(e) => {
                  setUsuario(e.target.value);
                  setErrors((prev) => ({ ...prev, usuario: undefined }));
                }}
                placeholder="usuario"
                className={`w-full bg-gray-50 border rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-700 transition-all focus:outline-none focus:ring-2 ${
                  errors.usuario
                    ? 'border-red-300 focus:ring-red-100 focus:border-red-300'
                    : 'border-gray-200 focus:ring-blue-100 focus:border-blue-300'
                }`}
              />
            </div>
            {errors.usuario && <p className="text-xs text-red-500 mt-1.5">{errors.usuario}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-semibold text-gray-500 mb-1.5">
              Senha
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, password: undefined }));
                }}
                placeholder="••••••••"
                className={`w-full bg-gray-50 border rounded-xl pl-10 pr-10 py-2.5 text-sm text-gray-700 transition-all focus:outline-none focus:ring-2 ${
                  errors.password
                    ? 'border-red-300 focus:ring-red-100 focus:border-red-300'
                    : 'border-gray-200 focus:ring-blue-100 focus:border-blue-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-500 mt-1.5">{errors.password}</p>}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-action focus:ring-blue-100"
              />
              Lembrar de mim
            </label>
            <a href="#" className="text-action font-medium hover:underline">
              Esqueci minha senha
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-action hover:bg-action/90 text-white py-3 rounded-xl font-medium transition-colors shadow-sm shadow-action/20 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Entrando...
              </>
            ) : (
              'Entrar'
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Não tem uma conta?{' '}
          <a href="#" className="text-action font-medium hover:underline">
            Fale com nosso time comercial
          </a>
        </p>
      </div>
    </div>
  );
}
