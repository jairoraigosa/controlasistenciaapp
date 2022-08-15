import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from "../assets/images/control-asistencia.png";
import { FormRegIngEgEmpl } from '../components/FormRegIngEgEmpl';
import { LargeModal } from '../components/LargeModal';
import LoginService from '../services/login.service';

export const Page = () => {
  const {login_token} = LoginService.getCurrentUser();

  const [modalRegIngEg, setModalRegIngEg] = useState(false)

  return (
    <div className="col-12 text-center" style={{marginBottom: 100}}>
      {!login_token &&
        <div style={{padding: 50}}>
          Si eres administrador, ingresa a la plataforma oprimiendo <Link to={"/login"}>AQUI</Link> o si eres empleado y deseas registrar un ingreso o egreso, oprima en la imagen de abajo.
        </div>
      }
      <img 
          onClick={()=>setModalRegIngEg(true)}
          src={logo}
          alt="Plataforma ENDE"
          className="profile-img-card"
          style={{width: '50%', cursor: 'pointer'}}
      />
      <LargeModal
        show={modalRegIngEg}
        onHide={() => setModalRegIngEg(false)} 
        title='Registrar ingreso o egreso' 
        body={<FormRegIngEgEmpl/>}
        footer={<Button variant='danger' onClick={() => setModalRegIngEg(false)}>Cerrar</Button>}
      />
    </div>
  )
}
