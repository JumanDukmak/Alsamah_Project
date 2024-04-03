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

function App() {
  return (  
    <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#02e079',
      },
    }}
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
        </Routes>
    </BaseLayout>
  </ConfigProvider>
  )
}

export default App