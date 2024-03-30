import { all, call, put, takeEvery } from "redux-saga/effects";
import { addCountryFailure, addCountrySuccess, getCountriesFailure, getCountriesSuccess } from "./countriesSlice";
import { addCountryApi, getCountriesApi } from "../../api/countriesApi";

//-----------------------------getCountriesSaga--------------------------------
function* getCountriesSaga() {
    try {
        const response = yield call(getCountriesApi)
        yield put(getCountriesSuccess({ 'countries': response.data.data }))
    }
    catch (error) {
        yield put(getCountriesFailure({ 'error': error.response.data.message }))
    }
}

//-----------------------------addCountrySaga--------------------------------
function* addCountrySaga(action) {
    try {
        const response = yield call(addCountryApi, action.payload.name)
        yield put(addCountrySuccess(response.data))
    } catch (error) {
        yield put(addCountryFailure({ 'error': error.response.data.message }))
    }
}

//-----------------------------countriesWatcherSaga--------------------------------
function* countriesWatcherSaga() {
    yield takeEvery('countries/getCountriesStart', getCountriesSaga)
}

//-----------------------------addCountryWatcherSaga--------------------------------
function* addCountryWatcherSaga() {
    yield takeEvery('countries/addCountryStart', addCountrySaga)
}

//-----------------------------countriesSaga--------------------------------
export default function* countriesSaga() {
    yield all([
        countriesWatcherSaga(),
        addCountryWatcherSaga()
    ])
}

