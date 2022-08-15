import axios from "axios";
import { API_URL } from "../helpers/globalVars";
import LoginService from "./login.service";
const {login_token} = LoginService.getCurrentUser();
const getIngresosEgresos = (cedula,fecha_inicio,fecha_fin) => {
    return axios
    .get(API_URL + 'ingresosegresos/ingresos_egresos',{params: {cedula,fecha_inicio,fecha_fin},headers: {'token': login_token}})
    .then((response) => {
        if (response.data.data) {
            return response.data.data;
        }
        return response;
    });
};


const regIngresoEgreso = ({cedula,fecha_ingreso,hora_ingreso,fecha_egreso,hora_egreso}) => {
    const formData = new FormData()
    formData.append('cedula', cedula);
    formData.append('fecha_ingreso', fecha_ingreso+' '+hora_ingreso);
    formData.append('fecha_egreso', fecha_egreso+' '+hora_egreso);
    return axios
    .post(API_URL + 'ingresosegresos/ingresos_egresos',formData,{headers: {'token': login_token}})
    .then((response) => {
        if (response.data.data) {
            return response.data.data;
        }
        return response;
    });
};

const updateIngresoEgreso = ({ingreso_egreso_id,fecha_ingreso,hora_ingreso,fecha_egreso,hora_egreso}) => {
    const newDataIngEg = {
        fecha_ingreso: fecha_ingreso+' '+hora_ingreso,
        fecha_egreso: fecha_egreso+' '+hora_egreso
    }
    return axios
    .put(API_URL + 'ingresosegresos/ingresos_egresos/'+ingreso_egreso_id, newDataIngEg, {headers: {'token': login_token}})
    .then((response) => {
        if (response.data.data) {
            return response.data.data;
        }
        return response;
    });
};

const getIngresoEgresoEmpl = (cedula) => {
    return axios
    .get(API_URL + 'ingresosegresos/ingresos_egresos_empleado',{params: {cedula},headers: {'token': login_token}})
    .then((response) => {
        return response.data;
    });
}

const regIngresoEmpleado = (cedula) => {
    const formData = new FormData()
    formData.append('cedula', cedula);
    return axios
    .post(API_URL + 'ingresosegresos/ingresos_egresos_empleado',formData)
    .then((response) => {
        return response.data;
    });
}

const regEgresoEmpleado = (ingreso_egreso_id) => {
    return axios
    .put(API_URL + 'ingresosegresos/ingresos_egresos_empleado/'+ingreso_egreso_id)
    .then((response) => {
        return response.data;
    });
}

const IngresoEgresoService = {
  getIngresosEgresos,
  regIngresoEgreso,
  updateIngresoEgreso,
  getIngresoEgresoEmpl,
  regIngresoEmpleado,
  regEgresoEmpleado
}

export default IngresoEgresoService;
