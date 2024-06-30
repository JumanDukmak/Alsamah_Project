import { all, call, put, takeEvery } from "redux-saga/effects";
import { uploadExpectSalesFileApi, uploadSalesFileApi } from "../../api/salesApi";
import { uploadExpectSalesFileFailure, uploadExpectSalesFileSuccess, uploadSalesFileFailure, uploadSalesFileSuccess } from "./salesSlice";

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



function* uploadExpectSalesFileSaga(action) {
    
    console.log(`sagaaaaa`)
    const formData = new FormData();
    formData.append("excel_file", action.payload.excel_file)
    const response= yield call(uploadExpectSalesFileApi, formData)

    if(response.status == 200 || response.status == 201) {
        console.log(`the response expected ******** : ${response.status} and ${JSON.stringify(response.data)}`)
        yield put(uploadExpectSalesFileSuccess(response.data))
    } else{
        yield put(uploadExpectSalesFileFailure({'error':response}))
    }
}



function* uploadSalesFileWatcherSaga() {
    yield takeEvery('sales/uploadSalesFileFetch', uploadSalesFileSaga)
}

function* uploadExpectSalesFileWatcherSaga() {
    yield takeEvery('sales/uploadExpectSalesFileFetch', uploadExpectSalesFileSaga)
}


export default function* SalesSaga() {
    yield all([
        uploadSalesFileWatcherSaga(),
        uploadExpectSalesFileWatcherSaga(),
    ])
}

