import React,{useEffect, useState} from 'react';
import axios from 'axios';
import Edit from '../editor/edit'


const Users = ({info}) => {

    const [text ,setText] = useState(false);
    const [loading ,setLoading] = useState(false);
    const [id ,setId ] = useState(null);

    useEffect(() => {
        if(info){
            setText(info)
        }
    },[])
console.log(text)
    const sendLaws = async (e) => {
        e.preventDefault();
        setLoading(true);
        const post = {id ,text}
        try{
            await axios.post(`http://localhost:27017/adminRoute/laws/`,post ,{withCredentials:true}).then(res => {
                if(res.data.errMessage){
                    alert(res.data.errMessage)
                }
                alert(res.data);
            });
            setLoading(false);
        }catch(err){
            setLoading(false);
        }
    }

    return (
        <div className="products" style={{flexFlow:"column" ,justifyContent:"flex-start",alignItems:"center"}}>
            <div style={{height:"max-content",width:"90%" ,background:"#3f51b5",padding:"10px" 
            ,borderRadius:"10px",color:"white"}}>  قوانین و مقررات سایت </div>
         <form>
         <Edit setProperty={setText} data={text}  />
         <button disabled={loading} onClick={sendLaws}>ارسال</button>
         </form>
        </div>
    )
}

export default Users