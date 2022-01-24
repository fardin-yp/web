import Head from 'next/head';
import React, { useState ,useEffect } from 'react';
import Footer from '../../../components/footer/footer';
import LiveChat from '../../../components/liveChat/liveChat';
import Navbar from '../../../components/navbar/navbar';

export async function getServerSideProps() {

    const loggedIn = await fetch('http://localhost:27017/allRoutes/exclusiveForm',{method:'GET'});
    const logged = await loggedIn.json();
  
    return {
       props: {posts:logged}
    }
  }  

const index =  ({posts}) => {

    const [order ,setOrder] = useState([]);
    const [totalCart ,setTotalCart] = useState(0);
    const [reset ,setReset] = useState(false);
    const [category ,setCategory] = useState('');
    const [factor ,setFactore] = useState(false);
    const [PAy ,seTpay] = useState(false);

    const pushOrder = (object) => {
     setReset(false)
    const exist = order.find(res => res.title === object.title)

    if(exist){
         setOrder(order.filter(item => item.title !== object.title))
    }

    if(!exist){
        setOrder([...order ,object])
     }
    }

const TotalPrice = () => {
    const total = order.reduce((sum, {price} ) => Number(sum) + Number(price) ,0)
    setTotalCart(total);
    
  }
  useEffect(() => {
    TotalPrice()
    setFactore(true)
  },[order]);

  const checked = order.map(res => res.title);

  useEffect(() => {
      if(reset === true){
          setOrder([])
      }
  },[reset]);

  useEffect(() => {

if(category.length > 0) {
    const filterCategory = posts && posts[0].form.filter(res => {
        return (
            res.categoryFirst.includes(category) ||
            res.categorySecond.includes(category) ||
            res.categoryThird.includes(category) 
        )
     })
 
     setOrder(filterCategory)
}
},[category]);


    return (
<div>
<Head>
   <link rel="icon" href="/art.png" />
    <title>سفارش سایت اختصاصی -dreamWeb</title>
    {/* <meta name="description" content={jsonSeo && jsonSeo[0].description} />
    <meta name="keywords" content={jsonSeo && jsonSeo[0].keywords} />
    <meta property="og:site_name" content="دریم وب"/>
    <meta property="og:title" content={jsonSeo && jsonSeo[0].title} />
    <meta property="og:description" content={jsonSeo && jsonSeo[0].description} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta property="og:url" content={jsonSeo && jsonSeo[0].ogUrl} />
    <meta name="og:type" content={jsonSeo && jsonSeo[0].ogType}/> */}
    <meta property="og:locale" content="Fa_IR" /> 
  </Head>
            <Navbar />
            <div className="order-ex">
            {PAy === true && <div onClick={() => seTpay(false)} id="backDrop">hello</div>}
            {PAy === true &&
            <div className="secc-comment">
                <img src={'/uploads/warning.png'} alt="" />
                <h1 style={{marginTop:"15px",color:"#fe0000"}}> متاسفانه در حال حاضر درگاه پرداختی وجود ندارد !</h1>
                <h2 style={{textAlign:"center",fontSize:"20px"}}>شما میتوانید برای خرید وبسایت  اختصاصی خود با پشتیبانی تماس بگیرید!</h2>
                <button style={{background:"#fe1919"}} onClick={() => {
                    seTpay(false)}}>متوجه شدم</button>
            </div>}
                <form>
                  <div className="head-order">
                      <h1>سفارش سایت اختصاصی  دریم وب</h1>
                      <fieldset>
                      <legend>انتخاب خودکار ویژگی ها جهت سایت های زیر</legend>
                          <a href="#">
                          <input type="radio" checked={reset} onClick={() => setReset(true)} /><p>ریست</p>
                          </a>
                          <a href="#">
                          <input type="radio" checked={category === "base"} onClick={() => setCategory("base")} /><p>پایه اختصاصی</p>
                          </a>
                          <a href="#">
                          <input type="radio" checked={category === "shop"} onClick={() => setCategory("shop")} /><p>سایت اختصاصی فروشگاهی</p>
                          </a>
                          <a href="#">
                          <input type="radio" checked={category === "company"} onClick={() => setCategory("company")} /><p>سایت اختصاصی شرکتی</p>
                          </a>
                      </fieldset>
                  </div>
                <table>
                      <thead >
                          <th style={{width:"10%"}}>
                              <a href="#">انتخاب</a>
                          </th>
                          <th style={{width:"20%"}}>
                              <a href="#">نام ویژگی</a>
                          </th>
                          <th style={{width:"45%"}}>
                              <a href="#">معرفی</a>
                          </th>
                          <th style={{width:"10%"}}>
                              <a href="#">نوع</a>
                          </th>
                          <th style={{width:"15%"}}>
                              <a href="#">قیمت (تومان)</a>
                          </th>
                      </thead>

                     <tbody >
                     {posts && posts[0].form.map(res => {
                             return <tr style={checked.includes(res.title)? {background:"#b39cdb"}:null} onClick={() => pushOrder(res)} className="tr-news">
                             <td>
                                 <input style={{cursor:"pointer"}} type="checkbox" checked={checked.includes(res.title)} />
                             </td>
                             <td>
                                 <a>{res.title}</a>
                             </td>
                             <td >
                                 <a>{res.des}</a>
                             </td>
                             <td >
                                 <a>{res.type}</a>
                             </td>
                             <td >
                                 <a>{res.price}</a>
                             </td>
                         </tr>
                         })}
                      </tbody> 
                      <tfoot></tfoot>
                     </table>

                <div className="payment" style={{width:"85%",padding:"10px",marginTop:"20px"}}>
                    <p style={{margin:"20px 0px"}}>مبلغ قابل پرداخت : {totalCart} تومان </p>
                </div>
                <button onClick={(e) => {
                    e.preventDefault()
                    seTpay(true)}}
                    >ادامه خرید و پیش فاکتور</button>

                </form>
                {factor && totalCart > 0 &&  < div className="factor-ex">
                    <b>قیمت کل : {totalCart}</b>
                    <b> تعداد آیتم های انتخابی : {order.length}</b>
                    <img onClick={() => setFactore(false)} src={"/images/cancel (1).png"} />
                </div>}
                

            </div>
            <LiveChat />
            <Footer />
        </div>
    )
}

export default index
