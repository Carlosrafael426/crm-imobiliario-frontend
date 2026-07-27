import React, { useState } from 'react';
import api from '../services/api';
import { mockUsers } from '../mocks/mockUsers';
import { AuthContext } from './auth-context';

const STORAGE_KEY = 'crm_user';

function readStoredUser() {
  const raw = localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);

  const login = async (usuario, password, remember = false) => {
    let sessionUser;

    try {
      const response = await api.post('/auth/login', { usuario, password });
      sessionUser = response.data.user;
    } catch {
      // Sem backend ainda: cai para o diretório mock só para permitir
      // testar o fluxo de autenticação e os roles (admin/corretor).
      const match = mockUsers.find((candidate) => candidate.usuario === usuario && candidate.password === password);
      if (!match) {
        throw new Error('Usuário ou senha inválidos.');
      }
      const { password: _password, ...rest } = match;
      sessionUser = rest;
    }

    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(STORAGE_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);
    return sessionUser;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: Boolean(user),
    isAdmin: user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
