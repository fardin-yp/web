import React from 'react';
import left from './images/left.png';
import dash from './images/dashboard.png';
import art from './images/article.png';
import form from './images/google-forms.png';
import seo from './images/seo-report.png';
import coin from './images/coin.png';
import Image from 'next/image';
import { useState ,useEffect ,useRef } from 'react';
import Products from './routes/products';
import Article from './routes/article';
import Dashboard from './routes/dashboard';
import axios from 'axios';
import Exclusive from './routes/exclusive';
import io from 'socket.io-client';
import Chat from './routes/chat';
import Question from './routes/questions';
import Seo from './routes/seo';
import EditArticle from './routes/editArticle';
import EditProduct from './routes/editProducts';
import Messages from './routes/messages/Messages';
import Sells from './routes/sells/sells';
import Panel from './routes/panel/panel';
import Head from "next/head"
import Users from './routes/users/users';
import Laws from './routes/Laws';

export async function getServerSideProps(context) {


    if(!context.req.cookies.Admin){
      return {
        redirect: {
          permanent: false,
          destination: "/404"
        }
      }
    }
  
      const loggedIn = await fetch("http://localhost:27017/auth/loggedIn",{
        credentials: "include",
        headers:{
          cookie:context.req.cookies.Admin
        }
        
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

const index = ({logged}) => {

    const [active ,setActive] = useState("panel");
    const [route ,setRoute ] = useState("none");
    const [images ,setImages] = useState('');
    const [conversation ,setConversation] = useState();
    const [arrivalMessage ,setArrivalMessage] =useState(null);
    const [allMessages , setAllMessages] = useState([]);
    const [message ,setMessage] = useState("");
    const [namad ,setNamad] = useState(null)
    const socket = useRef();
    const [activeChat ,setActiveChat] = useState('');
    const [onlineUsers ,setOnlineUsers] = useState([])
    const [info ,setInfo] = useState(null);
    const [openMenu ,setOpenMenu] = useState(false);
    const [loading ,setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const [size, setSize] = useState(0);

    let filterArray = allMessages.filter(res => res.conversationId === activeChat);
    useEffect(() => {
      function updateSize() {
        setSize(window.innerWidth);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    },[])
  
let mobile = false
    if( size < 800 ){
        mobile = true   
}

    useEffect(() => {
       const getInformation = async () => {
       await axios.get("http://localhost:27017/adminRoute/info",{withCredentials:true}).then(res => {
           setInfo(res.data)
    })
   };
   getInformation()
   },[]);

  useEffect(() => {
      socket.current = io("ws://localhost:27017")
      socket.current.on("getMessage" , data => {
          setArrivalMessage({
              sender:data.senderId,
              text: data.text,
              createdAt:Date.now(),
          })
      })
  } , []);

const start = () => {
  new Audio('/mixkit-long-pop-2358.wav').play()
};
useEffect(() => {
  if(arrivalMessage){
      start();
      setAllMessages(prev => [...prev ,arrivalMessage])
      filterArray.push(arrivalMessage)
  }
},[arrivalMessage])
    useEffect(() => {
      socket.current.emit("addUser" ,"Admin-hrttrhthr%00");
      socket.current.on("getUsers" , users => {
        setOnlineUsers(users)
      })
    },[conversation]);

    useEffect(() => {
      const getconversation = async () => {
     await axios.get("http://localhost:27017/conversation",{withCredentials:true}).then(res => {
          setConversation(res.data)
    })
    };
    getconversation()
    },[]);

useEffect(() => {
  const getMessages = async () => {
      await axios.get(`http://localhost:27017/message/Admin`,{withCredentials:true}).then(res => {
           setAllMessages(res.data)
       })
  }
   getMessages()
},[]);
useEffect(() => {
  const getNamad = async () => {
      await axios.get(`http://localhost:27017/allRoutes/namad`,{withCredentials:true}).then(res => {
           setNamad(res.data)
       })
  }
   getNamad()
},[]);

const sendMessage = async (e) => {
  e.preventDefault();
  const con = activeChat && activeChat;
  const post = {conversationId:con , sender:"Admin-hrttrhthr%00" , text:message}
  socket.current.emit("sendMessage" , {
      senderId:"Admin-hrttrhthr%00",
      receiverId : activeChat && activeChat,
      text : message
  })
  setMessage("")
  await axios.post(`http://localhost:27017/message/`,post ,{withCredentials:true}).then(res => {
      setAllMessages([...allMessages ,res.data])
  })
 
}

    const uploadImages = async (e) => {
        e.preventDefault();
        setLoading(true)
         try{      
            const formData = new FormData();
    
            formData.append("image" , images);
            
            await axios.post("http://localhost:27017/adminRoute/articleImage" , formData ,{withCredentials:true} ).then(res => {
                alert(res.data)
                setLoading(false)
            } )
        }catch(err){
      } 
    }
 const uploadsNamad = async (e) => {
  e.preventDefault();
  setLoading(false);
  try{      
    const formData = new FormData();

    formData.append("image" , images);
    
    await axios.post("http://localhost:27017/adminRoute/namad" , formData ,{withCredentials:true} ).then(res => {
        alert(res.data);
        setLoading(false);
    } )
}catch(err){
} 
 }


 let menu = ["menu"];
 if(openMenu){
   menu = ['open-menu',"menu"]
 }

const logOut = async () => {
  await axios.get("http://localhost:27017/auth/logout" ,{withCredentials:true});
  window.location = '/'
}

const user = onlineUsers && onlineUsers.find(res => res.userId === activeChat) || null ;

    return (
        <div className="admin">
          <Head>
            <title>به پنل ادمین خوش آمدید !</title>
          </Head>
          {openMenu === false && <div onClick={() =>  setOpenMenu(prev => !prev)} id="admin-back">hello</div>}
            <div className="top-menu">
                <h1 style={{cursor:"pointer",pointerEvents:"auto" }} onClick={() => setOpenMenu(prev => !prev)}>LOGO</h1>
                <div> 

                <p style={{fontSize:"18px",marginLeft:"10px"}}>{logged.find[0].username}</p>
                <img src="/uploads/users.png" alt=""/>

                 <label>
                   <button onClick={() => setActive("panel")} style={{background:"#3f51b5"}}>پنل ادمین</button>
                   <button onClick={logOut}>LogOut</button>
                   </label>
                </div>
            </div>
            <div className={menu.join(' ')}>
            <ul>
            <li onClick={() => setActive("dashboard")} style={active === "dashboard" ?{backgroundColor:"white"}:null}>          
                <div><div><Image src={dash} width={20} height={20} /> <p>داشبورد</p></div> <Image width={30} height={20} src={left} alt="" /></div>
                
            </li>
            {logged.find[0].roll === "master" && <li onClick={() => setActive("projects")} style={active === "projects" ?{backgroundColor:"white"}:null} >          
                <div><div><Image width={20} height={20} src={form} /><p>پروژه ها</p></div> <Image width={30} height={20} src={left} alt="" /></div>
                {active === "projects" && <ul>
                    <li onClick={() => setRoute("new-projects")}>پروژه جدید</li>
                    <li onClick={() => setRoute("edit-projects")}> ویرایش پروژه ها</li>
                </ul>}
            </li>}
            { logged.find[0].roll === "poster" && <li onClick={() => setActive("projects")} style={active === "projects" ?{backgroundColor:"white"}:null} >          
                <div><div><Image width={20} height={20} src={form} /><p>پروژه ها</p></div> <Image width={30} height={20} src={left} alt="" /></div>
                {active === "projects" && <ul>
                    <li onClick={() => setRoute("new-projects")}>پروژه جدید</li>
                    <li onClick={() => setRoute("edit-projects")}> ویرایش پروژه ها</li>
                </ul>}
            </li>}
            {logged.find[0].roll === "master" && <li onClick={() => active === "sells"? setActive("dashboard"):setActive("sells")} style={active === "sells" ?{backgroundColor:"white"}:null}>          
                <div><div><Image width={20} height={20} src={coin} /><p>فروش ها</p></div><Image width={30} height={20} src={left} alt="" /></div>  
            </li>
            }
            {logged.find[0].roll === "master" && <li onClick={() => setActive("articles")} style={active === "articles" ?{backgroundColor:"white"}:null}>          
                <div><div><Image width={20} height={20} src={art} /><p>مقالات</p> </div>
                <Image width={30} height={20} src={left} alt="" /></div>
                {active === "articles" && <ul>
                    <li onClick={() => setRoute("new-Article")}>مقاله جدید</li>
                    <li onClick={() => setRoute("edit-Article")}> ویرایش مقالات </li>
                </ul>}
            </li>
          }
          {logged.find[0].roll === "poster" && <li onClick={() => setActive("articles")} style={active === "articles" ?{backgroundColor:"white"}:null}>          
                <div><div><Image width={20} height={20} src={art} /><p>مقالات</p> </div>
                <Image width={30} height={20} src={left} alt="" /></div>
                {active === "articles" && <ul>
                    <li onClick={() => setRoute("new-Article")}>مقاله جدید</li>
                    <li onClick={() => setRoute("edit-Article")}> ویرایش مقالات </li>
                </ul>}
            </li>}
            {logged.find[0].roll === "master" &&  <li onClick={() => setActive("seo")} style={active === "seo" ?{backgroundColor:"white"}:null}>          
                <div><div><Image width={20} height={20} src={seo} /><p>سئو</p></div>
                <Image width={30} height={20} src={left} alt="" /></div>
                {active === "seo" && <ul>
                    <li onClick={() => setRoute("new-seo")}> سئو جدید</li>
                    <li onClick={() => setRoute("edit-seo")}> ویرایش سئو </li>
                    <li onClick={() => setRoute("seo-service")}> سرویس هاس فروش </li>
                </ul>}
            </li>
}
{logged.find[0].roll === "ceo" &&  <li onClick={() => setActive("seo")} style={active === "seo" ?{backgroundColor:"white"}:null}>          
                <div><div><Image width={20} height={20} src={seo} /><p>سئو</p></div>
                <Image width={30} height={20} src={left} alt="" /></div>
                {active === "seo" && <ul>
                    <li onClick={() => setRoute("new-seo")}> سئو جدید</li>
                    <li onClick={() => setRoute("edit-seo")}> ویرایش سئو </li>
                    <li onClick={() => setRoute("seo-service")}> سرویس هاس فروش </li>
                </ul>}
            </li>}
            {logged.find[0].roll === "master" && <li onClick={() => setActive("messages")} style={active === "messages" ?{backgroundColor:"white"}:null}>          
                <div><div><Image width={20} height={20} src={art} /><p>پیام ها</p> </div>
                <Image width={30} height={20} src={left} alt="" /></div>
                {active === "messages" && <ul>
                 <li onClick={() => setRoute("send-exclusive")}> درخواست وبسایت اختصاصی</li> 
                    <li onClick={() => setRoute("send-consulting")}> درخواست مشاوره </li>
                    <li onClick={() => setRoute("contact-us")}> ارتباط با ما </li>
                </ul>
                   }
            </li>
          }
            {logged.find[0].roll === "master" && <li style={{backgroundColor:"#c1c4c8"}} onClick={() => active === "exclusive"? setActive("dashboard"): setActive("exclusive")}>          
                <div style={{justifyContent:"flex-start"}}><p style={{marginRight:"20px"}}>فرم اختصاصی</p></div>
            </li>
            }
            {logged.find[0].roll === "master" && <li style={{backgroundColor:"#c1c4c8"}} onClick={() => active === "Chat"? setActive("dashboard"): setActive("Chat")}>          
                <div style={{justifyContent:"flex-start"}}><p style={{marginRight:"20px"}}>چت آنلاین</p></div>
            </li>
            }
            {logged.find[0].roll === "support" && <li style={{backgroundColor:"#c1c4c8"}} onClick={() => active === "Chat"? setActive("dashboard"): setActive("Chat")}>          
                <div style={{justifyContent:"flex-start"}}><p style={{marginRight:"20px"}}>چت آنلاین</p></div>
            </li>}
            {logged.find[0].roll === "master" && <li style={{backgroundColor:"#c1c4c8"}} onClick={() => active === "question"? setActive("dashboard"): setActive("questions")}>          
                <div style={{justifyContent:"flex-start"}}><p style={{marginRight:"20px"}}> سوالات متداول</p></div>
            </li>
            }
            {logged.find[0].roll === "master" && <li style={{backgroundColor:"#c1c4c8"}} onClick={() => active === "upload-image"? setActive("dashboard"):setActive("upload-image")}>          
                <div style={{justifyContent:"flex-start"}}><p style={{marginRight:"20px"}}> گالری تصاویر</p></div>
            </li>
            }
            {logged.find[0].roll === "master" && <li style={{backgroundColor:"#c1c4c8"}} onClick={() => active === "namad"? setActive("dashbord"):setActive("namad")}>          
                <div style={{justifyContent:"flex-start"}}><p style={{marginRight:"20px"}}> نماد های سایت</p></div>
            </li>
            }
            {logged.find[0].roll === "master" && <li style={{backgroundColor:"#c1c4c8"}} onClick={() => active === "users"? setActive("dashbord"):setActive("users")}>          
                <div style={{justifyContent:"flex-start"}}><p style={{marginRight:"20px"}}> کاربران </p></div>
            </li>
            }
            {logged.find[0].roll === "master" && <li style={{backgroundColor:"#c1c4c8"}} onClick={() => active === "laws"? setActive("dashbord"):setActive("laws")}>          
                <div style={{justifyContent:"flex-start"}}><p style={{marginRight:"20px"}}> قوانین </p></div>
            </li>
            }
            </ul>

        </div>
           <div className="Admin-rout" style={active === "dashboard" ? {backgroundColor:"white"}:null}>
             {active === "projects" && route === "new-projects" && <Products />}
             {active === "projects" && route === "edit-projects" && <EditProduct />}
             {active === "articles" && route === "new-Article" && <Article />}
             
             {active === "articles" && route === "edit-Article" && <EditArticle />}
             {active === "upload-image" && 
              <div className="products">
                <form  encType="multipart/form-data">
                 <input placeholder="تصویر" type='file' filename="image" onChange={(e) => setImages(e.target.files[0])} />
                 <button disabled={loading} onClick={uploadImages} >
                   {loading && <div style={{height:"30px" ,width:"30px",top:"25%"}} className='loading-spinner'></div>}
                   ارسال عکس ها
                  </button>
                </form>
              </div>}
             {active === "messages" && <Messages route={route} />}
             {active === "users" && <Users info={info.allUsers} />}
             {active === "dashboard" && <Dashboard info={info} />}
             {active === "projects" && !route && <Dashboard info={info} />}
             {active === "articles" &&  !route  && <Dashboard info={info} />}
             {active === "seo" && !route && <Dashboard info={info} />}
             {active === "messages" && !route && <Dashboard info={info} />}
             {active === "exclusive" && <Exclusive />}
             {active === "questions" && <Question />}
             {active === "seo" && <Seo Seoroute={route} info={info && info.allSeo} />}
             {active === "laws" && <Laws info={info.laws.length > 0 && info.laws[0].text} />}
             {active === "sells" && <Sells />}
             {active === "panel" && <Panel info={logged} />}
             {active === "Chat" && <Chat arrivalMessage={arrivalMessage} message={message} setActiveChat={setActiveChat} onlineUsers={onlineUsers} setMessage={setMessage} activeChat={activeChat} allMessages={allMessages} sendMessage={sendMessage} conversation={conversation}/>}
             {active === 'namad' && <div className="products">
               <form encType="multipart/form-data">
               <input placeholder="تصویر" type='file' filename="image" onChange={(e) => setImages(e.target.files[0])} />
               <button disabled={loading} onClick={uploadsNamad} >
                 {loading && <div style={{height:"30px" ,width:"30px",top:"25%"}} className='loading-spinner'></div>}ارسال عکس ها
                </button>
               </form>
               </div>}
               {active === "namad" && <div style={{width:"80%",margin:"50px auto" ,display:"flex",justifyContent:"space-evenly",flexWrap:"wrap"}}>
               {namad && namad.map(res => {
                 return <div key={res._id} style={{width:"200px" ,display:"flex" ,flexFlow:"column" ,justifyContent:"center",borderRadius:"10px", boxShadow:"0px 2px 8px rgba(0,0,0,0.1) , 0px 0px 15px rgba(0,0,0,0.1)"}}>
                   <img style={{width:"100%",height:"200px",borderRadius:"10px"}} src={`/uploads/${res.image}`} />
                   <button style={{background:"red" ,color:"white",borderRadius:"10px"}}>Delete</button>
                 </div>  
               }) 
               }</div>}
           </div>
        </div>
    )
}

export default index
