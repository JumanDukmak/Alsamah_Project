import './App.css'
import {  Routes, Route } from 'react-router-dom'
import BaseLayout from './components/BaseLayout'
import Dashboard from './features/components/Dashboard'
import { ConfigProvider } from 'antd'
import Products from './features/components/products/Products'
import Countries from './features/components/Country/Countries'
import Areas from './features/components/Area/Areas'
import Shops from './features/components/Shops/Shops'
import Categories from './features/components/Category/Categories'
import Brands from './features/components/Brands/Brands'
import AddSales from './features/components/Sales/AddSales'
import ShowDistractions from './features/components/Sales/ShowDistractions'
import Distractions from './features/components/Sales/Distractions'
import Indirect_industrialExpense from './features/components/Indirect_IndustrialExpense/IndustrialExpense'
import AddProductionRates from './features/components/ProductionRates/AddProductionRates'
import PigmentCosts from './features/components/PigmentCost/PigmentCosts'
import GeneralData from './features/components/GeneralData/GeneralData'
import ProductionRates from './features/components/ProductionRates/ProductionRates'
import AddFinancialExpenses from './features/components/FinancialExpenses/AddFinancialExpenses'
import FinancialExpenses from './features/components/FinancialExpenses/FinancialExpenses'
import AddInitialMaterial from './features/components/InitialMaterial/AddInitialMaterial'
import InitialMaterials from './features/components/InitialMaterial/InitialMaterials'
import ShowProduct from './features/components/products/ShowProduct'
import ShowProductionPlane from './features/components/ProductionPlane/ShowProductionPlane'
import ProductionPlanee from './features/components/ProductionPlane/ProductionPlane'
import UpdateProductionRates from './features/components/ProductionRates/UpdateProductionRates'
import UpdateFinancialExpenses from './features/components/FinancialExpenses/UpdateFinancialExpenses'
import AddProductInventory from './features/components/ProductInventory/AddProductInventory'
import ProductsInventory from './features/components/ProductInventory/ProductsInventory'
import InitialMaterialsInventory from './features/components/InitialMaterialsInventory/InitialMaterialsInventory'
import AddInitialMaterialInventory from './features/components/InitialMaterialsInventory/AddInitialMaterialInventory'
import UpdateInitialMaterial from './features/components/InitialMaterial/UpdateInitialMaterial'
import UpdateProductInventory from './features/components/ProductInventory/UpdateProductInventory'
import PurchasesPlan from './features/components/PurchasesPlan/PurchasesPlan'
import ShowPurchasesPlan from './features/components/PurchasesPlan/ShowPurchasesPlan'
import UpdateInitialMaterialInventory from './features/components/InitialMaterialsInventory/UpdateInitialMaterialInventory'

function App() {
  return (  
    <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#02e079',
      },
    }}
    direction='rtl'
  >
    <BaseLayout>
        <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/Products" element={<Products />} />
            <Route exact path="/shops" element={<Shops />} />
            <Route exact path="/countries" element={<Countries />} />
            <Route exact path="/areas" element={<Areas />} />
            <Route exact path="/categories" element={<Categories />} />
            <Route exact path="/brands" element={<Brands />} />
            <Route exact path='/add/sales' element={<AddSales />} />
            <Route exact path='/show/distractions' element={<ShowDistractions />} />
            <Route exact path='/distractions' element={<Distractions />} />
            <Route exact path='/Indirect_industrialExpense' element={<Indirect_industrialExpense />} />
            <Route exact path='/productionRates' element={<ProductionRates />} />
            <Route exact path='/add/productionRates' element={<AddProductionRates />} />
            <Route exact path='/update/productionRates' element={<UpdateProductionRates />} />
            <Route exact path='/PigmentCosts' element={<PigmentCosts />} />
            <Route exact path='/GeneralData' element={<GeneralData />} />
            <Route exact path='/add/financialExpenses' element={<AddFinancialExpenses />} />
            <Route exact path='/update/financialExpenses' element={<UpdateFinancialExpenses />} />
            <Route exact path='/financialExpenses' element={<FinancialExpenses />} />
            <Route exact path='/add/initialMaterials' element={<AddInitialMaterial />} />
            <Route exact path='/update/initialMaterials' element={<UpdateInitialMaterial />} />
            <Route exact path='/initialMaterials' element={<InitialMaterials />} />
            <Route exact path='/show/product/:id' element={<ShowProduct />} />
            <Route exact path='/ShowProductionPlane' element={<ShowProductionPlane />} />
            <Route exact path='/ProductionPlane' element={<ProductionPlanee />} />
            <Route exact path='/show/inventory/products' element={<ProductsInventory />} />
            <Route exact path='/add/inventory/products' element={<AddProductInventory />} />
            <Route exact path='/update/inventory/products' element={<UpdateProductInventory />} />
            <Route exact path='/show/inventory/initialMaterials' element={<InitialMaterialsInventory />} />
            <Route exact path='/add/inventory/initialMaterials' element={<AddInitialMaterialInventory />} />
            <Route exact path='/update/inventory/initialMaterials' element={<UpdateInitialMaterialInventory />} />
            <Route exact path='/ShowPurchasesPlan' element={<ShowPurchasesPlan />} />
            <Route exact path='/PurchasesPlan' element={<PurchasesPlan />} />
        </Routes>
    </BaseLayout>
  </ConfigProvider>
  )
}

export default App
