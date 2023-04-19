import React from 'react'
import { Card , Button} from 'react-bootstrap'

export default function CourseCard() {
    return (
        <Card style={{width: '18rem'}}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>Curso</Card.Title>
                <Card.Text>
                    Aquí iría una pequeña descripción del curso
                </Card.Text>
                <Button variant="primary">Ir al curso</Button>
            </Card.Body>
        </Card>
    )
}
