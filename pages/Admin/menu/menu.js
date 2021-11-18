import left from '../images/left.png';
import Image from 'next/image'
import { useState } from 'react';

const menu = () => {
    const [active ,setActive] = useState("dashboard");

 

    return (
        <div className="menu">
            <ul>
            <li onClick={() => setActive("dashboard")} style={active === "dashboard" ?{backgroundColor:"white"}:null}>          
                <div>داشبورد</div>
                <Image width={30} height={20} src={left} alt="" />
            </li>
            <li onClick={() => setActive("projects")} style={active === "projects" ?{backgroundColor:"white"}:null} >          
                <div>پروژه ها</div>
                <Image width={30} height={20} src={left} alt="" />
            </li>
            <li>          
                <div>فروش ها</div>
                <Image width={30} height={20} src={left} alt="" />
            </li>
            <li>          
                <div>مقالات</div>
                <Image width={30} height={20} src={left} alt="" />
            </li>
            <li>          
                <div>سئو</div>
                <Image width={30} height={20} src={left} alt="" />
            </li>

            </ul>

        </div>
    )
}

export default menu
