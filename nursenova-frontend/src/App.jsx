import './App.css'
import { Route, Routes  } from 'react-router-dom'
import Header from './component/Header'
import LoginPage from './pages/LoginPage'
import OtpPage from './pages/OtpPage'
import RegisterPage from './pages/RegisterPage'


function App() {
 

  return (
    <>
    <Routes>
      <Route path='/login' element={<LoginPage></LoginPage>}></Route>
      <Route path='/sign-up' element={<RegisterPage></RegisterPage>}></Route>
      <Route path='/otp' element={<OtpPage></OtpPage>}></Route>

      
    </Routes>
    </>
  )
}

export default App
