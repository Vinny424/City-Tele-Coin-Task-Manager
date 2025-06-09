import { api } from './api';
import type { Task, CreateTaskDto } from '../types';

export const taskService = {
  async getTasks(category?: string): Promise<Task[]> {
    const params = category ? { category } : {};
    const response = await api.get<Task[]>('/tasks', { params });
    return response.data;
  },

  async getTask(id: number): Promise<Task> {
    const response = await api.get<Task>(`/tasks/${id}`);
    return response.data;
  },

  async createTask(task: CreateTaskDto): Promise<Task> {
    const response = await api.post<Task>('/tasks', task);
    return response.data;
  },

  async updateTask(id: number, task: CreateTaskDto): Promise<Task> {
    const response = await api.put<Task>(`/tasks/${id}`, task);
    return response.data;
  },

  async deleteTask(id: number): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },
};