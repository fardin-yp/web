import React,{useState, useEffect ,useRef} from 'react';
import axios from'axios';
import {format} from "timeago.js";
import close from '../images/cancel (1).png';
import Image from 'next/image';
import send from '../../../public/images/send.png'

const chat = ({allMessages ,message ,sendMessage ,setMessage ,setActiveChat ,activeChat ,onlineUsers ,arrivalMessage }) => {

    const [conversation ,setConversation] = useState([]);
    const messagesEndRef = useRef(null);
    const [openChat ,setOpenChat] = useState(false);
    const [size, setSize] = useState(0);
    const [messages ,setMessages] = useState([])
  
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
        const getconversation = async () => {
       await axios.get("http://localhost:27017/conversation/Admin",{withCredentials:true}).then(res => {
            setConversation(res.data)
     })
    };
    getconversation()
    },[]);

    const deleteConversations = () => {

    }
const user = onlineUsers && onlineUsers.find(res => res.userId === activeChat) || null ;

useEffect(() => {
    const mess = [...allMessages]
    const filter = mess.filter(res => res.conversationId === activeChat)
    setMessages( filter )
},[activeChat])

useEffect(() => {
    const mess = [...allMessages]
    const filter = mess.filter(res => res.conversationId === activeChat);
    filter.push(arrivalMessage)
    setMessages( filter )
},[arrivalMessage])

const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

useEffect(scrollToBottom, [messages]);
    return (
        <div className="Admin-Chat"  style={mobile ? {flexFlow:"column"}:null}>
             {/* when mobile mode is false */}
             {mobile !== true && <> 
             <div className="allConversations">
              {!conversation.errMessage && conversation && conversation.map(res => {
            return <div 
            style={activeChat === res.members[0] ? {background:"silver" ,color:"White"} :null } 
            onClick={() => {
                setActiveChat(res.members[0]) 
                }} key={res._id}>
            <div>
                <img src={"/uploads/user.png"} />
                <p >{res.members[0].length > 22 ? ` ${res.members[0].substring(0, 22)} ...` : `${res.members[0]}`}</p>
                </div>
                <Image width={20} height={20} src={close} onClick={deleteConversations} alt="" />
            </div>
        })}
            </div>
            <div style={{background:"silver" ,borderRadius:"10px"}} className="A-messages">
                <div className="A-profile">
                <img src={"/uploads/user.png"} />
            <div style={{display:"flex",flexFlow:"column",justifyContent:"space-evenly",height:"10%"}} >
                <p style={{fontWeight:"600"}}>{activeChat && activeChat || "User"}</p>
                {activeChat && <p style={user ? {color:"green",marginTop:"-20px"}:{color:"red",marginTop:"-20px"}}>{user ? "online" :"offline"}</p>}
            </div>
                </div>
                <div className="chat-room" >
            <div >
            {activeChat && allMessages && messages && messages.map(res => {
            return <div style={res && res.sender !== "Admin-hrttrhthr%00" ?{alignItems:"flex-end"} : null} key={res && res._id}>
                    <p style={res && res.sender !== "Admin-hrttrhthr%00" ?{backgroundColor:"#78e6f3"} : null}>{res && res.text}</p>
                <label>{format(res && res.createdAt)}</label>
            </div>
            })}
            {!activeChat && <h1 style={{margin:"30% auto",zIndex:"1"}}>!Welcome to LiveChat</h1>}
            {conversation && <div ref={messagesEndRef} />}
            </div>

        </div>
            <div style={{marginTop:"-2px",borderRadius:"10px"}} className="A-input">
            <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="پیام را وارد کنید..." /> 
            <button onClick={sendMessage}><Image width={30} height={30} src={send} alt="send.png" /></button>
        </div>

        </div> </>}
        {/* when mobile mode is true */}
        {mobile === true && <> 
            
          {activeChat && <div style={{background:"silver" ,borderRadius:"10px",width:"100%"}} className="A-messages">
                <div className="A-profile" style={{position:"relative"}}>
                <img src={"/uploads/user.png"} />
                <img src="/images/send.png" onClick={() => setActiveChat(null)} style={{position:"absolute" ,cursor:"pointer" ,left:"0px" ,top:"0px",width:"28px",height:"28px" ,borderRadius:"0px"}}/>
            <div style={{display:"flex",flexFlow:"column",justifyContent:"space-evenly",height:"10%"}} >
                <p style={{fontWeight:"600"}}>{activeChat && activeChat || "User"}</p>
                {activeChat && <p style={user ? {color:"green",marginTop:"-20px"}:{color:"red",marginTop:"-20px"}}>{user ? "online" :"offline"}</p>}
            </div>
                </div>
             {activeChat && <div className="chat-room" >
            <div >
            {activeChat && allMessages && messages && messages.map(res => {
            return <div style={res && res.sender !== "Admin-hrttrhthr%00" ?{alignItems:"flex-end"} : null} key={res && res._id}>
                    <p style={res && res.sender !== "Admin-hrttrhthr%00" ?{backgroundColor:"#78e6f3"} : null}>{res && res.text}</p>
                <label>{format(res && res.createdAt)}</label>
            </div>
            })}
            {!activeChat && <h1 style={{margin:"30% auto",zIndex:"1"}}>!Welcome to LiveChat</h1>}
            {conversation && <div ref={messagesEndRef} />}
            </div>

        </div>
}
            <div style={{marginTop:"-2px",borderRadius:"10px"}} className="A-input">
            <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="پیام را وارد کنید..." /> 
            <button onClick={sendMessage}><Image width={30} height={30} src={send} alt="send.png" /></button>
        </div>

        </div>
        }
{!activeChat && <div style={{width:"100%"}} className="allConversations">
              {!conversation.errMessage && conversation && conversation.map(res => {
            return <div 
            style={activeChat === res.members[0] ? {background:"silver" ,color:"White"} :null } 
            onClick={() => {
                setActiveChat(res.members[0]) 
                }} key={res._id}>
            <div>
                <img src={"/uploads/user.png"} />
                <p >{res.members[0].length > 24 ? `${res.members[0].substring(0, 24)} ...` : `${res.members[0]}`}</p>
                </div>
                <Image width={20} height={20} src={close} onClick={deleteConversations} alt="" />
            </div>
        })}
            </div>}


</>}
  
    </div>
    )
}

export default chat
