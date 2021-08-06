import React, {useEffect, useRef, useState} from 'react';
import {login} from "../Features/userSlice";
import axios from 'axios';
import './styles.css';
import qs from 'qs';
import {useDispatch} from "react-redux";
import {Alert, Card, Icon, TextField} from "@material-ui/core";

function Form() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [flash, setFlash] = useState(true);
    const form = useRef(null);

    const dispatch = useDispatch();

    const handleLoad = (evt) => {
        setLoading(true);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        handleLoad();
        const data = {
            username: username,
            password: password,
            grant_type: 'password',
            client_id: 'zVs3J7FZupB3TLPskQOy1xHLwYTRkzUSf2rdTDCu',
            client_secret: 'Zv19oWmm416sTyjWT5Sx2r1gRwjWrXU3P5dWledQpYjxEvavS58SPtz03M8wvsgajaVLhcimmJIUUYUDad06V6HQosmPoj3TPRNjg7bgniQlooIwyFWfz8KfkM5Tdh7R',
        }

        const url = "https://fullstack-role.busara.io/api/v1/oauth/token/";

        const options = {
            method: 'POST',
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            data: qs.stringify(data),
            url,
        };
        axios(options)
            .then((response) => {
                setSuccess(true);
                localStorage.setItem('access_token', response.data.access_token);
                dispatch(login({
                    access_token:response.data.access_token,
                    loggedIn:true
                }));
                console.log(response.data);
                setLoading(false);
                setSuccessMessage('Success - Logging in...')
                window.location.pathname = "/home";
            }).catch((error) => {
            setLoading(false);
            setError(true);
            setTimeout(() => { setError(false); }, 2000);
            setErrorMessage(error.response.data.error_description);
        });
    }

    useEffect(() =>{
        setTimeout(() => { setFlash(false); }, 3000);
    })

    let errorMess;
    let successMess;
    let loadingMes;
    let flashMessage;
    if(error){
        errorMess = <Alert style={{margin:"10px"}} severity="error">{errorMessage}</Alert>
    }
    if(success){
        successMess = <Alert style={{margin:"10px"}} severity="success">{successMessage}</Alert>
    }

    if(loading){
        loadingMes = <p>Loading...</p>
    }

    if(flash){
        flashMessage = <Alert severity="warning">Errors might occur if your internet is unstable!</Alert>
    }


    return (
        <div>
            {flashMessage}
            <Card sx={{ maxWidth: 345, margin:"auto", marginTop:"10%", borderRadius:"20px" }}>
                <h5 className="card-header"><p style={{float: "center", margin:"auto"}}>
                    <svg style={{marginLeft:"40%"}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                         className="bi bi-person-square" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                        <path
                            d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"/>
                    </svg> Log in</p></h5>
                <div id="form">
                    <form ref={form} onSubmit={handleSubmit}>
                        {errorMess}{successMess}{loadingMes}
                        <div className="input-group mb-3">
                            <TextField
                                id="filled-basic"
                                placeholder="matibealloys@gmail.com"
                                label="Username"
                                style={{margin:"auto"}}
                                variant="outlined"
                                value={username}
                                onChange={e => setUsername(e.target.value)}/>
                        </div>

                        <div className="input-group mb-3">


                            <TextField
                                id="filled-basic"
                                type="Password"
                                placeholder="jeremyalloys45"
                                label="Password"
                                variant="outlined"
                                style={{margin:"auto"}}
                                value={password}
                                onChange={e => setPassword(e.target.value)}/>
                        </div>


                        <div className="input-group">
                            <button style={{margin:"auto"}} disabled={loading} className="btn btn-primary" type="submit" value="submit">Login</button>
                        </div>
                    </form>
                </div>
            </Card>
        </div>
    )
}

export default Form;