import {useContext, useRef, useState ,useEffect} from 'react';
import Footer from '../../../components/footer/footer'
import Navbar from '../../../components/navbar/navbar';
import Image from 'next/image';
import form from '../contact-form.png';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import AuthContext from '../../../helpers/context/authContext';
import Head from 'next/head';

export async function getServerSideProps(context) {


    const json = process.env.INVIS_CAPTCHA || null;
    
    const usersloggedIn = await fetch("http://localhost:27017/authentication/find",{
        credentials: "include",
        headers:{
          cookie:context.req.cookies.token
        }
        
      });
      const user = await usersloggedIn.json()
    return {
      props:{
        json,
        user
      }
    };
  
  }

const index = ({json ,user}) => {

    const {find} = useContext(AuthContext)
    const [email ,setEmail] = useState('');
    const [number ,setNumber] = useState('');
    const [name ,setName] = useState('');
    const [des ,setDes] = useState('');
    const [err ,setErr] = useState('');
    const [message ,setMessage] = useState(null);
    const [loading ,setLoading] = useState(false);
    const reRef = useRef('');



    const sendEx = async (e) => {
        e.preventDefault()
        setLoading(true)
        const captcha = await reRef.current.executeAsync();
        reRef.current.reset()
        const ex = {email ,number ,name ,des, captcha};

      await axios.post('http://localhost:27017/allRoutes/exclusive' , ex).then(res => {
        if(res.data.errMessage){
            setErr(res.data)
            setLoading(false)
        }
        setMessage(res.data.Message)
       setLoading(false)

        })
    }
    useEffect(() => {
      if(user) {
        setName(user.username);
        setEmail(user.email);
        setNumber(user.number[0].number)
      }
    },[])
    let commentCss= ['div-input']

  if(find.username){
      commentCss = ['div-input','newCommentInput']
  }
  console.log(name)
    return (
        <div>
<Head>
   <link rel="icon" href="/art.png" />
    <title>ارسال درخواست سایت اختصاصی -dreamWeb</title>
    {/* <meta name="description" content={jsonSeo && jsonSeo[0].description} />
    <meta name="keywords" content={jsonSeo && jsonSeo[0].keywords} />
    <meta property="og:site_name" content="دریم وب"/>
    <meta property="og:title" content={jsonSeo && jsonSeo[0].title} />
    <meta property="og:description" content={jsonSeo && jsonSeo[0].description} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta property="og:url" content={jsonSeo && jsonSeo[0].ogUrl} />
    <meta name="og:type" content={jsonSeo && jsonSeo[0].ogType}/> */}
    <meta property="og:locale" content="Fa_IR" /> 
  </Head>
            <Navbar />
         <div className="exclusive">
            <form >
                 <div className="head-ex">{message && <p style={{color:"green" ,marginRight:"20px" ,marginTop:"10px"}}>{message}</p>}<h1>فرم درخواست طراحی سایت </h1><Image width={40} height={35} src={form} alt="فرم درخواست سایت" /> </div>
                 <div className={commentCss.join(" ")}>
                    <p>نام و نام خانوادگی <b>*</b>{err.err === "name" && <b style={{fontSize:"13px",marginRight:"5px"}}>{err.errMessage}</b> }</p>
                    <input value={user?user.username:null} style={err.err === "name" ? {border:"1px solid red",boxShadow:" 0px 2px 8px rgba(231, 13, 13, 0.1) , 0px 0px 15px rgba(197, 75, 75, 0.1)"}: null} onChange={(e) => setName(e.target.value)} />
                 </div>
                 <div className="div-input">
                    <p>ایمیل</p>
                 <input style={user.email?{background:"#ddf0ff",opacity:"0.7",pointerEvents:"none"}:null} value={user?user.email:null} onChange={(e) => setEmail(e.target.value)}  />
                 </div>
                 <div className={commentCss.join(" ")}>
                    <p >شماره همراه <b>*</b>{err.err === "number" && <b style={{fontSize:"13px",marginRight:"10px"}}>{err.errMessage}</b> }</p>
                 <input value={user?user.number[0].number:null} style={err.err === "number" ? {border:"1px solid red",boxShadow:" 0px 2px 8px rgba(231, 13, 13, 0.1) , 0px 0px 15px rgba(197, 75, 75, 0.1)"}: null} onChange={(e) => setNumber(e.target.value)}  />
                 </div>
                 <ReCAPTCHA 
                 style={{zIndex:"30",opacity:"0",visibility:"hidden"}}
                 size="invisible"
                 sitekey={json}
                 ref={reRef}
                 />
                 <div className="div-input">
                     <p>توضیحات بیشتر</p>
                 <textarea onChange={(e) => setDes(e.target.value)}  />
                
                 </div>
                 <button disabled={loading} onClick={sendEx}>  ارسال درخواست {loading && <div className='loading-spinner'></div>}</button>          
            </form>
         </div>

            <Footer />
            
        </div>
    )
}

export default index
