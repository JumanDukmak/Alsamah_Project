import { all, call, put, takeEvery } from "redux-saga/effects";
import { addMaterialOnShippingFailuer, addMaterialOnShippingSuccess, uploadMaterialOnShippingFileFailure, uploadMaterialOnShippingFileSuccess } from "./MaterialOnShippingSlice";
import { addMaterialOnShippingApi, uploadMaterialOnShippingFileApi } from "../../api/materialOnShippingApi";





function* addMaterialOnShippingSaga(action) {
console.log(`the data are ${ action.payload.initial_material_id} and ${ action.payload.date} and ${ action.payload.quantity}`)

    try {
    const response = yield call(
        addMaterialOnShippingApi,
        action.payload.initial_material_id,
        action.payload.date,
        action.payload.quantity
    );

    console.log(`the repo add : ${response.data}`)
    yield put(addMaterialOnShippingSuccess(response.data));
} catch (error) {
    console.log(`the repo add : ${error.response.data.message}`)
        yield put(addMaterialOnShippingFailuer({ error: error.response.data.message }));
      }

}









function* uploadMaterialOnShippingFileSaga(action) {


    try {
        const formData = new FormData();
        formData.append("excel_file", action.payload.excel_file);
        const response = yield call(uploadMaterialOnShippingFileApi, formData);
        console.log(`the repo add : ${response.data}`)
        yield put(uploadMaterialOnShippingFileSuccess(response.data));
} catch (error) {
        yield put(uploadMaterialOnShippingFileFailure({ error: error.response.data.message }));
      }
}

function* addMaterialOnShippingWatcherSaga() {
    yield takeEvery("materialOnShipping/addMaterialOnShippingFetch", addMaterialOnShippingSaga);
}



function* uploadMaterialOnShippingFileWatcherSaga() {
    yield takeEvery("materialOnShipping/uploadMaterialOnShippingFileFetch", uploadMaterialOnShippingFileSaga);
}

export default function* InitialMaterialOnShippingSaga() {
    yield all([
        addMaterialOnShippingWatcherSaga(),
        uploadMaterialOnShippingFileWatcherSaga(),
       
    ]);
}
