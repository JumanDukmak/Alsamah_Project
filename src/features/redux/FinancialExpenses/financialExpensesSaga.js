import { all, call, put, takeEvery } from "redux-saga/effects";
import { addFinancialExpensesApi, getFinancialExpensesApi } from "../../api/financialExpensesApi";
import { addFinancialExpensesFailuer, addFinancialExpensesSuccess, getFinancialExpensesFailure, getFinancialExpensesSuccess } from "./financialExpensesSlice";

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

function* getFinancialExpensesSaga() {
    const response = yield call(getFinancialExpensesApi)
    if(response.status == 200 || response.status == 201) {
        console.log("response:"+ response);
        yield put(getFinancialExpensesSuccess({ 'financialExpenses': response.data.data }))
    } else {
        yield put(getFinancialExpensesFailure({ 'error': response }))
    }
}

function* addFinancialExpensesWatcherSaga() {
    yield takeEvery('financialExpenses/addFinancialExpensesFetch', addFinancialExpensesSaga)
}

function* getFinancialExpensesWatcherSaga() {
    yield takeEvery('financialExpenses/getFinancialExpensesFetch', getFinancialExpensesSaga)
}

export default function* FinancialExpensesSaga() {
    yield all([
        addFinancialExpensesWatcherSaga(),
        getFinancialExpensesWatcherSaga(),
    ])
}

