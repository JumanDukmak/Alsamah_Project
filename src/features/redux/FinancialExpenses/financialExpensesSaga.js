import { all, call, put, takeEvery } from "redux-saga/effects";
import { addFinancialExpensesApi, getFinancialExpensesApi, updateFinancialExpensesApi } from "../../api/financialExpensesApi";
import { addFinancialExpensesFailuer, addFinancialExpensesSuccess, getFinancialExpensesFailure, getFinancialExpensesSuccess, updateFinancialExpensesFailuer, updateFinancialExpensesSuccess } from "./financialExpensesSlice";

function* addFinancialExpensesSaga(action) {
    const response = yield call(addFinancialExpensesApi,
        action.payload.working_number, 
        action.payload.work_category, 
        action.payload.num_of_employees, 
        action.payload.transport_cost,
        action.payload.health_insurance,
        action.payload.basic_salary,
        action.payload.incentives,
        action.payload.discounted_working_days )
    if (response.status == 200 || response.status == 201) {
        yield put(addFinancialExpensesSuccess(response.data))
    }
    else {
        yield put(addFinancialExpensesFailuer({ 'error': response }))
    }
}

function* updateFinancialExpensesSaga(action) {
    try {
        const response = yield call(updateFinancialExpensesApi,
            action.payload.working_number, 
            action.payload.work_category, 
            action.payload.num_of_employees, 
            action.payload.transport_cost,
            action.payload.health_insurance,
            action.payload.basic_salary,
            action.payload.incentives,
            action.payload.discounted_working_days,
            action.payload.id )
        yield put(updateFinancialExpensesSuccess(response.data))
    } catch(error) {
        yield put(updateFinancialExpensesFailuer({ 'error': error.response }))
    }

}

function* getFinancialExpensesSaga() {
    const response = yield call(getFinancialExpensesApi)
    if(response.status == 200 || response.status == 201) {
        yield put(getFinancialExpensesSuccess({ 'financialExpenses': response.data.data }))
    } else {
        yield put(getFinancialExpensesFailure({ 'error': response }))
    }
}

function* addFinancialExpensesWatcherSaga() {
    yield takeEvery('financialExpenses/addFinancialExpensesFetch', addFinancialExpensesSaga)
}

function* updateFinancialExpensesWatcherSaga() {
    yield takeEvery('financialExpenses/updateFinancialExpensesFetch', updateFinancialExpensesSaga)
}

function* getFinancialExpensesWatcherSaga() {
    yield takeEvery('financialExpenses/getFinancialExpensesFetch', getFinancialExpensesSaga)
}

export default function* FinancialExpensesSaga() {
    yield all([
        addFinancialExpensesWatcherSaga(),
        getFinancialExpensesWatcherSaga(),
        updateFinancialExpensesWatcherSaga(),
    ])
}

