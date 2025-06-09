export interface User {
    id: number;
    email: string;
  }
  
  export interface Task {
    id: number;
    title: string;
    description?: string;
    category: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface CreateTaskDto {
    title: string;
    description?: string;
    category: string;
    completed: boolean;
  }
  
  export interface LoginDto {
    email: string;
    password: string;
  }
  
  export interface RegisterDto {
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    token: string;
  }