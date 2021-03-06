
import React, {useState,useEffect} from "react";
import api from '../../services/api';
import { Redirect } from "react-router-dom";
import * as S from './styles'
import { format } from "date-fns";
import isConnected from "../../utils/isConnected";


//NOSSOS COMPONENTES
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import typeIcons from "../../utils/typeIcons";



function Task({match}) {
  
  const [redirect,setRedirect]= useState(false);
  const [lateCount,setLateCount] = useState(); 
  const [type,setType] = useState();
  const [id,setId] = useState();
  const [done,setDone] = useState(false);
  const [title,setTitle] = useState();
  const [description,setDescription] = useState();
  const [date,setDate] = useState();
  const [hour,setHour] = useState();
  //const [macaddress,setmacaddress] = useState('00:1B:44:11:3A:B7');

  
  
  
  async function LoadTaskDetails(){
    await api.get(`/task/${match.params.id}`)
    .then(response =>{
        setType(response.data.type)
        setDone(response.data.done)
        setTitle(response.data.title)
        setDescription(response.data.description)
        setDate(format(new Date(response.data.when), 'yyyy-MM-dd'))
        setHour(format(new Date(response.data.when), 'HH:mm'))



    })

  }

  async function Save(){
    //Validação dos campos 
    if(!title)
      return alert("Informe o campo Título")
    else if(!description)
      return alert("Informe o campo Descrição")
    else if(!type)
      return alert("Informe o tipo")   
    else if(!date)
      return alert("Informe a Data")
    else if(!hour)
      return alert("Informe as horas")  

    if(match.params.id){
      await api.put(`/task/${match.params.id}`,{
        macaddress: isConnected,
        done,
        type,
        title,
        description,
        when: `${date}T${hour}:00.000`
  
      }).then(()=>
        
        setRedirect(true)
      )
    }else
      {

        await api.post('/task',{
        macaddress: isConnected,
        type,
        title,
        description,
        when: `${date}T${hour}:00.000`

      }).then(()=>
      
      setRedirect(true)
    )
    }

  }

  async function Remove(){
    const res = window.confirm('Deseja realmente remoer a tarefa?')
    if(res == true){
      await api.delete(`/task/${match.params.id}`)
      .then(()=> setRedirect(true));
      
    }


  }
  
  
  useEffect(()=>{
    if(!isConnected)
    {
      setRedirect(true);
    }
    
    LoadTaskDetails();
  },[])



  return (
        <S.Container>
          {redirect && <Redirect to ='/'/>}
          <Header  clickNotification={Notification}/>
           <S.Form>
               <S.typeIcons>
                    {
                        typeIcons.map((icon,index)=>(
                          index >0 && 
                          <button type="button" onClick={()=>setType(index) }>
                            <img src={icon} alt="Tipo de tarefa"
                            className={type && type != index && 'inative'} />
                          </button>
                        ))
                    }
               </S.typeIcons>
               <S.input>
                 <span>Titulo</span>
                 <input type="text" placeholder="Título da Tarefa"
                 onChange={e=>setTitle(e.target.value)} value={title}/>
               </S.input>
               <S.TextArea>
                 <span>Titulo</span>
                 <textarea rows={5} placeholder="Detalhes da tarefa"
                 onChange={e=>setDescription(e.target.value)} value={description}/>
               </S.TextArea>
               <S.input>
                 <span>Data</span>
                 <input type="date" placeholder="Título da Tarefa" className="date"
                 onChange={e=>setDate(e.target.value)} value={date}></input>
               </S.input>
               <S.input>
                 <span>Hora</span>
                 <input type="time" placeholder="Título da Tarefa" className="time"
                 onChange={e=>setHour(e.target.value)} value={hour}></input>
               </S.input>
               <S.Options>
                 <div>
                   <input type="checkbox" checked={done} onChange={()=> setDone(!done)}/>
                   <span>Concluido</span>
                 </div>
                 {match.params.id&&<button type="button" onClick={Remove}>EXCLUIR</button>}
               </S.Options>
               <S.Save>
                  <button type="button" onClick={Save}>SALVAR</button>
               </S.Save>
           </S.Form>
          <Footer/>
        </S.Container>
  );
}
export default Task;
