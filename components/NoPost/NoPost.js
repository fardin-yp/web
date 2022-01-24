import React from 'react'

const NoPost = ({name ,background}) => {
    return (
        <div>
            <div style={{marginBottom:"-300px" ,marginTop:"5px"}} className="err-card">
               <img src="/images/404.gif" alt=""  />
               <p>متاسفانه هیچ وبسایت {name} برای فروش وجود ندارد!!</p>
               <a style={{background:background}} href="/">بازگشت به صفحه اصلی</a>
            </div>
        </div>
    )
}

export default NoPost
