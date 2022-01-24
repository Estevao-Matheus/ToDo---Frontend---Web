import React, {useState,useEffect} from "react";
import * as S from './styles';
import {Link} from 'react-router-dom';


import logo from '../../Assets/logo.png'
import bell from '../../Assets/bell.png'

import api from '../../services/api';
import isConnected from '../../utils/isConnected';



function Header({clickNotification}) {



   const [lateCount,setLateCount] = useState();
   async function lateVerify(){
      await api.get(`/task/filter/late/00:1B:44:11:3A:B7`)
      .then(response=>{
        setLateCount(response.data.length)
      
      })
     
    }
    useEffect(()=>{

      lateVerify();
    })

    async function Logout(){
       localStorage.removeItem('@todo/macaddress');
       window.location.reload();
    }
  return (
     <S.Container>
         <S.LeftSide>
            <img src ={logo} alt="Logo"/>
>         </S.LeftSide>
         <S.RightSide>
            <Link to ="/">INICIO</Link>
            <span className = "dividir"/>
           <Link to="/Task">NOVA TAREFA</Link>
            <span className = "dividir"/>
            { !isConnected ?
            <Link to="/qrcode">SINCRONIZAR CELULAR</Link>
            :
            <button type="button" onClick={Logout}>SAIR</button>
            }
            {
               lateCount&&
               <>
               <span className = "dividir"/>
               <button onClick={clickNotification} id="notification">
               <img src ={bell} alt="Notificação"/>
               <span>{lateCount}</span>
               </button>
               </>
            }
         </S.RightSide>
     </S.Container>
  );
}

export default Header;
