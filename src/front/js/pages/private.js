import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";


const Private = () => {
	const navigate = useNavigate();

	const authentication = async () => {
		const token = JSON.parse(localStorage.getItem("token"))
		const access_key = token.access_token
		if (!access_key) {
			navigate(`/login`)
			return;
		}
		try {
			const response = await fetch(`${process.env.BACKEND_URL}/protected`, {
				method: "GET",
				headers: { "Authorization": `Bearer ${access_key}` }
			});
			if (!response.ok) {
				if (response.status === 401) {
					console.log("Not authorized. Redirecting to login...");
					navigate(`/login`)
				} else {
					console.error("Error:", response.status);
				}
				return;
			}
			const data = await response.json();
			const authorizerUser = data.logged_in_as;
		} catch (error) {
			console.error(error);
			navigate(`/login`)
		}
	}
	useEffect(() => {
		authentication();
	}, [])

	return (
		<>
			<h1>You have access</h1>
		</>
	);
};

export default Private;
