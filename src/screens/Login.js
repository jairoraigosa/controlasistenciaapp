import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import AuthService from "../services/login.service";
import logo from "../assets/images/control-asistencia.png";
import LoginService from "../services/login.service";
import Profile from "./Home";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" style={{padding: 2}}>
                <strong>¡ERROR!</strong> Este campo es requerido!
            </div>
        );
    }
};


const Login = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    
    if(username.length<5){
        setMessage('El nombre de usuario debe de contener al menos 5 caracteres.');
        setLoading(false);
    }else {
      LoginService.login(username, password).then(
        ({data}) => {
            if(data.status){
                navigate("/home");
                window.location.reload();
            }else{
                setMessage('Usuario y/o contraseña incorrecta.');
                setLoading(false);
            }
        //   window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    }
  };

  return (
      (!currentUser) ? (
        <div className="row" style={{ paddingBottom: 100 }}>
            <div className="col-md-3"></div>
            <div className="col-md-6">
                <div className="text-center">
                    <img 
                        src={logo}
                        alt="Plataforma ENDE"
                        className="profile-img-card"
                        style={{width: '50%'}}
                    />
                </div>
                <div className="card border" style={{borderRadius: 10}}>
                    <div className="card-header">
                        <h4>
                            CONTROL DE ASISTENCIA
                        </h4>
                    </div>
                    <div className="card-body">
                        {message && (
                            <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                            </div>
                        )}
                        <Form onSubmit={handleLogin} ref={form}>
                            <div className="form-group m-b-10">
                                <label htmlFor="username">Usuario</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={username}
                                    onChange={onChangeUsername}
                                    validations={[required]}
                                />
                            </div>

                            <div className="form-group m-b-10">
                                <label htmlFor="password">Contraseña</label>
                                <Input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={password}
                                    onChange={onChangePassword}
                                    validations={[required]}
                                />
                            </div>

                            <div className="form-group center">
                                <button className="btn btn-primary btn-block" disabled={loading}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                    Login
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
            <div className="col-md-3"></div>
        </div>
      ) : <Profile/>
  );
};

export default Login;
