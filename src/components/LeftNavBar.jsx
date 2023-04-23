import React, { useEffect } from 'react'
import { Col, ListGroup, Row } from 'react-bootstrap'
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';


export default function LeftNavBar(props) {

    const [error, setError] = useState();
    const [rol, setRol] = useState("")
    const { currentUser, logout, getUserData } = useAuth();
    const navigate = useNavigate()


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

    async function getRol(){
        const data = await getUserData();
        setRol(data.rol)
    }

    useEffect(()=>{
        getRol()
    },[])

    return (

        <>
            <div className='container-fluid'>
                <Row style={{ minHeight: '92.5vh' }}>
                    <Col sm={2} className="bg-light sidebar mt-2">
                        <ListGroup as="ul">
                            <Link to={"/profile"} style={{ textDecoration: "none" }}><ListGroup.Item as="li">
                                <i className="fas fa-user"></i> Mi perfil
                            </ListGroup.Item></Link>
                            <Link to={"/dashboard"} style={{ textDecoration: "none" }}><ListGroup.Item as="li" style={{ cursor: 'pointer' }} >
                                Dashboard
                            </ListGroup.Item> </Link>
                            {rol === "Alumno" ? null : <Link to={"/create-new-course"} style={{ textDecoration: "none" }}><ListGroup.Item as="li" style={{ cursor: 'pointer' }} >
                                Crear Nuevo Curso
                            </ListGroup.Item> </Link>}
                            <ListGroup.Item as="li" style={{ cursor: 'pointer' }} onClick={handleLogOut}><i className="fas fa-sign-out-alt"></i> Log out</ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col sm={10}>
                        <main role="main">
                            <div className="inner-adjust">
                                <div className="pt-3 pb-2 mb-3 border-bottom">
                                    <h1 className="h2">{props.title}</h1>
                                </div>
                                <div className="main-content">
                                    {props.body}
                                </div>
                            </div>
                        </main>
                    </Col>
                </Row>
            </div >
        </>



    )
}
