const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: JSON.parse(localStorage.getItem("token")) || {},
			user_id:[],
			message: null,
		},
		actions: {
			// Use getActions to call a function within a fuction
			login: async (user) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/login`, {
						method: "POST",
						body: JSON.stringify(user),
						headers: { "Content-Type": "application/json" }
					});

					if (!response.ok) {
						Swal.fire({
							title: "Error",
							text: "Nombre de usuario o contraseña incorrectos",
							icon: "error"
						  });
						throw new Error('Nombre de usuario o contraseña incorrectos');
					}

					const userToken = await response.json();
					console.log(userToken);
					localStorage.setItem("token", JSON.stringify(userToken));
					setStore({ token: userToken })
				} catch (error) {
					console.error(error);
				}
			},

			logout: () => {
				localStorage.removeItem("token")
				setStore(prevState => ({ ...prevState, token: {} }));
				setStore(prevState => ({ ...prevState, user_id: [] }));
			},

			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
