import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Messages = ({route}) => {
    const [contacts ,setContacts] = useState(null);
    const [consaltings ,setConsaltings] = useState(null);
    const [exclusives ,setExclusives] = useState(null);
    const [Delete ,setDelete] = useState(null);
    const [loading ,setLoading] = useState(false);
    const [slice ,setSlice] = useState(10)

    useEffect(() => {
     const getMessages = async () => {
         axios.get("http://localhost:27017/adminRoute/getMessages" , {withCredentials:true}).then(res => {
             setContacts(res.data.Contacts);
             setConsaltings(res.data.Consaltings);
             setExclusives(res.data.Exclusives)
         })
     }
     getMessages()
    },[])

   const deleteMessages = async () => {
      const post = {type:Delete.type ,id:Delete._id}
      setLoading(true)
      try{
        await axios.post("http://localhost:27017/adminRoute/deleteMessages" ,post , {withCredentials:true}).then(res => {
           if(res.data.Consaltings){
               setConsaltings(res.data.Consaltings);
               setLoading(false);
               setDelete(null);
           }
           if(res.data.Contacts){
            setContacts(res.data.Contacts);
            setLoading(false);
            setDelete(null);
        }
        if(res.data.Exclusives){
            setExclusives(res.data.Exclusives);
            setLoading(false);
            setDelete(null);
        }
        })

      }catch(err){
        setLoading(false);
      }
   }
   const addSlice = () => {
       setSlice(prev => prev + 10)
   }
   useEffect(() => {
    setSlice(10)
   },[route]);

    return (
        <div className="products" 
        style={{flexFlow:"column",alignItems:"center",justifyContent:"flex-start"}}>
            {Delete && 
            <div className="secc-comment" style={{zIndex:"151"}}>
              <h1>آیااین پیام حذف شود؟</h1>
              <img src={'/uploads/warning.png'} alt="" />
              <button disabled={loading} onClick={deleteMessages}>
                  {loading && <div style={{height:"30px" ,width:"30px",top:"25%"}} className='loading-spinner'></div>}
                  حذف پیام
              </button>
            </div>}
            {Delete && <div style={{zIndex:"1"}} onClick={() => setDelete(null)} id="backDrop">hello</div>}
            {route === "send-exclusive" && 
            <>
            <div style={{height:"max-content",width:"70%" ,background:"#3f51b5",padding:"10px" 
            ,borderRadius:"10px",color:"white"}}>درخواست های وبسایت اختصاصی</div>

            {exclusives && exclusives.slice(0,slice).map(res => {
            return <div className="Admin-messages" key={res._id}>
            <img src="/images/cancel (1).png" onClick={() => setDelete({...res ,type:"exclusives"})} alt="" /> 
                    <b>پیام از  : {res.name}</b>
                    <p>شماره تماس : {res.number}</p>
                    <p> ایمیل : {res.email}</p>
                    <p> توضیحات : {res.des}</p>
                </div>
            })}
            { exclusives && exclusives.length > slice && <div 
            style={{
                cursor:"pointer",display:"flex", alignItems:"center" ,justifyContent:"center",background:"white" ,padding:"0px 15px",borderRadius:"10px",boxShadow:" 0px 2px 8px rgba(0,0,0,0.1) , 0px 0px 15px rgba(0,0,0,0.1)"}} 
            onClick={addSlice}>
                <img style={{width:"20px"}} src={'/images/down-arrow.png'} alt="" />
                <p style={{fontWeight:"600",fontSize:"18px" ,opacity:"0.7"}}>نتایج بیشتر </p></div>}
            </>
        }
        {route === "send-consulting" && 
            <>
            <div style={{height:"max-content",width:"70%" ,background:"#3f51b5",padding:"10px" 
            ,borderRadius:"10px",color:"white"}}>درخواست های مشاوره</div>

            {consaltings && consaltings.map(res => {
            return <div className="Admin-messages" key={res._id}>
            <img src="/images/cancel (1).png" onClick={() => setDelete({...res ,type:"consaltings" })} alt="" /> 
                    <b>پیام از  : {res.name}</b>
                    <p>شماره تماس : {res.number}</p>
                </div>
            })}
            { consaltings && consaltings.length > slice && <div 
            style={{
                cursor:"pointer",display:"flex", alignItems:"center" ,justifyContent:"center",background:"white" ,padding:"0px 15px",borderRadius:"10px",boxShadow:" 0px 2px 8px rgba(0,0,0,0.1) , 0px 0px 15px rgba(0,0,0,0.1)"}} 
            onClick={addSlice}>
                <img style={{width:"20px"}} src={'/images/down-arrow.png'} alt="" />
                <p style={{fontWeight:"600",fontSize:"18px" ,opacity:"0.7"}}>نتایج بیشتر </p></div>}
            </>
        }
        {route === "contact-us" && 
            <>
            <div style={{height:"max-content",width:"70%" ,background:"#3f51b5",padding:"10px" 
            ,borderRadius:"10px",color:"white"}}>پیام های ارتباط با ما</div>

            {contacts && contacts.map(res => {
            return <div className="Admin-messages" key={res._id}>
            <img src="/images/cancel (1).png" onClick={() => setDelete({...res ,type:"contacts"})} alt="" /> 
                    <b>پیام از  : {res.name}</b>
                    <p> ایمیل : {res.email}</p>
                    <p> موضوع پیام : {res.message}</p>
                    <p> توضیحات : {res.des}</p>
                </div>
            })}
            { contacts && contacts.length > slice && <div 
            style={{
                cursor:"pointer",display:"flex", alignItems:"center" ,justifyContent:"center",background:"white" ,padding:"0px 15px",borderRadius:"10px",boxShadow:" 0px 2px 8px rgba(0,0,0,0.1) , 0px 0px 15px rgba(0,0,0,0.1)"}} 
            onClick={addSlice}>
                <img style={{width:"20px"}} src={'/images/down-arrow.png'} alt="" />
                <p style={{fontWeight:"600",fontSize:"18px" ,opacity:"0.7"}}>نتایج بیشتر </p></div>}
            </>
        }

        </div>
    )
}

export default Messages;
