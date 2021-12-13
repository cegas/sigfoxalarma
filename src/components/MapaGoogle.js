import React,{useEffect,useState} from 'react'
import {GoogleMap,withScriptjs, withGoogleMap, Marker} from "react-google-maps";
import uuid from 'react-uuid';
import { helpHttp } from '../helpers/helpHttp';
import logo from "../gren-icon1.svg";
import logo2 from "../red-circle.svg";


const MapaGoogle = ({markers, setBicycle,cedula,setIdDispositivo,idDispositivo,estado}) => {
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState(null);
    const [reload, setReload] = useState(true);
    const [response, setResponse] = useState([]);


    const iterator = async () => {
        console.log(response);
        response.forEach( async (el) => {
            console.log(cedula);
            if(el.Cedula == cedula){
                setIdDispositivo(el.Id);
                console.log(idDispositivo);
            }
        });
    }
    
    useEffect(() => {
        
        let url =`https://wz0z3ny13j.execute-api.eu-west-2.amazonaws.com/ModifyStatus/Transaction_Proccessor_7`;
        
        
        helpHttp().get(url).then((res)=> {
                if(!res.err){
                    res = JSON.parse(res.data.replace(/Decimal[(]/g,"").replace(/[)]/g,"").replace(/[']/g,`"`));
                    setResponse(res);
                    setUsuarios(res);
                    setError(null);
                    res.forEach( async (el) => {
                        if(el.Cedula == cedula){
                            setIdDispositivo(el.Id);
                            console.log(idDispositivo);
                        }
                    })
                }else{
                    setUsuarios(null);
                    setError(res);
                }
        }) 
        
    }, []);

    useEffect(() => {
        console.log(idDispositivo);
    }, [reload]);
    
    
    const handleClick = (el) => {
        if(reload){
            setReload(false);
        }else{
            setReload(true);
        }
    }

    return (
        <div>
            {markers.length === 0 ? <h1>Cargando</h1> : 
                <GoogleMap
                className="map"
                defaultZoom={10}
                defaultCenter={{lat:-0.3508, lng: -78.452}}
                onClick={handleClick}
                >

                    {markers.map( (el) => (
                                <>
                                    
                                    <Marker 
                                        onClick= { ()=> setBicycle(el)}
                                        key = {uuid()} 
                                        position = {{lat: parseFloat(el.latitude), lng: parseFloat(el.longitude)}}
                                        icon = {{url: parseInt(el.SOS) === 0 ? logo : logo2, scaledSize: new window.google.maps.Size(40, 40),}}/>
                                   
                                </>

                            ))
                    }
                </GoogleMap>
            }
        </div>
    )
}


export default withScriptjs(
    withGoogleMap(
        MapaGoogle
    )
);

/*
{if(el.status===0) ? <h1>HOLA</h1>}
                                    {el.status ? (<Marker 
                                        onClick= { ()=> setBicycle(el)}
                                        key = {uuid()} 
                                        position = {{lat: parseFloat(el.latitude), lng: parseFloat(el.longitude)}}
                                        icon = {{url: logo, scaledSize: new window.google.maps.Size(40, 40),}}/>
                                    ) : (
                                        <Marker 
                                        onClick= { ()=> setBicycle(el)}
                                        key = {uuid()} 
                                        position = {{lat: parseFloat(el.latitude), lng: parseFloat(el.longitude)}}
                                        icon = {{url: logo2, scaledSize: new window.google.maps.Size(40, 40),}}/>
                                    )
                                    }
*/