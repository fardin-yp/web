import Navbar from "../../components/navbar/navbar";
import Footer from '../../components/footer/footer'

const index = () => {
    return (
        <div className="layout">
            <Navbar />
            <div style={{background:"linear-gradient(90deg, #3c3b3f 0%, #605c3c 100%)"}}  className="route">
              <h1>وبسایت های شرکتی</h1>
            </div>
             
              <div className="shop">
                <div className="shop-con">
                  <a href="/fb/yhwtriuhwtr">
                      <img src="/uploads/web-image.jpg" />
                      <h1>فروشاه زرین پارس</h1>
                      <p>قیمت 2,500,000 هزار تومان</p>
                  </a>
                  <a>
                      <img src="/uploads/web-image.jpg" />
                      <h1>فروشاه زرین پارس</h1>
                      <p>قیمت 2,500,000 هزار تومان</p>
                  </a>
                  <a>
                      <img src="/uploads/web-image.jpg" />
                      <h1>فروشاه زرین پارس</h1>
                      <p>قیمت 2,500,000 هزار تومان</p>
                  </a>
                  <a>
                      <img src="/uploads/web-image.jpg" />
                      <h1>فروشاه زرین پارس</h1>
                      <p>قیمت 2,500,000 هزار تومان</p>
                  </a>
                  <a>
                      <img src="/uploads/web-image.jpg" />
                      <h1>فروشاه زرین پارس</h1>
                      <p>قیمت 2,500,000 هزار تومان</p>
                  </a>
                </div>
                <div style={{margin:"0px",marginTop:"50px"}} className="article-paginate">
                <a style={{background:"RGBA(13,32,64,0.99)",color:"white"}}>1</a>
                <a>2</a>
                <a>3</a>
                <a>...</a>
                <a>15</a>
            </div>
              </div>
            <Footer />
        </div>
    )
}
export default index