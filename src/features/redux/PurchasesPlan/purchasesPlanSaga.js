import { all, call, put, takeEvery } from "redux-saga/effects";
import { getPurchasesPlanFailure, getPurchasesPlanSuccess } from "./purchasesPlanSlice";
import { getPurchasesPlanApi } from "../../api/purchasesPlanApi";

function* getPurchasesPlanSaga(action) {
    try {
        const response = yield call(getPurchasesPlanApi,
            action.payload.year,
            action.payload.category);
        yield put(getPurchasesPlanSuccess(response.data));
    } catch (error) {
        yield put(getPurchasesPlanFailure({ error: error.response.data.message }));
    }
}

function* purchasesPlanWatcherSaga() {
    yield takeEvery("purchasesPlan/getPurchasesPlanFetch", getPurchasesPlanSaga);
}

export default function* PurchasesPlanSaga() {
    yield all([
        purchasesPlanWatcherSaga(),
    ]);
}
