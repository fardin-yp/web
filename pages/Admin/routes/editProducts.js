import {useEffect, useState} from 'react';
import axios from 'axios';
import Edit from '../editor/edit';
import Loading from '../images/loadingshop.gif';
import Image from 'next/image';

const editProducts = () => {

    const [products ,setProducts] = useState([]);
    const [name ,setName] = useState('');
    const [price ,setPrice] = useState('');
    const [off ,setOff] = useState('');
    const [image ,setImage] = useState('');
    const [description ,setDescription] = useState('');
    const [category ,setCategoty] = useState('');
    const [link ,setLink] = useState("");
    const [property ,setProperty] = useState('');
    const [filter ,setFilter] = useState('');
    const [loading ,setLoading] = useState(false);
    const [edit ,setEdit] = useState(false);
    const [id, setId] = useState(false);
    const [deleteImage ,setDeleteImage] = useState('');
    const [deleteProduct , setDeleteProduct] = useState(null)

    const getProducts = async () => {
        await axios.get("http://localhost:27017/allRoutes/allProducts").then(res => {
            setProducts(res.data)
        })
    }

    const postHandler = async (e) =>{    
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        
    try{      
        formData.append("name" , name);
        formData.append("description" , description);
        formData.append("category" , category);
        formData.append("image" , image);
        formData.append("price" , price);
        formData.append("off" , off);
        formData.append("link" , link);
        formData.append("Property" , property);
        formData.append("deleteImage" , deleteImage);
        formData.append("id" , id);
    
        await axios.put("http://localhost:27017/adminRoute/ProductsUpdate" , formData ,{withCredentials:true} ).then(res => {
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


    useEffect(() => {
        getProducts()
    },[]);

    const uploadImage = async (e) => {
        const images = e.target.files[0]
        setImage(images)
    }

    const deletePR = async (e) => {
        e.preventDefault();
        const post ={ image:deleteProduct.image}
        await axios.put(`http://localhost:27017/adminRoute/delete/product/${deleteProduct._id}`,post ,{withCredentials:true} ).then(res => {
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
{!edit && <form style={{marginTop:"-10px",minHeight:"200px"}} encType="multipart/form-data">
        <div style={{height:"max-content",width:"90%" ,background:"#3f51b5",padding:"10px" 
            ,borderRadius:"10px",color:"white"}}>ویرایش پروژه</div>
        <input style={{marginTop:"10px"}} placeholder="جستجو..." onChange={(e) => setFilter(e.target.value)} />
        <div className="maqalat" style={{flexWrap:"wrap",boxShadow:"none",marginTop:"10px",width:"90%",justifyContent:"space-evenly"}}>
            {products.length === 0 && 
            <div style={{width:"100%" ,height:"450px" ,position:"relative",margin:"auto"}}>
                <Image src={Loading} layout={"fill"} alt="" />
            </div>}
                    {products.length > 0 && products.filter(res => {
                        return res.name && res.name.toLowerCase().includes(filter.toLocaleLowerCase())
                    }).map(res => {
                        return <a style={{marginTop:"15px",width:"250px"}} key={res._id} href={"#"} onClick={() => {
                            setEdit(res);
                            setName(res.name)
                            setLink(res.link)
                            setCategoty(res.category)
                            setOff(res.off)
                            setDescription(res.description);
                            setDeleteImage(res.image)
                            setProperty(res.Property)
                            setId(res._id)
                        }}>
                            <img style={{objectFit:"cover"}} src={`/uploads/${res.image}`}  alt=""/>
                            <div>
                              <h1>{res.name}</h1>
                              <label><div><img src={"/uploads/conversation.png"} />دیدگاه:{res.comments.length}</div>
                              <div><img src={"/uploads/calendar.png"} />{res.timestamp}</div>
                              </label>
                            </div>
                        </a>
                    })}
                    </div>
            </form>}
            {edit.name && 
            <form style={{height:"100%",marginTop:"-10px"}} encType="multipart/form-data">
            <div style={{width:"90%" ,background:"#3f51b5",padding:"10px" 
            ,borderRadius:"10px",color:"white",position:"relative"}}>ویرایش پروژه {edit.name} 
            <button onClick={() => setDeleteProduct(edit)} style={{top:"-17px",padding:"10px",position:"absolute",left:"3px",fontSize:"12px",width:"max-content" ,height:"max-content",background:"red"}}>حذف پروژه</button></div>
              <input placeholder="title" value={name} onChange={(e) => setName(e.target.value)} />
                <input placeholder="قیمت" value={price} type='text' onChange={(e) => setPrice(e.target.value)} />
                <input placeholder="تخفیف" value={off} type='text' onChange={(e) => setOff(e.target.value)} />
                <input placeholder="لینک" value={link} type='text' onChange={(e) => setLink(e.target.value)} />
                <input placeholder="تصویر" type='file' filename="image" onChange={uploadImage} />
                <select value={category} style={{left:"0px" , top:"15px"}} onChange={(e) => setCategoty(e.target.value)}>      
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
              <Edit setProperty={setProperty} data={property} />
              <button disabled={loading} onClick={postHandler}>
                    {loading && <div style={{height:"30px" ,width:"30px",top:"25%"}} className='loading-spinner'></div>}
                    تایید ویرایش
                </button>
            </form>
                }
        </div>
    )
}

export default editProducts
