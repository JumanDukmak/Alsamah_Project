import { all, call, put, takeEvery } from "redux-saga/effects";
import { addAreaFailure, addAreaSuccess, getAreasFailure, getAreasSuccess } from "./areasSlice";
import { addAreaApi, getAreasApi } from "../../api/areasApi";

//-----------------------------getAreasSaga--------------------------------
function* getAreasSaga() {
    try {
        const response = yield call(getAreasApi)
        yield put(getAreasSuccess({ 'areas': response.data.data }))
    }
    catch (error) {
        console.log(error)
        yield put(getAreasFailure({ 'error': error.response.data.message }))
    }
}

//-----------------------------addAreaSaga--------------------------------
function* addAreaSaga(action) {
    try {
        const response = yield call(addAreaApi, action.payload.name, action.payload.governorate, action.payload.salesperson_id)
        yield put(addAreaSuccess(response.data))
    }
    catch (error) {
        yield put(addAreaFailure({ 'error': error.response.data.message }))
    }
}

//-----------------------------areasWatcherSaga--------------------------------
function* areasWatcherSaga() {
    yield takeEvery('areas/getAreasStart', getAreasSaga)
}

//-----------------------------addAreaWatcherSaga--------------------------------
function* addAreaWatcherSaga() {
    yield takeEvery('areas/addAreaStart', addAreaSaga)
}

//-----------------------------areasSaga--------------------------------
export default function* areasSaga() {
    yield all([
        areasWatcherSaga(),
        addAreaWatcherSaga()
    ])
}

