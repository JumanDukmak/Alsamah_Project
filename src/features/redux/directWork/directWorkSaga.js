import { all, call, put, takeEvery } from "redux-saga/effects";
import { addDirectWorkFailure, addDirectWorkSuccess, deleteDirectWorkFileFailure, deleteDirectWorkFileSuccess, getdirectWorkFailure, getdirectWorkSuccess, uploadDirectWorkFileFailure, uploadDirectWorkFileSuccess } from "./directWorkSlice";

function* getDirectWorkSaga() {
    try {
        const response = yield call(getInitialMaterialsApi)
        yield put(getdirectWorkSuccess({ 'initialMaterials': response.data.data }))
    }
    catch (error) {
        yield put(getdirectWorkFailure({ 'error': error.response.data.message }))
    }
}

function* addDirectWorkSaga(action) {
    try {
        const response = yield call(addInitialMaterialsApi, 
            action.payload.number,
            action.payload.name,
            action.payload.type,
            action.payload.priceD)
        yield put(addDirectWorkSuccess(response.data))
    } catch (error) {
        yield put(addDirectWorkFailure({ 'error': error.response }))
    }
}

function* uploadDirectWorkFileSaga(action) {
    const formData = new FormData();
    formData.append("excel_file", action.payload.excel_file)
    const response= yield call(uploadInitialMaterialsFileApi, formData)
    if(response.status == 200 || response.status == 201) {
        yield put(uploadDirectWorkFileSuccess(response.data))
    } else{
        yield put(uploadDirectWorkFileFailure({ 'error': response }))
    }
}

//-----------------------------------------------------------------------------
function* removeDirectWorkSaga(action) {
    try {
        const response = yield call(addInitialMaterialsProductApi, 
            action.payload.initial_materials_code,
            action.payload.quantity,
            action.payload.productId,
            )
        yield put(deleteDirectWorkFileSuccess(response.data))
    } catch (error) {
        yield put(deleteDirectWorkFileFailure({ 'error': error.response }))
    }
}










function* directWorkWatcherSaga() {
    yield takeEvery('directWork/getdirectWorkFetch', getDirectWorkSaga)
}

function* adddirectWorkWatcherSaga() {
    yield takeEvery('directWork/addDirectWorkFetch', addDirectWorkSaga)
}

function* uploadDirectWorkFileWatcherSaga() {
    yield takeEvery('directWork/uploadDirectWorkFileFetch', uploadDirectWorkFileSaga)
}

function* removedirectWorkFileWatcherSaga() {
    yield takeEvery('directWork/deleteDirectWorkFileStart', removeDirectWorkSaga)
}

//-----------------------------for-product--------------------------------






export default function* DirectWorkSaga() {
    yield all([
        directWorkWatcherSaga(),
        adddirectWorkWatcherSaga(),
        uploadDirectWorkFileWatcherSaga(),
        removedirectWorkFileWatcherSaga(),
       

    ])
}