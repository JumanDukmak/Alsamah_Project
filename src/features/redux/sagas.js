import { all, fork } from 'redux-saga/effects';
import ProductsSaga from './products/productSaga';
import countriesSaga from './Country/countriesSaga';
import areasSaga from './Area/areasSaga';
import salesPersonsSaga from './SalesPerson/salesPersonSaga';
import categoriesSaga from './Category/categoriesSaga';
import brandsSaga from './Brands/brandsSaga';
import SalesDistractionsSaga from './SalesReports/salesDistractionsSaga';
import SalesSaga from './Sales/salesSaga';
import SalesChartsSaga from './SalesReports/salesChartsSaga';
import industrialExpenseSaga from './Indirect_IndustrialExpense/IndustrialExpenseSaga';
import pigmentCostsSaga from './PigmentCosts/PigmentCostsSaga';
import generalDataSaga from './GeneralData/GeneralDataSaga';
import ProductionRatesSaga from './ProductionRates/productionRatesSaga';
import FinancialExpensesSaga from './FinancialExpenses/financialExpensesSaga';
import InitialMaterialsSaga from './InitialMaterials/initialMaterialsSaga';
import directWorkSaga from './directWork/directWorkSaga';
import production_PlaneSaga from './production_Plane/production_PlaneSaga';
import InitialMaterialsInventorySaga from './InitialMaterialsInventory/initialMaterialsInventorySaga';
import ProductsInventorySaga from './productInventory/productInventorySaga';
import PurchasesPlanSaga from './PurchasesPlan/purchasesPlanSaga';
import InitialMachineProductivitySaga from './MachineProductivity/MachineProductivitySaga';
import InitialMaterialOnShippingSaga from './MaterialOnShipping/MaterialOnShippingSaga';

export default function* rootSaga() {
    yield all([
        fork(ProductsSaga),
        fork(countriesSaga),
        fork(areasSaga),
        fork(salesPersonsSaga),
        fork(categoriesSaga),
        fork(brandsSaga),
        fork(SalesDistractionsSaga),
        fork(SalesSaga),
        fork(SalesChartsSaga),
        fork(industrialExpenseSaga),
        fork(pigmentCostsSaga),
        fork(generalDataSaga),
        fork(ProductionRatesSaga),
        fork(FinancialExpensesSaga),
        fork(InitialMaterialsSaga),
        fork(directWorkSaga),
        fork(production_PlaneSaga),
        fork(InitialMaterialsInventorySaga),

        fork(ProductsInventorySaga), 
        fork(PurchasesPlanSaga),

       
        fork(InitialMachineProductivitySaga),
        fork(InitialMaterialOnShippingSaga)

    ]);
}
