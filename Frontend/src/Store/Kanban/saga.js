import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getkanbanboardSuccess,
  getkanbanboardFail,
  AddKanbanColumnSuccess,
  AddKanbanColumnFail,
  DeleteKanbanColumnSuccess,
  DeleteKanbanColumnFail,

  AddKanbanTaskSuccess,
  AddKanbanTaskFail,
  UpdateKanbanTaskSuccess,
  UpdateKanbanTaskFail,
  DeleteKanbanTaskSuccess,
  DeleteKanbanTaskFail,

  AddSubTaskSuccess,
  AddSubTaskFail,
  DeleteSubTaskSuccess,
  DeleteSubTaskFail,
} from "./action";
import {
  GET_KANBAN_BOARD,
  ADD_KANBAN_COLUMN,
  DELETE_KANBAN_COLUMN,
  ADD_KANBAN_TASK,
  UPDATE_KANBAN_TASK,
  DELETE_KANBAN_TASK,
  ADD_SUBTASK,
  DELETE_SUBTASK,
} from "./actionType";
import { KanbanBoardlistApi, AddKanbanColumnApi, DelKanbanColumnApi, AddKanbanTaskApi, UpdateKanbanTaskApi, DelKanbanTaskApi, AddSubTaskApi, DelSubTaskApi } from "../../helper/Demo_helper";
import { toast } from "react-toastify";

function* ongetkanbanboard({ payload: requstuser }) {
  try {
    const response = yield call(KanbanBoardlistApi, requstuser);
    yield put(getkanbanboardSuccess(GET_KANBAN_BOARD, response));
  } catch (error) {
    yield put(getkanbanboardFail(error));
  }
}

function* onAddKanbanColumn({ payload: requstuser }) {
  try {
    const response = yield call(AddKanbanColumnApi, requstuser);
    yield put(AddKanbanColumnSuccess(ADD_KANBAN_COLUMN, response));

    if(response.success === true || response.success === "true"){
      const newresponse = yield call(KanbanBoardlistApi);
      yield put(getkanbanboardSuccess(GET_KANBAN_BOARD, newresponse));
    }

  } catch (error) {
    yield put(AddKanbanColumnFail(error));
  }
}

function* onDelKanbanColumn({ payload: requstuser }) {
  try {
    const response = yield call(DelKanbanColumnApi, requstuser);
    yield put(DeleteKanbanColumnSuccess(DELETE_KANBAN_COLUMN, response));
     
    if(response.success === true || response.success === "true"){
      const newresponse = yield call(KanbanBoardlistApi);
      yield put(getkanbanboardSuccess(GET_KANBAN_BOARD, newresponse));
    }
  } catch (error) {
    yield put(DeleteKanbanColumnFail(error));
  }
}


function* onAddKanbanTask({ payload: requstuser }) {
  try {
    const response = yield call(AddKanbanTaskApi, requstuser);
    yield put(AddKanbanTaskSuccess(ADD_KANBAN_TASK, response));

    if(response.success === true || response.success === "true"){
      const newresponse = yield call(KanbanBoardlistApi);
      yield put(getkanbanboardSuccess(GET_KANBAN_BOARD, newresponse));
    }

  } catch (error) {
    yield put(AddKanbanTaskFail(error));
  }
}

function* onUpdateKanbanTask({ payload: requstuser }) {
  try {
    const response = yield call(UpdateKanbanTaskApi, requstuser);
    yield put(UpdateKanbanTaskSuccess(UPDATE_KANBAN_TASK, response));

    if(response.success === true || response.success === "true"){
      const newresponse = yield call(KanbanBoardlistApi);
      yield put(getkanbanboardSuccess(GET_KANBAN_BOARD, newresponse));
    }

  } catch (error) {
    yield put(UpdateKanbanTaskFail(error));
  }
}

function* onDelKanbanTask({ payload: requstuser }) {
  try {
    const response = yield call(DelKanbanTaskApi, requstuser);
    yield put(DeleteKanbanTaskSuccess(DELETE_KANBAN_TASK, response));
     
    if(response.success === true || response.success === "true"){
      const newresponse = yield call(KanbanBoardlistApi);
      yield put(getkanbanboardSuccess(GET_KANBAN_BOARD, newresponse));
    }
  } catch (error) {
    yield put(DeleteKanbanTaskFail(error));
  }
}

function* onAddSubTask({ payload: requstuser }) {
  try {
    const response = yield call(AddSubTaskApi, requstuser);
    yield put(AddSubTaskSuccess(ADD_SUBTASK, response));

    if(response.success === true || response.success === "true"){
      const newresponse = yield call(KanbanBoardlistApi);
      yield put(getkanbanboardSuccess(GET_KANBAN_BOARD, newresponse));
    }

  } catch (error) {
    yield put(AddSubTaskFail(error));
  }
}

function* onDelSubTask({ payload: requstuser }) {
  try {
    const response = yield call(DelSubTaskApi, requstuser);
    yield put(DeleteSubTaskSuccess(DELETE_SUBTASK, response));
     
    if(response.success === true || response.success === "true"){
      const newresponse = yield call(KanbanBoardlistApi);
      yield put(getkanbanboardSuccess(GET_KANBAN_BOARD, newresponse));
    }
  } catch (error) {
    yield put(DeleteSubTaskFail(error));
  }
}

function* KanbanSaga() {
  yield takeEvery(GET_KANBAN_BOARD, ongetkanbanboard);
  yield takeEvery(ADD_KANBAN_COLUMN, onAddKanbanColumn);
  yield takeEvery(DELETE_KANBAN_COLUMN, onDelKanbanColumn);
  yield takeEvery(ADD_KANBAN_TASK, onAddKanbanTask);
  yield takeEvery(UPDATE_KANBAN_TASK, onUpdateKanbanTask);
  yield takeEvery(DELETE_KANBAN_TASK, onDelKanbanTask);
  yield takeEvery(ADD_SUBTASK, onAddSubTask);
  yield takeEvery(DELETE_SUBTASK, onDelSubTask);
}
export default KanbanSaga;