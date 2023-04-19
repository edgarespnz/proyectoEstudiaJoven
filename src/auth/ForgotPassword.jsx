import React , {useState}from 'react'
import { useAuth } from '../context/AuthContext'
import { Alert, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ForgotPassword() {

    const [email, setEmail] = useState("");
    const { resetPassword } = useAuth();
    const [loading , setLoading] = useState(false);
    const [error , setError] = useState("")
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [showSuccessAlert , setShowSuccessAlert] = useState(false);

    async function handleSubmit(e){
        e.preventDefault()
        try {
            
            setLoading(true)
            await resetPassword(email);
            setLoading(false);
            setShowSuccessAlert(true);
            
        } catch (e) {
            if (JSON.stringify(e.code === "auth/user-not-found")) {
                setError("Error, el correo no existe")
            }
            else{
                setError(JSON.stringify(e.code))
            }
            
            setShowErrorAlert(true)
        }
    }

    function createAlert(){
        return (
            error === "" && showSuccessAlert ?  <Alert variant='success' show={showSuccessAlert} dismissible onClose={()=>{setShowSuccessAlert(false)}}>{"Por favor revisa tu correo y reestablece la contraseña"}</Alert>
            : <Alert variant='danger' show={showErrorAlert} dismissible onClose={()=>{setShowErrorAlert(false)}}>{error}</Alert>
        )
    }

    
    return (
        <Form onSubmit={handleSubmit}>
            <div className="displayTable p-5 border" >
                <div className="displayTableCell">
                    <div className="authBlock">
                        {createAlert()}
                        <h3 className="text-center">Reestablecer contraseña</h3>
                        <p className="text-center">Por favor ingresa tu correo para poder enviar una solicitud de recuperación de contraseña
                        </p>
                        <div className="form-group d-flex justify-content-center">
                            <input type="email" className="form-control" style={{width: '35vh'}} placeholder="Correo electrónico" required onChange={(evt)=>{setEmail(evt.target.value)}}/>
                        </div>

                        {/*<!-- Calling ForgotPassword from AuthService Api -->*/}

                        <div className="form-group mt-2 mb-2 d-flex justify-content-center" onSubmit={handleSubmit}>
                            <input type="submit" className="btn btn-primary" value="Reestablecer contraseña"/>
                        </div>
                    </div>
                    <div className="redirectToLogin d-flex justify-content-center">
                        <span>¿Volver? <Link to={"/login"}>Log In</Link></span>
                    </div>
                </div>
            </div>
        </Form>
    )
}

export default ForgotPassword