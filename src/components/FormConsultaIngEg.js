import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export const FormConsultaIngEg = ({submitForm}) => {
    const initialGetIngEg = {cedula:'',fecha_inicio:'', fecha_fin:''};
    const [dataForm, setDataForm] = useState(initialGetIngEg)
  return (
    <div>
        <h3>Formulario para filtrar los ingresos y los egresos de los empleados</h3>
        <Form onSubmit={(e)=>{e.preventDefault();submitForm(dataForm.cedula,dataForm.fecha_inicio,dataForm.fecha_fin);}}>
            <div className='row'>
                <div className='col-lg-4'>
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
                <div className='col-lg-4'>
                    <Form.Group className="mb-3">
                        <Form.Label>Fecha inicio</Form.Label>
                        <Form.Control
                            type="date"
                            value={dataForm.fecha_inicio} 
                            onChange={({target})=>setDataForm({...dataForm, fecha_inicio: target.value})} 
                            placeholder="Seleccione la fecha de inicio."
                        />
                    </Form.Group>
                </div>
                <div className='col-lg-4'>
                    <Form.Group className="mb-3">
                        <Form.Label>Fecha fin</Form.Label>
                        <Form.Control
                            type="date"
                            value={dataForm.fecha_fin} 
                            onChange={({target})=>setDataForm({...dataForm, fecha_fin: target.value})} 
                            placeholder="Seleccione la fecha de finalización."
                        />
                    </Form.Group>
                </div>
            </div>
            <div className='row'>
                <div className='center'>
                    <Button variant="primary" type="submit">
                        Consultar
                    </Button>
                    <Button className='m-l-5' variant="success" type="submit" onClick={()=>setDataForm(initialGetIngEg)}>
                        Limpiar campos
                    </Button>
                </div>
            </div>
        </Form>
    </div>
  )
}
