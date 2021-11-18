import React from 'react'
import Menu from './menu/menu'

const index = () => {
    return (
        <div className="admin">
            <div className="top-menu">
                <h1>LOGO</h1>
                <div> 
                <p>fardin</p>
                <img src="/uploads/users.png" alt=""/>
                </div>
            </div>
           <Menu />
        </div>
    )
}

export default index
