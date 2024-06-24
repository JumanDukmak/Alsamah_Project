import { all, call, put, takeEvery } from "redux-saga/effects";
import { addProductionRatesApi, getProductionRatesApi, updateProductionRatesApi, uploadProductionRatesFileApi } from "../../api/productionRatesApi";
import { addProductionRatesFailure, addProductionRatesSuccess, getProductionRatesFailure, getProductionRatesSuccess, updateProductionRatesFailure, updateProductionRatesSuccess, uploadProductionRatesFileFailure, uploadProductionRatesFileSuccess } from "./productionRatesSlice";

function* getProductionRatesSaga() {
    try {
        const response = yield call(getProductionRatesApi)
        yield put(getProductionRatesSuccess({ 'productionRates': response.data.data }))
    }
    catch (error) {
        console.log(`the erroro is : ${error}`)
        yield put(getProductionRatesFailure({ 'error': error.response.data.message }))
    }
}

function* addProductionRatesSaga(action) {
    try {
        const response = yield call(addProductionRatesApi, 
            action.payload.working_number,
            action.payload.working_type,
            action.payload.daily_production,
            action.payload.working_category)
        yield put(addProductionRatesSuccess(response.data))
    } catch (error) {
        yield put(addProductionRatesFailure({ 'error': error.response }))
    }
}

function* updateProductionRatesSaga(action) {
    try {
        const response = yield call(updateProductionRatesApi, 
            action.payload.working_number,
            action.payload.working_type,
            action.payload.daily_production,
            action.payload.working_category,
            action.payload.id )
        yield put(updateProductionRatesSuccess(response.data))
    } catch (error) {
        yield put(updateProductionRatesFailure({ 'error': error.response }))
    }
}

function* uploadProductionRatesFileSaga(action) {
    const formData = new FormData();
    formData.append("excel_file", action.payload.excel_file)
    const response= yield call(uploadProductionRatesFileApi, formData)
    if(response.status == 200 || response.status == 201) {
        yield put(uploadProductionRatesFileSuccess(response.data))
    } else{
        yield put(uploadProductionRatesFileFailure({ 'error': response }))
    }
}

function* productionRatesWatcherSaga() {
    yield takeEvery('productionRates/getProductionRatesFetch', getProductionRatesSaga)
}

function* addProductionRatesWatcherSaga() {
    yield takeEvery('productionRates/addProductionRatesFetch', addProductionRatesSaga)
}

function* updateProductionRatesWatcherSaga() {
    yield takeEvery('productionRates/updateProductionRatesFetch', updateProductionRatesSaga)
}

function* uploadProductionRatesFileWatcherSaga() {
    yield takeEvery('productionRates/uploadProductionRatesFileFetch', uploadProductionRatesFileSaga)
}

export default function* ProductionRatesSaga() {
    yield all([
        productionRatesWatcherSaga(),
        addProductionRatesWatcherSaga(),
        uploadProductionRatesFileWatcherSaga(),
        updateProductionRatesWatcherSaga()
    ])
}