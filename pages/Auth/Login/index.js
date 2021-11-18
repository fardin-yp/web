
const index = () => {
    return (
        <div className="login">
            <form>
                <h1>ورود</h1>
                <input placeholder="نام کاربری" />
                <input placeholder="رمز عبور " />
                <button>ورود</button>
                <div><a href="/Auth/SignUp">ثبت نام</a> <a>فراموشی رمز عبور</a></div>
            </form>
        </div>
    )
}

export default index
