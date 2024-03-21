import './App.css'
import {  Routes, Route } from 'react-router-dom'
import BaseLayout from './components/BaseLayout'
import Dashboard from './features/components/Dashboard'
import { ConfigProvider } from 'antd'

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
            <Route exact path="/" element={< Dashboard/>} />
        </Routes>
    </BaseLayout>
  </ConfigProvider>
  )
}

export default App
