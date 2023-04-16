import { Container, Row, Col, Card, CardHeader,CardBody,Button} from "reactstrap"
import TablaContacto from "./Componentes/TablaContacto"
import {useState, useEffect } from "react"
import ModalContacto from "./Componentes/ModalContacto"


const App = () => {

    const [contactos, setContactos] = useState([])
    const [mostrarModal, setMostrarModal] = useState(false);
    const [editar, setEditar] = useState(null);

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

    const editarContacto = async (contacto) => {
        const response = await fetch("api/contacto/Editar", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(contacto)
        })
           
        //si es correcto la ventana se cerrara
        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarContactos();
        }
    }

    const eliminarContacto = async (id) => {
        
        //se crea una ventana para confirmar
        var respuesta = window.confirm("Desea elimina el contacto?")

        if (!respuesta) {
            return;
        }

        const response = await fetch("api/contacto/Eliminar/" + id, {
            method: 'DELETE',
            })

        if (response.ok) {
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
                             <TablaContacto data={contactos}
                                 setEditar={setEditar}
                                 mostrarModal={mostrarModal}
                                 setMostrarModal={setMostrarModal}

                                 eliminarContacto={eliminarContacto }
                             />
                         </CardBody>
                     </Card>
                 </Col>
             </Row>
            
            {/*Llama al componente modal*/}        
             <ModalContacto mostrarModal={mostrarModal} setMostrarModal={setMostrarModal} guardarContacto={guardarContacto}

                 editar={editar} setEditar={setEditar} editarContacto={editarContacto}
             />
         </Container>
         )
}
export default App;
