import React,{useState,useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import FormCheck from 'react-bootstrap/FormCheck';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { helpHttp } from '../helpers/helpHttp';
import Alert from 'react-bootstrap/Alert';
import { Redirect,useHistory} from 'react-router';
import auth from "./Auth";

const LoginForm = () => {
    let history = useHistory();
    const [response, setResponse] = useState(null);
    const [isValidate, setIsValidate] = useState(false);
    const [path, setPath] = useState(null);
    const [error, setError] = useState(null);


    const onClickHandler = ()=>{
        setPath(`/Reservar/`);
    }

   useEffect(() => {
       auth.login(() => {
            history.push(path);
            setIsValidate(true);
       });
   }, [path])
    

    return (
        <Container>
             <Row>
                <Col xs={3} md={2} lg={3}/>
                <Col xs={6} md={6} lg={6}>
                    <h1>Proyecto Semilla  PII-DETRI-2021-01</h1>
                </Col>
                <Col xs={3} md={2} lg={2}/>
            </Row>
            <Row>
                <Col xs={3} md={2} lg={3}/>
                <Col xs={6} md={6} lg={6}>
                <p align="center">Implementación de un prototipo de red para alertar el robo de ganado vacuno utilizando tecnología Sigfox 
                                  </p>
                </Col>
                <Col xs={3} md={2} lg={2}/>
            </Row>
            <Row>
                <Col xs={3} md={2} lg={3}/>
                <Col xs={6} md={6} lg={6}>
                <p align="center">DETRI</p>
                </Col>
                <Col xs={3} md={2} lg={2}/>
            </Row>
            <Row>
                <Col xs={3} md={2} lg={3}/>
                <Col xs={6} md={6} lg={6}>
                <p align="center">Facultad de Ingenieria Eléctrica</p>
                </Col>
                <Col xs={3} md={2} lg={2}/>
            </Row>
            <Row>
                <Col xs={5} md={5} lg={5}/>
                <Col xs={4} md={4} lg={4}>
                    <Button onClick={onClickHandler} > Iniciar </Button>
                </Col>
            </Row>
        </Container>
    )
}

export default LoginForm;
