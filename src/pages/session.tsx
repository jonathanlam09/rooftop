import React from 'react'
import { Outlet } from 'react-router-dom'

const Session = () => {
    return (
        <div style={{ 
            background: 'linear-gradient(to right, #2b5876, #4e4376)',
            minHeight: '100vh'
        }}>
            <Outlet></Outlet>
        </div>
    )
}

export default Session