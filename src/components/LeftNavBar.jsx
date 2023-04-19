import React from 'react'
import { Col, ListGroup } from 'react-bootstrap'
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


export default function LeftNavBar({ props }) {

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

    return (
        <ListGroup as="ul">
            <ListGroup.Item as="li" active>
                <i className="fas fa-user"></i> Mi perfil
            </ListGroup.Item>
            <ListGroup.Item as="li" disabled={props}>
                Cursos
            </ListGroup.Item>
            <ListGroup.Item as="li" style={{cursor: 'pointer'}} onClick={handleLogOut}><i className="fas fa-sign-out-alt"></i> Log out</ListGroup.Item>
        </ListGroup>
    )
}
