import React, {useState,useEffect} from "react";
import api from '../../services/api';
import * as S from './styles'
import {Link,Redirect} from 'react-router-dom'; 
import Qr from 'qrcode.react';

//NOSSOS COMPONENTES
import Header from "../../components/Header";
import Footer from "../../components/Footer";




function QrCode() {

    const [mac,setMac]= useState();
    const [redirect,setRedirect]= useState(false);

async function SaveMac(){
    if(!mac)
    alert('Você precisa informar o numero que aparece no seu celular!')
    else{
        await localStorage.setItem('@todo/macaddress',mac)
        setRedirect(true);
        window.location.reload();
    }
}

return(
<S.Container>
    {redirect&& <Redirect to='/'/>}
    <Header/>
      
    <S.Content>
        <h1>CAPTURE O CODIGO PELO APP</h1>
        <p>Suas atividade serão sincronizadas com o celular</p>
       <S.QrcodeArea>
           <Qr value='getmacaddress' size={350}/> 
       </S.QrcodeArea>
       <S.ValudationCode>
           <span>Digite a numeração que apareceu no seu celular</span>
           <input type="text" onChange={e => setMac(e.target.value)} value={mac}></input>
           <button type="button" onClick={SaveMac}>SINCRONIZAR</button>
       </S.ValudationCode>
    </S.Content>



    <Footer/>
</S.Container>
)

}

export default QrCode;
