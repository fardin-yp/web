import axios from 'axios';
import React,{useState} from 'react'

const panel = ({info}) => {
    const [change , setChange] = useState('')
    const [username ,setUserName] = useState("");
    const [email ,setEmail ] = useState("");
    const [roll ,setRoll] = useState("");
    const [password ,setPassword] = useState("");
    const [loading ,setLoading] = useState(false);
    const [error ,setError] = useState("");

    const NewAdmin = async (e) => {
        e.preventDefault()
        const post = {username,roll ,email ,password}
        setLoading(true)
         try {
            await axios.post("http://localhost:27017/auth/signup",post ,{withCredentials:true}).then(res => {
                if(res.data.errMessage){
                    setError(res.data.errMessage)
                     setLoading(false)
                   }
                   if(res.data.message){
                   alert(res.data.message);
                   setLoading(false)
                   setChange('')
                   }
            })
         }catch(err){}
    }

    return (
        <div  style={{width:"100%",display:"flex",marginTop:"100px",flexFlow:"column",alignItems:"center" ,justifyContent:"space-evenly"}}>
            {change && <div onClick={() => setChange('')} id="backDrop">hello</div>}
            {change === "newAdmin" && 
        <div className="change-profile">
    
         <h1 style={{height:"10%" ,pointerEvents:"all"}}>ادمین جدید 
         <img onClick={() => setChange('')} 
         style={{width:"20px",opacity:"0.7",position:"absolute" ,left:"-10px",top:"0px",cursor:"pointer"}} src="/images/cancel.png" alt="cancel"/>
         </h1>
         <form style={{height:"90%"}}>
           <div style={{width:"70%",marginTop:"20px"}}>
           <input style={{direction:"rtl"}} placeholder="نام" onChange={(e) => setUserName(e.target.value) } />
           </div>
           <div style={{width:"70%" ,marginTop:"20px"}}>
           <input style={{direction:"rtl"}} placeholder="ایمیل" onChange={(e) => setEmail(e.target.value) } />
           </div>
           <div style={{width:"70%" ,marginTop:"20px"}}>
           <select style={{padding:"10px 20px",cursor:"pointer" ,border:"1px solid grey" ,borderRadius:"20px"}} onChange={(e) => setRoll(e.target.value)}>
               <option value="">roll</option>
               <option value="master">master</option>
               <option value="poster">poster</option>
               <option value="ceo">Ceo</option>
               <option value="support">support</option>
           </select>
           </div>
           <div style={{width:"70%",height:"80px" ,marginTop:"20px"}}>
           <input style={{direction:"rtl"}} placeholder="رمز عبور" onChange={(e) => setPassword(e.target.value) } />
           </div>
           {error && <p style={{color:"red" ,fontSize:"12px",marginBottom:"-15px",marginTop:"-20px"}}>{error}</p>}
           <button style={{background:"#03a9f4"}} onClick={NewAdmin} disabled={loading} >ثبت</button>
         </form>
         </div>}
           <div className="admin-profile">
               <div>
               <img src="/uploads/users.png" alt=""/>
               <label style={{display:"flex",flexFlow:"column"}}>
               <h1>{ info.find[0].username} خوش آمدید !</h1>
                <p style={{opacity:"0.8"}}> ایمیل :{info.email} </p>
               </label>

               </div>
               <div style={{width:"30%",flexFlow:"column",alignItems:"center"}}>
                   <button style={{background:"#4caf50"}}>ویرایش پروفایل</button>
                   {info.find[0].roll === "master" && <button onClick={() => setChange("newAdmin")}>ادمین جدید</button>}
               </div>
           </div>
           {info.find[0].roll === "master" &&  <div className={"allAdmin"}>
           {info.allAdmin && info.allAdmin.map(res => {
               return<div key={res._id}>
               <div>
               <img src="/uploads/users.png" alt=""/>
               <label style={{boxShadow:"none" ,flexFlow:"column"}}>
                   <h1>نام :{res.username || ''}</h1>
                   <p>ایمیل :{res.email || ''}</p>
                   <p>roll:{res.roll || '' }</p>
               </label>
               {res.roll !== "master" && <button>ویرایش</button>}
               </div>
               
               </div>
           })}
           </div>}


        </div>
    )
}

export default panel
