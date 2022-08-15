import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'
import IngresoEgresoService from '../services/ingresoegreso.service';

export const FormNuevoIngresoEgreso = ({funcSuccessReg,dataIngEgModal,tipoRegMod}) => {
    const [dataForm, setDataForm] = useState(dataIngEgModal);
    const [errors, setErrors] = useState('');

    const submitIngresoEgreso = (e) => {
        e.preventDefault();
        setErrors('');
        if(isNaN(dataForm.cedula)){
            setErrors('La cédula debe de ser un campo de sólo números.');
            return false;
        }
        if(dataForm.cedula.length<7 || dataForm.cedula.length>12){
            setErrors('La cedula debe de contener entre 7 y 12 valores numéricos.');
            return false;
        }
        if(dataForm.fecha_ingreso===''){
            setErrors('Debe de seleccionar una fecha de ingreso.');
            return false;
        }
        if(dataForm.hora_ingreso===''){
            setErrors('Debe de seleccionar una hora de ingreso.');
            return false;
        }
        if(tipoRegMod===2){
            if(dataForm.fecha_egreso===''){
                setErrors('Debe de seleccionar una fecha de egreso.');
                return false;
            }
            if(dataForm.hora_egreso===''){
                setErrors('Debe de seleccionar una hora de egreso.');
                return false;
            }
        }
        if(tipoRegMod===1){//registro
            IngresoEgresoService.regIngresoEgreso(dataForm)
            .then(({data})=>{
                if(data.trans){
                    Swal.fire({
                        title: '¡Registro exitoso!',
                        text: 'El registro fue realizado exitosamente',
                        confirmButtonColor: '#0d6efd'
                    })
                    setDataForm({cedula:'',fecha_ingreso:'',hora_ingreso:'',fecha_egreso:'',hora_egreso:''});
                    funcSuccessReg();
                }else{
                    Swal.fire({
                        title: '¡ERROR!',
                        text: data.msg ? data.msg : 'Se ha presentado un error inesperado al intentar registrar el ingreso/egreso.',
                        confirmButtonColor: '#dc3545'
                    })
                }
            });
        }else if(tipoRegMod===2){//modificacion
            IngresoEgresoService.updateIngresoEgreso({...dataForm, ingreso_egreso_id: dataIngEgModal.ingreso_egreso_id})
            .then(({data})=>{
                if(data.trans){
                    Swal.fire({
                        title: '¡Modificación exitosa!',
                        text: 'La modificación el ingreso/egreso se ha realizado exitosamente.',
                        confirmButtonColor: '#0d6efd'
                    })
                    setDataForm({nombres: '', apellidos: '', edad: '', cargo: '', cedula: '', telefono: ''});
                    funcSuccessReg();
                }else{
                    Swal.fire({
                        title: '¡ERROR!',
                        text: data.msg ? data.msg : 'Se ha presentado un error inesperado al intentar modificar el empleado.',
                        confirmButtonColor: '#dc3545'
                    })
                }
            });
        }
    }

    return (
        <Form onSubmit={submitIngresoEgreso}>
            {errors && <div className='col-12 errorlabel'>{errors}</div>}
            <div className='row'>
                <div className='col-lg-12'>
                    <Form.Group className="mb-3">
                        <Form.Label>Número de cédula</Form.Label>
                        <Form.Control 
                            type="tel"
                            value={dataForm.cedula} 
                            onChange={({target})=>setDataForm({...dataForm, cedula: target.value})} 
                            placeholder="Ingrese el número de cédula del empleado."
                            maxLength={11}
                            readOnly={tipoRegMod===2 ? true : false}
                        />
                        {/* <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text> */}
                    </Form.Group>
                </div>
            </div>
            <div className='row'>
                <div className='col-lg-6'>
                    <Form.Group className="mb-3">
                        <Form.Label>Fecha ingreso</Form.Label>
                        <Form.Control
                            type="date"
                            value={dataForm.fecha_ingreso} 
                            onChange={({target})=>setDataForm({...dataForm, fecha_ingreso: target.value})} 
                            placeholder="Seleccione la fecha de ingreso."
                        />
                    </Form.Group>
                </div>
                <div className='col-lg-6'>
                    <Form.Group className="mb-3">
                        <Form.Label>Hora ingreso</Form.Label>
                        <Form.Control
                            type="time"
                            value={dataForm.hora_ingreso} 
                            onChange={({target})=>setDataForm({...dataForm, hora_ingreso: target.value})} 
                            placeholder="Seleccione la hora de egreso."
                        />
                    </Form.Group>
                </div>
            </div>
            <div className='row'>
                <div className='col-lg-6'>
                    <Form.Group className="mb-3">
                        <Form.Label>Fecha egreso</Form.Label>
                        <Form.Control
                            type="date"
                            value={dataForm.fecha_egreso} 
                            onChange={({target})=>setDataForm({...dataForm, fecha_egreso: target.value})} 
                            placeholder="Seleccione la fecha de egreso."
                        />
                    </Form.Group>
                </div>
                <div className='col-lg-6'>
                    <Form.Group className="mb-3">
                        <Form.Label>Hora egreso</Form.Label>
                        <Form.Control
                            type="time"
                            value={dataForm.hora_egreso} 
                            onChange={({target})=>setDataForm({...dataForm, hora_egreso: target.value})} 
                            placeholder="Seleccione la fecha de egreso."
                        />
                    </Form.Group>
                </div>
            </div>
            <div className='row'>
                <div className='center'>
                    <Button variant="primary" type="submit">
                        {tipoRegMod===1 ? 'Registrar' : 'Modificar'}
                    </Button>
                </div>
            </div>
        </Form>
    )
}