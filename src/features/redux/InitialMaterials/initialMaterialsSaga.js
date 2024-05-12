import { all, call, put, takeEvery } from "redux-saga/effects";
import { addInitialMaterialsFailure, addInitialMaterialsSuccess,
    getInitialMaterialsFailure, getInitialMaterialsSuccess,
    uploadInitialMaterialsFileFailure, uploadInitialMaterialsFileSuccess } from "./initialMaterialsSlice";
import { addInitialMaterialsApi, getInitialMaterialsApi, uploadInitialMaterialsFileApi } from "../../api/initialMaterialsApi";

function* getInitialMaterialsSaga() {
    try {
        const response = yield call(getInitialMaterialsApi)
        yield put(getInitialMaterialsSuccess({ 'initialMaterials': response.data.data }))
    }
    catch (error) {
        yield put(getInitialMaterialsFailure({ 'error': error.response.data.message }))
    }
}

function* addInitialMaterialsSaga(action) {
    try {
        const response = yield call(addInitialMaterialsApi, 
            action.payload.number,
            action.payload.name,
            action.payload.type,
            action.payload.priceD)
        yield put(addInitialMaterialsSuccess(response.data))
    } catch (error) {
        yield put(addInitialMaterialsFailure({ 'error': error.response }))
    }
}

function* uploadInitialMaterialsFileSaga(action) {
    const formData = new FormData();
    formData.append("excel_file", action.payload.excel_file)
    const response= yield call(uploadInitialMaterialsFileApi, formData)
    if(response.status == 200 || response.status == 201) {
        yield put(uploadInitialMaterialsFileSuccess(response.data))
    } else{
        yield put(uploadInitialMaterialsFileFailure({ 'error': response }))
    }
}

function* initialMaterialsWatcherSaga() {
    yield takeEvery('initialMaterials/getInitialMaterialsFetch', getInitialMaterialsSaga)
}

function* addInitialMaterialsWatcherSaga() {
    yield takeEvery('initialMaterials/addInitialMaterialsFetch', addInitialMaterialsSaga)
}

function* uploadInitialMaterialsFileWatcherSaga() {
    yield takeEvery('initialMaterials/uploadInitialMaterialsFileFetch', uploadInitialMaterialsFileSaga)
}

export default function* InitialMaterialsSaga() {
    yield all([
        initialMaterialsWatcherSaga(),
        addInitialMaterialsWatcherSaga(),
        uploadInitialMaterialsFileWatcherSaga()
    ])
}