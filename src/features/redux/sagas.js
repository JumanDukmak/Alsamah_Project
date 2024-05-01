import { all, fork } from 'redux-saga/effects';
import ProductsSaga from './products/productSaga';
import countriesSaga from './Country/countriesSaga';
import areasSaga from './Area/areasSaga';
import shopsSaga from './Shops/shopsSaga';
import salesPersonsSaga from './SalesPerson/salesPersonSaga';
import categoriesSaga from './Category/categoriesSaga';
import brandsSaga from './Brands/brandsSaga';
import SalesDistractionsSaga from './SalesReports/salesDistractionsSaga';
import SalesSaga from './Sales/salesSaga';
import SalesChartsSaga from './SalesReports/salesChartsSaga';
import industrialExpenseSaga from './Indirect_IndustrialExpense/IndustrialExpenseSaga';

export default function* rootSaga() {
    yield all([
        fork(ProductsSaga),
        fork(countriesSaga),
        fork(shopsSaga),
        fork(areasSaga),
        fork(salesPersonsSaga),
        fork(categoriesSaga),
        fork(brandsSaga),
        fork(SalesDistractionsSaga),
        fork(SalesSaga),
        fork(SalesChartsSaga),
        fork(industrialExpenseSaga)
    ]);
}
