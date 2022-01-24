import Navbar from '../../../components/navbar/navbar';
import Footer from '../../../components/footer/footer';
import Image from 'next/image';
import Head from 'next/head';
import LiveChat from '../../../components/liveChat/liveChat';
import Comment from '../../articles/comment';
import {useRouter} from "next/router"
import { useEffect, useState } from 'react';

export async function getServerSideProps(context) {

  const con = context.params.items;
  const reCaptcha = process.env.VISIB_CAPTCHA || null;
  const findPost = await fetch(`http://localhost:27017/allRoutes/fullPost/${con}`,{method:'GET'});
  const json = await findPost.json();

    const usersloggedIn = await fetch("http://localhost:27017/authentication/loggedIn",{
      credentials: "include",
      headers:{
        cookie:context.req.cookies.token
      }
      
    });
    const loggedIn = await fetch("http://localhost:27017/auth/loggedIn",{
      credentials: "include",
      headers:{
        cookie:context.req.cookies.Admin
      }
      
    });
    const admin = await loggedIn.json();
    const user = await usersloggedIn.json();  


  if(!json.name){
    return {
      redirect: {
        permanent: false,
        destination: "/404"
      }
    }
  }

  return {
     props: {post:json ,user ,admin ,reCaptcha}
  }
}

const index = ({post ,user ,admin ,reCaptcha}) => {
  console.log(user)

const [property ,setProperty] = useState(null);
const [Auth ,setAuth] = useState(false)

   const func = async () => {
    const pro = post.Property && post.Property
    setProperty(pro)
   }
   useEffect(() => {
    func()
   },[])
   const router = useRouter()
    return (
        <div className="layout">
            <Head>
             <link rel="icon" href="/art.png" />
             <title>خرید {post.name}-dreamWeb </title>
             <meta name="description" content={post.description} />
             <meta name="keywords" content={`خرید ${post.title} , خرید آنلاین ${post.title}`} />
             <meta property="og:site_name" content="دریم وب"/>
             <meta property="og:title" content={`خرید {post.title}-dreamWeb`} />
             <meta property="og:description" content={post.description} />
             <meta name="viewport" content="width=device-width, initial-scale=1" />
             <meta property="og:url" content={router.pathname} />
             <meta name="og:type" content={"article"}/>
             <meta property="og:locale" content="Fa_IR" /> 
            </Head>
          {Auth && <div style={{zIndex:"1"}} onClick={() => setAuth(null)} id="backDrop">hello</div>}
          {Auth && 
            <div className="secc-comment" style={{zIndex:"151"}}>
              <img src={'/uploads/warning.png'} alt="" />
              <h1>لطفا برای خرید وبسایت وارد اکانت خود شوید !!</h1>
            <div>
               <a href="/Auth/Login" ><button style={{width:"120px",padding:"10px",margin:"5px",background:"#3f51b5"}}> ورود به اکانت</button></a> 
               <a href="/Auth/SignUp"><button style={{width:"120px" ,padding:"10px",margin:"5px",background:"#4caf50"}}>ثبت نام</button></a> 
            </div>
            </div>}

          <LiveChat />
          <Navbar />
           <div className="fullpost">
         
              <div className="index" style={!post.image ? {margin:"880px"}:null} >
              {post && <img src={`/uploads/${post.image}`} />}
              
                <div>
                <h1>{post.name}</h1>
                <p>{post.description}</p>
                <div>

                  <a onClick={() => { if(user !== true){setAuth(true)}}} href={user ? `/order/${post._id}`:"#"}>خرید وبسایت</a>
                  <a href="" style={{backgroundColor:"coral"}}>دمو وبسایت</a>
                  </div>
                </div>
              </div>
              <div className="selling" >
                <div>
                  <img src="/uploads/box.png" alt="" />
                  <p>سفارش آنی</p>
                </div>
                <div>
                  <img src="/uploads/technical-support.png" alt="" />
                  <p> پشتیبانی رایگان 3 ماهه</p>
                </div>
                <div>
                  <img src="/uploads/guarantee.png" alt="" />
                  <p> گارانتی برگشت هزینه 48 ساعته </p>
                </div>
                <div>
                  <img src="/uploads/ebook.png" alt="" />
                  <p> آموزش مدیریت سایت</p>
                </div>
              </div>
              <div className="property" >
              <div className="head-con">
                  <label className="line" /><h1> ویژگی و امکانات  </h1><div className="line" />
              </div>
                {property && <div dangerouslySetInnerHTML={{__html: property}} />}
                
              </div>
              <Comment reCaptcha={reCaptcha} admin={admin} type={"products"} comments={post.comments} id={post._id} link={"ProductComment"} />
              
           </div>
           <Footer />
           
        </div>
    )
}

export default index
