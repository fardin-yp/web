import {useState ,useEffect} from 'react';
import axios from 'axios';

export async function getServerSideProps(context) {

    const id = context.params.id;
    const res = await fetch(`http://localhost:27017/allRoutes/SeoService/${id}`)
    const json = await res.json();

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
       props: {json ,user}
    }
  }

const index = ({json ,user}) => {


    const [namee, setName] = useState("");
    const [email ,setEmail] = useState("");
    const [number , setNumber] = useState('');
    const [des, setDes] = useState("");
    const [PAy ,seTpay] = useState(false);
    const [read ,setRead ] = useState(false);
    const [laws ,setLaws] = useState("");
    

    const pay = async (e) => {
        e.preventDefault();
        const post = {namee ,email ,number ,des ,information:name ,price}
      await axios.post("http://localhost:27017/allRoutes/orderSold" ,post ,{withCredentials:true})
    }
    const law = async () => {
        await axios.get("http://localhost:27017/allRoutes/laws",{withCredentials:true}).then(res => {
          setLaws(res.data[0].text)
        })
       }
    useEffect(() => {
        if(user) {
          setName(user.username);
          setEmail(user.email);
          setNumber(user.number[0].number);
          law()
        }
      },[])
    return (
        <div className="order-web">
            {PAy === true && <div onClick={() => seTpay(false)} id="backDrop">hello</div>}
            {read === true && <div onClick={() => setRead(false)} id="backDrop">hello</div>}
            {read === true &&             
            <div className="law">
              <img onClick={() => setRead(false)} src="/images/cancel (1).png" alt=""/>
{laws && <div dangerouslySetInnerHTML={{__html: laws}} />}
            </div>}
            {PAy === true &&
            <div className="secc-comment">
                <img src={'/uploads/warning.png'} alt="" />
                <h1 style={{marginTop:"15px",color:"#fe0000"}}> متاسفانه در حال حاضر درگاه پرداختی وجود ندارد !</h1>
                <h2 style={{textAlign:"center",fontSize:"20px"}}>شما میتوانید برای خرید این وبسایت با پشتیبانی تماس بگیرید!</h2>
                <button style={{background:"#fe1919"}} onClick={() => {
                    seTpay(false)}}>متوجه شدم</button>
            </div>}
            <h1> سفارش آنلاین {json.title}</h1>
            <form >
                <input value={namee} style={{background:"#ddf0ff"}} onChange={(e) => setName(e.target.value)} placeholder="نام و نام خانوادگی" />
                <input value={number} style={{background:"#ddf0ff"}} onChange={(e) => setNumber(e.target.value)} placeholder="شماره همراه" />
                <input value={json._id}  style={{background:"#ddf0ff"}} placeholder={`کد سرویس: ${json._id}`} />   
                <input value={email} style={{background:"#ddf0ff"}} onChange={(e) => setEmail(e.target.value)} placeholder="ایمیل" />   
             <textarea onChange={(e) => setDescription(e.target.value)} style={{fontWeight:"600",width:"92%",marginTop:"15px" ,borderRadius:"5px",border:"1px solid silver",height:"100px"}} placeholder="توضیحات بیشتر ... (دلخواه)" />        
             <label>
                <div style={{width:"99%",margin:"10px 0px"}}>
                      <input type="checkbox" />
                      <p>قوانین وبسایت را مطالعه کردم و با آن موافقم .<b style={{cursor:"pointer",pointerEvents:"all"}} onClick={() => setRead(true)}>قوانین وبسایت</b></p>
                    </div>
            </label>
                <div className="payment">
                    <p>مبلغ قابل پرداخت:</p>
                    <p>{json.price}</p>
                </div>
                <a href="#" onClick={() => seTpay(true)}>پرداخت آنلاین</a>
            </form>
        </div>
    )
}

export default index