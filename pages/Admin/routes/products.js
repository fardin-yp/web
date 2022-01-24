import React,{useState ,useEffect,useRef} from 'react';
import axios from 'axios';
import CKEditor from '../editor/Editor'

 const Products = () => {
    const [name ,setName] = useState('');
    const [price ,setPrice] = useState('');
    const [off ,setOff] = useState('');
    const [image ,setImage] = useState('');
    const [description ,setDescription] = useState('');
    const [category ,setCategoty] = useState('');
    const [link ,setLink] = useState("");
    const [property ,setProperty] = useState('');
    const [loading ,setLoading] = useState(false);

   const postHandler = async (e) =>{    
        e.preventDefault();
        setLoading(true)
    try{      
        const formData = new FormData();

        formData.append("name" , name);
        formData.append("description" , description);
        formData.append("category" , category);
        formData.append("image" , image);
        formData.append("price" , price);
        formData.append("off" , off);
        formData.append("link" , link);
        formData.append("Property" , property);
        
        await axios.post('http://localhost:27017/adminRoute/product', formData ,{withCredentials:true}).then(res => {
            if(res.data.errMessage){
                alert(res.data.errMessage);
                setErr(res.data.errMessage);
                setLoading(false);
            }
            alert(res.data.Message)
            setMessage(res.data.Message);
            setLoading(false)
        } )
    }catch(err){
        setLoading(false)
    }    
}


 const uploadImage = async (e) => {
    const images = e.target.files[0]
    setImage(images)
   
}
    return (
        <div className="products">
            <form  encType="multipart/form-data" id="products-form">
            <div style={{height:"max-content",width:"90%" ,background:"#3f51b5",padding:"10px" 
            ,borderRadius:"10px",color:"white"}}>پروژه جدید</div>
            
                <input placeholder="نام" type='text' onChange={(e) => setName(e.target.value)} />
                <input placeholder="قیمت" type='text' onChange={(e) => setPrice(e.target.value)} />
                <input placeholder="تخفیف" type='text' onChange={(e) => setOff(e.target.value)} />
                <input placeholder="لینک" type='text' onChange={(e) => setLink(e.target.value)} />
                <input placeholder="تصویر" type='file' filename="image" onChange={uploadImage} />

                <select style={{left:"0px" , top:"15px"}} onChange={(e) => setCategoty(e.target.value)}>      
                <option value="">انتخاب دسته بندی</option>
                <option value="shop">فروشگاهی</option>
                <option value="company">شرکتی</option>
                <option value="medical">پزشکی</option>
                <option value="realState">املاک</option>
                <option value="news">خبری</option>
                <option value="resturant">رستوران</option>
                <option value="personal">شخصی</option>
                </select>

                <textarea style={{width:"87%"}} placeholder="توضیحات ... " onChange={(e) => setDescription(e.target.value)} />
                <CKEditor setProperty={setProperty} />
                <button disabled={loading} onClick={postHandler}>
                    {loading && <div style={{height:"30px" ,width:"30px",top:"25%"}} className='loading-spinner'></div>}
                    ارسال
                </button>
            </form>
        </div>

    )
}
export default Products;

