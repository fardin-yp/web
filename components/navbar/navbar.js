import {useEffect , useState ,useContext} from 'react';
import context from '../../helpers/context/authContext';
import axios from "axios";
import Slider from './slider/slider';


const navbar = () => {

    const [scroll ,setScroll] = useState(0);
    const [show ,setShow] = useState(false);
    const {find} = useContext(context);
    const [openSlider ,setOpenSlider] = useState(false);

    const handleScroll = () => {
        const currenstScrollPos = window.pageYOffset;
        if(currenstScrollPos > 1228){
            setShow((scroll > currenstScrollPos && scroll - currenstScrollPos > 70) || currenstScrollPos < 10);
            setScroll(currenstScrollPos);
        }else{
            setShow(false)
        }
    }

    const logOut = async () => {
       await axios.get("http://localhost:27017/authentication/logout" , {withCredentials:true})
        window.location.reload()
    }

    useEffect(() => {
        window.addEventListener("scroll" , handleScroll);

        return () => window.removeEventListener('scroll' ,handleScroll);
      } ,[setScroll ,show ,handleScroll]);

     let nav = ['navbar']
     if(show && openSlider === false){
         nav = ['navbar' ,'scroll-Nav']
     }
    return (
        <nav className={show ? nav.join(' ') : 'navbar'}>
            {openSlider == true && <div onClick={() => setOpenSlider(false)} className="backdrop"></div>}
            <Slider openSlider={openSlider} find={find} />
            <div className="logo">logo</div>
            <div className="nav-bot">
            <div className="humburger" onClick={() => setOpenSlider(prevState => !prevState)}>
                <div className="hums"></div>
                <div className="hums"></div>
                <div className="hums"></div>
            </div> 
                <ul>
                    <li><img src={"/uploads/home.png"} /><a href="/"> خانه </a><hr /> </li>
                    <li style={{zIndex:"85"}}><img src={"/uploads/flash.png"} />
                    <a href="/"> خرید وبسایت </a><hr /> 
                        <ul style={{width:"180px",left: "-44%",zIndex:"85"}}>
                            <li><a href="/shop-website">خرید سایت فروشگاهی</a></li>
                            <li><a href="/news-website">خرید سایت خبری</a></li>
                            <li><a href="/company-website">خرید سایت شرکتی</a></li>
                            <li><a href="/Real-Estate-website">خرید سایت املاک</a></li>
                            <li><a href="/personal-website">خرید سایت شخصی</a></li>
                            <li><a href="/medical-website">خرید سایت پزشکی</a></li>
                            <li><a href="/resturant-website">خرید سایت رستوران</a></li>
                        </ul> 
                    </li>
                    <li><img src={"/uploads/seo.png"} /><a href="/exclusive-website"> سایت اختصاصی </a><hr /> </li>
                    <li><img src={"/uploads/word.png"} /><a href="/Seo"> سئو </a><hr /></li>
                    <li><img src={"/uploads/doc.png"} /><a href="/articles"> مقالات </a><hr /> </li>
                    <li><img src={"/uploads/contact.png"} /><a href="/contact-us"> تماس با ما </a><hr /> </li>
                </ul>
            </div>
            <div className="nav-login">
                <label>
                   <img src="/uploads/user.png" />
                    {find.username && <b>{find.username}</b>}
                    {!find.username && <b> پنل کاربری</b>}
                    <div className="login-drop">
                   <img src="/uploads/triangle.png" />
                   {!find.username && 
                   <div>
                    <a href="/Auth/Login">ورود پنل کاربری</a>
                    <a style={{background:"linear-gradient(90deg, #48c6ef 0%, #6f86d6 100%)"}} href="/Auth/SignUp"> ثبت نام </a>
                   </div>
                   }
                   {find.username && 
                    <div>
                        <a href="/userProfile" style={{background:"linear-gradient(90deg, #06beb6 0%, #48b1bf 100%)",width:"maxContent"}}> پنل کاربری </a>
                        <a href="#" onClick={() => logOut()} style={{background:"linear-gradient(90deg, #cb2d3e 0%, #ef473a 100%)"}}> خروج از حساب</a>
                    </div>
                   }
                </div>
                </label>
            </div>
            
        </nav>
    )
}

export default navbar
