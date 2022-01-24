import React, { useState ,useRef} from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha'
import Head from 'next/head';


export async function getStaticProps() {


  const json = process.env.INVIS_CAPTCHA || null
  
  return {
    props:{
      json,
    },
    revalidate:1
  };

}

const ForgetPassword = ({json}) => {

  const [email, setEmail] =useState('')
  const [seccsess ,setSeccess] = useState(false)
  const [error ,setError] = useState('')
  const [loading , setLoading] = useState(false);
  const reRef = useRef('')

  async function forget(){
    try{
      setLoading(true)
      setError("")
      const captcha = await reRef.current.executeAsync();
      reRef.current.reset();
    const post = {email ,captcha}
    await axios.post('http://localhost:27017/authentication/resetemail' ,post ,{withCredentials:true}).then(res => {
       
     if(res.data.errMessage){
      setError(res.data)}
     setLoading(false)
     if(!res.data.errMessage){
      setSeccess(true)
     }
    })
    
  }catch(err){
    setLoading(false);
    setSeccess(false)
  }
 
  
}

    return (
        <div className="background">
  <Head>
   <link rel="icon" href="/art.png" />
    <title> فراموشی رمز عبور </title>
  </Head>
          {seccsess === true && <div onClick={() => setSeccess(false)} id="backDrop">hello</div>}
          {error.err === 'reset' && <div onClick={() => setError('')} id="backDrop">hello</div>}
            {seccsess === true &&
            <div className="secc-comment">
                <img src={'/uploads/accept.png'} alt="" />
                <h1>ایمیل تغییر رمز برای شما ارسال شد!</h1>
                <button onClick={() => {
                    setEmail('')
                    setSeccess(false)}}>متوجه شدم</button>
            </div>}
            {error.err === "reset" &&
            <div className="secc-comment">
                <img src={'/uploads/warning.png'} alt="" />
                <h1>{error.errMessage}</h1>
                <button style={{background:"#fe1919"}} onClick={() => {
                    setError('')}}>متوجه شدم</button>
            </div>}
          
            <div className="forget-card">
            <form className="forget-left">
                <input placeholder="ایمیل خود را وارد کنید ..." type="email" onChange={(e) => setEmail(e.target.value)}value={email}/>
                 <div className="Auth-err">{error && !error.err && <label><img src="/images/warning (1).png" alt="warning" /> <p>{error.errMessage}</p></label>}</div>
                 <ReCAPTCHA 
                 style={{zIndex:"30",opacity:"0"}}
                 size="invisible"
                 sitekey={json}
                 ref={reRef}
                 />
                <button disabled={loading === true} onClick={forget}>ارسال {loading && <div className='loading-spinner'></div>}</button>
            </form>
              <div className="forget-right">
                <p style={{fontSize:"20px",color:"white" , fontWeight:"600"}}>فراموشی رمز عبور</p>
                <p style={{marginTop:"40px",color:"white",direction:"rtl",width:"88%" ,fontSize:"15px"}}>
                   شما میتوانید از طریق ایمیل خود رمز عبور خود را بازیابی کنید !</p>
                <p style={{marginTop:"40px",color:"white",direction:"rtl",width:"88%" ,fontSize:"15px"}}>
                  پس از ارسال شدن ایمیل وارد جیمیل خود شوید و بر روی لینک تغییر رمز کلیک کنید.</p>
              </div>
            </div>
          </div>
    )
}

export default ForgetPassword
