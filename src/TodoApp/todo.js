import React,{  useEffect, useState } from 'react';
import './css.css';
export default function Todo(){
    const [form, setState] = useState({
        id: '',
        data: ''
      });
      
    const [active,setActive] = useState({
        color: '',
        display_update: 'none',
        display_add:''
    });

    const [listshow,setListshow] = useState([{}]);

    const send_Data = e =>{
        setState(
            {   
                ...form,
                [e.target.name]: e.target.value
            });
        };

    const Get_Data = () => {
        form.id = Math.floor(Math.random() * 1001);
        if(localStorage.getItem('list')==null){
            const listshow = [];
            listshow.push(form);
            localStorage.setItem('list',JSON.stringify(listshow));
         }else{
            const listshow = JSON.parse(localStorage.getItem('list'));
            listshow.push(form);
            localStorage.setItem('list',JSON.stringify(listshow));
         }
        setListshow(JSON.parse(localStorage.getItem('list')));
        console.log(form.id,form.data);
    };

    function Data_remove(id){
        const list_remove = JSON.parse(localStorage.getItem('list'));
        const filtered = list_remove.filter(data => data.id !== id);
        localStorage.setItem("list", JSON.stringify(filtered));    
        setListshow(JSON.parse(localStorage.getItem('list')));
    }

    function Edit_Data(id){
        setActive({
            ...active,
            display_update : '',
            display_add : 'none'
        });
        var getdata = JSON.parse(localStorage.getItem('list'));
        const data_get = getdata.filter(ss => ss.id ===id);
        
        setState({
            ...form,
            id : id,
            data: data_get[0].data
        })
    };

    const Update_data = () =>{
        var person  = JSON.parse(localStorage.getItem('list'));
        for(var i=0; i<person.length;i++){
            if(form.id===person[i].id){
                person[i].data = form.data;
                break; 
            }
        }
        localStorage.setItem('list',JSON.stringify(person));
        setListshow(JSON.parse(localStorage.getItem('list')))
        setActive({
            ...active,
            display_update:'none',
            display_add:''
        })
    }
    useEffect(()=>{
        if(localStorage.getItem('list')){
           setListshow(JSON.parse(localStorage.getItem('list')))
        }
    },[listshow.id,listshow.data])

    return(     
        <div>
            <div className="framework">
                <img alt="" src="https://lh3.googleusercontent.com/-K-AR6CydUX_dtZ-Atx-NvOxrCi9fRHPIQUCTzsXftR_pI6bjKOdXqPh2BkTNgXaAVE"></img>
                <div className="input-group data">
                    <label>Hoàn Thành Công Việc Mỗi Ngày!! &#128079;&#128518;</label>
                    <input type="text" onChange={send_Data} className="form-control btn-input " value={form.data}  name="data" placeholder="&#9997;Nhập công việc" />
                    <div className="input-group-append">
                        <button
                        onClick={Get_Data}
                        style={{display:active.display_add}}
                        className="btn btn-outline-secondary btn_submit" type="submit">Add</button>
                    </div>
                    <div className="input-group-append">
                        <button
                        onClick={Update_data}
                        style={{display:active.display_update}}
                        className="btn btn-outline-secondary btn_update"  type="submit">UPDATE</button>
                    </div>
                </div>
                <p></p>
                {localStorage.getItem('list') !==null &&
                <div>
                    {listshow.map((listshowss,index)=>(  
                        <div className="Contentdata" key={index}>                
                            <p onClick={()=>Edit_Data(listshowss.id)} className="Content" >
                            {listshowss.data}</p>
                            <div className="remove_icon">
                            <i onClick={()=>Data_remove(listshowss.id)}  className="fa fa-remove remove"></i><span></span>
                            </div>
                        </div>
                    ))}          
                </div>}
            </div>
        </div>
    );

}
