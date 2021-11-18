import Navbar from "../../components/navbar/navbar";
import Footer from '../../components/footer/footer';


const index = () => {
    return (
        <div className="layout">
            <Navbar />
            <div className="contact-us">
            <div>
                <div>
                <img src="/uploads/blackGmail.png" />
                <h1>پست الکترونیک</h1> 
                <p>grfewgrewuhbweyb@gmail.com</p>       
                </div>
                <div style={{marginTop:"10px"}}>
                <img style={{marginRight:"5px",width:"5%"}} src="/uploads/bPhone.png" />
                <h1> مشاوره و خرید</h1> 
                <p>09905027669</p>       
                </div>
                <div id="socials">
                     <a>
                         <img src="/uploads/insta.png" />
                         <h1>اینستاگرام ما</h1>
                     </a>
                     <a style={{background:"linear-gradient(90deg, #48c6ef 0%, #6f86d6 100%)"}}>
                         <img style={{width:"40%",height:"35%"}} src="/uploads/telegram.png" />
                         <h1>تلگرام ما</h1>
                     </a>
                </div>
            </div>
              <form>
              <img src="/uploads/mess.png" />
                 <h1>پیام بگذارید</h1>
                 <input placeholder="نام شما ..." />
                 <input placeholder="ایمیل شما ..." />
                 <input style={{width:"85%"}} placeholder="موضوع پیام ..." />
                 <textarea placeholder="پیغام شما ..." />
                 <button>ارسال دیدگاه</button>
              </form>

            </div>
            <Footer />
        </div>
    )
}

export default index
