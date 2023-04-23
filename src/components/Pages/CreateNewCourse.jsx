import React, { useState } from 'react'
import { Row, Col, container, Card, Button, Form, Dropdown, Alert, Container } from 'react-bootstrap'
import LeftNavBar from '../LeftNavBar'
import { doc, setDoc } from 'firebase/firestore/lite'
import { db } from '../../firebase'
import Curso from '../../clases/Curso'
import { getDownloadURL, getStorage, uploadBytes , ref} from 'firebase/storage'

export default function CreateNewCourse() {

    const [level, setLevel] = useState()
    const [year, setYear] = useState()
    const [nombreCurso, setNombreCurso] = useState("")
    const [loading, setLoading] = useState(false);
    const [material, setMaterial] = useState(null);
    const [evaluaciones, setEvaluaciones] = useState(null);
    const [successAlert, setSuccessAlert] = useState(false)

    const levels = [
        { value: 'primaria', text: 'Primaria' },
        { value: 'secundaria', text: 'Secundaria' }
    ];

    const years = [
        { value: 'primero', text: 'Primer Año' },
        { value: 'segundo', text: 'Segundo Año' },
        { value: 'tercero', text: 'Tercer Año' },
        { value: 'cuarto', text: 'Cuarto Año' },
        { value: 'quinto', text: 'Quinto Año' }
    ];

    async function generateNewCourse() {
        setLoading(true)
        const curso = new Curso(
            nombreCurso,
            level,
            year,
            material,
            evaluaciones
        );

        const storage = getStorage()

        const materialStorageRef = ref(storage, `material/${curso.nombre}`);
        await uploadBytes(materialStorageRef,material)  
        
        const evaluacionesStorageRef = ref(storage,`evaluaciones/${curso.nombre}`)
        await uploadBytes(evaluacionesStorageRef,evaluaciones)

        const materialDownloadURL = await getDownloadURL(materialStorageRef);
        const evaluacionesDownloadURL = await getDownloadURL(evaluacionesStorageRef);


        try {
            await setDoc(doc(db, "courses", `${year}-${level}`), {
                nombre: curso.nombre,
                nivel: curso.nivel,
                anio: curso.anio,
                material: materialDownloadURL,
                evaluaciones: evaluacionesDownloadURL
            })
            
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
        setSuccessAlert(true)
        
    }

    function createSuccessAlert(){
        return (
            <div className='p-2'>
                <Alert variant='success' dismissible>El curso se creó satisfactoriamente</Alert>
            </div>
        );
    }


    return (
        <LeftNavBar
            title={"Crear nuevo curso"}
            body={
                <Card style={{ width: '100%', height: '100%' }}>
                    {successAlert === true ? createSuccessAlert() : null}
                    <Card.Body>
                        <Card.Title>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Nombre del curso</Form.Label>
                                    <Form.Control type="text" placeholder='Introducción a la programación' onChange={(evt) => { setNombreCurso(evt.target.value) }} />
                                </Form.Group>

                                <div className="dropdowns d-flex">
                                <Form.Group className='mt-3' style={{marginRight: '3rem'}}>
                                    <Form.Label>Nivel</Form.Label>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="secondary" style={{ textTransform: 'capitalize' }}>
                                            {level === undefined ? "Selecciona un nivel" : level}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            {levels.map((option, key) => {
                                                return <Dropdown.Item style={{ textTransform: 'capitalize' }} onClick={() => setLevel(option.value)} key={option.value}>{option.value}</Dropdown.Item>
                                            })}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Form.Group>

                                <Form.Group className='mt-3'>
                                    <Form.Label>Año</Form.Label>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="secondary" style={{ textTransform: 'capitalize' }}>
                                            {year === undefined ? "Selecciona un año" : year}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            {years.map((option, key) => {
                                                return <Dropdown.Item style={{ textTransform: 'capitalize' }} onClick={() => setYear(option.value)} key={option.value}>{option.value}</Dropdown.Item>
                                            })}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Form.Group>
                                </div>

                            </Form>
                        </Card.Title>
                        <Card.Text>
                                <Form.Group controlId="material" className="mt-3 mb-3">
                                    <Form.Label>Subir Material</Form.Label>
                                    <Form.Control type="file" onChange={(e)=>setMaterial(e.target.files[0])} accept=".pdf,image/jpeg, image/png, .xls"/>
                                </Form.Group>

                                <Form.Group controlId="evaluaciones" className="mb-3">
                                    <Form.Label>Subir Evaluaciones</Form.Label>
                                    <Form.Control type="file" onChange={(e)=>setEvaluaciones(e.target.files[0])}/>
                                </Form.Group>

                                <p>Puedes usar formatos PDF, JPG, PNG, XLS , JPEG , evita usar archivos WEBP</p>
                                
                            </Card.Text>
                            <Button variant="primary" disabled={loading} onClick={generateNewCourse}>Crear curso</Button>
                    </Card.Body>
                </Card>
            }
        />
    )
}