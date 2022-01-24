import Footer from '../../components/footer/footer';
import Navbar from '../../components/navbar/navbar';
import Image from 'next/image';
import {useState} from 'react';
import LiveChat from '../../components/liveChat/liveChat';
import Head from 'next/head';
import { useAmp } from 'next/amp'

export async function getStaticProps() {

    const res = await fetch('http://localhost:27017/allRoutes/exclusive')
    const json = await res.json();

    const resSeo = await fetch('http://localhost:27017/allRoutes/seo/exclusive')
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

    const [questions ,SetQuestions] = useState(1);
    const isAmp = useAmp()
    return (
    <div>
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
           <div className="exclusive">
             <div className="ex">
             <div className="ex-info">
                <h1>سایت اختصاصی</h1>
                <p>
                طراحی سایت اختصاصی شامل کلیه خدمات و فعالیتهایی است که برای طراحی ، کدنویسی و  پیاده سازی یک وب سایت تماماً اختصاصی صورت میگیرد;شما میتوانید با طراحی اختصاصی منحصر به فرد و با بالا ترین امنیت از سایر رقبای خود پیشی بگیرید..!
                </p>
            <label>
                <a style={{marginRight:"0px"}} href="/exclusive-website/request">ارسال درخواست</a>
                <a href="/exclusive-website/order-form"> سفارش وبسایت اختصاصی</a>
            </label>

            </div>
        <div className="ex-6">             
              <label>

        <img src="/images/web-design-team-f546ac48e416ac2001f6634422dd0c4fcb02c932ac73a90f6d09553769579a28.jpg" alt="" />

              <circle />
              <circle />
              </label>         
        </div>
             </div>
             <div style={{marginTop:"135px",marginBottom:"-100px"}} className="head-con">
                     <div className="line" /><h1>مراحل طراحی وبسایت اختصاصی</h1><div className="line" id="line-2"/>
                </div>
               <div className="ex-steps" style={{marginBottom:"-40px"}}>
                   <div>
                       <Image width={130} height={110} src="/uploads/report.png" />
                           <h1>بررسی اولیه</h1>
                           <p>بررسی سایت با درک سلیقه شما برای برنامه ریزی ساخت وب سایت.</p>
                   </div>
                   <div>
                       <Image width={130} height={120}  src="/uploads/des.png" />
                           <h1> طراحی سایت</h1>
                           <p>طراحی سایت پس از برسی سلیقه و ایده شما شروع میشود.</p>
                   </div>
                   <div>
                       <Image width={170} height={155}  src="/uploads/website-design.png" />
                           <h1>شروع ساخت سایت</h1>
                           <p>پس از طراحی کد نویسی سایت با جدید ترین متد و اتمام بخش سمت سرور.</p>
                   </div>
                   <div>
                       <Image width={160} height={150} src="/uploads/shake.png" />
                           <h1>تحویل وبسایت</h1>
                           <p>و در آخر وبسایت شما بر روی هاست  دلخواه آنلاین شده و تحویل شما میشود.</p>
                   </div>
               </div>
             <div style={{marginTop:"135px",marginBottom:"-100px"}} className="head-con">
                     <div className="line" /><h1>ویژگی های وبسایت اختصاصی</h1><div className="line" id="line-2"/>
                </div>
             <div className="exclusive-offers">
               
               <div>
                   <h1> طراحی منحصر به فرد به دلخواه شما</h1>
                   <p>تیم طراحی همواره در تلاش است که زیبا ترین و مدرن ترین وبسایت ها با توجه به سلیقه شما طراحی کنند و شما همواره میتوانید با خرید وبسایت اختصاصی وبسایتی با ویژگی های ظاهری منحصر به فرد خود را در اختیار داشته باشید .!</p>
               </div>
               <div>
                   <h1>امنیت بالا</h1>
                   <p>امنیت بالا یکی از مهم ترین فاکتور های خرید سایت میباشد و شما با انتخاب و پلن وبسایت اختصاصی میتوانید بالاترین سطح امنیت وبسایت را بر پایه جدید ترین متد های Google در اختیار داشته باشید.</p>
               </div>
               <div>
                   <h1> سرعت لود بسیار بالا</h1>
                   <p>امنیت بالا یکی از مهم ترین فاکتور های خرید سایت میباشد و شما با انتخاب و پلن وبسایت اختصاصی میتوانید بالاترین سطح امنیت وبسایت را بر پایه جدید ترین متد های Google در اختیار داشته باشید.</p>
               </div>
               <div>
                   <h1> سئو قدرتمند برای موتور های جستجو</h1>
                   <p>تمامی وبسایت های دریم وب از بالاترین کیفیت در امور سئو هستند که بااستفاده از بهترین متد های سئو خارجی و داخلی به شما کمک میکند تا هرجه سریع تر به اهداف خود در وبسایتتان برسید.</p>
               </div>
               </div>


 
               <div className="fifth-con">
               <div style={{marginTop:"55px",marginBottom:"-10px"}} className="head-con">
                     <div className="line" /><h1>سوالات متداول</h1><div className="line" id="line-2"/>
                </div>
                       <div className="q-place">
                       {json.Question && json.Question.map(res => {
                               return <div key={res._id}  className="q-box" onClick={() => questions === res._id ? SetQuestions("null") : SetQuestions(res._id)}>
                               <h1>{res.question}</h1>
                                    <div><p style={questions !== res._id  ?{display:"none"} :null}>{res.answer}</p></div>
                               </div>
                           })}

                       </div>
                    </div>
           </div>
        <Footer />
    </div>
    )
}

export default index
