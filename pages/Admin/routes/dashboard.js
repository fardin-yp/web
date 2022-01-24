import React,{useState , useEffect ,useRef ,useContext} from 'react'
import Chart from '../chart/chart';
import axios from 'axios';
import io from 'socket.io-client';
import context from '../../../helpers/context/authContext';

const dashboard = ({info}) => {

const {users} = useContext(context);
const date_ob = new Date();

let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear()

const today = `${date}/${month}/${year}`

const filterToday = today && info && info.allSessions.filter(res => res.day === today)

    return (
        <div className="dashboard">
          <div id="dashboard-1">
            <div>
               <h1>25000 تومان</h1>
               <p>فروش کل</p>
            </div>
            <div style={{backgroundColor:"#52bcdc" ,borderRight:"7px solid #2cadd4"}}>
               <h1><h1>{info && info.allUsers.length || 0}</h1></h1>
               <p> تعداد کل کاربران</p>
            </div>
            <div style={{backgroundColor:"#f4ab43" ,borderRight:"7px solid #c37c16"}}>
               <h1>{info && info.allArticles.length || 0}</h1>
               <p> تعداد کل مقالات</p>
            </div>
            <div style={{backgroundColor:"#72b159" ,borderRight:"7px solid #5d9547"}}>
            <h1>{info && info.allProducts.length || 0}</h1>
               <p >تعداد کل پروژه ها</p>
            </div>
          </div>
          <div id="dashboard-2" >
            <div>
               <circle><p>{users && users.length/2}</p></circle>
               <h2>کاربران آنلاین</h2>
            </div>
            <div>
               <circle style={{border:"10px solid #78aedd" }}><p>{info && info.allSessions.length}</p></circle>
               <h2> کل بازدید کنندگان </h2>
            </div>
            <div>
               <circle style={{border:"10px solid #ff9800" }}><p>{filterToday && filterToday.length}</p></circle>
               <h2>بازدید کنندگان امروز</h2>
            </div>
          </div>
         <Chart info={info && info.allSessions} />
        </div>
    )
}

export default dashboard
