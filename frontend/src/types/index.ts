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
    dueDate?: string; // ISO string format from API (DateTime serialized)
    createdAt: string; // ISO string format from API (DateTime serialized)
    updatedAt: string; // ISO string format from API (DateTime serialized)
  }
  
  export interface CreateTaskDto {
    title: string;
    description?: string;
    category: string;
    completed: boolean;
    dueDate?: string; // ISO string format for API (will be deserialized to DateTime)
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