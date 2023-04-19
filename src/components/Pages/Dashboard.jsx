import React from 'react'
import Header from './Header'
import LeftNavBar from '../LeftNavBar'
import { Row, Col, Container, ListGroup, CardGroup, Card } from 'react-bootstrap'
import CourseCard from '../CourseCard'

export default function Dashboard() {
  return (
    <>
      <Header />
      <div className='container-fluid'>
        <Row style={{ minHeight: '92.5vh' }}>
          <Col sm={2} className="bg-light sidebar mt-2">
            <LeftNavBar />
          </Col>
          <Col sm={10}>
            <main role="main">
              <div className="inner-adjust">
                <div className="pt-3 pb-2 mb-3 border-bottom">
                  <h1 className="h2">Dashboard</h1>
                </div>
                <div className="media">
                  <h3>Cursos disponibles</h3>
                  <Row xs={1} md={2} className="g-4">
                    {Array.from({ length: 4 }).map((_, idx) => (
                      <Col key={idx}>
                        <Card>
                          <Card.Img variant="top" src="holder.js/100px160" />
                          <Card.Body>
                            <Card.Title>Curso {idx+1} </Card.Title>
                            <Card.Text>
                              Descripción del curso {idx+1}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>


                </div>
              </div>
            </main>
          </Col>

        </Row>
      </div >
    </>
  )
}
