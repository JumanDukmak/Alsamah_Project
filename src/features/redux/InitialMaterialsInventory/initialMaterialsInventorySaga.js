import { all, call, put, takeEvery } from "redux-saga/effects";
import { addMaterialsInventoryFailuer, addMaterialsInventorySuccess, getMaterialsInventoryFailure, getMaterialsInventorySuccess, uploadMaterialsInventoryFileFailure, uploadMaterialsInventoryFileSuccess } from "./initialMaterialsInventorySlice";
import { addMaterialsInventoryApi, getMaterialsInventoryApi, uploadMaterialsInventoryFileApi } from "../../api/initialMaterialsInventoryApi";

function* addMaterialsInventorySaga(action) {
    console.log("action:" +action.payload);
    const response = yield call(
        addMaterialsInventoryApi,
        action.payload.initialMaterial_id,
        action.payload.quantity,
        action.payload.inventory_date
    );
    console.log("from saga:" +response);
    if (response.status == 200 || response.status == 201) {
        yield put(addMaterialsInventorySuccess(response.data));
    } else {
        yield put(addMaterialsInventoryFailuer({ error: response }));
    }
}

function* getMaterialsInventorySaga(action) {
    const response = yield call(getMaterialsInventoryApi,
        action.payload.type, 
        action.payload.year
    );
    if (response.status == 200 || response.status == 201) {
        yield put(getMaterialsInventorySuccess(response.data));
    } else {
        yield put(getMaterialsInventoryFailure({ error: response }));
    }
}

function* uploadMaterialsInventoryFileSaga(action) {
    const formData = new FormData();
    formData.append("excel_file", action.payload.excel_file);
    const response = yield call(uploadMaterialsInventoryFileApi, formData);
    if (response.status == 200 || response.status == 201) {
        yield put(uploadMaterialsInventoryFileSuccess(response.data));
    } else {
        yield put(uploadMaterialsInventoryFileFailure({ error: response }));
    }
}

function* addMaterialsInventoryWatcherSaga() {
    yield takeEvery("materialsInventory/addMaterialsInventoryFetch", addMaterialsInventorySaga);
}

function* getMaterialsInventoryWatcherSaga() {
    yield takeEvery("materialsInventory/getMaterialsInventoryFetch", getMaterialsInventorySaga);
}

function* uploadMaterialsInventoryFileWatcherSaga() {
    yield takeEvery("materialsInventory/uploadMaterialsInventoryFileFetch", uploadMaterialsInventoryFileSaga);
}

export default function* InitialMaterialsInventorySaga() {
    yield all([
        addMaterialsInventoryWatcherSaga(),
        getMaterialsInventoryWatcherSaga(),
        uploadMaterialsInventoryFileWatcherSaga()
    ]);
}
