import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas';
import productSlice from './products/productSlice';
import countriesSlice from './Country/countriesSlice';
import areasSlice from './Area/areasSlice';
import salesPersonSlice from './SalesPerson/salesPersonSlice';
import categoriesSlice from './Category/categoriesSlice';
import brandsSlice from './Brands/brandsSlice';
import salesDistractionsSlice from './SalesReports/salesDistractionsSlice';
import salesSlice from './Sales/salesSlice';
import salesChartsSlice from './SalesReports/salesChartsSlice';
import IndustrialExpenseSlice from './Indirect_IndustrialExpense/IndustrialExpenseSlice';
import PigmentCostsSlice from './PigmentCosts/PigmentCostsSlice';
import GeneralDataSlice from './GeneralData/GeneralDataSlice';
import productionRatesSlice from './ProductionRates/productionRatesSlice';
import financialExpensesSlice from './FinancialExpenses/financialExpensesSlice';
import initialMaterialsSlice from './InitialMaterials/initialMaterialsSlice';
import directWorkSlice from './directWork/directWorkSlice';
import productionPlane_Slice from './production_Plane/productionPlane_Slice';
import initialMaterialsInventorySlice from './InitialMaterialsInventory/initialMaterialsInventorySlice';
import productInventorySlice from './productInventory/productInventorySlice';
import purchasesPlanSlice from './PurchasesPlan/purchasesPlanSlice';
import MachineProductivitySlice from './MachineProductivity/MachineProductivitySlice';
import MaterialOnShippingSlice from './MaterialOnShipping/MaterialOnShippingSlice';

const persistConfig = {
    key: 'root',
    storage,
};

const reducer = combineReducers({
    products: productSlice,
    countries: countriesSlice,
    areas: areasSlice,
    salesPersons: salesPersonSlice,
    brands: brandsSlice,
    categories: categoriesSlice,
    salesDistractions: salesDistractionsSlice,
    sales: salesSlice,
    salesCharts: salesChartsSlice,
    IndustrialExpense:IndustrialExpenseSlice,
    pigmentCosts:PigmentCostsSlice,
    GeneralData:GeneralDataSlice,
    productionRates: productionRatesSlice,
    financialExpenses: financialExpensesSlice,
    initialMaterials: initialMaterialsSlice,
    directWorks:directWorkSlice,
    productionPlane:productionPlane_Slice,
    materialsInventory:initialMaterialsInventorySlice,
    productsInventory:productInventorySlice,
    purchasesPlan:purchasesPlanSlice,
    machineProductivity:MachineProductivitySlice,
    materialOnShipping:MaterialOnShippingSlice
});

const persistedReducer = persistReducer(persistConfig, reducer);

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: persistedReducer,
    middleware: ()=>[sagaMiddleware],
})

sagaMiddleware.run(rootSaga);

