import { all, call, put, takeEvery } from "redux-saga/effects";
import { uploadSalesFileApi } from "../../api/salesApi";
import { uploadSalesFileFailure, uploadSalesFileSuccess } from "./salesSlice";

function* uploadSalesFileSaga(action) {
    const formData = new FormData();
    formData.append("excel_file", action.payload.excel_file)
    const response= yield call(uploadSalesFileApi, formData)

    if(response.status == 200 || response.status == 201) {
        yield put(uploadSalesFileSuccess(response.data))
    } else{
        yield put(uploadSalesFileFailure({'error':response}))
    }
}

function* uploadSalesFileWatcherSaga() {
    yield takeEvery('sales/uploadSalesFileFetch', uploadSalesFileSaga)
}

export default function* SalesSaga() {
    yield all([
        uploadSalesFileWatcherSaga(),
    ])
}

