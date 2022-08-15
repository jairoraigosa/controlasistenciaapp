import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import Swal from 'sweetalert2';
import IngresoEgresoService from '../services/ingresoegreso.service';


export const FormRegIngEgEmpl = () => {
    const initFormRegIngEg = {cedula:''};
    const [errors, setErrors] = useState('');
    const [dataForm, setDataForm] = useState(initFormRegIngEg);
    const [optIngEg, setOptIngEg] = useState(<></>)
    const registrarIngreso = (cedula) => {
        IngresoEgresoService.regIngresoEmpleado(cedula)
        .then((res)=>{
            if(res.trans){
                Swal.fire({
                    title: '¡Registro exitoso!',
                    text: 'El ingreso se ha registrado exitosamente.',
                    confirmButtonColor: '#0d6efd'
                })
                setOptIngEg(<></>);
            }else{
                Swal.fire({
                    title: '¡ERROR!',
                    text: res.msg ? res.msg : 'Error intentando registrar el ingreso.',
                    confirmButtonColor: '#dc3545'
                })
            }
        })
    }
    const registrarEgreso = (ingreso_egreso_id) => {
        IngresoEgresoService.regEgresoEmpleado(ingreso_egreso_id)
        .then((res)=>{
            if(res.trans){
                Swal.fire({
                    title: '¡Registro exitoso!',
                    text: 'El egreso se ha registrado exitosamente.',
                    confirmButtonColor: '#0d6efd'
                })
                setOptIngEg(<></>);
            }else{
                Swal.fire({
                    title: '¡ERROR!',
                    text: res.msg ? res.msg : 'Error intentando registrar el egreso.',
                    confirmButtonColor: '#dc3545'
                })
            }
        })
    }
    const submitNuevoIngEg = (e) => {
        e.preventDefault();
        setErrors('');
        setOptIngEg(<></>);
        if(isNaN(dataForm.cedula)){
            setErrors('La cédula debe de contener sólo caracteres numéricos.');
            return false;
        }
        if(dataForm.cedula.length<7 || dataForm.cedula.length>20){
            setErrors('La cédula debe de contener entre 7 y 20 caracteres.');
            return false;
        }
        IngresoEgresoService.getIngresoEgresoEmpl(dataForm.cedula)
        .then((res)=>{
            if(res.trans){
                if(res.data.length>0) {
                    setOptIngEg(<div className='col-12 center m-t-20'><Button onClick={()=>registrarEgreso(res.data[0].ingreso_egreso_id)} className='right' variant="danger">Registrar egreso</Button></div>);
                }else{
                    setOptIngEg(<div className='col-12 center m-t-20'><Button onClick={()=>registrarIngreso(dataForm.cedula)}  variant="primary">Registrar ingreso</Button></div>);
                }
            }else{
                Swal.fire({
                    title: '¡ERROR!',
                    text: res.msg ? res.msg : 'Error intentando capturar el empleado.',
                    confirmButtonColor: '#dc3545'
                })
            }
        });
    }
    return (
        <div>
            <Form onSubmit={submitNuevoIngEg}>
                {errors && <div className='col-12 errorlabel'>{errors}</div>}
                <div className='row'>
                    <Form.Group className="mb-3">
                        <Form.Label>Cédula</Form.Label>
                        <Form.Control 
                            type="tel" 
                            value={dataForm.cedula} 
                            onChange={({target})=>setDataForm({...dataForm, cedula: target.value})} 
                            placeholder="Ingrese su número de cédula" 
                            maxLength={11}
                        />
                    </Form.Group>
                </div>
                <div className='row'>
                    <div className='col-lg-12 center'>
                    <Button variant="primary" type="submit">Buscar</Button>
                    </div>
                </div>
            </Form>
            {optIngEg}
        </div>
    )
}
