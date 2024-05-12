import { all, call, put, takeEvery } from "redux-saga/effects";
import { addInitialMaterialsFailure, addInitialMaterialsProductFailure, addInitialMaterialsProductSuccess, addInitialMaterialsSuccess,
    getInitialMaterialsFailure, getInitialMaterialsSuccess,
    updateInitialMaterialsProductFailure,
    updateInitialMaterialsProductSuccess,
    uploadInitialMaterialsFileFailure, uploadInitialMaterialsFileSuccess, 
    uploadInitialMaterialsProductFailure, 
    uploadInitialMaterialsProductSuccess} from "./initialMaterialsSlice";
import { addInitialMaterialsApi, addInitialMaterialsProductApi, getInitialMaterialsApi, updateInitialMaterialsProductApi, uploadInitialMaterialsFileApi, uploadInitialMaterialsProductApi } from "../../api/initialMaterialsApi";

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

//-----------------------------------------------------------------------------
function* addInitialMaterialsProductSaga(action) {
    try {
        const response = yield call(addInitialMaterialsProductApi, 
            action.payload.initial_materials_code,
            action.payload.quantity,
            action.payload.productId,
            )
        yield put(addInitialMaterialsProductSuccess(response.data))
    } catch (error) {
        yield put(addInitialMaterialsProductFailure({ 'error': error.response }))
    }
}

function* updateInitialMaterialsProductSaga(action) {
    try {
        const response = yield call(updateInitialMaterialsProductApi, 
            action.payload.initial_materials_code,
            action.payload.quantity,
            action.payload.productId,)
        yield put(updateInitialMaterialsProductSuccess(response.data))
    } catch (error) {
        yield put(updateInitialMaterialsProductFailure({ 'error': error.response }))
    }
}





function* uploadInitialMaterialsProductSaga(action) {
    const formData = new FormData();
    formData.append("excel_file", action.payload.excel_file)
    const response= yield call(uploadInitialMaterialsProductApi, formData)
    if(response.status == 200 || response.status == 201) {
        yield put(uploadInitialMaterialsProductSuccess(response.data))
    } else{
        yield put(uploadInitialMaterialsProductFailure({ 'error': response }))
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

//-----------------------------for-product--------------------------------

function* uploadInitialMaterialsProductWatcherSaga() {
    yield takeEvery('initialMaterials/uploadInitialMaterialsProductFetch', uploadInitialMaterialsProductSaga)
}

function* addInitialMaterialsProductWatcherSaga() {
    yield takeEvery('initialMaterials/addInitialMaterialsProductFetch', addInitialMaterialsProductSaga)
}

function* updateInitialMaterialsProductWatcherSaga() {
    yield takeEvery('initialMaterials/updateInitialMaterialsProductFetch', updateInitialMaterialsProductSaga)
}





export default function* InitialMaterialsSaga() {
    yield all([
        initialMaterialsWatcherSaga(),
        addInitialMaterialsWatcherSaga(),
        uploadInitialMaterialsFileWatcherSaga(),
        uploadInitialMaterialsProductWatcherSaga(),
        addInitialMaterialsProductWatcherSaga(),
        updateInitialMaterialsProductWatcherSaga()

    ])
}