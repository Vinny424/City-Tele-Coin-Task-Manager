import { api } from './api';
import type { LoginDto, RegisterDto, AuthResponse } from '../types';

export const authService = {
  async login(credentials: LoginDto): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/signin', credentials);
    return response.data;
  },

  async register(userData: RegisterDto): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/signup', userData);
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post('/auth/signout');
    localStorage.removeItem('token');
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  setToken(token: string): void {
    localStorage.setItem('token', token);
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};