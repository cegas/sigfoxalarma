import React, { useState,useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { helpHttp } from '../helpers/helpHttp';

const TablaBicicleta = ({bicycle,cedula,setStatus,status}) => {

    const [data, setData] = useState([]);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [response2, setResponse2] = useState(null);
    const [usuarios, setUsuarios] = useState([]);
    const [errorUsarios, setErrorUsuarios] = useState(null);
    const [validacion, setValidacion] = useState(false);


    let {timestamp} = bicycle;
    useEffect(() => {
        validarReserva();
    }, [usuarios])

    const validarReserva= () =>{
        usuarios.map((el) => {
            
            if(el.Cedula  == cedula ){
                console.log(el.Cedula);
                if(el.Status == "ON"){
                    setValidacion(true);
                    console.log(validacion);
                    console.log(el.Status);
                    console.log("hola");
                    
                }
                else{
                    setValidacion(false);
                    console.log(el.Status);
                    console.log(validacion);
                    console.log("hola");
                    
                }
            }
        });
    } 
    useEffect(() => {
        
        
        var timestampI = parseInt(timestamp);
        
        var fecha = new Date (timestampI*1000);
        
        let url = `https://wz0z3ny13j.execute-api.eu-west-2.amazonaws.com/ModifyStatus/Transaction_Proccessor_7`;
        setData("" 
                    +fecha.getDate()+
                    "/"+(fecha.getMonth()+1)+
                    "/"+fecha.getFullYear()+
                    " "+fecha.getHours()+
                    ":"+fecha.getMinutes()+
                    ":"+fecha.getSeconds()
                );
        helpHttp().get(url).then((res) => {
            if(!res.err){
                setUsuarios(JSON.parse(res.data.replace(/Decimal[(]/g,"").replace(/[)]/g,"").replace(/[']/g,`"`)));
                setErrorUsuarios(null);
                
            }else{
                setUsuarios(null);
                setErrorUsuarios(res);
            }
        })
        
    }, [bicycle,status,response])

  
    return (
        <div>
            <Form >
                <Table className="map" variant="dark" striped bordered hover responsive size="xs">
                    <thead>
                        <tr>
                            <th>Id dispositivo</th>
                            <th>Latitud</th>
                            <th>Longitud</th>
                            <th>SOS</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{bicycle.deviceid}</td>
                            <td>{bicycle.latitude}</td>
                            <td>{bicycle.longitude}</td>
                            <td>{bicycle.SOS}</td>
                            <td>{data}</td>
                        </tr>        
                    </tbody>
                </Table>
            </Form>
            
        </div>
    )
}

export default TablaBicicleta;
