import React, { useEffect, useState } from 'react'
import EmpleadosService from '../services/empleados.service'
import { Table,Button } from "react-bootstrap";
import * as FaIcons from 'react-icons/fa';
import { LargeModal } from '../components/LargeModal';
import { FormNuevoEmpleado } from '../components/FormNuevoEmpleado';
import { FormConsultaEmpleados } from '../components/FormConsultaEmpleados';
import Login from './Login';
import LoginService from '../services/login.service';

export const Empleados = () => {
    const defaultDataEmpleado = {nombres: '', apellidos: '', edad: '', cargo: '', cedula: '', telefono: ''};
    const {login_token} = LoginService.getCurrentUser();
    const [empleados, setEmpleados] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [dataEmpleadoModal, setDataEmpleadoModal] = useState(defaultDataEmpleado)
    const [tipoRegMod, setTipoRegMod] = useState(1)//1 para registro de empleado 2 para nuevo empleado

    const getEmpleados = (cargo='', edad_min='',edad_max='') => {
        EmpleadosService.getEmpleados(edad_min,edad_max,cargo)
        .then((res)=>{
            setEmpleados(res);
        });
    }

    const modalRegEmpleado = () => {
        setTipoRegMod(1);
        setDataEmpleadoModal(defaultDataEmpleado);
        setShowModal(true);
    }

    const modalModEmpleado = (infoEmpleado) => {
        setTipoRegMod(2);
        setDataEmpleadoModal(infoEmpleado);
        setShowModal(true);
    }

    useEffect(() => {
        getEmpleados();
    }, [])
    
    return (
        (login_token) ? (
            <div className='m-b-10'>
                <div className='col-12 right'>
                    <Button variant="outline-primary" onClick={()=>modalRegEmpleado()}>
                        <FaIcons.FaPlusCircle/>
                        <b className='m-l-5'>Nuevo empleado</b>
                    </Button>
                </div>
                <div className="m-b-20 m-t-20">
                    <FormConsultaEmpleados submitForm={getEmpleados}/>
                </div>
                <h3>Listado de empleados</h3>
                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Edad</th>
                        <th>Cargo</th>
                        <th>Cédula</th>
                        <th>Número de teléfono</th>
                        <th>Opciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        empleados.length>0 ?
                        empleados.map(({empleado_id,nombres,apellidos,edad,cargo,cedula,no_celular},index)=>{
                            return (
                            <tr key={empleado_id}>
                                <td>{ nombres }</td>
                                <td>{ apellidos }</td>
                                <td>{ edad } años</td>
                                <td>{ cargo }</td>
                                <td>{ cedula }</td>
                                <td>{ no_celular }</td>
                                <td>
                                    <Button 
                                        variant="outline-success" 
                                        onClick={()=>modalModEmpleado({nombres,apellidos,edad,cargo,cedula,empleado_id,telefono:no_celular})}
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
                    title={tipoRegMod===1 ? 'Registrar nuevo empleado' : 'Modificar empleado'}
                    body={<FormNuevoEmpleado dataEmpleadoModal={dataEmpleadoModal} tipoRegMod={tipoRegMod} funcSuccessReg={()=>getEmpleados()}/>}
                    footer={<Button variant='danger' onClick={() => setShowModal(false)}>Cerrar</Button>}
                />
            </div>
        )
        :
        <Login/>
    )
}
