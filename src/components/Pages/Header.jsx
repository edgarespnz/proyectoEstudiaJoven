import React from 'react'
import { Nav } from 'react-bootstrap'

export default function Header() {
    return (
        <Nav className='navbar navbar-dark bg-dark shadow d-flex flex-column'>
            <a className='navbar-brand'>
                <i className="fa-solid fa-school"> Estudia Joven</i>
            </a>
        </Nav>
    )
}
