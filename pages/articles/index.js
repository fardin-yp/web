import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

const index = () => {
    return (
        <div className="layout">
           <Navbar /> 
           <div className="article-search">
               <input placeholder="جستجو..." />
           </div>
            <div className="articles">
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
              <a>
                  <img src="/uploads/seo-article.jpg" />
                  <h1>سئو و کاربرد آن</h1>
              </a>
            </div>
            <div className="article-paginate">
                <a style={{background:"RGBA(13,32,64,0.99)",color:"white"}}>1</a>
                <a>2</a>
                <a>3</a>
                <a>...</a>
                <a>15</a>
            </div>

           <Footer />
        </div>
    )
}

export default index
