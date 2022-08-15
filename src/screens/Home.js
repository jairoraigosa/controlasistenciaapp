import React, { useEffect, useState } from "react";
import LoginService from "../services/login.service";
import Login from "./Login";
import IngresoEgresoService from "../services/ingresoegreso.service";
import { Button, Table } from "react-bootstrap";
import * as FaIcons from 'react-icons/fa';
import { LargeModal } from "../components/LargeModal";
import { FormNuevoIngresoEgreso } from "../components/FormNuevoIngresoEgreso";
import { FormConsultaIngEg } from "../components/FormConsultaIngEg";

const Home = () => {
  const initialIngEg = {cedula:'',fecha_ingreso:'',hora_ingreso:'',fecha_egreso:'',hora_egreso:''};
  const {login_token} = LoginService.getCurrentUser();
  const [ingresosEgresos, setIngresosEgresos] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [tipoRegMod, setTipoRegMod] = useState(1)
  const [dataIngEgModal, setDataIngEgModal] = useState(initialIngEg)

  useEffect(() => {
    getIngresosEgresos();
  }, [])

  const getIngresosEgresos = (empleado_id='',fecha_inicio='',fecha_fin='') => {
    IngresoEgresoService.getIngresosEgresos(empleado_id,fecha_inicio,fecha_fin)
    .then((res)=>{
      setIngresosEgresos(res);
    });
  }

  const modalRegIngresoEgreso = () => {
    setDataIngEgModal(initialIngEg);
    setTipoRegMod(1);
    setShowModal(true);
  }

  const modalModIngresoEgreso = (dataIngEg) => {
    const fec_hor_ing = dataIngEg.fecha_ingreso.split(' ');
    let fec_hor_eg = ['',''];
    if(dataIngEg.fecha_egreso){
      fec_hor_eg = dataIngEg.fecha_egreso.split(' ');
    }
    const newDataIngEg = {
      ...dataIngEg,
      fecha_ingreso: fec_hor_ing[0],
      hora_ingreso: fec_hor_ing[1],
      fecha_egreso: fec_hor_eg[0],
      hora_egreso: fec_hor_eg[1]
    };
    setDataIngEgModal(newDataIngEg);
    setTipoRegMod(2);
    setShowModal(true);
  }
  return (
      (login_token) ? (
        <div className="col-12">
          <div className='col-12 right'>
              <Button variant="outline-primary" onClick={()=>modalRegIngresoEgreso()}>
                  <FaIcons.FaPlusCircle/>
                  <b className='m-l-5'>Nuevo ingreso/egreso</b>
              </Button>
          </div>
          <div className="m-b-20 m-t-20">
            <FormConsultaIngEg submitForm={getIngresosEgresos}/>
          </div>
          <h3>Listado de ingresos y egresos de los empleados</h3>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Edad</th>
                <th>Cargo</th>
                <th>Fecha ingreso</th>
                <th>Fecha egreso</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {
                ingresosEgresos.length>0 ?
                  ingresosEgresos.map(({ingreso_egreso_id,nombres,apellidos,edad,cargo,cedula,fecha_ingreso,fec_ing,fecha_egreso,fec_eg},index)=>{
                    return (
                      <tr key={'tr'+ingreso_egreso_id}>
                        <td>{ nombres }</td>
                        <td>{ apellidos }</td>
                        <td>{ edad } años</td>
                        <td>{ cargo }</td>
                        <td>{ fec_ing }</td>
                        <td>{ fecha_egreso ? fec_eg : '------' }</td>
                        <td>
                          <Button 
                            variant="outline-success" 
                            onClick={()=>modalModIngresoEgreso({cedula,fecha_ingreso,fecha_egreso,ingreso_egreso_id})}
                          >Modificar</Button>
                        </td>
                      </tr>
                    )
                  })
                :
                  <tr><td className='center' colSpan={7}>No se encontraron datos</td></tr>
              }
            </tbody>
          </Table>
          <LargeModal
            show={showModal}
            onHide={() => setShowModal(false)} 
            title='Nuevo ingreso/egreso de empleado' 
            body={<FormNuevoIngresoEgreso dataIngEgModal={dataIngEgModal} tipoRegMod={tipoRegMod} funcSuccessReg={()=>getIngresosEgresos()}/>}
            footer={<Button variant='danger' onClick={() => setShowModal(false)}>Cerrar</Button>}
          />
        </div>
      )
      :
      <Login/>
  );
};

export default Home;