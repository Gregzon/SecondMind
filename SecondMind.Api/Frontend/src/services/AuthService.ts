
import type { AuthResponse } from '../types/AuthResponse';
import { API } from './api';

interface LoginRequest {
    email: string;
    password: string;
}

interface RegisterRequest {
    email: string;
    password: string;
}

export const login = async (email: string, password: string): Promise<AuthResponse> => {
    const payload: LoginRequest = { email, password };
    const { data } = await API.post<AuthResponse>('/auth/login', payload);
    return data;
};

export const register = async (email: string, password: string): Promise<AuthResponse> => {
    const payload: RegisterRequest = { email, password };
    const { data } = await API.post<AuthResponse>('/auth/register', payload);
    return data;
};
