import React from 'react';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import LiveChat from '../../components/liveChat/liveChat';
import Head from 'next/head';

export async function getStaticProps() {

    const res = await fetch('http://localhost:27017/allRoutes/articles')
    const json = await res.json()

    const resSeo = await fetch('http://localhost:27017/allRoutes/Seo/seo')
    const jsonSeo = await resSeo.json();

    return {
      props:{
        json,
        jsonSeo
      },
      revalidate:1
    };
  
  }
const index = ({json ,jsonSeo}) => {

    return (
    <div className="layout">
            <Head>
               <link rel="icon" href="/art.png" />
               <title>{jsonSeo && jsonSeo[0].title}</title>
               <meta name="description" content={jsonSeo && jsonSeo[0].description} />
               <meta name="keywords" content={jsonSeo && jsonSeo[0].keywords} />
               <meta property="og:site_name" content="دریم وب"/>
               <meta property="og:title" content={jsonSeo && jsonSeo[0].title} />
               <meta property="og:description" content={jsonSeo && jsonSeo[0].description} />
               <meta name="viewport" content="width=device-width, initial-scale=1" />
               <meta property="og:url" content={jsonSeo && jsonSeo[0].ogUrl} />
               <meta name="og:type" content={jsonSeo && jsonSeo[0].ogType}/>
               <meta property="og:locale" content="Fa_IR" /> 
             </Head>
        <LiveChat />
        <Navbar />
            <div className="Seo">
             <div className="about-seo">
                 <div>
                     <h1>سئو چیست؟</h1>
                     <p>سئو برگرفته از عبارت Search Engine Optimization است که کلمات معادلی چون SEO یا بهینه سازی موتور جستجو دارد که همگی آنها به یک معنی می باشند و می توان آن را بصورت زیر تعریف نمود:</p>
                     <p>سئو را مي‌توان مجموعه‌اي از روش‌ها براي تغيير استراتژيک وب سايت‌ها دانست. اين فرآيند به بيان مهمترين عوامل مرتبط صفحه و افزايش اهميت آن در صفحه نتايج جستجو، مي‌پردازد.</p>
                 </div>
                 <img src="/uploads/SSeo.png"/>
             </div>
             <div id="mazaya" className="about-seo">
                 <div >
                     <h1>مزایای سئو</h1>
                     <p>سئو برگرفته از عبارت Search Engine Optimization است که کلمات معادلی چون SEO یا بهینه سازی موتور جستجو دارد که همگی آنها به یک معنی می باشند و می توان آن را بصورت زیر تعریف نمود:</p>
                     <p>سئو را مي‌توان مجموعه‌اي از روش‌ها براي تغيير استراتژيک وب سايت‌ها دانست. اين فرآيند به بيان مهمترين عوامل مرتبط صفحه و افزايش اهميت آن در صفحه نتايج جستجو، مي‌پردازد.</p>
                 </div>
                 <img src="/uploads/Seo2.png"/>
             </div>
             <div style={{marginTop:"55px",marginBottom:"-80px"}} className="head-con">
                     <div className="line" /><h1>مراحل بهینه سازی</h1><div className="line" id="line-2"/>
                </div>
             <div className="seo-steps">

                 <div>
                     <div>    
                         <img src="/uploads/analis.png" />
                         <h1>آنالیز سایت</h1>
                         <p> آنالیز وب سایت شما و رقبا و ایجاد فاکتور های Google </p>
                     </div>
                     <div>    
                         <img src="/uploads/programming.png" />
                         <h1>بهینه سازی ساختار </h1>
                         <p> آنالیز وب سایت شما و رقبا و ایجاد فاکتور های Google </p>
                     </div>
                     <div>    
                         <img src="/uploads/statistics.png" />
                         <h1>تولید محتوای مناسب</h1>
                         <p> آنالیز وب سایت شما و رقبا و ایجاد فاکتور های Google </p>
                     </div>
                     <div>    
                         <img src="/uploads/seo (1).png" />
                         <h1>خدمات ویژه سئو</h1>
                         <p> آنالیز وب سایت شما و رقبا و ایجاد فاکتور های Google </p>
                     </div>
                 </div>
             </div>
             <div className="seo-plans">
             <div  className="head-con">
                            <h1 style={{color:"black" , fontSize:"28px"}}> خدمات سئو </h1>
                </div>
                <div>
                {json && json.seoService.map(res => {
                                  return <div key={res._id}>
                                   
                                         <div className="seo-head">
                                            <h1 style={res.title === 'سرویس خدمات ویژه' ? {color:"#4caf50"}:null}>{res.title}</h1>
                                            <b style={{opacity:"0.9"}}>{res.price}</b>
                                         
                                         <hr />
                                        <div>
                                         {res.propertys.map(res => {
                                         return <p style={{opacity:"0.78",fontWeight:"600"}} key={res}>{res}</p>
                                         })}
                                        </div>

                                         <a style={res.title === 'سرویس خدمات ویژه' ? {backgroundColor:"#4caf50"}:null} href={`Seo/order/${res._id}`}>سفارش</a>
                                     </div>
                                   </div>
                })}
</div>
             </div>

             <div className="sixth-con">
             <div style={{marginTop:"55px",marginBottom:"-10px"}} className="head-con">
                     <div className="line" /><h1>مقالات سئو</h1><div className="line" id="line-2"/>
                </div>
{json.findPost && json.findPost.filter(res => res.title.includes("سئو")).map(res => {
    return <div className="maqalat">
    <a>
      <img src="/uploads/seo-article.jpg" />
      <h1>{res.title}</h1>
    </a>
     </div>
})}
            </div>

            </div>
            <Footer />
        </div>
    )
}

export default index
