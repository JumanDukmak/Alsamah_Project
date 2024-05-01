import { all, call, put, takeEvery } from "redux-saga/effects";

import {
  addIndustrialExpenseApi,
  getIndustrialExpenseApi,
} from "../../api/IndustrialExpenseApi";
import {
  addIndustrialExpenseFailure,
  addIndustrialExpenseSuccess,
  getIndustrialExpenseFailure,
  getIndustrialExpenseSuccess,
} from "./IndustrialExpenseSlice";

//-----------------------------getCountriesSaga--------------------------------
function* getIndustrialExpenseSaga() {
  try {
    const response = yield call(getIndustrialExpenseApi);
    console.log(`${response.status}`);
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
    console.log(` the added : ${response.status}`);
    yield put(addIndustrialExpenseSuccess(response.data));
  } catch (error) {
    yield put(
      addIndustrialExpenseFailure({ error: error.response.data.message })
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

//-----------------------------countriesSaga--------------------------------
export default function* industrialExpenseSaga() {
  yield all([
    industrialExpense_WatcherSaga(),
    addIndustrialExpense_WatcherSaga(),
  ]);
}
