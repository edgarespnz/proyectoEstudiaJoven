import React from 'react'
import { Container, Button, Form, Alert } from 'react-bootstrap'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const {login} = useAuth();

  const navigate = useNavigate()

  const createAlert = () => {
    return <Alert variant='danger' onClose={() => setShowAlert(false)} dismissible={true}>{error}</Alert>
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (email === "" || password === "") {
      setShowAlert(true);
    }

    else {
      try {
        setError("")
        setLoading(true)
        await login(email, password);
        setLoading(false);
        navigate("/dashboard")

      } catch (e) {
        if(e.code = "auth/user-not-found"){
          setError("Usuario o contraseña incorrectos")
          setShowAlert(true)
          setLoading(false)
        }
        
        
      }
    }

  }


  return (
    <div className="mt-5 p-5">
      <Container className='border p-5' style={{ maxWidth: '600px', minHeight: '600px' }}>
        {showAlert === true ? createAlert() : null}
        <h1 className='p-2 text-center'>Iniciar sesión</h1>
        <Form onSubmit={handleSubmit}>

          <Form.Group className="mt-3 mb-3" controlId="formBasicEmail">
            <Form.Label>Correo Electronico</Form.Label>
            <Form.Control type="email" placeholder="luisramirez@example.com" onChange={(evt) => { setEmail(evt.target.value) }} />
            <Form.Text className="text-muted">
              Esta plataforma no comparte tu información con nadie.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Contraseña" onChange={(evt) => { setPassword(evt.target.value) }} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Acepto los términos y condiciones." />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={loading}>
            Iniciar Sesión
          </Button>
          <div className='mt-3'>
            <span>Aún no tienes una cuenta? </span>
            <Link to={"/signup"}>Crear cuenta</Link>
          </div>

          <div className='mt-3'>
            <span>Olvidaste tu contraseña?</span>
            <Link to={"/reset-password"}> Recuperar contraseña</Link>
          </div>
          
        </Form>
      </Container>
    </div>
  )
}

export default Login