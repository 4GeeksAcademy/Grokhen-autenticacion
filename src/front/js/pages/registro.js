import React, { useState , useContext} from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';


export const Registro = () => {
   

      const [email,setEmail]= useState('')
      const [password,setPassword]= useState(null)
      const [confirmPassword,setConfirmPassword]= useState('')



      const handleChangeEmail = (e) =>{
        setEmail(e.target.value)
      }

      const handleChangePassword = (e) =>{
        setPassword(e.target.value)
      }

      const handleChangeConfirm = (e) =>{
        setConfirmPassword(e.target.value)
      }

        
     const sendFormData = (email,password) => {
          fetch(`${process.env.BACKEND_URL}/user`, {
            method: "POST",
            body: JSON.stringify({
                "email":email,
                "password":password,
                "rol":"user"
            }),
            headers: { "Content-Type": "application/json" }
          })
            .then(response => response.json())
            .then(response => console.log(response))
            .then(response => Swal.fire({
              title: "Bienvenido",
              text: "Usuario registrado correctamente",
              icon: "success"
            }))
            .catch(error => Swal.fire({
              title: "Error",
              text: "No ha sido posible registrar el usuario",
              icon: "error"
            })) 
        }
    



    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            sendFormData(email,password)
            setEmail("");
            setPassword("");
            setConfirmPassword("");
        }else{
          Swal.fire({
            title: "Error",
            text: "La contraseña no coincide",
            icon: "error"
          }) 
        }
        

    };

    return( 

        <div>
             <h2>Registro</h2>
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div>
                    <label htmlFor="emailId" className="form-label"></label>
                    <input type="email" name="email" value={email} onChange={handleChangeEmail} id="emailId"placeholder="Email" required/>
                </div>
                <div>
                    <label htmlFor="passwordId" className="form-label"></label>
                    <input type="password" name="password" value={password} onChange={handleChangePassword} id="passwordId"placeholder="Contraseña" required/>
                </div>
                <div>
                    <label htmlFor="password1Id" className="form-label"></label>
                    <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleChangeConfirm} id="password1Id" placeholder="Repetir contraseña" required/>
                 </div>
                    <button type="submit">Registrarse  <i className="fas fa-long-arrow-alt-right"></i></button>
                   <Link to="/login">
                      <div>¿Ya eres usuario? Accede</div>
                  </Link>
            </form>
        </div>
    );
};
export default Registro