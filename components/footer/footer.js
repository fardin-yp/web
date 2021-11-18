import Image from 'next/image'

const Footer = () => {
    return (
        <div  className="footer">
           <div  className="top-footer">

           <div className="top-con">
                  <div> <img src="/uploads/seo.png" />خرید وبسایت:</div>
                  <a>خرید سایت فروشگاهی</a>
                  <a>خرید سایت خبری</a>
                  <a>خرید سایت شخصی</a>
                  <a>خرید سایت آموزشی</a>
              </div>

              <div className="top-con">
                  <div> <img src="/uploads/service.png" /> خدمات: </div>
                    <a>خدمات پشتیبانی</a>
                    <a>خدمات سئو</a>
                    <a> تولید محتوا  </a>
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
        </div>
    )
}

export default Footer
