export type Label = {
  id: string;
  name: string;
  color: string;
};

export type Attachment = {
  id: string;
  title: string;
  url: string;
};

export type Task = {
  id: string;
  boardId: string;
  title: string;
  description?: string;
  dueDate?: string;
  labels: Label[];
  attachments: Attachment[];
  commentsCount: number;
};

export type Board = {
  id: string;
  name: string;
  tasks: Task[];
  order: number;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  boards: Board[];
};

export type Workspace = {
  id: string;
  name: string;
  description: string;
  projects: Project[];
};

export type ActivityLog = {
  id: string;
  actor: string;
  action: string;
  projectId: string;
  createdAt: string;
};