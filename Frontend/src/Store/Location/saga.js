import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getstatedatalistSuccess,
  getstatedatalistFail,
  getdistrictdataSuccess,
  getdistrictdataFail,
  gettalukadataSuccess,
  gettalukadataFail,
  getvillagedataSuccess,
  getvillagedataFail,
} from "./action";
import {
  GET_STATE_DATA_LIST,
  GET_DISTRICT_DATA_LIST,
  GET_TALUKA_DATA_LIST,
  GET_VILLAGE_DATA_LIST,
} from "./actionType";
import { StatelistApi, DistrictlistApi, TalukalistApi,  VillagelistApi } from "../../helper/Demo_helper";

function* onGetStatelist({ payload: requstuser }) {
  try {
    const response = yield call(StatelistApi, requstuser);
    yield put(getstatedatalistSuccess(GET_STATE_DATA_LIST, response));
  } catch (error) {
    yield put(getstatedatalistFail(error));
  }
}

function* onGetDistrictlist({ payload: requstuser }) {
  try {
    const response = yield call(DistrictlistApi, requstuser);
    yield put(getdistrictdataSuccess(GET_DISTRICT_DATA_LIST, response));
  } catch (error) {
    yield put(getdistrictdataFail(error));
  }
}

function* onGetTalukalist({ payload: requstuser }) {
  try {
    const response = yield call(TalukalistApi, requstuser);
    yield put(gettalukadataSuccess(GET_TALUKA_DATA_LIST, response));
  } catch (error) {
    yield put(gettalukadataFail(error));
  }
}

function* onGetVillageList({ payload: requstuser }) {
  try {
    const response = yield call(VillagelistApi, requstuser);
    yield put(getvillagedataSuccess(GET_VILLAGE_DATA_LIST, response));
  } catch (error) {
    yield put(getvillagedataFail(error));
  }
}

function* LocationSaga() {
  yield takeEvery(GET_STATE_DATA_LIST, onGetStatelist);
  yield takeEvery(GET_DISTRICT_DATA_LIST, onGetDistrictlist);
  yield takeEvery(GET_TALUKA_DATA_LIST, onGetTalukalist);
  yield takeEvery(GET_VILLAGE_DATA_LIST, onGetVillageList);
}
export default LocationSaga;
