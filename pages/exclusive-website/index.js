import Footer from '../../components/footer/footer';
import Navbar from '../../components/navbar/navbar';
import Image from 'next/image';
import {useState} from 'react'

const index = () => {
    const [questions ,SetQuestions] = useState(1)
    return (
    <div>
        <Navbar />
           <div className="exclusive">
           <form>
                 <h1>فرم درخواست سایت اختصاصی</h1>
                 <input placeholder="نام و نام خانوادگی" />
                 <input placeholder="ایمیل@" />
                 <input placeholder="شماره همراه" />
                 <textarea placeholder=" درباره وبسایت ..." />
                 <button>ارسال درخواست</button>
            </form>
             <div className="ex">
             <div>
                <h1>سایت اختصاصی</h1>
                <p>طراحی سایت اختصاصی به شما کمک میکند با طراحی خاص شما و کدنویسی اختصاصی از سایر رقبا پیشی بگیرید
                </p>
            </div>
              <img src="/uploads/ex.png" />

             </div>

               <div className="ex-steps">
                  <h1>مراحل طراحی وبسایت اختصاصی</h1>
                   <div>
                       <Image width={130} height={110} src="/uploads/analis1.png" />
                           <h1>بررسی اولیه</h1>
                           <p>بررسی سایت با درک سلیقه شما برای برنامه ریزی ساخت وب سایت</p>
                   </div>
                   <div>
                       <Image width={130} height={120}  src="/uploads/des.png" />
                           <h1> طراحی سایت</h1>
                   </div>
                   <div>
                       <Image width={170} height={155}  src="/uploads/build.jpg" />
                           <h1>شروع ساخت سایت</h1>
                   </div>
                   <div>
                       <Image width={160} height={150} src="/uploads/shake.png" />
                           <h1>تحویل وبسایت</h1>
                   </div>
               </div>
               
               <div className="fifth-con">
                        <div className="head-con">
                           <h1>  سوالات متداول  </h1>
                        </div>
                       <div className="q-place">
                       <div style={questions ===1  ?{background:"#66a6ff" ,transition: "0.4s ease"} :null} className="q-box" onClick={() => SetQuestions(1)}>
                       <h1>برای ساخت وبسایت از چه زبان هایی استفاده میشود؟</h1>
                            <div><p style={questions !==1  ?{display:"none"} :null}>  در وبسایت های  ما از جاوااسکریپت , پی اچ پی و نود استفاده میشود</p></div>
                       </div>
                       <div style={questions ===2  ?{background:"#66a6ff" ,transition: "0.4s ease"} :null} className="q-box" onClick={() => SetQuestions(2)}>
                       <h1>برای ساخت وبسایت از چه زبان هایی استفاده میشود؟</h1>
                            <div><p style={questions !==2  ?{display:"none"} :null}>  در وبسایت های  ما از جاوااسکریپت , پی اچ پی و نود استفاده میشود</p></div>
                       </div>
                       <div style={questions ===3  ?{background:"#66a6ff" ,transition: "0.4s ease"} :null} className="q-box" onClick={() => SetQuestions(3)}>
                       <h1>برای ساخت وبسایت از چه زبان هایی استفاده میشود؟</h1>
                            <div><p style={questions !==3  ?{display:"none"} :null}>  در وبسایت های  ما از جاوااسکریپت , پی اچ پی و نود استفاده میشود</p></div>
                       </div>
                       <div style={questions ===4  ?{background:"#66a6ff" ,transition: "0.4s ease"} :null} className="q-box" onClick={() => SetQuestions(4)}>
                       <h1>برای ساخت وبسایت از چه زبان هایی استفاده میشود؟</h1>
                            <div><p style={questions !==4  ?{display:"none"} :null}>  در وبسایت های  ما از جاوااسکریپت , پی اچ پی و نود استفاده میشود</p></div>
                       </div>
                       <div style={questions ===5  ?{background:"#66a6ff" ,transition: "0.4s ease"} :null} className="q-box" onClick={() => SetQuestions(5)}>
                       <h1>برای ساخت وبسایت از چه زبان هایی استفاده میشود؟</h1>
                            <div><p style={questions !==5  ?{display:"none"} :null}>  در وبسایت های  ما از جاوااسکریپت , پی اچ پی و نود استفاده میشود</p></div>
                       </div>
                       <div style={questions ===6 ?{background:"#66a6ff" ,transition: "0.4s ease"} :null} className="q-box" onClick={() => SetQuestions(6)}>
                       <h1>برای ساخت وبسایت از چه زبان هایی استفاده میشود؟</h1>
                            <div><p style={questions !==6  ?{display:"none"} :null}>  در وبسایت های  ما از جاوااسکریپت , پی اچ پی و نود استفاده میشود</p></div>
                       </div>

                       </div>
                    </div>


           </div>
        <Footer />
    </div>
    )
}

export default index
