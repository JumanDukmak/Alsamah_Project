import { all, call, put, takeEvery } from "redux-saga/effects";
import { addBrandApi, getBrandsApi } from "../../api/brandsApi";
import { addBrandFailure, addBrandSuccess, getBrandsFailure, getBrandsSuccess } from "./brandsSlice";

//-----------------------------getCountriesSaga--------------------------------
function* getBrandsSaga() {
    try {
        const response = yield call(getBrandsApi)
        yield put(getBrandsSuccess({ 'brands': response.data.data }))
    }
    catch (error) {
        console.log(`the erroro is : ${error}`)
        yield put(getBrandsFailure({ 'error': error.response.data.message }))
    }
}

//-----------------------------addCountrySaga--------------------------------
function* addBrandSaga(action) {
    try {
        const response = yield call(addBrandApi, action.payload.name)
        yield put(addBrandSuccess(response.data))
    } catch (error) {
        yield put(addBrandFailure({ 'error': error.response.data.message }))
    }
}

//-----------------------------countriesWatcherSaga--------------------------------
function* brandsWatcherSaga() {
    yield takeEvery('brands/getBrandsStart', getBrandsSaga)
}
//-----------------------------addCountryWatcherSaga--------------------------------
function* addBrandWatcherSaga() {
    yield takeEvery('brands/addBrandStart', addBrandSaga)
}

//-----------------------------countriesSaga--------------------------------

export default function* brandsSaga() {

    yield all([
        brandsWatcherSaga(),
        addBrandWatcherSaga()
    ])
}