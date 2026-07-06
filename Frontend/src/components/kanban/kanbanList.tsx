import { useEffect, useState } from "react";
import { PlusIcon, TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import TaskModal from "./taskModal";
import { useDispatch, useSelector } from "react-redux";
import { getkanbanboard, AddKanbanColumn, DeleteKanbanColumn, AddKanbanTask, UpdateKanbanTask, DeleteKanbanTask, getUserlist} from "../../Store/actions";
import { UserData } from "../../types/types";

interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

interface KanbanUser {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
}

interface Task {
  id: string;
  title: string;
  description?: string;
  priority?: "low" | "medium" | "high";
  assignedTo?: KanbanUser;
  createdBy?: KanbanUser | null;
  updatedBy?: KanbanUser;
  createdAt: Date;
  updatedAt?: Date;
  subTasks?: SubTask[];
  column?: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

interface DraggedItem {
  type: "task" | "column";
  columnId: string;
  taskId?: string;
}

const PRIORITY_COLORS = {
  low: "bg-blue-100 text-blue-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
};

export default function KanbanBoard() {
  const dispatch = useDispatch();
  const KanbanDatalist = useSelector((state: any) => state.Kanban?.Kanbandata || []);
  const [columns, setColumns] = useState<Column[]>([]);
  const [draggedItem, setDraggedItem] = useState<DraggedItem | null>(null);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [showNewColumnInput, setShowNewColumnInput] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState<{ [key: string]: string }>({});
  const [newTaskPriority, setNewTaskPriority] = useState<{ [key: string]: Task["priority"] }>({});
  const [showTaskInput, setShowTaskInput] = useState<{ [key: string]: boolean }>({});
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showOtherUsersTasks, setShowOtherUsersTasks] = useState(false);

  const login = useSelector((state:any) => state.Login.Logincode);
  const userList = useSelector((state:any) => state.User.UserList?.data || []);
  console.log("KanbanDatalist", KanbanDatalist);
  
  const currentUser: KanbanUser = {
    id: login?.data?._id || "",
    name: login?.data?.name || "Current User",
    email: login?.data?.email || "",
  };

  const assignableUsers: KanbanUser[] = Array.isArray(userList)
    ? userList
        .filter((user: UserData) => user._id !== login?.data?._id)
        .map((user: UserData) => ({
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.user_pic || "",
        }))
    : [];

  const normalizeTask = (task: any): Task => ({
    id: task._id || task.id,
    title: task.title,
    description: task.description || "",
    priority: task.priority || "medium",
    assignedTo: task.assignedTo
      ? {
          id: task.assignedTo._id || task.assignedTo.id,
          name: task.assignedTo.name || "",
          email: task.assignedTo.email || "",
          avatar: task.assignedTo.avatar || task.assignedTo.user_pic || "",
        }
      : undefined,
    createdBy: task.createdBy
      ? {
          id: task.createdBy._id || task.createdBy.id,
          name: task.createdBy.name || "",
          email: task.createdBy.email || "",
          avatar: task.createdBy.user_pic || "",
        }
      : null,
    updatedBy: task.updatedBy
      ? {
          id: task.updatedBy._id || task.updatedBy.id,
          name: task.updatedBy.name || "",
          email: task.updatedBy.email || "",
          avatar: task.updatedBy.avatar || task.updatedBy.user_pic || "",
        }
      : undefined,
    createdAt: task.createdAt ? new Date(task.createdAt) : new Date(),
    updatedAt: task.updatedAt ? new Date(task.updatedAt) : undefined,
    subTasks: task.subTasks || [],
    column: task.column ? (task.column._id ? task.column._id.toString() : task.column.toString()) : undefined,
  });

  const normalizeColumns = (items: any[]): Column[] =>
    items.map((column) => ({
      id: column._id || column.id,
      title: column.title,
      tasks: Array.isArray(column.tasks)
        ? column.tasks.map(normalizeTask)
        : [],
    }));

  useEffect(() => {
    dispatch(getkanbanboard());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserlist({ page: 1, size: 100 }));
  }, [dispatch]);

  // Update columns when Redux data changes
  useEffect(() => {
    if (KanbanDatalist && Array.isArray(KanbanDatalist?.data)) {
      const normalizedColumns = normalizeColumns(KanbanDatalist?.data);
      const filteredColumns = normalizedColumns.map(column => ({
        ...column,
        tasks: column.tasks,
      }));
      setColumns(filteredColumns);
    }
  }, [KanbanDatalist]);

  // const filterTasks = (tasks: Task[]) =>
  //   showOtherUsersTasks
  //     ? tasks
  //     : tasks.filter((task) =>
  //         task.assignedTo?.id === currentUser.id
  //       );

  // Handle column drag start
  const handleColumnDragStart = (e: React.DragEvent<HTMLDivElement>, columnId: string) => {
    setDraggedItem({ type: "column", columnId });
    e.dataTransfer.effectAllowed = "move";
  };

  // Handle task drag start
  const handleTaskDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    columnId: string,
    taskId: string
  ) => {
    setDraggedItem({ type: "task", columnId, taskId });
    e.dataTransfer.effectAllowed = "move";
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  // Handle column drop
  const handleColumnDrop = (e: React.DragEvent<HTMLDivElement>, targetColumnId: string) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.type !== "column") return;

    const { columnId: sourceColumnId } = draggedItem;

    if (sourceColumnId === targetColumnId) {
      setDraggedItem(null);
      return;
    }

    // Reorder columns
    const sourceIndex = columns.findIndex((col) => col.id === sourceColumnId);
    const targetIndex = columns.findIndex((col) => col.id === targetColumnId);

    if (sourceIndex === -1 || targetIndex === -1) {
      setDraggedItem(null);
      return;
    }

    const newColumns = [...columns];
    const removed = newColumns.splice(sourceIndex, 1)[0]!;
    newColumns.splice(targetIndex, 0, removed);

    setColumns(newColumns);
    setDraggedItem(null);
  };

  // Handle task drop
  const handleTaskDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetColumnId: string
  ) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.type !== "task") return;

    const { columnId: sourceColumnId, taskId } = draggedItem;

    if (sourceColumnId === targetColumnId) {
      setDraggedItem(null);
      return;
    }

    dispatch(UpdateKanbanTask({ id: taskId, column: targetColumnId }));
    setDraggedItem(null);
  };

  //>>>>>>>>>>>>>>> Add new column <<<<<<<<<<<<<
  const handleAddColumn = async () => {
    if (!newColumnTitle.trim()) return;
    let requestData = { title: newColumnTitle.trim() };
    dispatch(AddKanbanColumn(requestData));
    setNewColumnTitle("");
    setShowNewColumnInput(false);
  };

  //>>>>>>>>>>>>>>> Delete column <<<<<<<<<<<<<
  const handleDeleteColumn = async (columnId: string) => {
   dispatch(DeleteKanbanColumn({id : columnId}));
  };

  // Add task to column
  const handleAddTask = (columnId: string) => {
    const title = newTaskTitle[columnId]?.trim();
    if (!title) return;

    const requestData = {
      title,
      description: "",
      priority: newTaskPriority[columnId] || "medium",
      column: columnId,
      createdBy: {
        id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
        avatar : currentUser.avatar || "",
      },
      assignedTo: undefined,
      subTasks: [],
    };

    dispatch(AddKanbanTask(requestData));
    setNewTaskTitle({ ...newTaskTitle, [columnId]: "" });
    setNewTaskPriority({ ...newTaskPriority, [columnId]: "medium" });
    setShowTaskInput({ ...showTaskInput, [columnId]: false });
  };

  // Delete task
  const handleDeleteTask = (taskId: string) => {
    dispatch(DeleteKanbanTask({ id: taskId }));
  };

  // Open task modal
  const handleTaskClick = (task: Task) => {
    console.log("task", task);
    
    setSelectedTask(task);
    setShowTaskModal(true);
  };

  // Update task
  const handleUpdateTask = (updatedTask: Task) => {
    dispatch(UpdateKanbanTask({
      ...updatedTask,
      id: updatedTask.id,
    }));
    setSelectedTask(updatedTask);
  };

  return (
    <div className="w-full h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        {/* <div className="flex items-center gap-3 flex-wrap">
          <button onClick={() => setShowOtherUsersTasks((prev) => !prev)} className="px-4 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors">
            {showOtherUsersTasks ? "Showing all tasks" : "Show my tasks only"}
          </button>
          {!showOtherUsersTasks && ( <span className="text-sm text-slate-500"> Showing tasks assigned to {login?.data?.name || currentUser.name} </span>)}
        </div> */}
        <button onClick={() => setShowNewColumnInput(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-White rounded-lg font-medium transition-colors" >
          <PlusIcon className="w-5 h-5" />
          Add Column
        </button>
      </div>

      {/* New Column Input */}
      {showNewColumnInput && (
        <div className="mb-6 flex gap-2">
          <input
            type="text"
            value={newColumnTitle}
            onChange={(e) => setNewColumnTitle(e.target.value)}
            placeholder="Enter column title..."
            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
            onKeyPress={(e) => {
              if (e.key === "Enter") handleAddColumn();
            }}
          />
          <button
            onClick={handleAddColumn}
            className="p-2 bg-green-600 hover:bg-green-700 text-White rounded-lg transition-colors"
          >
            <CheckIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              setShowNewColumnInput(false);
              setNewColumnTitle("");
            }}
            className="p-2 bg-slate-400 hover:bg-slate-500 text-White rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Kanban Columns */}
      <div className="flex gap-6 overflow-x-auto pb-4 min-h-[calc(100vh-240px)]">
        {columns.map((column) => {

          const selectedPriority = newTaskPriority[column.id] || "medium";
          return (
            <div key={column.id} className="bg-White rounded-2xl border border-slate-200 flex flex-col min-h-[560px] shadow-sm hover:shadow-md transition-shadow flex-shrink-0 w-72">
            <div draggable onDragStart={(e) => handleColumnDragStart(e, column.id)} onDragOver={handleDragOver} onDrop={(e) => handleColumnDrop(e, column.id)}
              className="flex items-center justify-between p-4 border-b border-slate-200 cursor-move bg-slate-50/50 hover:bg-slate-100/50 transition-colors rounded-t-2xl"
            >
              <div>
                <h2 className="font-semibold text-slate-900">{column.title}</h2>
                <p className="text-xs text-slate-500 mt-1"> {column?.tasks?.length} of {column.tasks?.length} tasks  </p>
              </div>
              <button onClick={(e) => { e.stopPropagation(); handleDeleteColumn(column.id);}}
                className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
        
            <div onDragOver={handleDragOver} onDrop={(e) => handleTaskDrop(e, column.id)} className="flex-1 p-4 space-y-3 overflow-y-auto min-h-[400px] max-h-[600px]">
              {column?.tasks.map((task) => (
                <div key={task.id} draggable onDragStart={(e) => handleTaskDragStart(e, column.id, task.id)} onClick={() => handleTaskClick(task)}
                  className="PurpleButton border border-slate-200 rounded-xl p-3 cursor-move hover:shadow-md transition-shadow group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-900 text-sm"> {task.title} </h3>
                      {task.description && (
                        <p className="text-xs text-slate-600 mt-1 line-clamp-2"> {task.description} </p>
                      )}

                      {/* Priority and Assignees */}
                      <div className="flex items-center justify-between mt-3">
                        {task.priority && (
                          <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${ PRIORITY_COLORS[task.priority] }`}>
                            {task.priority}
                          </span>
                        )}

                        {/* Assignee Avatar */}
                        {task.assignedTo && (
                          <div className="flex -space-x-2">
                            <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-xs font-medium text-White" title={task.assignedTo.name}>
                              {task.assignedTo.name.charAt(0).toUpperCase()}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Sub-tasks indicator */}
                      {task.subTasks && task.subTasks.length > 0 && (
                        <div className="flex items-center gap-1 mt-2 text-xs text-slate-500">
                          <CheckIcon className="w-3 h-3" />
                          {task.subTasks.filter(st => st.completed).length}/{task.subTasks.length}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTask(task.id);
                      }}
                      className="p-1 opacity-0 group-hover:opacity-100 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded transition-all"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Empty State */}
              {column?.tasks.length === 0 && !showTaskInput[column.id] && (
                <div className="text-center py-8 text-slate-400">
                  <p className="text-sm"> {showOtherUsersTasks ? "No tasks yet" : "No tasks assigned to you in this column"} </p>
                </div>
              )}
            </div>

            {/* Add Task Input */}
            <div className="border-t border-slate-200 p-4">
              {showTaskInput[column.id] ? (
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <div className="text-sm font-medium text-slate-700">Task details</div>
                    <input
                      type="text"
                      value={newTaskTitle[column.id] || ""}
                      onChange={(e) =>
                        setNewTaskTitle({
                          ...newTaskTitle,
                          [column.id]: e.target.value,
                        })
                      }
                      placeholder="What needs to be done?"
                      className="w-full px-4 py-3 text-sm border border-slate-300 rounded-2xl bg-slate-50 text-TranquilBlack focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                      onKeyPress={(e) => {
                        if (e.key === "Enter") handleAddTask(column.id);
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-slate-700">Priority</span>
                    <div className="flex gap-2 rounded-2xl border border-slate-200 p-1 bg-White">
                      {(["low", "medium", "high"] as Task["priority"][]).map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() =>
                            setNewTaskPriority({
                              ...newTaskPriority,
                              [column.id]: level,
                            })
                          }
                          className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                            selectedPriority === level
                              ? level === "low"
                                ? "bg-blue-600 text-White"
                                : level === "medium"
                                ? "bg-yellow-500 text-White"
                                : "bg-red-600 text-White"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => handleAddTask(column.id)} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-White rounded-2xl text-sm font-medium transition-colors">
                      <CheckIcon className="w-4 h-4" />
                      Add task
                    </button>
                    <button
                      onClick={() =>
                        setShowTaskInput({
                          ...showTaskInput,
                          [column.id]: false,
                        })
                      }
                      className="inline-flex items-center justify-center p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl transition-colors"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() =>
                    setShowTaskInput({
                      ...showTaskInput,
                      [column.id]: true,
                    })
                  }
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <PlusIcon className="w-4 h-4" />
                  Add Task
                </button>
              )}
            </div>
          </div>
          );
        })}
      </div>

      {/* Task Modal */}
      {showTaskModal && selectedTask && (
        <TaskModal task={selectedTask} users={assignableUsers} currentUser={currentUser}
          onClose={() => {
            setShowTaskModal(false);
            setSelectedTask(null);
          }}
          onUpdate={handleUpdateTask}
        />
      )}
    </div>
  );
}