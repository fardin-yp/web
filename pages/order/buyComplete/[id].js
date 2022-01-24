import React from 'react'
import Footer from '../../../components/footer/footer'
import Navbar from '../../../components/navbar/navbar';
import tick from './tick.png';
import Image from 'next/image'

const Complete = () => {
    return (
        <div>
            <Navbar />
            <div className="web-complete">

                <Image src={tick} width={150} height={150} />
                <h1>خرید شما با موفقیت انجام شد!</h1>
                <p>ایمیل انجام خرید برای شما ارسال شد</p>
                <p>در اسرا وقت کارشناسان ما با شما تماس خواهند گرفت</p>

            </div>
            <Footer />
        </div>
    )
}

export default Complete
