import { all, call, put, takeEvery } from "redux-saga/effects";
import { addShopFailure, addShopSuccess, getShopsFailure, getShopsSuccess } from "./shopsSlice";
import { addShopApi, getShopsApi } from "../../api/shopsApi";

//-----------------------------getShopsSaga--------------------------------
function* getShopsSaga() {
    try {
        const response = yield call(getShopsApi)
        yield put(getShopsSuccess({ 'shops': response.data.data }))
    }
    catch (error) {
        yield put(getShopsFailure({ 'error': error.response.data.message }))
    }
}

//-----------------------------addShopSaga--------------------------------
function* addShopSaga(action) {
    try {
        const response = yield call(addShopApi, action.payload.name, action.payload.governorate)
        yield put(addShopSuccess(response.data))
    }
    catch (error) {
        yield put(addShopFailure({ 'error': error.response.data.message }))
    }
}

//-----------------------------shopsWatcherSaga--------------------------------
function* shopsWatcherSaga() {
    yield takeEvery('shops/getShopsStart', getShopsSaga)
}

//-----------------------------addShopWatcherSaga--------------------------------
function* addShopWatcherSaga() {
    yield takeEvery('shops/addShopStart', addShopSaga)
}

//-----------------------------shopsSaga--------------------------------
export default function* shopsSaga() {
    yield all([
        shopsWatcherSaga(),
        addShopWatcherSaga()
    ])
}

