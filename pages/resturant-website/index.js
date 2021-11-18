import Navbar from "../../components/navbar/navbar";
import Footer from '../../components/footer/footer'

const index = () => {
    return (
        <div className="layout">
            <Navbar />
            <div style={{background:"linear-gradient(90deg, #fc4a1a 0%, #f7b733 100%)"}} className="route">
              <h1>وبسایت های رستوران</h1>
            </div>
             
              <div className="shop">
                <div className="shop-con">
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
                  <a>
                      <img src="/uploads/web-image.jpg" />
                      <h1>فروشاه زرین پارس</h1>
                      <p>قیمت 2,500,000 هزار تومان</p>
                  </a>
                </div>
              </div>
            <Footer />
        </div>
    )
}
export default index