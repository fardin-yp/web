import {useState ,useEffect} from 'react';
import axios from 'axios';

const Exclusive = () => {

    const [newform ,setForm] = useState([]);
    const [title ,setTitle] = useState("");
    const [price ,setPrice] = useState("");
    const [type ,setType] = useState("");
    const [des ,setDes] = useState("");
    const [err ,setErr] = useState('');
    const [arr ,setArr] = useState([]);
    const [loading ,setLoading] = useState(false);
    const [edit ,setEdit] = useState(false);
    const [newtitle ,setNewTitle] = useState("");
    const [newprice ,setNewPrice] = useState("");
    const [newtype ,setNewType] = useState("");
    const [newdes ,setnewDes] = useState("");
    const [categoryFirst ,setCategoryFirst] = useState('');
    const [categorySecond ,setCategorySecond] = useState('');
    const [categoryThird ,setCategoryThird] = useState('');
    const [required ,setRequired] = useState(false);


   const postHandler = async (e) =>{    
   e.preventDefault();
   setLoading(true);
    try{      
        await axios.put("http://localhost:27017/adminRoute/exclusiveForm" , newform ,{withCredentials:true} ).then(res => {
            if(res.data.errMessage){
                alert(res.data,errMessage);
                setLoading(false);
            }
            alert(res.data.Message);
            setLoading(false);
        } )
    }catch(err){
  }    
}
const GetForm = async () =>{    
     try{      
         await axios.get("http://localhost:27017/adminRoute/exclusiveForm" ,{withCredentials:true} ).then(res => {
            setForm(res.data[0].form)
         })
     }catch(err){
   }    
 }
useEffect(() => {
    GetForm();
},[]);

const addForm = (e) => {
    e.preventDefault()
    const obj = {title , type ,price ,des ,categoryFirst ,categorySecond ,categoryThird ,required}
    setForm([...newform , obj]);
    alert("فرم افزوده شد!")
}
const update = async (e) => {
    e.preventDefault()
    try{ 
    let newArr = [...newform]; 
    newArr[edit.id] = {title:newtitle ,required:required ,des:newdes,price:newprice ,type:newtype ,categoryFirst:categoryFirst ,categorySecond:categorySecond ,categoryThird:categoryThird} 
    setForm(newArr);
    setLoading(true);
         
    axios.put("http://localhost:27017/adminRoute/exclusiveForm" , newArr ,{withCredentials:true} ).then(res => {
            if(res.data.errMessage){
                alert(res.data,errMessage);
                setLoading(false);
            }
            alert(res.data.Message);
            setLoading(false);
        } )
    }catch(err){
  }  
    
}

    return (
        <>
        {edit && <div style={{zIndex:"1"}} onClick={() => setEdit(false)} id="backDrop">hello</div>}
        <div className="products" style={{flexFlow:"column",alignItems:"center"}}>
            <form style={{padding:"20px",alignItems:"flex-start"}}  encType="multipart/form-data">
                <input placeholder="نام ویژگی" type='text' onChange={(e) => setTitle(e.target.value)} />
                <input placeholder="نوع" type='text' onChange={(e) => setType(e.target.value)} />
                <input placeholder=" قیمت به تومان" type='text' onChange={(e) => setPrice(e.target.value)} />
                <select onChange={(e) => setCategoryFirst(e.target.value)}>
                    <option value="">دسته بندی اول</option>
                    <option value="shop">فروشگاهی</option>
                    <option value="company"> شرکتی</option>
                    <option value="base">پایه</option>
                </select>
                <select onChange={(e) => setCategorySecond(e.target.value)}>
                    <option>دسته بندی دوم</option>
                    <option value="shop">فروشگاهی</option>
                    <option value="company"> شرکتی</option>
                    <option value="base">پایه</option>
                </select>
                <select onChange={(e) => setCategoryThird(e.target.value)}>
                    <option>دسته بندی سوم</option>
                    <option value="shop">فروشگاهی</option>
                    <option value="company"> شرکتی</option>
                    <option value="base">پایه</option>
                </select>
                <select onChange={(e) => setCategoryThird(e.target.value)}>
                    <option value={false}> الزام انتخاب</option>
                    <option value={false}>false</option>
                    <option value={true}>true</option>
                </select>
                <textarea style={{width:"40%",height:"200px"}} placeholder="معرفی" type='text' onChange={(e) => setDes(e.target.value)} />

                <button onClick={addForm}>افزودن</button>

            <button disabled={loading} onClick={postHandler}>
                    {loading && <div style={{height:"30px" ,width:"30px",top:"25%"}} className='loading-spinner'></div>}
                    ارسال
                </button>
            </form>
            {edit &&
            <div className="secc-comment" style={{background:"none" ,height:"100%",zIndex:"151"}}>
             <form style={{padding:"20px",alignItems:"flex-start",position:"relative"}}  encType="multipart/form-data">
             <img 
             style={{cursor:"pointer",width:"20px",animation:"none",height:"20px" ,position:"absolute",left:"10px",top:"10px"}} 
             src="/images/cancel (1).png" 
             onClick={() => setEdit(false)}
             alt="" /> 
              <input  placeholder="نام ویژگی" value ={newtitle} onChange={(e) => setNewTitle(e.target.value)} /> 
              <input placeholder="نوع" value ={newdes} onChange={(e) => setnewDes(e.target.value)} /> 
              <input placeholder="نوع" value ={newtype} onChange={(e) => setNewType(e.target.value)} />
              <input placeholder="قیمت" value ={newprice} onChange={(e) => setNewPrice(e.target.value)} /> 
              <select onChange={(e) => setCategoryFirst(e.target.value)}>
                    <option >{categoryFirst || "دسته بندی اول"}</option>
                    <option value="shop">فروشگاهی</option>
                    <option value="company"> شرکتی</option>
                    <option value="base">پایه</option>
                </select>
                <select defaultValue={categorySecond} onChange={(e) => setCategorySecond(e.target.value)}>
                    <option>{categorySecond || "دسته بندی دوم"}</option>
                    <option value="shop">فروشگاهی</option>
                    <option value="company"> شرکتی</option>
                    <option value="base">پایه</option>
                </select>
                <select defaultValue={categoryThird} onChange={(e) => setCategoryThird(e.target.value)}>
                    <option>{categoryThird || "دسته بندی سوم"}</option>
                    <option value="shop">فروشگاهی</option>
                    <option value="company"> شرکتی</option>
                    <option value="base">پایه</option>
                </select>
                <select onChange={(e) => setRequired(e.target.value)}>
                    <option value={required}>الزام انتخاب</option>
                    <option value={false}>false</option>
                    <option value={true}> true</option>
                </select>
                <textarea style={{height:"200px"}} placeholder="معرفی" type='text' value={newdes} onChange={(e) => setnewDes(e.target.value)}  />
                <button onClick={update} >آپدیت</button>
            </form>
            </div>}

            <div className="order-ex">
                <form style={{alignItems:"center",height:"100%",paddingBottom:"15px"}}>
                <table>
                      <thead >
                          <th style={{width:"10%"}}>
                              <a href="#">انتخاب</a>
                          </th>
                          <th style={{width:"20%"}}>
                              <a href="#">نام ویژگی</a>
                          </th>
                          <th style={{width:"45%"}}>
                              <a href="#">معرفی</a>
                          </th>
                          <th style={{width:"10%"}}>
                              <a href="#">نوع</a>
                          </th>
                          <th style={{width:"15%"}}>
                              <a href="#">قیمت (ریال)</a>
                          </th>
                      </thead>

                     <tbody >
                     {newform && newform.map((res ,idx) => {
                             return <> 
                             <tr  onClick={() => {
                                 setEdit({...res ,id:idx})
                                 setNewPrice(res.price)
                                 setNewTitle(res.title)
                                 setNewType(res.type)
                                 setnewDes(res.des);
                                 setCategoryThird(res.categoryThird);
                                 setCategorySecond(res.categorySecond);
                                 setCategoryFirst(res.categoryFirst);
                                 setRequired(res.required)
                                 }} className="tr-news">

                             <td>
                                 <input type="checkbox" checked={() => order.find(res => res.name === order.name )} />
                             </td>
                             <td>
                             <a>{res.title}</a> 
                             </td>
                             <td >
                              <a>{res.des}</a> 
                             </td>
                             <td >
                              <a>{res.type}</a> 
                             </td>
                             <td >
                              <a>{res.price}</a> 
                             </td>
                         </tr>
                        </>
                         })}
                      </tbody> 
                      <tfoot></tfoot>
                     </table>


                </form>
            </div>

            
        </div>
        </>

    )
}

export default Exclusive