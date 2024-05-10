import { all, call, put, takeEvery } from "redux-saga/effects";

import {
  addGeneralDataFailure,
  addGeneralDataSuccess,
  getGeneralDataFailure,
  getGeneralDataSuccess,
  updateGeneralDataFailure,
  updateGeneralDataSuccess,
} from "./GeneralDataSlice";
import {
  addGeneralDataApi,
  getGeneralDataApi,
  updateGeneralDataApi,
} from "../../api/generalDataApi";

//-----------------------------getCountriesSaga--------------------------------
function* getGeneralDataSaga() {
  try {
    const response = yield call(getGeneralDataApi);
    console.log(`the get staus ${response.status}`);
    console.log(`${JSON.stringify(response.status)}`);
    yield put(getGeneralDataSuccess({ GeneralData: response.data.data }));
  } catch (error) {
    yield put(getGeneralDataFailure({ error: error.response.data.message }));
  }
}

//-----------------------------addCountrySaga--------------------------------
function* addGeneralDataSaga(action) {
  try {

    console.log(`the name is ${action.payload.name} and the value is ${action.payload.value}`)
    const response = yield call(
      addGeneralDataApi,

      action.payload.name,
      action.payload.value
    );
    console.log(` the add staus ${response.status}`);
    console.log(`${JSON.stringify(response.status)}`);
    yield put(addGeneralDataSuccess(response.data));
  } catch (error) {
    yield put(addGeneralDataFailure({ error: error.response.data.message }));
  }
}
//-----------------------------addCountrySaga--------------------------------
function* updateGeneralDataSaga(action) {
  try {
    const response = yield call(
      updateGeneralDataApi,
      action.payload.name,
      action.payload.value,
      action.payload.id
    );
    console.log(`the update staus ${response.status}`);
    console.log(`${JSON.stringify(response.status)}`);
    yield put(updateGeneralDataSuccess(response.data));
  } catch (error) {
    yield put(updateGeneralDataFailure({ error: error.response.data.message }));
  }
}

//-----------------------------countriesWatcherSaga--------------------------------
function* generalData_WatcherSaga() {
  yield takeEvery("GeneralData/getGeneralDataStart", getGeneralDataSaga);
}

//-----------------------------addCountryWatcherSaga--------------------------------
function* addGeneralData_WatcherSaga() {
  yield takeEvery("GeneralData/addGeneralDataStart", addGeneralDataSaga);
}
//-----------------------------addCountryWatcherSaga--------------------------------
function* updateGeneralData_WatcherSaga() {
  yield takeEvery("GeneralData/updateGeneralDataStart", updateGeneralDataSaga);
}

//-----------------------------countriesSaga--------------------------------
export default function* generalDataSaga() {
  yield all([
    generalData_WatcherSaga(),
    addGeneralData_WatcherSaga(),
    updateGeneralData_WatcherSaga(),
  ]);
}
