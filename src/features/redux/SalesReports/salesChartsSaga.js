import { all, call, put, takeEvery } from "redux-saga/effects";
import { getSalesChartsApi } from "../../api/salesDistractionApi";
import { getSalesChartsFailure, getSalesChartsSuccess } from "./salesChartsSlice";


//-----------------------------getExportSalesSaga--------------------------------
function* getSalesChartsSaga() {
    try {
        const response = yield call(getSalesChartsApi);
        console.log(`the response is : ${JSON.stringify(response.data)}`);
        yield put(getSalesChartsSuccess(response.data));
    } catch (error) {
        yield put(getSalesChartsFailure({ error: error.response.data.message }));
    }
}

function* SalesChartsWatcherSaga() {
    yield takeEvery("salesCharts/getSalesChartsFetch", getSalesChartsSaga);
}

export default function* SalesChartsSaga() {
    yield all([
        SalesChartsWatcherSaga(),
    ]);
}
