import axios from 'axios';
import React,{useEffect, useState} from 'react';


export async function getServerSideProps(context) {

    const con = context.params.code;
  
    const loggedIn = await fetch(`http://localhost:27017/allRoutes/fullPost/${con}`,{method:'GET'});
    const logged = await loggedIn.json();

    const usersloggedIn = await fetch("http://localhost:27017/authentication/find",{
        credentials: "include",
        headers:{
          cookie:context.req.cookies.token
        }
        
      });

      const user = await usersloggedIn.json()

      if(!user||
        !user.username
        ){
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
       props: {post:logged ,user}
    }
  }

const index = ({post ,user}) => {

    const [username ,setUserName] = useState('');
    const [number ,setNumber] = useState("");
    const [email ,setEmail] = useState("");
    const [agree ,setAgree] = useState("");
    const [description ,setDescription] = useState("");
    const [read ,setRead ] = useState(false);
    const [laws ,setLaws] = useState("");
    const [ PAy ,seTpay] = useState(false)

    const pay = async (e) => {
        e.preventDefault();
      //   const post = {number,email,agree , username}
      // await axios.post("http://localhost:27017/allRoutes/orderSold" ,post)
      seTpay(true)
    }

    const law = async () => {
     await axios.get("http://localhost:27017/allRoutes/laws",{withCredentials:true}).then(res => {
       setLaws(res.data[0].text)
     })
    }
    useEffect(() => {
      if(user) {
        setUserName(user.username);
        setEmail(user.email);
        setNumber(user.number[0].number);
        law()
      }
    },[])
    return (
        <div className="order-web">
            <h1> سفارش آنلاین وبسایت {post.name}</h1>
            {read === true && <div onClick={() => setRead(false)} id="backDrop">hello</div>}
            {PAy === true && <div onClick={() => seTpay(false)} id="backDrop">hello</div>}
            {PAy === true &&
            <div className="secc-comment">
                <img src={'/uploads/warning.png'} alt="" />
                <h1 style={{marginTop:"15px",color:"#fe0000"}}> متاسفانه در حال حاضر درگاه پرداختی وجود ندارد !</h1>
                <h2 style={{textAlign:"center",fontSize:"20px"}}>شما میتوانید برای خرید این وبسایت با پشتیبانی تماس بگیرید!</h2>
                <button style={{background:"#fe1919"}} onClick={() => {
                    seTpay(false)}}>متوجه شدم</button>
            </div>}
            {read === true &&             
            <div className="law">
              <img onClick={() => setRead(false)} src="/images/cancel (1).png" alt=""/>
{laws && <div dangerouslySetInnerHTML={{__html: laws}} />}
            </div>}
            <form >
                <input style={{background:"#ddf0ff"}}  placeholder="نام و نام خانوادگی" value={user.username} onChange={(e) => setUserName(e.target.value)} />
                <input style={{background:"#ddf0ff"}} placeholder="شماره همراه" value={user.number[0].number} />
                <input style={{background:"#ddf0ff"}} placeholder={`کد سایت: ${post._id}`} />
                <input style={{background:"#ddf0ff"}} placeholder="ایمیل" value={user.email} />  
                <textarea onChange={(e) => setDescription(e.target.value)} style={{fontWeight:"600",width:"92%",marginTop:"15px" ,borderRadius:"5px",border:"1px solid silver",height:"100px"}} placeholder="توضیحات بیشتر ... (دلخواه)" />   
                
                <label>
                    <div><input type="checkbox" /><p>دامنه com سالیانه 290,000 تومان</p></div>
                    <select>
                        <option>زبان اضافه برای سایت های بین المللی</option>
                    </select>
                    <div style={{width:"99%",margin:"10px 0px"}}>
                      <input type="checkbox" />
                      <p>قوانین وبسایت را مطالعه کردم و با آن موافقم .<b style={{cursor:"pointer",pointerEvents:"all"}} onClick={() => setRead(true)}>قوانین وبسایت</b></p>
                    </div>
                </label>
                <div className="payment">
                    <p>مبلغ قابل پرداخت:</p>
                    <p>{post.price}تومان</p>
                </div>
                <a href="#" onClick={() => seTpay(true)} >پرداخت آنلاین</a>
            </form>
        </div>
    )
}

export default index
