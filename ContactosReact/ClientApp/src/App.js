import { Container, Row, Col, Card, CardHeader,CardBody,Button} from "reactstrap"
import TablaContacto from "./Componentes/TablaContacto"
import {useState, useEffect } from "react"
import ModalContacto from "./Componentes/ModalContacto"


const App = () => {

    const [contactos, setContactos] = useState([])
    const [mostrarModal, setMostrarModal] = useState(false);

    const mostrarContactos = async () => {

        const response = await fetch("api/contacto/Lista");
        if (response.ok) {
            const data = await response.json();
            setContactos(data)
        } else {
            console.log("error en la lista")
        }
    }

    useEffect(() => {
        mostrarContactos();
    }, [])

    const guardarContacto = async (contacto) => {
        const response = await fetch("api/contacto/Guardar", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(contacto)
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarContactos();
        }
    }
   

     return (
         <Container>
             <Row className="mt-5">
                 <Col sm="12">
                     <Card>
                         <CardHeader>
                             <h5>Lista de contactos</h5>
                         </CardHeader>
                         <CardBody>
                         
                             <Button size="sm" color="success" onClick={()=> setMostrarModal(!mostrarModal)} >Nuevo Contacto</Button>
                         <hr></hr>
                             <TablaContacto data={contactos} />
                         </CardBody>
                     </Card>
                 </Col>
             </Row>
            
            {/*Llama al componente modal*/}        
             <ModalContacto mostrarModal={mostrarModal} setMostrarModal={setMostrarModal}guardarContacto={guardarContacto }
             />
         </Container>
         )
}
export default App;