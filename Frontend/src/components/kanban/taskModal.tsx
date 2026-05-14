"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  XMarkIcon,
  UserIcon,
  ClockIcon,
  CheckIcon,
  PlusIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { AddSubTask, DeleteSubTask } from "../../Store/Kanban/action";

interface User {
  id: string;
  name: string;
  avatar?: string;
  email?: string;
}

interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

interface Task {
  id: string;
  title: string;
  description?: string;
  priority?: "low" | "medium" | "high";
  assignedTo?: User;
  createdBy?: User | null;
  updatedBy?: User;
  createdAt: Date;
  updatedAt?: Date;
  subTasks?: SubTask[];
}

interface TaskModalProps {
  task: Task;
  users: User[];
  currentUser: User;
  onClose: () => void;
  onUpdate: (task: Task) => void;
}

const PRIORITY_OPTIONS = [
  { value: "low", label: "Low", color: "bg-blue-100 text-blue-800" },
  { value: "medium", label: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { value: "high", label: "High", color: "bg-red-100 text-red-800" },
] as const;

export default function TaskModal({ task, users, currentUser, onClose, onUpdate }: TaskModalProps) {
  const dispatch = useDispatch();
  const [editedTask, setEditedTask] = useState<Task>(task);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [newSubTaskTitle, setNewSubTaskTitle] = useState("");
  const [showSubTaskInput, setShowSubTaskInput] = useState(false);

  useEffect(() => {
    setEditedTask(task);
  }, [task]);

  const handleSave = () => {
    const updatedTask = {
      ...editedTask,
      updatedAt: new Date(),
      updatedBy: currentUser,
    };
    onUpdate(updatedTask);
  };

  const handlePriorityChange = (priority: "low" | "medium" | "high") => {
    setEditedTask({ ...editedTask, priority });
  };

  const handleAssignUser = (user: User) => {
    setEditedTask({
      ...editedTask,
      assignedTo: user,
    });
  };

  const handleAddSubTask = () => {
    if (!newSubTaskTitle.trim()) return;

    dispatch(AddSubTask({
      taskId: task.id,
      title: newSubTaskTitle.trim(),
    }));

    setNewSubTaskTitle("");
    setShowSubTaskInput(false);
  };

  const handleToggleSubTask = (subTaskId: string) => {
    setEditedTask({
      ...editedTask,
      subTasks: (editedTask.subTasks || []).map(st =>
        st.id === subTaskId ? { ...st, completed: !st.completed } : st
      ),
    });
  };

  const handleDeleteSubTask = (subTaskId: string) => {
    dispatch(DeleteSubTask({
      taskId: task.id,
      subTaskId,
    }));
  };

  console.log("editedTask",editedTask)

  const completedSubTasks = (editedTask.subTasks || []).filter(st => st.completed).length;
  const totalSubTasks = (editedTask.subTasks || []).length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
              {editedTask.createdBy?.avatar|| "U"}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Task Details
              </h2>
              <p className="text-sm text-slate-500">
                Created {editedTask.createdAt.toLocaleDateString()}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Title */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-sm font-medium text-slate-700">Title</h3>
              <button
                onClick={() => setIsEditingTitle(!isEditingTitle)}
                className="p-1 hover:bg-slate-100 rounded transition-colors"
              >
                <PencilIcon className="w-4 h-4 text-slate-400" />
              </button>
            </div>
            {isEditingTitle ? (
              <input
                type="text"
                value={editedTask.title}
                onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                onBlur={() => setIsEditingTitle(false)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") setIsEditingTitle(false);
                }}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            ) : (
              <p className="text-lg font-medium text-slate-900">{editedTask.title}</p>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-sm font-medium text-slate-700">Description</h3>
              <button
                onClick={() => setIsEditingDescription(!isEditingDescription)}
                className="p-1 hover:bg-slate-100 rounded transition-colors"
              >
                <PencilIcon className="w-4 h-4 text-slate-400" />
              </button>
            </div>
            {isEditingDescription ? (
              <textarea
                value={editedTask.description || ""}
                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                onBlur={() => setIsEditingDescription(false)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={3}
                autoFocus
              />
            ) : (
              <p className="text-slate-600 whitespace-pre-wrap">
                {editedTask.description || "No description"}
              </p>
            )}
          </div>

          {/* Priority */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-slate-700 mb-3">Priority</h3>
            <div className="flex gap-2">
              {PRIORITY_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handlePriorityChange(option.value)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    editedTask.priority === option.value
                      ? option.color
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Assigned Users */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-slate-700 mb-3">Assigned to</h3>
            {editedTask.assignedTo ? (
              <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg mb-3">
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-medium">{editedTask.assignedTo.name.charAt(0).toUpperCase()}</div>
                <span className="text-sm text-slate-700">{editedTask.assignedTo.name}</span>
                <button onClick={() => setEditedTask({ ...editedTask, assignedTo: undefined })} className="p-1 hover:bg-blue-100 rounded transition-colors">
                  <XMarkIcon className="w-3 h-3 text-blue-600" />
                </button>
              </div>
            ) : (
              <div className="text-sm text-slate-500 mb-3">No one assigned</div>
            )}
            <div className="flex flex-wrap gap-2">
              {users.filter(user => !editedTask.assignedTo || user.id !== editedTask.assignedTo.id).map((user) => (
                <button key={user.id} onClick={() => handleAssignUser(user)} className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors">
                  <div className="w-6 h-6 rounded-full bg-slate-400 flex items-center justify-center text-white text-xs font-medium">{user.name.charAt(0).toUpperCase()}</div>
                  <span className="text-sm text-slate-700">{user.name}</span>
                  <PlusIcon className="w-4 h-4 text-slate-500" />
                </button>
              ))}
            </div>
          </div>

          {/* Sub-tasks */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-slate-700">Sub-tasks ({completedSubTasks}/{totalSubTasks}) </h3>
              <button onClick={() => setShowSubTaskInput(true)} className="flex items-center gap-1 px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded text-sm transition-colors cursor-pointer"> <PlusIcon className="w-4 h-4" /> Add </button>
            </div>

            {/* Add Sub-task Input */}
            {showSubTaskInput && (
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newSubTaskTitle}
                  onChange={(e) => setNewSubTaskTitle(e.target.value)}
                  placeholder="Enter sub-task title..."
                  className="flex-1 px-3 py-2 text-sm text-gray-700 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handleAddSubTask();
                  }}
                />
                <button onClick={handleAddSubTask} className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors cursor-pointer"> <CheckIcon className="w-4 h-4" /> </button>
                <button className="p-2 bg-slate-300 hover:bg-slate-400 text-white rounded-lg transition-colors cursor-pointer" onClick={() => { setShowSubTaskInput(false);   setNewSubTaskTitle(""); }}> <XMarkIcon className="w-4 h-4" />  </button>
              </div>
            )}

            {/* Sub-tasks List */}
            <div className="space-y-2">
              {(editedTask.subTasks || []).map((subTask) => (
                <div key={subTask.id} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors">
                  <button onClick={() => handleToggleSubTask(subTask.id)} className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${  subTask.completed ? "bg-green-500 border-green-500" : "border-slate-300 hover:border-slate-400" }`}> {subTask.completed && <CheckIcon className="w-3 h-3 text-white" /> } </button>
                  <span className={`flex-1 text-sm ${ subTask.completed ? "line-through text-slate-500" : "text-slate-900" }`} > {subTask.title} </span>
                  <button onClick={() => handleDeleteSubTask(subTask.id)} className="p-1 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded transition-colors cursor-pointer"> <TrashIcon className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>

          {/* Metadata */}
          <div className="border-t border-slate-200 pt-4">
            <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <UserIcon className="w-4 h-4" />
                <span>Created by {editedTask.createdBy?.name || "Unknown"}</span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4" />
                <span>{editedTask.createdAt.toLocaleDateString()}</span>
              </div>
              {editedTask.updatedBy && editedTask.updatedAt && (
                <>
                  <div className="flex items-center gap-2">
                    <UserIcon className="w-4 h-4" />
                    <span>Updated by {editedTask.updatedBy.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-4 h-4" />
                    <span>{editedTask.updatedAt.toLocaleDateString()}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-3 border-t border-slate-200 bg-slate-50">
          <button onClick={onClose} className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"> Cancel </button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors" > Save Changes </button>
        </div>
      </div>
    </div>
  );
}