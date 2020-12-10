import React,{  useState } from 'react';
import './css.css';
export default function Todo(){

   const [listshow,setListshow] = useState([
      {
         id: '',
         value: ''
      }
   ]);
   const [list,setList] = useState(
      {
         id:'',
         value:''
      }
   ); 
   const getdata = (event) =>{
      event.preventDefault();
      setList({
         id:Math.floor(Math.random() * 101),
         value: event.target.value 
      })
   };
   const handleSubmit = (event)=>{
      if(localStorage.getItem('list')==null){
         const listshow = [];
         listshow.push(list);
         localStorage.setItem('list',JSON.stringify(listshow));
      }else{
         const listshow = JSON.parse(localStorage.getItem('list'));
         listshow.push(list);
         localStorage.setItem('list',JSON.stringify(listshow));
      }
      setListshow(JSON.parse(localStorage.getItem('list')));
      } 
   const remove = (event) =>{
      const index = event.target.getAttribute('data-key');
      const listValue=JSON.parse(localStorage.getItem('list'));
      listValue.splice(index,1);
      setListshow(listValue);
      localStorage.setItem('list',JSON.stringify(listValue));
   }
      return (
        <div>
            <div className="card text-center time ">
               <div className="card-header">
                  QUẢN LÝ CÔNG VIỆC
               </div>
               <div className="card-body">                 
                  <input type="text"  onChange={getdata}  className="form-control" name="" id="" aria-describedby="helpId" placeholder="Nhập công việc"/>           
                  <p></p>
                  <button type="submit" onClick={handleSubmit} className="btn btn-primary">Thêm công việc</button>
               </div> 
               <div className="card-footer text-muted text">
                  {listshow.map((listshowss,index)=>(                 
                     <p key={index}>
                       {listshowss.id}---{listshowss.value}
                        <button type="submit" data-key={index} onClick={remove} className="btn btn-danger remove">Sửa</button> 
                        <button type="submit" data-key={index} onClick={remove} className="btn btn-primary remove">Xóa</button> 
                     </p>
                  ))}
               </div>
               </div>
        </div>
        )
     }
