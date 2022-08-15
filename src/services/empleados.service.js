import axios from "axios";
import { API_URL } from "../helpers/globalVars";
import LoginService from "./login.service";

const {login_token} = LoginService.getCurrentUser();
const getEmpleados = (edad_min,edad_max,cargo) => {
    return axios
    .get(API_URL + 'empleados/empleados',{params: {edad_min,edad_max,cargo}, headers: {'token': login_token}})
    .then((response) => {
        if (response.data.data) {
            return response.data.data;
        }
        return response;
    });
};

const regEmpleado = ({nombres,apellidos,edad,cargo,cedula,telefono}) => {
    const formData = new FormData()
    formData.append('nombres', nombres);
    formData.append('apellidos', apellidos);
    formData.append('edad', edad);
    formData.append('cargo', cargo);
    formData.append('cedula', cedula);
    formData.append('no_celular', telefono);
    return axios
    .post(API_URL + 'empleados/empleados',formData,{headers: {'token': login_token}})
    .then((response) => {
        if (response.data.data) {
            return response.data.data;
        }
        return response;
    });
};

const updateEmpleado = (dataEmpleado) => {
    return axios
    .put(API_URL + 'empleados/empleados/'+dataEmpleado.empleado_id,dataEmpleado,{headers: {'token': login_token}})
    .then((response) => {
        if (response.data.data) {
            return response.data.data;
        }
        return response;
    });
};

const EmpleadosService = {
    getEmpleados,
    regEmpleado,
    updateEmpleado
}

export default EmpleadosService;
