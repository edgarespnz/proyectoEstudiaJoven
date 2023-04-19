import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Container, Nav, Row, Col, Image } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'
import Header from './Header';
import LeftNavBar from '../LeftNavBar';

export default function Profile() {

    const [rol, setRol] = useState("")
    const { currentUser, getUserData, logout } = useAuth();

    const [error, setError] = useState();
    const navigate = useNavigate()

    async function getData() {
        const data = await getUserData()
        setRol(data.rol)
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
        <>
            <Header />
            <div className='container-fluid'>
                <Row style={{ minHeight: '92.5vh' }}>
                    <Col sm={2} className="bg-light sidebar mt-2">
                        <LeftNavBar />
                    </Col>
                    <Col sm={8}>
                        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                            <div className="inner-adjust">
                                <div className="pt-3 pb-2 mb-3 border-bottom">
                                    <h1 className="h2">Mi Perfil</h1>
                                </div>
                                <div className="media">
                                    <img className="align-self-start mr-5 img-thumbnail rounded-circle" src='../assets/dummy-user.jpg' />
                                    <div className="media-body">
                                        <h1>Hola: <strong>{currentUser.displayName != null ? currentUser.displayName : "usuario"}</strong></h1>
                                        <p>Rol: <strong>{rol !== "" ? rol : null}</strong></p>
                                        <p>ID de usuario: <strong>{currentUser.uid}</strong></p>
                                        <p>Email: <strong>{currentUser.email}</strong></p>
                                        <p>¿Email verificado?: <strong>{currentUser.emailVerified == true ? "sí" : "no"}</strong></p>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </Col>

                </Row>
            </div >

        </>
    )
}

