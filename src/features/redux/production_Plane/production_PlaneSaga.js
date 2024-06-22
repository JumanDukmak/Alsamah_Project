import { all, call, put, takeEvery } from "redux-saga/effects";
import { getProductionPlaneFailure, getProductionPlaneSuccess } from "./productionPlane_Slice";
import { getProductionPlaneApi } from "../../api/productionPlaneApi";



//-----------------------------getCountriesSaga--------------------------------
function* getProductionPlaneSaga(action) {
  try {
    const response = yield call(getProductionPlaneApi,action.payload.year,action.payload.category);

    yield put(getProductionPlaneSuccess(response.data));
  } catch (error) {
    yield put(getProductionPlaneFailure({ error: error.response.data.message }));
  }
}



//-----------------------------countriesWatcherSaga--------------------------------
function* productionPlane_WatcherSaga() {
  yield takeEvery("productionPlane/getProductionPlaneFetch", getProductionPlaneSaga);
}



//-----------------------------countriesSaga--------------------------------
export default function* production_PlaneSaga() {
  yield all([
    productionPlane_WatcherSaga(),
   
  ]);
}
