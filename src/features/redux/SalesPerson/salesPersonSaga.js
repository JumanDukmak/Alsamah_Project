import { all, call, put, takeEvery } from "redux-saga/effects";
import { addsalesPersonApi, getsalesPersonsApi } from "../../api/salesPersonsApi";
import { addSalesPersonFailure, addSalesPersonSuccess, getsalesPersonsFailure, getsalesPersonsSuccess } from "./salesPersonSlice";

//-----------------------------getSalesPersonsSaga--------------------------------
function* getSalesPersonsSaga() {
    try {
        const response = yield call(getsalesPersonsApi)
        yield put(getsalesPersonsSuccess({ 'salesPersons': response.data.data }))
    }
    catch (error) {
        yield put(getsalesPersonsFailure({ 'error': error.response.data.message }))
    }
}

function* salesPersonsWatcherSaga() {
    yield takeEvery('salesPersons/getsalesPersonsStart', getSalesPersonsSaga)
}

//-----------------------------addsalesPerson--------------------------------
function* addSalesPersonSaga(action) {
    try {
        const response = yield call(addsalesPersonApi, action.payload.first_name, action.payload.last_name)
        yield put(addSalesPersonSuccess(response.data))
    }
    catch (error) {
        yield put(addSalesPersonFailure({ 'error': error.response.data.message }))
    }
}

function* addsalesPersonWatcherSaga() {
    console.log('herowatttttchhhhh')
    yield takeEvery('salesPersons/addSalesPersonStart', addSalesPersonSaga)
}

//-----------------------------salesPersonsSaga--------------------------------
export default function* salesPersonsSaga() {
    yield all([
        salesPersonsWatcherSaga(),
        addsalesPersonWatcherSaga(),
    ])
}

