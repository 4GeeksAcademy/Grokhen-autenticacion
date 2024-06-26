import React, { useState, useEffect, useContext } from "react";
import { Route, Routes, useNavigate, BrowserRouter, Link } from "react-router-dom";
import { Context } from "../store/appContext";

import { jwtDecode } from 'jwt-decode';

const LoginForm = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [user, setUser] = useState({
        "email": "",
        "password": ""
    })

    const handleLogin = async () => {
        await actions.login(user);
        const access_token = JSON.parse(localStorage.getItem("token"))
        const access_key = access_token.access_token
        const decodedToken = jwtDecode(access_key);
        const userId = decodedToken.user_id;
        store.user_id = userId
        const userRol = decodedToken.rol;
        if (userRol === `admin`) {
            navigate(`/admin`);
        } else {
            navigate(`/private`);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await handleLogin()
        } catch (error) {
            console.log('error', error)
        }
    }

    return (
                <div>
                    <h2>Acceso</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="emailId" className="form-label d-none">Email</label>
                            <input type="email"
                                id="emailId"
                                aria-describedby="emailHelp"
                                onChange={(e) => { setUser({ ...user, email: e.target.value }) }}
                                placeholder="Email" />
                        </div>
                        <div>
                            <label htmlFor="passwordId" className="form-label d-none">Password</label>
                            <input type="password"
                                id="passwordId"
                                onChange={(e) => { setUser({ ...user, password: e.target.value }) }}
                                placeholder="Contraseña" />
                        </div>
                        <button type="submit" onClick={handleLogin}>Acceder <i className="fas fa-long-arrow-alt-right"></i></button>
                        <Link to="/registro">
                            <div>¿No eres usuario? Registrate</div>
                        </Link>
                    </form>
                </div>
    );
};

export default LoginForm;