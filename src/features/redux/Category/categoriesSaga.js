import { all, call, put, takeEvery } from "redux-saga/effects";
import { addCategoryFailure, addCategorySuccess, getCategoriesFailure, getCategoriesSuccess } from "./categoriesSlice";
import { addCategoryApi, getCategoriesApi } from "../../api/categoriesApi";

//-----------------------------getCountriesSaga--------------------------------
function* getCategoriesSaga() {
    try {
        const response = yield call(getCategoriesApi)
        yield put(getCategoriesSuccess({ 'categories': response.data.data }))
    }
    catch (error) {
        yield put(getCategoriesFailure({ 'error': error.response.data.message }))
    }
}

//-----------------------------addCountrySaga--------------------------------
function* addCategorySaga(action) {
    try {
        const response = yield call(addCategoryApi, action.payload.name)
        yield put(addCategorySuccess(response.data))
    } catch (error) {
        yield put(addCategoryFailure({ 'error': error.response.data.message }))
    }
}

//-----------------------------countriesWatcherSaga--------------------------------
function* categoriesWatcherSaga() {
    yield takeEvery('categories/getCategoriesStart', getCategoriesSaga)
}

//-----------------------------addCountryWatcherSaga--------------------------------
function* addCategoryWatcherSaga() {
    yield takeEvery('categories/addCategoryStart', addCategorySaga)
}

//-----------------------------countriesSaga--------------------------------
export default function* categoriesSaga() {
    yield all([
        categoriesWatcherSaga(),
        addCategoryWatcherSaga()
    ])
}

