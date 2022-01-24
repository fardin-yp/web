import {useState ,useEffect} from 'react';
import axios from 'axios';

const Question = () => {

    const [question ,setQuestion] = useState("");
    const [answer ,setAnswer] = useState("");
    const [loading ,setLoading] = useState(false);
    const [route , setRoute ] = useState('')
  

   const postHandler = async (e) =>{    
   e.preventDefault();
   const post = {question ,answer ,route};
   setLoading(true)
    try{      
        await axios.post("http://localhost:27017/adminRoute/questions" , post ,{withCredentials:true} ).then(res => {
            if(res.data.errMessage){
                alert(res.data.errMessage);
                setLoading(false)
            }
            alert(res.data.Message);
            setLoading(false)
        } )
    }catch(err){
  }    
}
    return (
        <div className="products">
            <form style={{padding:"20px"}} onSubmit={postHandler}>
            <div className="article-holder">
                <input placeholder="عنوان پرسش" type='text' onChange={(e) => setQuestion(e.target.value)} />
                <input placeholder="پاسخ" type='text' onChange={(e) => setAnswer(e.target.value)} />
                <select onChange={(e) => setRoute(e.target.value)}>
                    <option value="">مکان مورد استفاده</option>
                    <option value="home">صفحه اصلی</option>
                    <option value="exclusive">صفحه سایت اختصاصی</option>
                </select>
            </div>
                <button disabled={loading} onClick={postHandler}>
                    {loading && <div style={{height:"30px" ,width:"30px",top:"25%"}} className='loading-spinner'></div>}
                    ارسال
                </button>
            </form>
        </div>

    )
}

export default Question