'use client';

import { useMemo, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { UserButton, SignedIn } from '@clerk/nextjs';
import BoardColumn from '../components/BoardColumn';
import ActivityLog from '../components/ActivityLog';
import type { Board, Task, ActivityLog as ActivityType, Workspace, Project } from '../types';

const initialWorkspace: Workspace = {
  id: 'ws-1',
  name: 'Tim Produk',
  description: 'Manajemen proyek internal untuk tim produk.',
  projects: [],
};

const initialProject: Project = {
  id: 'project-1',
  name: 'Pengembangan aplikasi manajemen',
  description: 'Board tugas untuk merilis fitur utama dan tracking progress.',
  boards: [
    { id: 'board-1', name: 'Backlog', order: 0, tasks: [] },
    { id: 'board-2', name: 'In Progress', order: 1, tasks: [] },
    { id: 'board-3', name: 'Review', order: 2, tasks: [] },
    { id: 'board-4', name: 'Done', order: 3, tasks: [] },
  ],
};

const initialTasks: Task[] = [
  {
    id: 'task-1',
    boardId: 'board-1',
    title: 'Desain struktur database',
    description: 'Buat skema Prisma untuk workspace, project, board, task, label, dan aktivitas.',
    dueDate: '2026-08-10',
    labels: [
      { id: 'label-1', name: 'Database', color: '#2563eb' },
      { id: 'label-2', name: 'Prisma', color: '#047857' },
    ],
    attachments: [
      { id: 'attach-1', title: 'Skema awal', url: '#' },
    ],
    commentsCount: 2,
  },
  {
    id: 'task-2',
    boardId: 'board-2',
    title: 'Integrasi Clerk Auth',
    description: 'Tambahkan otentikasi dengan Clerk pada aplikasi Next.js.',
    dueDate: '2026-08-11',
    labels: [
      { id: 'label-3', name: 'Auth', color: '#ea580c' },
    ],
    attachments: [],
    commentsCount: 1,
  },
  {
    id: 'task-3',
    boardId: 'board-3',
    title: 'Implementasi drag and drop',
    description: 'Gunakan React DnD untuk memindahkan task antar board.',
    dueDate: undefined,
    labels: [
      { id: 'label-4', name: 'UX', color: '#7c3aed' },
    ],
    attachments: [],
    commentsCount: 3,
  },
];

const initialActivities: ActivityType[] = [
  {
    id: 'activity-1',
    actor: 'Dina',
    action: 'menambahkan task "Desain struktur database" ke Backlog',
    projectId: 'project-1',
    createdAt: '2 jam yang lalu',
  },
  {
    id: 'activity-2',
    actor: 'Budi',
    action: 'memindahkan task "Integrasi Clerk Auth" ke In Progress',
    projectId: 'project-1',
    createdAt: '1 jam yang lalu',
  },
];

export default function Home() {
  const [boards, setBoards] = useState<Board[]>(initialProject.boards);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const tasksByBoard = useMemo(() => {
    return boards.reduce<Record<string, Task[]>>((acc, board) => {
      acc[board.id] = tasks.filter((task) => task.boardId === board.id);
      return acc;
    }, {});
  }, [boards, tasks]);

  const onDropTask = (taskId: string, sourceBoardId: string, targetBoardId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              boardId: targetBoardId,
            }
          : task,
      ),
    );
  };

  return (
    <main className="page-shell">
      <div className="topbar mb-6">
        <div>
          <p className="text-muted">Workspace</p>
          <h1 className="page-title">{initialWorkspace.name}</h1>
          <p className="description">{initialWorkspace.description}</p>
        </div>

        <SignedIn>
          <div className="flex items-center gap-3 bg-white p-2 px-3 rounded-xl border border-gray-200 shadow-sm">
            <UserButton 
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-10 h-10", // Memperbesar ukuran avatar profil
                }
              }}
              showName={true}
            />
          </div>
        </SignedIn>
      </div>

      <div className="board-layout">
        <aside className="sidebar">
          <div className="panel">
            <h2>Project</h2>
            <p className="text-muted">{initialProject.name}</p>
            <p>{initialProject.description}</p>
          </div>

          <div className="panel">
            <h2>Labels</h2>
            <div className="label-list">
              {[
                { id: 'label-1', name: 'Database', color: '#2563eb' },
                { id: 'label-2', name: 'Prisma', color: '#047857' },
                { id: 'label-3', name: 'Auth', color: '#ef4444' },
                { id: 'label-4', name: 'UX', color: '#8b5cf6' },
              ].map((label) => (
                <span className="badge" key={label.id} style={{ background: label.color, color: '#fff' }}>
                  {label.name}
                </span>
              ))}
            </div>
          </div>

          <ActivityLog activities={initialActivities} />
        </aside>

        <DndProvider backend={HTML5Backend}>
          <div className="panel">
            <div className="board-grid">
              {boards.map((board) => (
                <BoardColumn
                  key={board.id}
                  board={board}
                  tasks={tasksByBoard[board.id] ?? []}
                  onDropTask={onDropTask}
                />
              ))}
            </div>
          </div>
        </DndProvider>
      </div>
    </main>
  );
}
