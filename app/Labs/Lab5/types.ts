export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  editing?: boolean;
}

export interface Assignment {
  id: number;
  title: string;
  description: string;
  due: string;
  completed: boolean;
  score: number;
}

export interface Module {
  id: string;
  name: string;
  description: string;
  course: string;
}