import { all, call, put, takeEvery } from "redux-saga/effects";
import { getProductsChartsApi, getSalesChartsApi } from "../../api/salesDistractionApi";
import { getProductsChartsFailure, getProductsChartsSuccess, getSalesChartsFailure, getSalesChartsSuccess } from "./salesChartsSlice";


//-----------------------------getExportSalesSaga--------------------------------
function* getSalesChartsSaga(action) {
    try {
        const response = yield call(getSalesChartsApi,action.payload.from,action.payload.to,action.payload.categories);
        
        // console.log(`the response is : ${JSON.stringify(response.data)}`);
        yield put(getSalesChartsSuccess(response.data));
    } catch (error) {
        yield put(getSalesChartsFailure({ error: error.response.data.message }));
    }
}

function* getProductsChartsSaga(action) {
    try {
        const response = yield call(getProductsChartsApi,action.payload.year,action.payload.month);
        console.log(`the response is : ${(response.status)}`);
       
        yield put(getProductsChartsSuccess(response.data));
    } catch (error) {
        yield put(getProductsChartsFailure({ error: error.response.data.message }));
    }
}

function* SalesChartsWatcherSaga() {
    yield takeEvery("salesCharts/getSalesChartsFetch", getSalesChartsSaga);
}

function* ProductsChartsWatcherSaga() {
    yield takeEvery("salesCharts/getProductsChartsFetch", getProductsChartsSaga);
}



export default function* SalesChartsSaga() {
    yield all([
        SalesChartsWatcherSaga(),
        ProductsChartsWatcherSaga(),

    ]);
}
