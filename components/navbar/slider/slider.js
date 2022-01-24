import React,{useState} from 'react'

const slider = ({openSlider ,find}) => {

 const [sliderDrop ,setSliderDrop] = useState(false);

    let nav = ['slider']
    if(openSlider === true){
        nav = ['slider' ,'open-slider']
    }

    return (
        <div className={nav.join(' ')}>
            <div className="slider-top">
                   <h1>LOGO</h1>
                   {!find.username && 
                   <div>
                    <a href="/Auth/Login">ورود پنل کاربری</a>
                    <a style={{background:"linear-gradient(90deg, #48c6ef 0%, #6f86d6 100%)"}} href="/Auth/SignUp"> ثبت نام </a>
                   </div>
                   }
            </div>
            <div className="slider-menu">
                <a href="/">خانه</a>
            <a href="#" style={sliderDrop ? {backgroundColor:"#d8e2e3"} :null}>
                <img src={'/uploads/black-arrow-down.png'} />
            <a style={{padding:"10px 0px"}} onClick={() => setSliderDrop(prevState => !prevState)} href="#">خرید سایت </a>
            {sliderDrop && 
                <div>
                <a href="/shop-website">خرید سایت فروشگاهی</a>
                <a href="/news-website">خرید سایت خبری</a>
                <a href="/company-website">خرید سایت شرکتی</a>
                <a href="/Real-Estate-website">خرید سایت املاک</a>
                <a href="/personal-website">خرید سایت شخصی</a>
                <a href="/medical-website">خرید سایت پزشکی</a>
                <a href="/resturant-website">خرید سایت رستوران</a>
                </div>}
            </a>
                <a href="/exclusive-website">سایت اختصاصی</a>
                <a href="/seo">سئو</a>
                <a href="/articles"> مقالات </a>
                <a href="/contact-us"> تماس با ما </a>
            </div>
        </div>
    )
}

export default slider
