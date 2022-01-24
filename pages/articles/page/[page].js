import Navbar from "../../../components/navbar/navbar";
import Footer from "../../../components/footer/footer";
import LiveChat from '../../../components/liveChat/liveChat';
import {useState} from "react";
import Head from "next/head";
import { useRouter } from 'next/router'

export async function getServerSideProps(context) {
    const con = context.params.page;
    const res = await fetch(`http://localhost:27017/allRoutes/articles?page=${con}`)
    const json = await res.json();
      
  const resSeo = await fetch('http://localhost:27017/allRoutes/Seo/articles');
  const jsonSeo = await resSeo.json();
  
    return {
      props:{
        json,
        jsonSeo
      }
    }
  }

const index = ({json ,jsonSeo}) => {

    let middlePagination;
    const route = json.route
    const pages = JSON.parse(json.pages)
    const page = JSON.parse(json.page);
    const [search ,setSearch] = useState('');
    const router = useRouter();

    if(pages <= 5 ){
        middlePagination=[...Array(pages)].map((_ , idx) => {
            return <a style={page === idx + 1 ? {backgroundColor:"#0f0c29",color:"white" } : null} key={idx +1} href={`/${route}/page/${idx + 1}`} >{idx +1}</a>
        })
    } else {
        var startValue = Math.floor((page - 1) / 5 ) * 5; 
 
        middlePagination  = (
            <>
            {[...Array(5)].map(( _ , idx) => (
             <a style={page === idx + 1 ? {backgroundColor:"#0f0c29",color:"white" } : null} key={startValue +idx + 1} href={`/${route}/page/${startValue + idx + 1}`}>{startValue + idx + 1}</a>
            ))}
            <a>...</a>
            </>
        )
 
    }
    if(page > 5) {
        if(pages - page >= 5){
 
         middlePagination  = (
             <>
             <a href={`/page/${1}`}>1</a>
             <a>...</a>
             {[...Array(5)].map(( _ , idx) => (
              <a style={page === idx + 1 ? {backgroundColor:"#0f0c29",color:"white" } : null} key={startValue +idx + 1} href={`/${route}/page/${startValue + idx + 1}`}>{startValue + idx + 1}</a>
             ))}
             <a>...</a>
             </>
         )
        }else{
         middlePagination  = (
             <>
             <a href={`/page/${1}`}>1</a>
             <a>...</a>
             {[...Array(5)].map(( _ , idx) => (
              <a key={startValue +idx + 1} href={`/${route}/page/${startValue + idx + 1}`} style={pages < startValue + idx + 1 ? {display:"none"} : null}>{startValue + idx + 1}</a>
             ))}
             </>
         )
 
        }
    }
    const searching = async (event) => {
        event.preventDefault();
        router.push({
            pathname: `/articles/search/${search}`
        })
    }

    return (
        <div className="home">
  <Head>
   <link rel="icon" href="/art.png" />
    <title>{jsonSeo && jsonSeo[0].title}</title>
    <meta name="description" content={jsonSeo && jsonSeo[0].description} />
    <meta name="keywords" content={jsonSeo && jsonSeo[0].keywords} />
    <meta property="og:site_name" content="دریم وب"/>
    <meta property="og:title" content={jsonSeo && jsonSeo[0].title} />
    <meta property="og:description" content={jsonSeo && jsonSeo[0].description} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta property="og:url" content={jsonSeo && jsonSeo[0].ogUrl} />
    <meta name="og:type" content={jsonSeo && jsonSeo[0].ogType}/>
    <meta property="og:locale" content="Fa_IR" /> 
  </Head>
            <LiveChat />
           <Navbar /> 
           <div className="article-search">
           <form onSubmit={searching}>
               <input placeholder="جستجو..." onChange={(e) =>setSearch(e.target.value)} />
               <img src="/images/search.png" alt="search" />
            </form>
           </div>
            <div className="articles">
                {json.findPost.map(res => {
                    return <a key={res._id} href="/articles/jkfhuhf">
                    <img src={`/uploads/${res.image}`} />
                    
                    <label>
                    <h1>{res.title}</h1>
                       <div>
                       <div><img src={"/uploads/conversation.png"} />دیدگاه:{res.comments.length}</div>
                        <div><img src={"/uploads/calendar.png"} />{res.timestamp}</div>
                       </div>
                    </label>
                </a>
                })}

            </div>
            {pages && pages > 1 &&  <div className="article-paginate">
            <a style={page === pages ? {opacity:"0.7", cursor:"not-allowed"} :null} href={page === pages ? `${route}/page/${page}` :`${route}/page/${page + 1}`}>بعدی</a>

               {middlePagination}

            <a style={page === 1 ? {opacity:"0.7", cursor:"not-allowed"} :null} href={page === 1 ? `#`: `${route}/page/${page - 1}`}>قبلی</a>
            </div>}

           <Footer />
        </div>
    )
}

export default index