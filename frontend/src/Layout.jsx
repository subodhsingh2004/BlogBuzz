import React from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import SideBar from './components/SideBar'

function Layout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <SideBar/>
        </>

    )
}

export default Layout