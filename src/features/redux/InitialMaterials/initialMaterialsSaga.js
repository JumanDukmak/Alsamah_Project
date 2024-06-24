import { all, call, put, takeEvery } from "redux-saga/effects";
import { addInitialMaterialsFailure, addInitialMaterialsSuccess, 
    addMaterialProductSuccess, addMaterialProductFailuer,
    getInitialMaterialsFailure, getInitialMaterialsSuccess,
    updateInitialMaterialsFailure, updateInitialMaterialsSuccess,
    updateMaterialProductFailuer, updateMaterialProductSuccess,
    uploadInitialMaterialsFileFailure, uploadInitialMaterialsFileSuccess,
    uploadMaterialsProductFileFailure, uploadMaterialsProductFileSuccess } from "./initialMaterialsSlice";
import { addInitialMaterialsApi,
    addMaterialProductApi,
    getInitialMaterialsApi,
    updateInitialMaterialsApi,
    updateMaterialsProductApi,
    uploadInitialMaterialsFileApi,
    uploadMaterialsProductFileApi } from "../../api/initialMaterialsApi";

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

function* updateInitialMaterialsSaga(action) {
    try {
        const response = yield call(updateInitialMaterialsApi,
            action.payload.number,
            action.payload.name,
            action.payload.type,
            action.payload.priceD,
            action.payload.id)
        yield put(updateInitialMaterialsSuccess(response.data))
    } catch (error) {
        yield put(updateInitialMaterialsFailure({ 'error': error.response }))
    }
}

function* uploadInitialMaterialsFileSaga(action) {
    const formData = new FormData();
    formData.append("excel_file", action.payload.excel_file)
    const response = yield call(uploadInitialMaterialsFileApi, formData)
    if (response.status == 200 || response.status == 201) {
        yield put(uploadInitialMaterialsFileSuccess(response.data))
    } else {
        yield put(uploadInitialMaterialsFileFailure({ 'error': response }))
    }
}

//-----------------------------------------------------------------------
function* addMaterialProductSaga(action) {
    try {
        const response = yield call(addMaterialProductApi,
            action.payload.productId,
            action.payload.items,
        );
        yield put(addMaterialProductSuccess(response.data));
    } catch (error) {
        yield put(addMaterialProductFailuer({ error: error.response.data.message })
        );
    }
}

function* updateMaterialProductSaga(action) {
    try {
        const response = yield call(updateMaterialsProductApi,
            action.payload.productId,
            action.payload.items,
        );
        yield put(updateMaterialProductSuccess(response.data));
    } catch (error) {
        yield put(updateMaterialProductFailuer({ error: error.response.data.message })
        );
    }
}

function* uploadMaterialsProductFileSaga(action) {
    try {
        const formData = new FormData();
        formData.append("excel_file", action.payload.excel_file)
        const response = yield call(uploadMaterialsProductFileApi, formData)
        yield put(uploadMaterialsProductFileSuccess(response.data))
    } catch (error) {
        yield put(uploadMaterialsProductFileFailure({
                error: JSON.stringify(error.response.data.errors),
            })
        );
    }
}

function* initialMaterialsWatcherSaga() {
    yield takeEvery('initialMaterials/getInitialMaterialsFetch', getInitialMaterialsSaga)
}

function* addInitialMaterialsWatcherSaga() {
    yield takeEvery('initialMaterials/addInitialMaterialsFetch', addInitialMaterialsSaga)
}

function* updateInitialMaterialsWatcherSaga() {
    yield takeEvery('initialMaterials/updateInitialMaterialsFetch', updateInitialMaterialsSaga)
}

function* uploadInitialMaterialsFileWatcherSaga() {
    yield takeEvery('initialMaterials/uploadInitialMaterialsFileFetch', uploadInitialMaterialsFileSaga)
}

//----------------------------------
function* addMaterialProductWatcherSaga() {
    yield takeEvery('initialMaterials/addMaterialProductFetch', addMaterialProductSaga)
}

function* uploadMaterialsProductFileWatcherSaga() {
    yield takeEvery('initialMaterials/uploadMaterialsProductFileFetch', uploadMaterialsProductFileSaga)
}

function* updateMaterialProductWatcherSaga() {
    yield takeEvery('initialMaterials/updateMaterialProductFetch', updateMaterialProductSaga)
}

export default function* InitialMaterialsSaga() {
    yield all([
        initialMaterialsWatcherSaga(),
        addInitialMaterialsWatcherSaga(),
        updateInitialMaterialsWatcherSaga(),
        uploadInitialMaterialsFileWatcherSaga(),
        addMaterialProductWatcherSaga(),
        updateMaterialProductWatcherSaga(),
        uploadMaterialsProductFileWatcherSaga(),
    ])
}