import { all, call, put, takeEvery } from "redux-saga/effects";
import { addDirectWorkApi, deleteDirectWorkApi, uploadDirectCostFileApi } from "../../api/directWorkApi";
import { addDirectCostFailuer, addDirectCostSuccess, deleteDirectWorkFailure, deleteDirectWorkSuccess, uploadDirectCostFileFailure, uploadDirectCostFileSuccess } from "./directWorkSlice";


function* uploadDirectCostFileSaga(action) {
    try {
      const formData = new FormData();
      formData.append("excel_file", action.payload.excel_file);
      const response = yield call(uploadDirectCostFileApi, formData);
      yield put(uploadDirectCostFileSuccess(response.data));
    } catch (error) {
       
      yield put(
        uploadDirectCostFileFailure({
          error: JSON.stringify(error.response.data.errors),
        })
      );
    }
  }
  
  function* addDirectCostSaga(action) {
    try {
       
      const response = yield call(
        addDirectWorkApi,
        action.payload.directWorkCost,
        action.payload.id
      );
   
      yield put(addDirectCostSuccess(response.data));
    } catch (error) {
   
      yield put(
      
        addDirectCostFailuer({
          error: JSON.stringify(error.response.data.errors),
        })
      );
    }
  }
  
  function* removeDirectCostSaga(action) {
    try {
  
      const response = yield call(
        deleteDirectWorkApi,
        action.payload.productId,
        action.payload.directWork
      );
      yield put(deleteDirectWorkSuccess(response.data));
    } catch (error) {
      yield put(deleteDirectWorkFailure({ error: error.response.data.errors }));
    }
  }

//-----------------------------getCountriesSaga--------------------------------




function* addDirectCostWatcherSaga() {
    yield takeEvery('directWorks/addDirectCostFetch', addDirectCostSaga)
}

function* uploadDirectCostFileWatcherSaga() {
    yield takeEvery('directWorks/uploadDirectCostFileFetch', uploadDirectCostFileSaga)
}

function* removeDirectCostWatcherSaga() {
    yield takeEvery('directWorks/deleteDirectWorkStart', removeDirectCostSaga)
}
//-----------------------------countriesSaga--------------------------------
export default function* directWorkSaga() {
  yield all([
    addDirectCostWatcherSaga(),
    uploadDirectCostFileWatcherSaga(),
    removeDirectCostWatcherSaga(),
  ]);
}
