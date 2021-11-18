
const index = () => {
    return (
        <div className="login">
            <form>
                <h1>ثبت نام</h1>
                <input placeholder="ایمیل@" />
                <input placeholder="نام کاربری" />
                <input placeholder="رمز عبور " />
                <input placeholder=" تکرار رمز عبور " />
                <button>ورود</button>
                <div><a href="/Auth/Login"> ورود </a> <a>فراموشی رمز عبور</a></div>
            </form>
        </div>
    )
}

export default index
