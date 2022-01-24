import {useState ,useEffect} from 'react';
import axios from 'axios';
import CKEditor from '../editor/Editor'


const Articles = () => {
    const [title ,setTitle] = useState('');
    const [image ,setImage] = useState('');
    const [info ,setInfo] = useState('');
    const [loading ,setLoading] = useState(false);

   const postHandler = async (e) =>{    
        e.preventDefault();
        setLoading(true)
    try{      
        const formData = new FormData();

        formData.append("title" , title);
        formData.append("image" , image);
        formData.append("info" ,info);

        
        await axios.post("http://localhost:27017/adminRoute/article" , formData ,{withCredentials:true} ).then(res => {
            if(res.data.errMessage){
                alert(res.data.errMessage)
                setErr(res.data.errMessage)
                setLoading(false)
            }
            alert(res.data.Message)
            setMessage(res.data.Message);
            setLoading(false);
        } )

    }catch(err){
        setLoading(false);
  }    
}

const uploadImage = (e) => {
    const images = e.target.files[0]
    setImage(images)
}

    return (
        <div className="products" style={{height:"100%"}}>
            <form style={{height:"100%",marginTop:"-10px"}} encType="multipart/form-data">
            <div style={{height:"max-content",width:"90%" ,background:"#3f51b5",padding:"10px" 
            ,borderRadius:"10px",color:"white"}}>توضیحات عنوان</div>
                <div className="article-holder">
                <input placeholder="نام" type='text' onChange={(e) => setTitle(e.target.value)} />
                <input placeholder="تصویر" type='file' filename="image" onChange={uploadImage} />
            </div>
             <div style={{height:"max-content",width:"90%" ,background:"#3f51b5",padding:"10px" 
            ,borderRadius:"10px",color:"white"}}>توضیحات بیشتر</div>
                <CKEditor setProperty={setInfo}/>
                <button disabled={loading} onClick={postHandler}>
                    {loading && <div style={{height:"30px" ,width:"30px",top:"25%"}} className='loading-spinner'></div>}
                    ارسال
                </button>
            </form>
        </div>

    )
}

export default Articles