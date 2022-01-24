import React,{ useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from "../../../components/navbar/navbar";
import Footer from "../../../components/footer/footer";
import LiveChat from '../../../components/liveChat/liveChat';
import Head from 'next/head';

export async function getServerSideProps(context) {

    const res = await fetch(`http://localhost:27017/allRoutes/allArticles`)
    const json = await res.json();
  
    return {
      props:{
        json,
      }
    }
  }
const Search = ({json}) => {

    const router = useRouter();
    const route = router.query.search;
    const [search ,setSearch] = useState('');

    const searching = async (event) => {
        event.preventDefault();
        router.push( `/articles/search/${search}`,null ,{shallow:true})}
const filter = json.filter(res => res.title.toLowerCase().includes(route.toLocaleLowerCase()))
    return (
        <div className="home">
   <Head>
   <link rel="icon" href="/art.png" />
    <title> نتیجه جستجو برای {route}</title>
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
                {filter.length > 0 && filter.map(res => {
                    return <a key={res._id} href={`/articles/${res._id}`}>
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

          {filter.length === 0 &&             
            <div style={{marginTop:"5px"}} className="err-card">
               <img src="/images/404.gif" alt=""  />
               <p>متاسفانه  جستجو نتیجه ای در بر نداشت!!</p>
               <a style={{height:"max-content",width:"max-content",padding:"18px"}} href="/">بازگشت به صفحه اصلی</a>
          </div>}


            </div>
           <Footer />
        </div>
    )
}

export default Search
