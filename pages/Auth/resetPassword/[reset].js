import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export async function getServerSideProps(context) {

    const loggedIn = await fetch("http://localhost:27017/authentication/reset/"+ context.params.reset,{
      method:'GET',
      credentials: 'include',
    });

  const logged = await loggedIn.json();

  if(!logged||
    logged === false ||
    logged === undefined || 
    logged === null
    ){
    return {
      redirect: {
        permanent: false,
        destination: "/404"
      }
    }
  }

  return {
     props: {logged:logged}
  }
}

const ResetPassword = ({logged}) => {
  
    const [password, setPassword] =useState('')
    const [verify, setVerify] =useState('')
    const [seccsess ,setSeccess] = useState(false)
    const [error ,setError] = useState('')
    const [loading , setLoading] = useState(false);
    const Router = useRouter()

    async function reset(e){
      e.preventDefault()
      setError('')
      const post = {password ,token:Router.query.reset,verify}
      try{
      await axios.post('http://localhost:27017/authentication/reset' ,post).then(res => {
    
     if(res.data.errMessage){
      setError(res.data.errMessage)
      setLoading(false)
      }
      if(!res.data.errMessage){
        setSeccess(true)
        setLoading(false)
      }
    })
  }catch(err){}
  }
    let err = ['err']
  if(error){
    err = ['open-err','err']
  }
  let sec = ['sec']
   if(seccsess){
     sec = ['open-sec','sec']
   }

    return (
        <div className="background" style={{background:"#f4faff"}}>
   <Head>
   <link rel="icon" href="/art.png" />
    <title>تغییر رمز عبور اکانت</title>
  </Head>
            {seccsess === true &&
            <div className="secc-comment">
                <img src={'/uploads/accept.png'} alt="" />
                <h1>رمز شما با موفقیت تغییر یافت!</h1>
                <button onClick={() => {
                                    window.location = '/'
                                   }}>متوجه شدم</button>
            </div>}
            {seccsess === true && <div onClick={() => setSeccess(false)} id="backDrop">hello</div>}
        <form className="reset-card">
            <p> تغییر رمز عبور اکانت </p>
            <input style={error ? {border:"2px solid red"}:null} type="password" placeholder="رمز عبور جدید" onChange={(e) => setPassword(e.target.value)} value={password} />
            <input style={error ? {border:"2px solid red"}:null} type="password" placeholder="تایید رمز عبور" onChange={(e) => setVerify(e.target.value)} value={verify} />
            <div style={{width:"72%"}} className="Auth-err">{error && <label><img style={{width:"20px" ,height:"20px"}} src="/images/warning (1).png" alt="warning" /> <p>{error}</p></label>}</div>
            <button style={{position:"relative"}} disabled={loading} onClick={reset}>ثبت{loading && <div style={{borderRight:"5px solid #0d2040"}} className='loading-spinner'></div>}</button>
        </form>
        </div>
    )
}

export default ResetPassword;
