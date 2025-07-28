import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './Layout'
import Bug from './pages/Bug'
import FooterDetailed from './components/FooterDetailed'
import ReportBugs from './pages/ReportBugs'
import BugReportDetail from './components/BugReportDetail'
import Dashboard from './pages/Dashboard'
import SignUp from './components/forms/SignUp'
import Login from './components/forms/Login'
import ProtectedRoute from './components/Context/ProtectedRoute'
import MyBugs from './pages/MyBugs'
import { AuthProvider } from './components/Context/AuthContext'
import EditProfile from './components/forms/EditProfile'
import HandleBugUpdate from './components/forms/HandleBugUpdate'
import UpdateRole from './components/forms/UpdateRole'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider> {/* ✅ Wrap everything inside AuthProvider */}
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/bug' element={<Bug />} />


            {/* ✅ Protected Routes */}
            <Route path='/reportbug' element={

                <ReportBugs /> 

            } />
            <Route path='/dashboard' element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route
              path='/mybugs'
              allowedRoles={['user', 'tester', 'developer']}
              element={
                <ProtectedRoute allowedRoles={['user', 'tester', 'developer']}>
                  <MyBugs />
                </ProtectedRoute>
              }
            />

            <Route path='/bugDetails/:id' element={
              <ProtectedRoute >
                <BugReportDetail />
              </ProtectedRoute>
            } />
            <Route path='/editProfile/:id' element={
              <ProtectedRoute >
                <EditProfile />
              </ProtectedRoute>
            } />
            <Route path='/bugdetail/:id' element={
              <ProtectedRoute >
                <HandleBugUpdate />
              </ProtectedRoute>
            } />
            <Route path='/userRole/:id' element={
              <ProtectedRoute >
                <UpdateRole />
              </ProtectedRoute>
            } />

            {/* ✅ Auth Routes */}
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
          </Route>
        </Routes>

        <FooterDetailed />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
