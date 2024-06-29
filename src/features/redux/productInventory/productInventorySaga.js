import { all, call, put, takeEvery } from "redux-saga/effects";
import { addProductInventoryApi, getProductInventoryApi, updateProductInventoryApi, uploadProductInventoryFileApi } from "../../api/productInventoryApi";
import { addProductsInventoryFailuer, addProductsInventorySuccess, getProductsInventoryFailure, getProductsInventorySuccess, updateProductsInventoryFailure, updateProductsInventorySuccess, uploadProductsInventoryFileFailure, uploadProductsInventoryFileSuccess } from "./productInventorySlice";

function* addProductsInventorySaga(action) {
    console.log("action:" +action.payload);
    const response = yield call(addProductInventoryApi,
        action.payload.product_id,
        action.payload.quantity,
        action.payload.inventory_date
    );
    console.log("from saga:" +response);
    if (response.status == 200 || response.status == 201) {
        yield put(addProductsInventorySuccess(response.data));
    } else {
        yield put(addProductsInventoryFailuer({ error: response }));
    }
}

function* getProductsInventorySaga(action) {
    const response = yield call(getProductInventoryApi, 
        action.payload.category, 
        action.payload.year
    );
    if (response.status == 200 || response.status == 201) {
        yield put(getProductsInventorySuccess(response.data));
    } else {
        yield put(getProductsInventoryFailure({ error: response }));
    }
}

function* updateProductsInventorySaga(action) {
    try {
        const response = yield call(updateProductInventoryApi, 
            action.payload.quantity,
            action.payload.inventory_date,
            action.payload.id )
        yield put(updateProductsInventorySuccess(response.data))
    } catch (error) {
        yield put(updateProductsInventoryFailure({ 'error': error.response }))
    }
}

function* uploadProductsInventoryFileSaga(action) {
    const formData = new FormData();
    formData.append("excel_file", action.payload.excel_file);
    const response = yield call(uploadProductInventoryFileApi, formData);
    if (response.status == 200 || response.status == 201) {
        yield put(uploadProductsInventoryFileSuccess(response.data));
    } else {
        yield put(uploadProductsInventoryFileFailure({ error: response }));
    }
}

function* addProductsInventoryWatcherSaga() {
    yield takeEvery("productsInventory/addProductsInventoryFetch", addProductsInventorySaga);
}

function* getProductsInventoryWatcherSaga() {
    yield takeEvery("productsInventory/getProductsInventoryFetch", getProductsInventorySaga);
}

function* uploadProductsInventoryFileWatcherSaga() {
    yield takeEvery("productsInventory/uploadProductsInventoryFileFetch", uploadProductsInventoryFileSaga);
}

function* updateProductsInventoryWatcherSaga() {
    yield takeEvery("productsInventory/updateProductsInventoryFetch", updateProductsInventorySaga);
}

export default function* ProductsInventorySaga() {
    yield all([
        addProductsInventoryWatcherSaga(),
        getProductsInventoryWatcherSaga(),
        uploadProductsInventoryFileWatcherSaga(),
        updateProductsInventoryWatcherSaga()
    ]);
}
