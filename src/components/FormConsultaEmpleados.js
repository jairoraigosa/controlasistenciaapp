import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export const FormConsultaEmpleados = ({submitForm}) => {
    const initialGetEmpleados = {cargo:'',edad_min:'', edad_max:''};
    const [dataForm, setDataForm] = useState(initialGetEmpleados)
    const [error, setErrors] = useState('')
    const frmSubmitEmpleado = (e) => {
        e.preventDefault();
        if(isNaN(dataForm.edad_min)){
            setErrors('La edad mínima debe de ser un dato numérico.');
            return false;
        }
        if(isNaN(dataForm.edad_max)){
            setErrors('La edad máxima debe de ser un dato numérico.');
            return false;
        }
        submitForm(dataForm.cargo,dataForm.edad_min,dataForm.edad_max);
    }
  return (
    <div>
        <h3>Formulario para filtrar los empleados</h3>
        {error && <div className='errorlabel'>{error}</div>}
        <Form onSubmit={frmSubmitEmpleado}>
            <div className='row'>
                <div className='col-lg-4'>
                    <Form.Group className="mb-3">
                        <Form.Label>Cargo</Form.Label>
                        <Form.Control 
                            type="text"
                            value={dataForm.cargo} 
                            onChange={({target})=>setDataForm({...dataForm, cargo: target.value})} 
                            placeholder="Ingrese el cargo del empleado."
                            maxLength={100}
                        />
                        {/* <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text> */}
                    </Form.Group>
                </div>
                <div className='col-lg-4'>
                    <Form.Group className="mb-3">
                        <Form.Label>Edad mínima</Form.Label>
                        <Form.Control
                            type="tel"
                            value={dataForm.edad_min} 
                            onChange={({target})=>setDataForm({...dataForm, edad_min: target.value})} 
                            placeholder="Ingrese la edad mínima a consultar."
                            maxLength={2}
                        />
                    </Form.Group>
                </div>
                <div className='col-lg-4'>
                    <Form.Group className="mb-3">
                        <Form.Label>Edad máxima</Form.Label>
                        <Form.Control
                            type="tel"
                            value={dataForm.edad_max} 
                            onChange={({target})=>setDataForm({...dataForm, edad_max: target.value})} 
                            placeholder="Ingrese la edad máxima a consultar."
                            maxLength={2}
                        />
                    </Form.Group>
                </div>
            </div>
            <div className='row'>
                <div className='center'>
                    <Button variant="primary" type="submit">
                        Consultar
                    </Button>
                    <Button className='m-l-5' variant="success" type="submit" onClick={()=>setDataForm(initialGetEmpleados)}>
                        Limpiar campos
                    </Button>
                </div>
            </div>
        </Form>
    </div>
  )
}
