import React, { useEffect, useState } from 'react';
import LeftNavBar from '../LeftNavBar';
import { Row, Col, Card, Container, Form, InputGroup, Dropdown, Button } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from '../../firebase';
import CourseOffCanvas from '../CourseOffCanvas';
import CourseCard from '../CourseCard';

export default function Dashboard() {
  const [selectedCourse, setSelectedCourse] = useState()
  const [show, setShow] = useState(false)
  const [cursos, setCursos] = useState([]);
  const [cursoText, setCursoText] = useState("");
  const [cursosFiltrados, setCursosFiltrados] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState("");


  const handleClose = () => { setShow(false) }

  const handleGradeClick = (grade) => {
    setSelectedGrade(grade);
    const filteredCourses = cursos.filter(
      (curso) => curso.anio + "-" + curso.nivel === grade
    );
    setCursosFiltrados(filteredCourses);
  };

  const handleResetButton = () => {
    setSelectedGrade("")
    setCursosFiltrados(cursos)
  }

  const handleShowResetButton = () => {
    if (selectedGrade !== "") {
      return (
        <div className="ButtonGroup d-flex align-items-center justify-content-center"><Button onClick={handleResetButton}>Reestablecer</Button></div>
      );
    }
  }

  function createSearchbar() {
    return (
      <InputGroup className='mt-2 mb-2 p-2'>
        <InputGroup.Text>
          Filtrar por nombre de curso
        </InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder='Ejemplo: Algebra'
          onChange={(evt) => setCursoText(evt.target.value)}
        />
      </InputGroup>

    );
  }



  function createDropdown() {
    return (
      <div className='d-flex '>
        <Dropdown className='mt-2 mb-2 p-2'>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {selectedGrade === "" ? "Filtrar por grado académico" : selectedGrade}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {cursos.map((curso, idx) => {
              const grade = curso.anio + "-" + curso.nivel
              return (
                <Dropdown.Item key={idx} onClick={() => handleGradeClick(grade)}>{grade}</Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
        {handleShowResetButton()}
      </div>

    );
  }

  function filtrarPorNombreCurso() {
    const filteredCourses = cursosFiltrados.filter((curso) =>
      curso.nombre.toLowerCase().includes(cursoText.toLowerCase())
    );
    if (filteredCourses.length === 0 && cursoText !== "") {
      setCursosFiltrados(cursos)
    }
    else {
      setCursosFiltrados(filteredCourses);
    }
    if (!cursoText) {
      setCursosFiltrados(cursos)
    }
  }


  function getAllCoursesData() {
    const coursesCollection = collection(db, 'courses');
    getDocs(coursesCollection).then((QuerySnapshot) => {
      const cursosData = []
      QuerySnapshot.forEach((doc) => {
        cursosData.push(doc.data())
      });
      setCursos(cursosData);
      setCursosFiltrados(cursos)
      console.log(cursosData);
    });

  }

  function onClickCourse(course) {
    setSelectedCourse(course);
    setShow(true);
  }

  function createOffCanvas() {
    if (selectedCourse !== undefined) {
      return (
        <CourseOffCanvas
          title={cursos[selectedCourse].nombre}
          show={show}
          close={handleClose}
          body={
            <Container style={{ height: '100%', overflow: 'auto' }}>
              <h2>Material</h2>
              <iframe src={cursos[selectedCourse].material} width="100%" height="600px"></iframe>
              <h2 className='mt-5'>Evaluación</h2>
              <iframe src={cursos[selectedCourse].evaluaciones} width="100%" height="600px"></iframe>


            </Container>
          }
        />
      )
    } else {
      return null;
    }
  }

  useEffect(() => {
    getAllCoursesData();
  }, []);

  useEffect(() => {
    filtrarPorNombreCurso()
  }, [cursoText, cursos]);



  return (
    <LeftNavBar
      title={'Dashboard'}
      body={
        <>
          {createSearchbar()}
          {createOffCanvas()}
          {createDropdown()}
          <Row xs={1} md={2} className="g-4">
            {cursosFiltrados.map((item, idx) => (
              <Col key={idx}>
                <Card style={{ cursor: 'pointer' }} onClick={() => onClickCourse(idx)}>
                  <Card.Img
                    variant="top"
                    src={"https://c4.wallpaperflare.com/wallpaper/111/745/193/reactjs-javascript-programming-programming-language-hd-wallpaper-preview.jpg"}
                    style={{ width: '100%', height: '20vh' }}
                  />
                  <Card.Body>
                    <Card.Title>{item?.nombre}</Card.Title>
                    <Card.Text>{item.anio} {item.nivel}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

        </>
      }
    />
  );
}