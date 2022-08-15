import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import EmpleadosService from '../services/empleados.service';
import Swal from 'sweetalert2'

export const FormNuevoEmpleado = ({funcSuccessReg,dataEmpleadoModal,tipoRegMod}) => {
    const [dataForm, setDataForm] = useState(dataEmpleadoModal);
    const [errors, setErrors] = useState('');
    const submitEmpleado = (e) => {
        e.preventDefault();
        setErrors('');
        if(dataForm.nombres.length<5 || dataForm.nombres.length>100){
            setErrors('Los nombres del empleado deben contener entre 5 y 100 caracteres.');
            return false;
        }
        if(dataForm.apellidos.length<5 || dataForm.apellidos.length>100){
            setErrors('Los apellidos del empleado deben contener entre 5 y 100 caracteres.');
            return false;
        }
        if(isNaN(dataForm.edad)){
            setErrors('La edad debe de ser un valor numérico.');
            return false;
        }
        if(dataForm.edad<18){
            setErrors('La edad del empleado debe de ser mayor o igual a 18.');
            return false;
        }
        if(dataForm.cargo.length<5 || dataForm.cargo.length>100){
            setErrors('El cargo del empleado debe de contener entre 5 y 100 caracteres.');
            return false;
        }
        if(isNaN(dataForm.cedula)){
            setErrors('La cédula debe de ser un campo de sólo números.');
            return false;
        }
        if(dataForm.cedula.length<7 || dataForm.cedula.length>12){
            setErrors('La cedula debe de contener entre 7 y 12 valores numéricos.');
            return false;
        }
        if(isNaN(dataForm.telefono)){
            setErrors('El teléfono debe de ser un campo de sólo números.');
            return false;
        }
        if(dataForm.telefono.length<7 || dataForm.telefono.length>10){
            setErrors('El teléfono del empleado debe de contener entre 7 y 10 caracteres numéricos.');
            return false;
        }
        if(tipoRegMod===1){//registro
            EmpleadosService.regEmpleado(dataForm)
            .then(({data})=>{
                if(data.trans){
                    Swal.fire({
                        title: '¡Registro exitoso!',
                        text: 'El registro del empleado se ha realizado exitosamente',
                        confirmButtonColor: '#0d6efd'
                    })
                    setDataForm({nombres: '', apellidos: '', edad: '', cargo: '', cedula: '', telefono: ''});
                    funcSuccessReg();
                }else{
                    Swal.fire({
                        title: '¡ERROR!',
                        text: data.msg ? data.msg : 'Se ha presentado un error inesperado al intentar registrar el empleado.',
                        confirmButtonColor: '#dc3545'
                    })
                }
            });
        }else if(tipoRegMod===2){//modificacion
            EmpleadosService.updateEmpleado({...dataForm, empleado_id: dataEmpleadoModal.empleado_id})
            .then(({data})=>{
                if(data.trans){
                    Swal.fire({
                        title: '¡Modificación exitosa!',
                        text: 'La modificación del empleado se ha realizado exitosamente.',
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
        <Form onSubmit={submitEmpleado}>
            {errors && <div className='col-12 errorlabel'>{errors}</div>}
            <div className='row'>
                <div className='col-lg-6'>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombres</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={dataForm.nombres} 
                            onChange={({target})=>setDataForm({...dataForm, nombres: target.value})} 
                            placeholder="Ingrese los nombres del empleado" 
                            maxLength={100}
                        />
                        {/* <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text> */}
                    </Form.Group>
                </div>
                <div className='col-lg-6'>
                    <Form.Group className="mb-3">
                        <Form.Label>Apellidos</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={dataForm.apellidos} 
                            onChange={({target})=>setDataForm({...dataForm, apellidos: target.value})} 
                            placeholder="Ingrese los apellidos del empleado" 
                            maxLength={100} 
                        />
                    </Form.Group>
                </div>
            </div>
            <div className='row'>
                <div className='col-lg-6'>
                    <Form.Group className="mb-3">
                        <Form.Label>Edad</Form.Label>
                        <Form.Control 
                            type="tel"
                            value={dataForm.edad} 
                            onChange={({target})=>setDataForm({...dataForm, edad: target.value})} 
                            placeholder="Ingrese la edad actual del empleado."
                            maxLength={2}
                        />
                        {/* <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text> */}
                    </Form.Group>
                </div>
                <div className='col-lg-6'>
                    <Form.Group className="mb-3">
                        <Form.Label>Cargo</Form.Label>
                        <Form.Control
                            type="text"
                            value={dataForm.cargo} 
                            onChange={({target})=>setDataForm({...dataForm, cargo: target.value})} 
                            placeholder="Ingrese el cargo del empleado."
                            maxLength={100}
                        />
                    </Form.Group>
                </div>
            </div>
            <div className='row'>
                <div className='col-lg-6'>
                    <Form.Group className="mb-3">
                        <Form.Label>Número de cédula</Form.Label>
                        <Form.Control 
                            type="tel"
                            value={dataForm.cedula} 
                            onChange={({target})=>setDataForm({...dataForm, cedula: target.value})} 
                            placeholder="Ingrese el número de cédula del empleado."
                            maxLength={11}
                        />
                        {/* <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text> */}
                    </Form.Group>
                </div>
                <div className='col-lg-6'>
                    <Form.Group className="mb-3">
                        <Form.Label>Número de teléfono</Form.Label>
                        <Form.Control
                            type="tel"
                            value={dataForm.telefono} 
                            onChange={({target})=>setDataForm({...dataForm, telefono: target.value})} 
                            placeholder="Ingrese el número de teléfono del empleado."
                            maxLength={10}
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