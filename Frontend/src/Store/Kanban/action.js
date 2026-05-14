import {
  GET_KANBAN_BOARD,
  GET_KANBAN_BOARD_SUCCESS,
  GET_KANBAN_BOARD_ERROR,

  ADD_KANBAN_COLUMN,
  ADD_KANBAN_COLUMN_SUCCESS,
  ADD_KANBAN_COLUMN_ERROR,
  
  DELETE_KANBAN_COLUMN,
  DELETE_KANBAN_COLUMN_SUCCESS,
  DELETE_KANBAN_COLUMN_ERROR,

  ADD_KANBAN_TASK,
  ADD_KANBAN_TASK_SUCCESS,
  ADD_KANBAN_TASK_ERROR,

  UPDATE_KANBAN_TASK,
  UPDATE_KANBAN_TASK_SUCCESS,
  UPDATE_KANBAN_TASK_ERROR,

  DELETE_KANBAN_TASK,
  DELETE_KANBAN_TASK_SUCCESS,
  DELETE_KANBAN_TASK_ERROR,

  ADD_SUBTASK,
  ADD_SUBTASK_SUCCESS,
  ADD_SUBTASK_ERROR,

  DELETE_SUBTASK,
  DELETE_SUBTASK_SUCCESS,
  DELETE_SUBTASK_ERROR,
} from "./actionType";

export const getkanbanboard = (requserdata) => ({
  type: GET_KANBAN_BOARD,
  payload: requserdata,
});

export const getkanbanboardSuccess = (actionType, data) => ({
  type: GET_KANBAN_BOARD_SUCCESS,
  payload: { actionType, data },
});

export const getkanbanboardFail = (actionType, error) => ({
  type: GET_KANBAN_BOARD_ERROR,
  payload: { actionType, error },
});

export const AddKanbanColumn = (requserdata) => ({
  type: ADD_KANBAN_COLUMN,
  payload: requserdata,
});

export const AddKanbanColumnSuccess = (actionType, data) => ({
  type: ADD_KANBAN_COLUMN_SUCCESS,
  payload: { actionType, data },
});

export const AddKanbanColumnFail = (actionType, error) => ({
  type: ADD_KANBAN_COLUMN_ERROR,
  payload: { actionType, error },
});


export const DeleteKanbanColumn = (requserdata) => ({
  type: DELETE_KANBAN_COLUMN,
  payload: requserdata,
});

export const DeleteKanbanColumnSuccess = (actionType, data) => ({
  type: DELETE_KANBAN_COLUMN_SUCCESS,
  payload: { actionType, data },
});

export const DeleteKanbanColumnFail = (actionType, error) => ({
  type: DELETE_KANBAN_COLUMN_ERROR,
  payload: { actionType, error },
});


export const AddKanbanTask = (requserdata) => ({
  type: ADD_KANBAN_TASK,
  payload: requserdata,
});

export const AddKanbanTaskSuccess = (actionType, data) => ({
  type: ADD_KANBAN_TASK_SUCCESS,
  payload: { actionType, data },
});

export const AddKanbanTaskFail = (actionType, error) => ({
  type: ADD_KANBAN_TASK_ERROR,
  payload: { actionType, error },
});

export const UpdateKanbanTask = (requserdata) => ({
  type: UPDATE_KANBAN_TASK,
  payload: requserdata,
});

export const UpdateKanbanTaskSuccess = (actionType, data) => ({
  type: UPDATE_KANBAN_TASK_SUCCESS,
  payload: { actionType, data },
});

export const UpdateKanbanTaskFail = (actionType, error) => ({
  type: UPDATE_KANBAN_TASK_ERROR,
  payload: { actionType, error },
});

export const DeleteKanbanTask = (requserdata) => ({
  type: DELETE_KANBAN_TASK,
  payload: requserdata,
});

export const DeleteKanbanTaskSuccess = (actionType, data) => ({
  type: DELETE_KANBAN_TASK_SUCCESS,
  payload: { actionType, data },
});

export const DeleteKanbanTaskFail = (actionType, error) => ({
  type: DELETE_KANBAN_TASK_ERROR,
  payload: { actionType, error },
});

export const AddSubTask = (requserdata) => ({
  type: ADD_SUBTASK,
  payload: requserdata,
});

export const AddSubTaskSuccess = (actionType, data) => ({
  type: ADD_SUBTASK_SUCCESS,
  payload: { actionType, data },
});

export const AddSubTaskFail = (actionType, error) => ({
  type: ADD_SUBTASK_ERROR,
  payload: { actionType, error },
});

export const DeleteSubTask = (requserdata) => ({
  type: DELETE_SUBTASK,
  payload: requserdata,
});

export const DeleteSubTaskSuccess = (actionType, data) => ({
  type: DELETE_SUBTASK_SUCCESS,
  payload: { actionType, data },
});

export const DeleteSubTaskFail = (actionType, error) => ({
  type: DELETE_SUBTASK_ERROR,
  payload: { actionType, error },
});