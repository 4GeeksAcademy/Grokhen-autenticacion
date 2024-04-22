import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const LoginForm = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	const [user, setUser] = useState({
		"email": "",
		"password": ""
	})

	const login = async () => {
		try {
			const response = await fetch("https://cuddly-telegram-69945q6vw9j6h4gr-3001.app.github.dev/login", {
				method: "POST",
				body: JSON.stringify(user),
				headers: { "Content-Type": "application/json" }
			});
			const userToken = await response.json();
			localStorage.setItem("access", JSON.stringify(userToken));
			await setStore({ access });
			/* authentication() */
		} catch (error) {
			console.error(error);
		}
	}

	const authentication = async () => {
        try {
            const response = await fetch("https://cuddly-telegram-69945q6vw9j6h4gr-3001.app.github.dev/private", {
				method: "GET",
				headers: { "Authorization": "Bearer" + `${JSON.parse(localStorage.getItem("access"))}` }
			});
			const data = await response.json();
			authorizerUser = data.logged_in_as;
			/* navigate(`/private`) */
        } catch (error) {
			console.error(error);
		}
        /* const data = await response.json();
		authorizerUser = data.logged_in_as;
		navigate(`/private`) */
    }


		return (
			<>
				<h1>Awesome Aplication</h1>
				<form /* onSubmit={login} */>
					<div className="row mb-3">
						<label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
						<div className="col-sm-10">
							<input
								onChange={(e) => { setUser({ ...user, email: e.target.value }) }}
								type="email"
								className="form-control"
								id="inputEmail3" />
						</div>
					</div>
					<div className="row mb-3">
						<label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
						<div className="col-sm-10">
							<input
								onChange={(e) => { setUser({ ...user, password: e.target.value }) }}
								type="password"
								className="form-control"
								id="inputPassword3" />
						</div>
					</div>
					{/* <button type="submit" className="btn btn-primary">Login</button> */}
				</form>
				<button onClick={login}>Login de verdad</button>
			</>
		)
	}

	export default LoginForm;