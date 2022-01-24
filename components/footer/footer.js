import React,{ useState ,useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Back from './BackGround.png';
import Black from './NO.png';

const Footer = () => {

    const [namad ,setNamad] = useState(null)

useEffect(() => {
  const getNamad = async () => {
      await axios.get(`http://localhost:27017/allRoutes/namad`,{withCredentials:true}).then(res => {
           setNamad(res.data)
       })
  }
   getNamad()
},[]);

    return (
        <footer className="footer">
            <div className="about">
                <Image id="back-image" src={Back} alt="" layout={"fill"}  />
                <div className="about-us">
                  <h1>درباره ما</h1>
                  <p>  تیم دریم وب فعایت خود را از سال 1397 شروع کرده،با دارا بودن بهترین افراد در زمینه های طراحی و توسعه وب در میان رقبا حرفی برای گفتن داریم که با تلاش مضاعف قصد بالا بردن سطح خدمات و پیشبرد اهداف شما مشتریان عزیز  را داریم.</p>
                </div>
                <div className="namad">
                {namad && namad.slice(0,2).map(res => {
                 return <img src={`/uploads/${res.image}`} />
               }) 
               }
                </div>
            </div>
        <div className="top-footer">
        <Image id="back-image" src={Black} alt="" layout={"fill"}  />
           <div className="top-con">
            <div><img src="/uploads/seo.png" />خرید وبسایت:</div>
                <a href="/shop-website">خرید سایت فروشگاهی</a>
                <a href="/news-website">خرید سایت خبری</a>
                <a href="/company-website">خرید سایت شرکتی</a>
                <a href="/Real-Estate-website">خرید سایت املاک</a>
                <a href="/personal-website">خرید سایت شخصی</a>
                <a href="/medical-website">خرید سایت پزشکی</a>
                <a href="/resturant-website">خرید سایت رستوران</a>
            </div>

              <div className="top-con">
                  <div> <img src="/uploads/service.png" />  دیگر خدمات: </div>
                    <a href="/Seo">خدمات سئو</a>
                    <a href="/exclusive-website">خرید سایت اختصاصی</a>
                    <a href="/exclusive-website/request">درخواست طراحی سایت</a>
              </div>

              <div className="top-con">
                  <div> <img src="/uploads/contact.png" /> ارتباط با ما:</div>
                     <p>شما میتوانید نظرات و پیشنهادات خود را به صندوق پستی ارسال کنید</p>
                     <p>مشاوره و خرید : 0654878</p>
                     <div className="social">
                         <a href="/insta"><circle><Image height={18} width={18} src='/uploads/telegram.png' /></circle></a>
                         <a href="/insta"><circle><Image height={100} width={100} src='/uploads/insta.png' /></circle></a>
                         <a href="/insta"><circle><Image height={20} width={22} src='/uploads/twiter.png' /></circle></a>
                     </div>
              </div>
           </div>
           <div className="bot-footer">
               <p>تمامی حقوق وبسایت محفوظ بوده</p>
           </div>
        </footer>
    )
}

export default Footer
