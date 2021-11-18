import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import Image from 'next/image'
import { useState ,useRef } from "react";


const Home = () => {

    const scroll = useRef(null)
 
    const [questions ,SetQuestions] = useState(1)

    const scrollDown = () => window.scrollTo({top:scroll.current.offsetTop ,behavior:"smooth"})

    return (
        <div className="layout">
            <Navbar />
                <div className="home" >
                    <div className="first-con">
                      <div className="header-title">
                          <h1>همین الان کسب و کار اینترنتی خودت رو راه اندازی کن!</h1>
                          <h2>با کمترین هزینه یه موفقیت آنلاین روتجربه کن</h2>
                          <button onClick={scrollDown} style={{cursor:"pointer"}}>شروع!</button>
                       </div>
                      <img src={'/uploads/1image.png'} />
                    </div>
                    <div className="second-con">
                        <div className="head-con">
                            <div className="line" /><h1> ویژگی ها  </h1><div className="line" id="line-2"/>
                        </div>
                        <div className="vijegi">
                                <div>
                                <img src="/uploads/SEOp.png"  />
                                    <h1>سئو و بهینه سازی</h1>
                                    <p>ساخت وبسایت بر پایه اصول سئو با بالاترین سرعت.</p>
                                    
                                </div>
                                <div id="resp">
                                <img src="/uploads/RES.png" alt="responsive png"  />
                                <h1>طراحی حرفه ای و مدرن</h1>
                                <p>استفاده از جدیدترین متد و ابزار های طراحی برای زیبایی بی حدو مرز وبسایت شما.</p>
                                </div>
                                <div id="maintance">
                                    <img  src="/uploads/main.png" alt="responsive png"  />
                                    <h1>پشتیبانی فنی</h1>
                                    <p> پشتیبانی رایگان 1 ماهه بی قیدو شرط برای خریداران به وسیله مجرب ترین تیم پشتیبانی.</p>
                                </div>
                        </div>
                    </div>
                    <div className="web-design">
                      <div className="web-right"> <h1>
                           چرا طراحی سایت ؟
                       </h1>
                         <p> امروزه فضای اجتماعی و اینترنت به بخش جدا ناپذیر زندگی ما تبدیل شده است و وبسایت ها بعنوان بزرگترین و کم هزینه ترین مکان برای بازار یابی تبدیل شده اند . </p>
                         <p>همچنین مهم ترین دلیلی که داشتن وبسایت را ضرورت میبخشد فراگیر بودن اینترنت است اکثر مردم ترجیح میدهند به جای ترافیک و اتلاف وقت درخانه خرید کنند. </p>
                         <p> اگر تا کنون شما یک وبسایت خوب برای کسب و کار خود نداشته باشد بخش عضیمی از بازار کشور را از دست داده اید.</p>
                      </div> 
                       <div className="web-left">
                         <Image layout="fill"  src="/uploads/design.jpg" />
                       </div>
                    </div>

                    <div ref={scroll} id="third-con">
                        <div className="head-con">
                            <div className="line" /><h1> خرید سایت  </h1><div className="line" />
                        </div>
                        <div className="plans"> 
                        <a href="shop-website">
                            <img src="/uploads/shop-icon.png" alt="خرید وبسایت فروشگاهی" />
                            <h1>خرید وبسایت فروشگاهی</h1>
                        </a>
                        <a href="/medical-website">
                            <img src="/uploads/doctors.png" alt="خرید وبسایت پزشکی" />
                            <h1>خرید وبسایت پزشکی</h1>
                        </a>
                        <a href="company-website">
                            <img src="/uploads/company.png" alt="خرید وبسایت شرکتی" />
                            <h1>خرید وبسایت شرکتی</h1>
                        </a>
                        <a href="/news-website">
                            <img src="/uploads/news.png" alt="خرید وبسایت خبری" />
                            <h1>خرید وبسایت خبری</h1>
                        </a>
                        <a href="/resturant-website">
                            <img src="/uploads/online-order.png" alt="خرید وبسایت رستوران" />
                            <h1>خرید وبسایت رستوران</h1>
                        </a>
                        <a href="/personal-website">
                            <img src="/uploads/person.png" alt="خرید وبسایت شخصی" />
                            <h1>خرید وبسایت شخصی</h1>
                        </a>
                        <a href="/Real-Estate-website" >
                            <img src="/uploads/house.png" alt="خرید وبسایت املاک" />
                            <h1>خرید وبسایت املاک</h1>
                        </a>
                        <a href="/exclusive-website" >
                            <img src="/uploads/exclusive.png" alt="خرید وبسایت املاک" />
                            <h1>سفارش سایت اختصاصی</h1>
                        </a>
                        </div>
                    </div>

                    <div className="forth-con">
                        <div className="head-con">
                            <div className="line" /><h1> مراحل ساخت  </h1><div className="line" />
                        </div>
                     <div  className="steps">
                     <circle>
                         <img src="/uploads/steps.png" />
                     </circle>
                     <div className="step-1">
                         <b>1</b>
                         <h1>خرید سایت</h1>
                         <p>شما میتوانید وبسایت دلخواهتان را خرید یا سفارش دهید.</p>
                      </div>
                     <div className="step-2">
                         <b>2</b>
                         <h1>آماده سازی سایت</h1>
                         <p>پس از ثبت خرید با توجه به نوع سفارش آماده سازی سایت انجام میشود که میتواند بین 2 تا 14 روز زمان ببرد.</p>
                        </div>
                     <div className="step-3">
                         <b>3</b>
                         <h1>تحویل سایت</h1>
                         <p>در آخرین مرحله وبسایت مطابق میل شما تحویل داده میشود و آموزش های لازم به شما ارائه میشود.</p>
                      </div>
                     </div>
                    </div>
                    <div className="contact">
                      <div>
                          <h1>به مشاوره نیاز دارید؟</h1>
                          <p>شما میتوانید در صورت نیاز به مشاوره نام و شماره تماس خود را برای ما ارسال کرده تا مشاورین ما با شما تماس حاصل کنند.</p>
                      </div>
                      <form>
                          <input placeholder="نام و نام خانوادگی" />
                          <input placeholder="شماره تلفن همراه" />
                          <button>ارسال</button>
                      </form>
                    </div>

                    <div className="fifth-con">
                        <div className="head-con">
                            <div className="line" /><h1>  سوالات متداول  </h1><div className="line" />
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

                    <div className="sixth-con">
                        <div className="head-con">
                            <div className="line" /><h1> مقالات </h1><div className="line" />
                        </div>
                <div className="maqalat">
                <a>
                  <img src="/uploads/seo-article.jpg" />
                  <h1>سئو و کاربرد آن</h1>
              </a>
              <a>
                  <img src="/uploads/seo-article.jpg" />
                  <h1>سئو و کاربرد آن</h1>
              </a>
              <a>
                  <img src="/uploads/seo-article.jpg" />
                  <h1>سئو و کاربرد آن</h1>
              </a>
                 </div>
            </div>

            </div>
            <Footer />
        </div>
    )
}

export default Home
