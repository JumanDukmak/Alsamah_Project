import { all, call, put, takeEvery } from "redux-saga/effects";
import {  addActual_productionApi, getComparisonBetweenActual_ExpectedApi, getMachineProductivityApi, updateActual_productionApi, uploadActual_productionFileApi,  } from "../../api/machineProductivityApi";
import {  addActual_productionFailuer, addActual_productionSuccess, getComparisonBetweenActual_ExpectedFailure, getComparisonBetweenActual_ExpectedSuccess, getMachineProductivityFailure, getMachineProductivitySuccess, updateActual_productionFailure, updateActual_productionSuccess, uploadActual_productionFileFailure, uploadActual_productionFileSuccess  } from "./MachineProductivitySlice";

function* addActual_productionSaga(action) {


    try {
    const response = yield call(
        addActual_productionApi,
        action.payload.product_id,
        action.payload.value,
        action.payload.date
    );

    yield put(addActual_productionSuccess(response.data));
} catch (error) {
        yield put(addActual_productionFailuer({ error: error.response.data.message }));
      }

}

function* getMachineProductivitySaga(action) {
    const response = yield call(getMachineProductivityApi,
        action.payload.category, 
        action.payload.year
    );
    if (response.status == 200 || response.status == 201) {

        yield put(getMachineProductivitySuccess(response.data));
    } else {
        yield put(getMachineProductivityFailure({ error: response }));
    }
}

function* updateActual_productionSaga(action) {


    try {
      const response = yield call(
        updateActual_productionApi,
        action.payload.id,
        action.payload.date,
        action.payload.value
      );
      yield put(updateActual_productionSuccess(response.data));
    } catch (error) {
      yield put(
        
        updateActual_productionFailure({ error: error.response.data.errors.date })
      );
    }
  }





function* getComparisonBetweenActual_ExpectedSaga(action) {
    const response = yield call(getComparisonBetweenActual_ExpectedApi,
        action.payload.category, 
        action.payload.year
    );
    if (response.status == 200 || response.status == 201) {
        yield put(getComparisonBetweenActual_ExpectedSuccess(response.data.data));
    } else {
        yield put(getComparisonBetweenActual_ExpectedFailure({ error: response }));
    }
}


function* uploadActual_productionFileSaga(action) {


    try {
        const formData = new FormData();
        formData.append("excel_file", action.payload.excel_file);
        const response = yield call(uploadActual_productionFileApi, formData);

        yield put(uploadActual_productionFileSuccess(response.data));
} catch (error) {
        yield put(uploadActual_productionFileFailure({ error: error.response.data.message }));
      }
}

function* addActual_productionWatcherSaga() {
    yield takeEvery("machineProductivity/addActual_productionFetch", addActual_productionSaga);
}

function* updateActual_productionWatcherSaga() {
    yield takeEvery("machineProductivity/updateActual_productionStart", updateActual_productionSaga);
}

function* getMachineProductivityWatcherSaga() {
    yield takeEvery("machineProductivity/getMachineProductivityFetch", getMachineProductivitySaga);
}
function* getComparisonBetweenActual_ExpectedWatcherSaga() {
    yield takeEvery("machineProductivity/getComparisonBetweenActual_ExpectedFetch", getComparisonBetweenActual_ExpectedSaga);
}
function* uploadActual_productionFileWatcherSaga() {
    yield takeEvery("machineProductivity/uploadActual_productionFileFetch", uploadActual_productionFileSaga);
}

export default function* InitialMachineProductivitySaga() {
    yield all([
        addActual_productionWatcherSaga(),
        getMachineProductivityWatcherSaga(),
        uploadActual_productionFileWatcherSaga(),
        getComparisonBetweenActual_ExpectedWatcherSaga(),
        updateActual_productionWatcherSaga()
    ]);
}
