import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { jwtDecode } from 'jwt-decode';


export const Navbar = () => {
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);
	const [isLogged, setIsLogged] = useState(false);

	const logout = () => {
		actions.logout();
		setIsLogged(false);
		navigate(`/login`);
	}

	const isAuthenticated = (token) => {
		return token && token.access_token && token.access_token.trim() !== '';
	};

	let userRole = null;
	if (isLogged) {
		const tokenString = localStorage.getItem("token");
		if (tokenString) {
			try {
				const access_token = JSON.parse(tokenString);
				const decodedToken = jwtDecode(access_token.access_token);
				userRole = decodedToken.rol;
			} catch (error) {
				console.error('Error al decodificar el token:', error);
				logout();
				navigate('/login');
			}
		}
	}


	useEffect(() => {
		if (!isAuthenticated(store.token)) {
			setIsLogged(false);
		} else {
			setIsLogged(true);
		}
	}, [store.token]);

	return (
		<nav className="navbar navbar-expand-md">
			<div className="container-fluid">
				<div>
					{isLogged ? (
						<>
							<button className="btn me-2 px-4 btn-danger" onClick={logout}>Salir</button>
						</>
					) : (
						<>
							<Link to="/registro">
								<button className="btn btn-primary me-3">Registro</button>
							</Link>
							<Link to="/login">
								<button className="btn btn-info me-2 px-4" >Acceder</button>
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	);
};
