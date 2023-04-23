import { Offcanvas } from 'react-bootstrap';
import React from 'react';

export default function CourseOffCanvas(props) {
  return (
    <Offcanvas
      show={props.show}
      onHide={props.close}
      style={{ width: '75%' }} // Aumentar el ancho al 80%
        placement = "end"
    >
    <Offcanvas.Header closeButton>
    <Offcanvas.Title ><h1 style={{textTransform: 'uppercase'}}>{props.title}</h1></Offcanvas.Title>
    </Offcanvas.Header>
      <Offcanvas.Body>
        {props.body}
      </Offcanvas.Body>
    </Offcanvas>
  );
}