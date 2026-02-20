import type { Task } from '../types/Task';
import { API } from './api';



export const getTasks = async (token: string): Promise<Task[]> => {
    const res = await API.get<Task[]>('/tasks', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export const getTaskById = async (id: string, token: string): Promise<Task> => {
    const res = await API.get<Task>(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export const createTask = async (task: Partial<Task>, token: string): Promise<Task> => {
    const res = await API.post<Task>('/tasks', task, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export const updateTask = async (id: string, task: Partial<Task>, token: string): Promise<Task> => {
    const res = await API.put<Task>(`/tasks/${id}`, task, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export const deleteTask = async (id: string, token: string): Promise<void> => {
    await API.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};