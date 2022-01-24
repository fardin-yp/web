import React,{useState ,useEffect} from 'react'
import Footer from '../../components/footer/footer'
import Navbar from '../../components/navbar/navbar';
import axios from 'axios';

export async function getServerSideProps(context){

const usersloggedIn = await fetch("http://localhost:27017/authentication/find",{
    credentials: "include",
    headers:{
      cookie:context.req.cookies.token
    }
    
  });
 const user = await usersloggedIn.json();

 if(!user || !user.number){
  return {
    redirect: {
      permanent: false,
      destination: "/404"
    }
  }
}

  if(!context.req.cookies.token){
    return {
      redirect: {
        permanent: false,
        destination: "/404"
      }
    }
  }
  return {
    props: {user:user}
 }
}

const index = ({user}) => {

  const [change ,setChange] = useState("");
  const [email ,setEmail] = useState("");
  const [username ,setUserName] = useState("");
  const [number ,setNumber] = useState("");
  const [loading ,setLoading] = useState(false);
  const [error ,setError] = useState("");

  const updateProfile = async (e) => {
    e.preventDefault()
    setLoading(true)
     const post = {email:email?email:user.email ,username:username?username:user.username ,number:number?number:user.number}
     if(change === "email" && !email){
      return setError("لطفا ایمیل خود را وارد کنید !")
     }
     if(change === "number" && !number){
      return setError("لطفا شماره خود را وارد کنید !")
    }
    if(change === "username" && !username){
     return setError("لطفا نام خود را وارد کنید !")
    }
     await axios.put(`http://localhost:27017/authentication/editUser/${user.number[0]._id}/${change}`,post,{withCredentials:true}).then(res => {
       if(res.data.errMessage){
        setError(res.data.errMessage)
         setLoading(false)
       }
       if(!res.data.errMessage){
       window.location.reload()
       }
     })
  }

  useEffect(() => {
    setLoading(false)
  },[error]);

  useEffect(() => {
    setError("")
    setEmail("")
    setNumber("")
    setNumber("")
  },[change])

    return (
      
        <div style={{background:"#f8f9fb"}}>
        {change === "email" && <div className="change-profile">
         
            <h1>ویرایش ایمیل  <img onClick={() => setChange('')} 
            style={{width:"20px",opacity:"0.7",position:"absolute" ,left:"-10px",top:"0px",cursor:"pointer"}} src="/images/cancel.png" alt="cancel"/>
            </h1>
            <form>
              <div style={{width:"70%"}}>
                <p>ایمیل قبلی :</p>
              <input value={user.email} />
              </div>
              <div style={{width:"70%"}}>
                <p>ایمیل جدید :</p>
              <input style={error ? {border:"1px solid red"}:null} onChange={(e) => setEmail(e.target.value) } />
              </div>
              {error && <p style={{color:"red" ,fontSize:"12px",marginBottom:"-15px",marginTop:"-5px"}}>{error}</p>}
              <button disabled={loading} onClick={updateProfile}>تایید</button>
            </form>
            </div>}
            {change === "username" && <div className="change-profile">
         
         <h1>ویرایش نام کاربری  <img onClick={() => setChange('')} 
         style={{width:"20px",opacity:"0.7",position:"absolute" ,left:"-10px",top:"0px",cursor:"pointer"}} src="/images/cancel.png" alt="cancel"/>
         </h1>
         <form>
           <div style={{width:"70%"}}>
             <p>نام کاربری قبلی :</p>
           <input style={{direction:"rtl"}} value={user.username} />
           </div>
           <div style={{width:"70%"}}>
             <p>نام کاربری جدید :</p>
           <input style={error ? {border:"1px solid red",direction:"rtl"}:{direction:"rtl"}} onChange={(e) => setUserName(e.target.value) } />
           </div>
           {error && <p style={{color:"red" ,fontSize:"12px",marginBottom:"-15px",marginTop:"-5px"}}>{error}</p>}
           <button disabled={loading} onClick={updateProfile}>تایید</button>
         </form>
         </div>}
         {change === "number" && <div className="change-profile">
         
         <h1>ویرایش  تلفن همراه  <img onClick={() => setChange('')} 
         style={{width:"20px",opacity:"0.7",position:"absolute" ,left:"-10px",top:"0px",cursor:"pointer"}} src="/images/cancel.png" alt="cancel"/>
         </h1>
         <form>
           <div style={{width:"70%"}}>
             <p>شماره تلفن قبلی :</p>
           <input style={{direction:"rtl"}} value={user.number[0].number} />
           </div>
           <div style={{width:"70%" ,position:"relative"}}>
             <p>  شماره تلفن جدید:</p>
           <input style={error ?{direction:"rtl",border:"1px solid red"}:{direction:"rtl"}} onChange={(e) => setNumber(e.target.value) } />
           </div>
           {error && <p style={{color:"red" ,fontSize:"12px",marginBottom:"-15px",marginTop:"-5px"}}>{error}</p>}
             <button style={error ? {border:"1px solid red"}:null} disabled={loading} onClick={updateProfile}>تایید</button>
           
         </form>
         </div>}
          {change && <div onClick={() => setChange('')} id="backDrop">hello</div>}
            <Navbar />
             <div className="userProfile">
                 <div className="profileCard">
                    <div className="top-profileCard">
                        <div><img src="/uploads/user.png" /><p>نام کاربری : {user.username}</p></div>
                        <div style={{justifyContent:"flex-end" ,position:"relative"}}>
                            <div id="prof_label" >
                            <button >ویرایش پروفایل</button>
                            <label >
                                <a onClick={() => setChange("email")} href="#"> ایمیل </a>
                                <a onClick={() => setChange("username")} href="#"> نام کاربری</a>
                                <a onClick={() => setChange("number")} href="#"> شماره همراه </a>
                                <a href="/Auth/forget-Password"> رمز عبور </a>
                            </label>
                            </div>
                        </div>
                    </div>
                    <div className="bot-profileCard" >
                    <div>
                        <p style={{fontSize:"14px" ,fontWeight:"600"}}>ایمیل:</p>
                     <input value={user?user.email:null} onChange={(e) => setEmail(e.target.value)}  />
                 </div>
                 <div>
                    <p style={{fontSize:"14px" ,fontWeight:"600"}}>نام کاربری:</p>
                    <input value={user?user.username:null}   />
                 </div>
                 <div>
                    <p style={{fontSize:"14px" ,fontWeight:"600"}}>شماره همراه:</p>
                 <input value={user.number[0]?user.number[0].number:null} />
                 </div>
                 <div>
                    <p style={{fontSize:"14px" ,fontWeight:"600"}}>رمز عبور:</p>
                 <input value={"***************"} />
                 </div>
                </div>
                   
                 </div>

             </div>
            <Footer />
        </div>
    
    )
}

export default index
