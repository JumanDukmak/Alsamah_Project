import { all, call, put, takeEvery } from "redux-saga/effects";

import {
  addIndustrialExpenseApi,
  getIndustrialExpenseApi,
  updateIndustrialExpenseApi,
} from "../../api/IndustrialExpenseApi";
import {
  addIndustrialExpenseFailure,
  addIndustrialExpenseSuccess,
  getIndustrialExpenseFailure,
  getIndustrialExpenseSuccess,
  updateIndustrialExpenseFailure,
  updateIndustrialExpenseSuccess,
} from "./IndustrialExpenseSlice";

//-----------------------------getCountriesSaga--------------------------------
function* getIndustrialExpenseSaga() {
  try {
    const response = yield call(getIndustrialExpenseApi);
    yield put(
      getIndustrialExpenseSuccess({ IndustrialExpense: response.data.data })
    );
  } catch (error) {
    yield put(
      getIndustrialExpenseFailure({ error: error.response.data.message })
    );
  }
}

//-----------------------------addCountrySaga--------------------------------
function* addIndustrialExpenseSaga(action) {
  try {
    const response = yield call(
      addIndustrialExpenseApi,

      action.payload.name,
      action.payload.monthlyD
    );
   
    yield put(addIndustrialExpenseSuccess(response.data));
  } catch (error) {
    yield put(
      addIndustrialExpenseFailure({ error: error.response.data.message })
    );
  }
}
//-----------------------------addCountrySaga--------------------------------
function* updateIndustrialExpenseSaga(action) {
  try {
    const response = yield call(
      updateIndustrialExpenseApi,
      action.payload.name,
      action.payload.monthlyD,
      action.payload.id,
    );
   
    yield put(updateIndustrialExpenseSuccess(response.data));
  } catch (error) {
    yield put(updateIndustrialExpenseFailure
      ({ "error": error.response })
    );
  }
}

//-----------------------------countriesWatcherSaga--------------------------------
function* industrialExpense_WatcherSaga() {
  yield takeEvery(
    "IndustrialExpense/getIndustrialExpenseStart",
    getIndustrialExpenseSaga
  );
}

//-----------------------------addCountryWatcherSaga--------------------------------
function* addIndustrialExpense_WatcherSaga() {
  yield takeEvery(
    "IndustrialExpense/addIndustrialExpenseStart",
    addIndustrialExpenseSaga
  );
}
//-----------------------------addCountryWatcherSaga--------------------------------
function* updateIndustrialExpense_WatcherSaga() {
  yield takeEvery(
    "IndustrialExpense/updateIndustrialExpenseStart",
    updateIndustrialExpenseSaga
  );
}

//-----------------------------countriesSaga--------------------------------
export default function* industrialExpenseSaga() {
  yield all([
    industrialExpense_WatcherSaga(),
    addIndustrialExpense_WatcherSaga(),
    updateIndustrialExpense_WatcherSaga(),
  ]);
}
