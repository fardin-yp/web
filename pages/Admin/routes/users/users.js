import React,{useState} from 'react';
import axios from 'axios';

const Users = ({info}) => {

    const [sure ,setSure] = useState(false);
    const [loading ,setLoading] = useState(false);
    const [search ,setSearch] = useState('');
    const [slice ,setSlice] = useState(10)

    const blockUser = async (e) => {
        e.preventDefault();
        setLoading(true)
        try{
            await axios.put(`http://localhost:27017/adminRoute/blockUser/${sure}`,sure ,{withCredentials:true}).then(res => {
                alert(res.data);
            });
            setLoading(false);
        }catch(err){
            setLoading(false);
        }
    }
 const filter = info &&  info.filter(res => res.username.toLowerCase().includes(search.toLowerCase()))

 const addSlice = () => {
    setSlice(prev => prev + 10)
}
    return (
        <div className="products" style={{flexFlow:"column" ,justifyContent:"flex-start",alignItems:"center"}}>
            {sure && <div onClick={() => setSure(false)} id="backDrop">hello</div>}
            {sure &&
            <div className="secc-comment">
                <img src={'/uploads/warning.png'} alt="" />
                <h1>آیا این کاربر بلاک شود ؟</h1>
                <button style={{background:"#fe1919"}} onClick={blockUser}> بلاک کاربر</button>
            </div>}
            <div style={{height:"max-content",width:"90%" ,background:"#3f51b5",padding:"10px" 
            ,borderRadius:"10px",color:"white"}}> کاربران سایت </div>
            <input placeholder="جستجو ..." onChange={(e) => setSearch(e.target.value)} />
            {filter && filter.slice(0,slice).map(res => {
                return <div className="users-card" style={{width:"80%",maxHeight:"120px",background:"white",borderRadius:"15px",padding:"10px",marginTop:"10px"}}>
                    <p>نام : {res.username}</p>
                    <p>ایمیل : {res.email}</p>
                    <p>شماره همراه : {res.number}</p>
                    <button style={{fontSize:"12px"
                    ,background:"red" 
                    ,width:"max-content",position:"absolute" ,padding:"5px 10px" ,top:"-10px",left:"5px"}}
                    onClick={() => setSure(res._id)} disabled={loading}>بلاک</button>
                </div>
            })}
            { info && info.length > slice && <div 
            style={{
              marginTop:"15px" , cursor:"pointer",display:"flex", alignItems:"center" ,justifyContent:"center",background:"white" ,padding:"0px 15px",borderRadius:"10px",boxShadow:" 0px 2px 8px rgba(0,0,0,0.1) , 0px 0px 15px rgba(0,0,0,0.1)"}} 
            onClick={addSlice}>
                <img style={{width:"20px"}} src={'/images/down-arrow.png'} alt="" />
                <p style={{fontWeight:"600",fontSize:"18px" ,opacity:"0.7"}}>نتایج بیشتر </p></div>}
        </div>
    )
}

export default Users
