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

const INIT_STATE = {
  Kanbandata: [],
  KanbanlistSize: 0,
  TotalKanbanData: 0,
  CurrentPage: 1,
  error: {},
};

const KanbanData = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_KANBAN_BOARD_SUCCESS:
      switch (action.payload.actionType) {
        case GET_KANBAN_BOARD:
          return {
            ...state,
            Kanbandata: action.payload.data,
          };
      }
    case GET_KANBAN_BOARD_ERROR:
      switch (action.payload.actionType) {
        case GET_KANBAN_BOARD:
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }
    
    case ADD_KANBAN_COLUMN_SUCCESS:
      switch (action.payload.actionType) {
        case ADD_KANBAN_COLUMN:
          return {
            ...state,
            Kanbandata: action.payload.data,
          };
      }
    case ADD_KANBAN_COLUMN_ERROR:
      switch (action.payload.actionType) {
        case ADD_KANBAN_COLUMN:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

    case DELETE_KANBAN_COLUMN_SUCCESS:
      switch (action.payload.actionType) {
        case DELETE_KANBAN_COLUMN:
          return {
            ...state,
            Kanbandata: action.payload.data,
          };
      }
    case DELETE_KANBAN_COLUMN_ERROR:
      switch (action.payload.actionType) {
        case DELETE_KANBAN_COLUMN:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

    case ADD_KANBAN_TASK_SUCCESS:
      switch (action.payload.actionType) {
        case ADD_KANBAN_TASK:
          return {
            ...state,
            Kanbandata: action.payload.data,
          };
      }
    case ADD_KANBAN_TASK_ERROR:
      switch (action.payload.actionType) {
        case ADD_KANBAN_TASK:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

    case UPDATE_KANBAN_TASK_SUCCESS:
      switch (action.payload.actionType) {
        case UPDATE_KANBAN_TASK:
          return {
            ...state,
            Kanbandata: action.payload.data,
          };
      }
    case UPDATE_KANBAN_TASK_ERROR:
      switch (action.payload.actionType) {
        case UPDATE_KANBAN_TASK:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

    case DELETE_KANBAN_TASK_SUCCESS:
      switch (action.payload.actionType) {
        case DELETE_KANBAN_TASK:
          return {
            ...state,
            Kanbandata: action.payload.data,
          };
      }
    case DELETE_KANBAN_TASK_ERROR:
      switch (action.payload.actionType) {
        case DELETE_KANBAN_TASK:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

    case ADD_SUBTASK_SUCCESS:
      switch (action.payload.actionType) {
        case ADD_SUBTASK:
          return {
            ...state,
            Kanbandata: action.payload.data,
          };
      }
    case ADD_SUBTASK_ERROR:
      switch (action.payload.actionType) {
        case ADD_SUBTASK:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }
    case DELETE_SUBTASK_SUCCESS:
      switch (action.payload.actionType) {
        case DELETE_SUBTASK:
          return {
            ...state,
            Kanbandata: action.payload.data,
          };
      }
    case DELETE_SUBTASK_ERROR:
      switch (action.payload.actionType) {
        case DELETE_SUBTASK:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

    default:
      return state;  
    }
};

export default KanbanData;