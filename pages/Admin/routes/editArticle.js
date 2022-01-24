import {useState ,useEffect} from 'react';
import axios from 'axios';
import Edit from '../editor/edit';
import Loading from '../images/loadingshop.gif';
import Image from 'next/image';


const editAricle = () => {
    const [title ,setTitle] = useState('');
    const [des ,setDes] = useState([]);
    const [image ,setImage] = useState('');
    const [info ,setInfo] = useState("");
    const [loading ,setLoading] = useState(false);
    const [articles ,setArticles] = useState([]);
    const [filter ,setFilter] = useState('');
    const [edit ,setEdit] = useState(false);
    const [id, setId] = useState(false);
    const [deleteProduct , setDeleteProduct] = useState(null)

   const postHandler = async (e) =>{    
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
    try{      
        formData.append("title" , title);
        formData.append("image" , image);
        formData.append("id" , id);
        formData.append("info" ,info);
    
        await axios.put("http://localhost:27017/adminRoute/ArticleUpdate" , formData ,{withCredentials:true} ).then(res => {
            if(res.data.errMessage){
                alert(res.data.errMessage)
                setErr(res.data.errMessage)
                setLoading(false)
            }
            alert(res.data.Message)
            setMessage(res.data.Message);
            setLoading(false);
            setEdit(false)
        } )

    }catch(err){
        setLoading(false);
  }    
}
const getArticles = async () => {
    await axios.get('http://localhost:27017/allRoutes/articles',{withCredentials:true}).then(res => {
        setArticles(res.data.findPost)
    })
}

useEffect(() => {
    getArticles()
},[]);

const uploadImage = async (e) => {
    const images = e.target.files[0]
    setImage(images)
}

const deletePR = async (e) => {
    e.preventDefault();
    const post ={ image:deleteProduct.image}
    setLoading(true)
    await axios.put(`http://localhost:27017/adminRoute/delete/articles/${deleteProduct._id} `,post ,{withCredentials:true} ).then(res => {
        alert(res.data.Message)
        setLoading(false);
        setDeleteProduct(null)
        setEdit('')
    } )
}
    return (
        <div className="products" >
           {deleteProduct && <div onClick={() => setDeleteProduct(null)} id="backDrop">hello</div>}
             {deleteProduct &&
            <div className="secc-comment">
                <img src={'/uploads/warning.png'} alt="" />
                <h1>آیا این پست حذف شود ؟</h1>
                <button style={{background:"#fe1919"}} onClick={deletePR}> حذف پست</button>
            </div>}
{!edit && <form style={{height:"100%",marginTop:"-10px"}} encType="multipart/form-data">
        <div style={{height:"max-content",width:"90%" ,background:"#3f51b5",padding:"10px" 
            ,borderRadius:"10px",color:"white"}}>ویرایش مقالات
             
            </div>
        <input style={{marginTop:"10px"}} placeholder="جستجو..." onChange={(e) => setFilter(e.target.value)} />
        {articles.length === 0 && <div style={{width:"100%" ,height:"450px" ,position:"relative",margin:"auto"}}>
                <Image src={Loading} layout={"fill"} alt="" />
            </div>}
        <div className="maqalat" style={{flexWrap:"wrap",boxShadow:"none",marginTop:"10px",width:"90%", justifyContent:"space-between"}}>
                    {articles.length > 0 && articles.filter(res => {
                        return res.title.toLowerCase().includes(filter.toLocaleLowerCase())
                    }).map(res => {
                        return <a style={{marginTop:"15px",width:"250px"}} key={res._id} href={"#"} onClick={() => {
                            setEdit(res);
                            setTitle(res.title)
                            setDes(res.des)
                            setInfo(res.info)
                            setId(res._id)
                        }}>
                            <img src={`/uploads/${res.image}`} />
                            <div>
                              <h1>{res.title}</h1>
                              <label><div><img src={"/uploads/conversation.png"} />دیدگاه:{res.comments.length}</div>
                              <div><img src={"/uploads/calendar.png"} />{res.timestamp}</div>
                              </label>
                            </div>
                        </a>
                    })}
                    </div>
            </form>}
            {edit.title && 
            <form style={{height:"100%",marginTop:"-10px"}} encType="multipart/form-data">
            <div style={{width:"90%" ,background:"#3f51b5",padding:"10px" 
            ,borderRadius:"10px",color:"white",position:"relative"}}>ویرایش مقالات
            <button disabled={loading} onClick={() => setDeleteProduct(edit)} style={{top:"-17px",padding:"10px",position:"absolute",left:"3px",fontSize:"12px",width:"max-content" ,height:"max-content",background:"red"}}>حذف مقاله</button>
            </div>
              <input placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
              <input placeholder="تصویر" type='file' filename="image" onChange={uploadImage} />
              <Edit setProperty={setInfo} data={info} />
              <button disabled={loading} onClick={postHandler}>
                    {loading && <div style={{height:"30px" ,width:"30px",top:"25%"}} className='loading-spinner'></div>}
                    تایید ویرایش
                </button>
            </form>
                }
        </div>

    )
}

export default editAricle
