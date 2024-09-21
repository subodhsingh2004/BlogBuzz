import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from 'react-router-dom'
import Layout from './Layout.jsx'
import Signup from './pages/Signup.jsx'
import FullPost from './pages/FullPost.jsx'
import Profile from './pages/Profile.jsx'
import Login from './pages/Login.jsx'
import Loader from './components/Loader.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import { Bounce, Flip, Slide, ToastContainer, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import UserPosts from './pages/UserPosts.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>

      <Route path='/' element={<Layout />}>

        <Route path='' element={<App />} />

        <Route path='/signup'
          element={<AuthLayout authentication={false}>
            {" "}
            <Signup />
          </AuthLayout>} />

        <Route path='/login' element={<AuthLayout authentication={false}>
          {" "}
          <Login />
        </AuthLayout>} />

        <Route path='/post/:id' element={<FullPost />} />

        <Route path='/profile/:username' element={<AuthLayout authentication>
          {" "}
          <Profile />
        </AuthLayout>} />

        <Route path='/profile/page/:pageHeading' element={<AuthLayout authentication>
          {" "}
          <UserPosts />
        </AuthLayout>} />

      </Route>

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer
        hideProgressBar
        position='top-center'
        autoClose={3000}
        transition={Slide}
        theme='dark' />
    </Provider>
  </React.StrictMode>,
)
