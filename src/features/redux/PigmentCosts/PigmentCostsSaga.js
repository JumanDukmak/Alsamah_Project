import { all, call, put, takeEvery } from "redux-saga/effects";
import { addPigmentCostsFailure, addPigmentCostsSuccess, getpigmentCostsFailure, getpigmentCostsSuccess, updatePigmentCostsFailure, updatePigmentCostsSuccess } from "./PigmentCostsSlice";
import { addPigmentCostsApi, getPigmentCostsApi, updatePigmentCostsApi } from "../../api/pigmentCostsApi";

//-----------------------------getpigmentCostsSaga--------------------------------
function* getpigmentCostsSaga() {
  try {
    const response = yield call(getPigmentCostsApi);
    yield put(getpigmentCostsSuccess({ pigmentCosts: response.data.data }));
  } catch (error) {
    yield put(getpigmentCostsFailure({ error: error.response.data.message }));
  }
}

//-----------------------------addpigmentCosts--------------------------------
function* addPigmentCostsSaga(action) {
  try {
    const response = yield call(
      addPigmentCostsApi,
      action.payload.measure,
      action.payload.value
    );
    yield put(addPigmentCostsSuccess(response.data));
  } catch (error) {
    yield put(addPigmentCostsFailure({ error: error.response.data.message }));
  }
}

function* updatePigmentCostsSaga(action) {
  try {
    const response = yield call(
      updatePigmentCostsApi,
      action.payload.measure,
      action.payload.value,
      action.payload.id
    );
    yield put(updatePigmentCostsSuccess(response.data));
  } catch (error) {
    yield put(
      updatePigmentCostsFailure({ error: error.response.data.message })
    );
  }
}

function* addPigmentCostsWatcherSaga() {
  yield takeEvery("pigmentCosts/addPigmentCostsStart", addPigmentCostsSaga);
}

function* pigmentCostsWatcherSaga() {
  yield takeEvery("pigmentCosts/getpigmentCostsStart", getpigmentCostsSaga);
}

function* updatePigmentCostsWatcherSaga() {
  yield takeEvery(
    "pigmentCosts/updatePigmentCostsStart",
    updatePigmentCostsSaga
  );
}

//-----------------------------salesPersonsSaga--------------------------------
export default function* pigmentCostsSaga() {
  yield all([
    pigmentCostsWatcherSaga(),
    addPigmentCostsWatcherSaga() ,
    updatePigmentCostsWatcherSaga()
  ]);
}
