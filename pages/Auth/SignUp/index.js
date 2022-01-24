import {useState ,useContext,useRef } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'
import context from '../../../helpers/context/authContext';
import ReCAPTCHA from 'react-google-recaptcha';
import Head from 'next/head';


export async function getServerSideProps(context) {


    const json = process.env.INVIS_CAPTCHA || null;
    if(context.req.cookies.token){
      return {
        redirect: {
          permanent: false,
          destination: "/404"
        }
      }
    }
  
    const usersloggedIn = await fetch("http://localhost:27017/authentication/find",{
      credentials: "include",
      headers:{
        cookie:context.req.cookies.token
      }
      
    });
   const user = await usersloggedIn.json()
  
    if(user.username){
      return {
        redirect: {
          permanent: false,
          destination: "/404"
        }
      }
    }
  
    return {
      props:{
        json,
      },
      revalidate:1
    };
  
  }

const index = ({json}) => {
    const [username ,setUserName] = useState('')
    const [confirm , setConfirmPassword] = useState('')
    const [password ,setPassword] = useState('')
    const [email ,setEmail] = useState('');
    const router = useRouter()
    const [number ,setNumber] = useState('')
    const { getUserLoggedIn } = useContext(context)
    const [err ,setErr] = useState('')
    const [loading ,setLoading] = useState(false);
    const [seePassword ,setSeePassword] = useState(false);
    const reRef = useRef('')

    async function post(e) {
        e.preventDefault();
        setLoading(true)
        setErr("")
        const captcha = await reRef.current.executeAsync();
        reRef.current.reset();
        const ex = {email ,number ,username ,password ,confirm ,captcha};
        try {
            await axios.post("http://localhost:27017/authentication/signup" ,ex ,{withCredentials:true}).then(res => {
              if(res.data.errMessage){
                setErr(res.data.errMessage)
                setLoading(false)
            }
            if(!res.data.errMessage){
              getUserLoggedIn()
              if(lastpage !== window.document.URL){
                window.location = lastpage
              }
              if(lastpage === window.document.URL){
                window.location = '/'
              }  
              }
        })

        }catch(err){
            setLoading(false)
        }
    }

    return (
        <div className="login">
  <Head>
   <link rel="icon" href="/art.png" />
    <title> ثبت نام</title>
  </Head>
            <form style={{height:"75%"}}>
              <h1>ثبت نام</h1>
                <input style={{}} onChange={(e) => setUserName(e.target.value)} placeholder="نام کاربری" />
                <input onChange={(e) => setEmail(e.target.value)} placeholder="ایمیل"/>
                <input onChange={(e) => setNumber(e.target.value)} placeholder="شماره همراه" />
                <div>
                <div style={{width:"40%"}} id="password">
                <input style={{width:"100%"}} type={seePassword ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} placeholder="تکرار رمز عبور  " /> 
                </div>
                <div style={{width:"40%"}} id="password">
                <input style={{width:"100%"}} type={seePassword ? "text" : "password"} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="رمز عبور " /> 
                <img style={seePassword ? {opacity:"1",left:"0px"}:{left:"0"}} src={'/uploads/view.png'} onClick={() => setSeePassword(prev => !prev)} />
                </div>
                </div>
                <ReCAPTCHA 
                 style={{zIndex:"30",opacity:"0"}}
                 size="invisible"
                 sitekey={json}
                 ref={reRef}
                 />
                <button onClick={post}>ثبت نام {loading && <div className='loading-spinner'></div>}</button>
                <div className="Auth-err">{err && <p>{err}</p>}</div>
                <div style={{flexFlow:"column",alignItems:"flex-start",width:"70%",marginTop:"35px",pointerEvents:"all"}}><p> ثبت نام کرده اید؟ <a href="/Auth/Login">ورود</a> </p> </div>
            </form>
        </div>
    )
}

export default index
