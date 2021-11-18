import React from 'react'
import Navbar from '../../components/navbar/navbar'
import Footer from '../../components/footer/footer'

const index = () => {
    return (
        <div className="layout">
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
             <div className="seo-steps">
                 <h1>مراحل بهینه سازی</h1>
                 <div>
                     <div>    
                         <img src="/uploads/analis.png" />
                         <h1>آنالیز سایت</h1>
                         <p> آنالیز وب سایت شما و رقبا و ایجاد فاکتور های Google </p>
                     </div>
                     <div>    
                         <img src="/uploads/analis.png" />
                         <h1>آنالیز سایت</h1>
                         <p> آنالیز وب سایت شما و رقبا و ایجاد فاکتور های Google </p>
                     </div>
                     <div>    
                         <img src="/uploads/analis.png" />
                         <h1>آنالیز سایت</h1>
                         <p> آنالیز وب سایت شما و رقبا و ایجاد فاکتور های Google </p>
                     </div>
                     <div>    
                         <img src="/uploads/analis.png" />
                         <h1>آنالیز سایت</h1>
                         <p> آنالیز وب سایت شما و رقبا و ایجاد فاکتور های Google </p>
                     </div>
                 </div>
             </div>
             <div className="seo-plans">
                 <h1>خدمات سئو</h1>
               <div>
               <div>
                     <div className="seo-head">
                        <h1>سرویس خدمات پایه</h1>
                        <b>3,000,000 تومان</b>
                     </div>
                     <hr />
                     <div>
                         <p>آنالیز سئو داخلی</p>
                         <p>آنالیز سئو خارجی</p>
                         <p> بهینه سازی سرعت سایت</p> 
                         <p>آنالیز رقبا و مشاوره</p>
                         <p>راه اندازی Google analystic</p>  
                         <p> بهینه سازی تصاویر</p>  
                         <p> بهینه سازی کلمات کلیدی</p> 
                     </div>
                     <a>سفارش</a>
                 </div>
                 <div>
                     <div className="seo-head">
                        <h1>سرویس خدمات ویژه</h1>
                        <b>5,000,000 تومان</b>
                     </div>
                     <hr />
                     <div>
                         <p>آنالیز سئو داخلی</p>
                         <p>آنالیز سئو خارجی</p>
                         <p> بهینه سازی سرعت سایت</p> 
                         <p>آنالیز رقبا و مشاوره</p>
                         <p>راه اندازی Google analystic</p>  
                         <p> بهینه سازی تصاویر</p>  
                         <p> بهینه سازی کلمات کلیدی</p> 
                         <p> تولید محتوا مناسب</p> 
                         <p> تولید محتوا مناسب</p> 
                     </div>
                     <a>سفارش</a>
                 </div>
               </div>
             </div>

             <div className="sixth-con">
             <h1 style={{fontSize:"24px"}}> مقالات سئو</h1>
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

export default index
