import {useEffect , useState} from 'react'

const navbar = () => {

    const [scroll ,setScroll] = useState(0)
    const [show ,setShow] = useState(false)

    const handleScroll = () => {
        const currenstScrollPos = window.pageYOffset;
        if(currenstScrollPos > 1228){
            console.log(currenstScrollPos)
            setShow((scroll > currenstScrollPos && scroll - currenstScrollPos > 70) || currenstScrollPos < 10);
            setScroll(currenstScrollPos);
        }else{
            setShow(false)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll" , handleScroll);

        return () => window.removeEventListener('scroll' ,handleScroll);
      } ,[setScroll ,show ,handleScroll]);


     let nav = ['navbar']
     if(show){
         nav = ['navbar' ,'scroll-Nav']
     }
    return (
        <nav className={show ? nav.join(' ') : 'navbar'}>
            <div  className="logo">logo</div>
            <div className="nav-bot">
            <div className="humburger">
                <div className="hums"></div>
                <div className="hums"></div>
                <div className="hums"></div>
            </div> 
                <ul>
                    <li><img src={"/uploads/home.png"} /><a href="/"> خانه </a><hr /> </li>
                    <li><img src={"/uploads/flash.png"} />
                    <a href="/"> خرید وبسایت </a><hr /> 
                        <ul style={{width:"180px",left: "-44%"}}>
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
                <div className="nav-login">
                    <a href="/Auth/Login">ورود به پنل کاربری</a>
                </div>
            </div>
            
        </nav>
    )
}

export default navbar
