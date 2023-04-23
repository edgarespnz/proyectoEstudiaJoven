import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Container, Nav, Row, Col, Image } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'
import Header from './Header';
import LeftNavBar from '../LeftNavBar';

export default function Profile() {

    const [rol, setRol] = useState("")
    const [nombre, setNombre] = useState("")
    const { currentUser, getUserData, logout } = useAuth();

    const [error, setError] = useState();
    const navigate = useNavigate()

    async function getData() {
        const currentId = currentUser.uid
        const data = await getUserData(currentId)
        setRol(data.rol)
        setNombre(data.name)
    }

    async function handleLogOut() {
        setError("")
        try {
            await logout()
            navigate("/login")
        } catch (error) {
            setError(error)
            window.MessageEvent(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <LeftNavBar
            title={"Mi perfil"}
            body={
                <div className="media">
                    <img className="align-self-start mr-5 img-thumbnail rounded-circle" src='https://images7.memedroid.com/images/UPLOADED928/61eaa2fcc21dc.jpeg' style={{ width: "150px", height: "100px" }} />
                    <div className="media-body">
                        <h1>Hola: <strong>{nombre !== "" ? nombre : "usuario"}</strong></h1>
                        <p>Rol: <strong>{rol !== "" ? rol : null}</strong></p>
                        <p>ID de usuario: <strong>{currentUser.uid}</strong></p>
                        <p>Email: <strong>{currentUser.email}</strong></p>
                        <p>¿Email verificado?: <strong>{currentUser.emailVerified == true ? "sí" : "no"}</strong></p>
                    </div>
                </div>}
        />
    )
}

