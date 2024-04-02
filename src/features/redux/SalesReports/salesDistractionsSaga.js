import { all, call, put, takeEvery } from "redux-saga/effects";
import { getExportSalesFailure, getExportSalesSuccess, getLocalSalesFailure, getLocalSalesSuccess } from "./salesDistractionsSlice";
import { getExportSalesDistractionsApi, getLocalSalesDistractionsApi } from "../../api/salesDistractionApi";

//-----------------------------getExportSalesSaga--------------------------------
function* getExportSalesDistractionsSaga(action) {
    try {
        const response = yield call(getExportSalesDistractionsApi,action.payload.saletype,action.payload.brands_id,action.payload.categories_id,action.payload.country_id)

        
        //  console.log(`the response is : ${JSON.stringify(response.data.data)}`);

        yield put(getExportSalesSuccess(response.data))
    }
    catch (error) {
        yield put(getExportSalesFailure({ 'error': error.response.data.message }))
    }
}

//-----------------------------------getLocalSalesSaga---------------------------------------
function* getLocalSalesDistractionsSaga(action) {
    try {
        const response = yield call(getLocalSalesDistractionsApi,
            action.payload.local_saletype,
            action.payload.salesperson_id,
            action.payload.areas_id,
            action.payload.governorate
            ,action.payload.brands_id,
            action.payload.categories_id)
        
        console.log(`the response is : ${response.status}`);
        
         console.log(`the response is : ${JSON.stringify(response.data.data)}`);

        yield put(getLocalSalesSuccess(response.data))
    }
    catch (error) {
        yield put(getLocalSalesFailure({ 'error': error.response.data.message }))
    }
}







function* LocalSalesDistractionsWatcherSaga() {
    yield takeEvery('salesDistraction/getLocalSalesStart', getLocalSalesDistractionsSaga)
}


function* ExportSalesDistractionsWatcherSaga() {
    yield takeEvery('salesDistraction/getExportSalesStart', getExportSalesDistractionsSaga)
}




//-----------------------------salessonsSaga--------------------------------
export default function* SalesDistractionsSaga() {
    yield all([
        ExportSalesDistractionsWatcherSaga(),
        LocalSalesDistractionsWatcherSaga(),

       
    ])
}

