import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getRoleslist,
  getRoleslistSuccess,
  getRoleslistFail,
  getSingleRoleslist,
  getSingleRoleslistSuccess,
  getSingleRoleslistFail,
  AddRoleslist,
  AddRoleslistSuccess,
  AddRoleslistFail,
  DeleteRoleslist,
  DeleteRoleslistSuccess,
  DeleteRoleslistFail,
  ResetRoleslist,
  ResetRoleslistSuccess,
  ResetRoleslistFail
} from "./action";
import {
  GET_ROLES_LIST,
  GET_ROLES_LIST_SUCCESS,
  GET_ROLES_LIST_ERROR,
  GET_SINGLE_ROLES_LIST,
  GET_SINGLE_ROLES_LIST_ERROR,
  GET_SINGLE_ROLES_LIST_SUCCESS,
  ADD_ROLES_LIST,
  ADD_ROLES_LIST_SUCCESS,
  ADD_ROLES_LIST_ERROR,
  DELETE_ROLES_LIST,
  DELETE_ROLES_LIST_SUCCESS,
  DELETE_ROLES_LIST_ERROR,
  GET_RESET_ROLES_LIST,
  GET_RESET_ROLES_LIST_ERROR,
  GET_RESET_ROLES_LIST_SUCCESS,
} from "./actionType";
import {
  RolelistApi,
  AddRolelistApi,
  UpdatelistApi,
  DelRolelistApi,
} from "../../helper/Demo_helper";
import { toast } from "react-toastify";

function* onGetRolesList({ payload: requstuser }) {
  try {
    const reponse = yield call(RolelistApi, requstuser);
    yield put(getRoleslistSuccess(GET_ROLES_LIST, reponse));
   
  } catch (error) {
    yield put(getRoleslistFail(error));
  }
}

function* onGetSingleRolesList({ payload: requstuser }) {
  try {
    const reponse = yield call(UpdatelistApi, requstuser);
    yield put(getSingleRoleslistSuccess(GET_SINGLE_ROLES_LIST, reponse));
   
  } catch (error) {
    yield put(getSingleRoleslistFail(error));
  }
}

function* onAddRolesList({ payload: requstuser }) {
  try {
    const reponse = yield call(AddRolelistApi, requstuser);
    yield put(AddRoleslistSuccess(ADD_ROLES_LIST, reponse));

    if(reponse.success == true){
      let requserdata = {
        find_role_title: "",
        page: 1,
        size: 5
      };
      const reponse = yield call(RolelistApi, requserdata);
      yield put(getRoleslistSuccess(GET_ROLES_LIST, reponse));
    }
  } catch (error) {
    yield put(AddRoleslistFail(error));
  }
}

function* onDelRolesList({ payload: requstuser }) {
  try {
    const reponse = yield call(DelRolelistApi, requstuser);
    yield put(DeleteRoleslistSuccess(DELETE_ROLES_LIST, reponse));
    if(reponse.success == true){
      toast.success(reponse?.msg)
      const newreponse = yield call(RolelistApi);
      yield put(getRoleslistSuccess(GET_ROLES_LIST, newreponse));
    }
  } catch (error) {
    yield put(DeleteRoleslistFail(error));
  }
}

function* onResetRolesList() {
    const reponse = yield call(ResetRoleslist);
    yield put(ResetRoleslistSuccess(GET_RESET_ROLES_LIST, reponse));
}
  

function* RoleSaga() {
  yield takeEvery(GET_ROLES_LIST, onGetRolesList);
  yield takeEvery(GET_SINGLE_ROLES_LIST, onGetSingleRolesList);
  yield takeEvery(ADD_ROLES_LIST, onAddRolesList);
  yield takeEvery(DELETE_ROLES_LIST, onDelRolesList);
  yield takeEvery(GET_RESET_ROLES_LIST, onResetRolesList);

}
export default RoleSaga;
