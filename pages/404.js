import Navbar from "../components/navbar/navbar"
import Footer from "../components/Footer/footer"

const Err = () => {
    return (
        <div style={{background:"#f8fafb"}}>
            <Navbar />
            <div className="err-card">
               <img src="/uploads/404.gif" alt=""  />
               <p>متاسفانه صفحه مورد نظر پیدا نشد!</p>
               <a href="/">بازگشت به صفحه اصلی</a>
            </div>
            <Footer />
        </div>
    )
}

export default Err
