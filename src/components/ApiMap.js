
import React,{useEffect,useState} from 'react';
import Table from 'react-bootstrap/Table';
import uuid from 'react-uuid';
import MapaGoogle from './MapaGoogle';
import TablaBicicleta from './TablaBicicleta';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router';


const ApiMap = ({data,status,setStatus}) => {
    
    let dataValue = new Date(Date.now());
    const [messages, setMessages] = useState([]);
    const [bicycle, setBicycle] = useState(null);
    const [idDispositivo, setIdDispositivo] = useState([]);
    let history = useHistory();
    let mapurl = "https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDkKxJUGWPwSf0Z1w7pgwvh2yGacA7ju5k";

    useEffect(() => {
        console.log("HOLA")
        if(data){
            setMessages([]);
            const iterator = async () => {
                data.forEach( async (el)=> {
                    let message = await el;
                    let mess = {
                        deviceid : message.deviceid,
                        latitude : message.latitude,
                        SOS : message.SOS,
                        status: message.status,
                        longitude : message.longitude,
                        timestamp : message.timestamp,
                    }
                    
                    setMessages((messages) => [...messages,mess]);
                });
            }
            iterator();
        }
    }, [data,status,bicycle,idDispositivo])

    useEffect(() => {
        
    },[bicycle])

    const volverHandler = () => {
        history.push(`/`)
    } 

    return (
        <div>
            <hr></hr>
            <Container>
                <Row>
                    <Col xs={3} md={2} lg={3}/>
                    <Col xs={6} md={6} lg={6}>
                        <h1>Proyecto Semilla  PII-DETRI-2021-01</h1>
                    </Col>
                    <Col xs={3} md={2} lg={2}/>
                </Row>
                <Row>
                    <Col>
                        {messages.length === 0 ? <h1>Cargando</h1> : 
                            <MapaGoogle 
                            className="map"
                            idDispositivo={idDispositivo}
                            setIdDispositivo={setIdDispositivo}
                            markers={messages}
                            key={uuid()} 
                            googleMapURL = {mapurl} 
                            containerElement={<div style={{ height: `400px` }} />}
                            loadingElement={<p>Cargando</p>}
                            mapElement={<div style={{ height: `90%` }} />}
                            setBicycle = {setBicycle}
                            />
                        }
                    </Col>
                </Row>
                <Row>
                    <Col lg={10} md={10} sm={10} xs={10}>
                        {!bicycle ? (<Alert variant="primary" >Seleccione una ubicacion</Alert>):(<h1>{<TablaBicicleta setStatus={setStatus}  status={status}  bicycle={bicycle}/>}</h1>) }
                    </Col>
                    <Row>
                        <Col lg={2} md={2} sm={2} xs={2}>
                            <h1></h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={2} md={2} sm={2} xs={2}>
                            <Button variant="success" size="lg" onClick={volverHandler}>Volver</Button>
                        </Col>
                    </Row>
                </Row> 
                
            </Container>           
        </div>
    )
}

export default ApiMap;

