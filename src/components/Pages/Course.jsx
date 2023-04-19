import React from 'react'
import CourseCard from '../CourseCard'
import LeftNavBar from '../LeftNavBar'
import { Row, Col, Container } from 'react-bootstrap'

export default function Course() {
    return (

        <div className='container-fluid'>
            <Row>
                <Col sm={2} className="bg-light sidebar">
                    <div className="mt-2">
                        <LeftNavBar />
                    </div>
                </Col>
                <Col sm={10} className='p-5'>
                    <CourseCard />
                </Col>
            </Row>

        </div>

    )
}
