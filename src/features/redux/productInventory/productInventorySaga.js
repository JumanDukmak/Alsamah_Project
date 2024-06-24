import { all, call, put, takeEvery } from "redux-saga/effects";
import { addProductInventoryApi, getProductInventoryApi, uploadProductInventoryFileApi } from "../../api/productInventoryApi";
import { addProductsInventoryFailuer, addProductsInventorySuccess, getProductsInventoryFailure, getProductsInventorySuccess, uploadProductsInventoryFileFailure, uploadProductsInventoryFileSuccess } from "./productInventorySlice";

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

export default function* ProductsInventorySaga() {
    yield all([
        addProductsInventoryWatcherSaga(),
        getProductsInventoryWatcherSaga(),
        uploadProductsInventoryFileWatcherSaga()
    ]);
}
