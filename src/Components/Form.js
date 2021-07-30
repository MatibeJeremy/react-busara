import React, {useState,useEffect,useRef} from 'react';
import axios from 'axios';
import './styles.css';
import qs from 'qs';
function Form(){
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);
    const form = useRef(null);
    useEffect(()=>{
    });

    const handleLoad = (evt) => {
        setLoading(true);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        handleLoad();
        const data = {
            username: username,
            password: password,
            grant_type:'password',
            client_id:'zVs3J7FZupB3TLPskQOy1xHLwYTRkzUSf2rdTDCu',
            client_secret:'Zv19oWmm416sTyjWT5Sx2r1gRwjWrXU3P5dWledQpYjxEvavS58SPtz03M8wvsgajaVLhcimmJIUUYUDad06V6HQosmPoj3TPRNjg7bgniQlooIwyFWfz8KfkM5Tdh7R',
        }

        const url = "https://fullstack-role.busara.io/api/v1/oauth/token/";

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(data),
            url,
        };
        axios(options)
            .then((response) => {
                localStorage.setItem('access_token', response.data.access_token);
                window.location.pathname = "/home";
            }).catch((error)=>{
                setLoading(false);
                setError(true);
                console.log(error);
                window.location.reload();
        });
    }

    let html;
    let errors;
    if(loading){
        return (
             html = <p>Loading...</p>
        )
    }

    if(error){
        return (
            errors = <p className="text-danger">Try again</p>
        )
    }

    return(
        <div>
            <p>{html}</p>
            <p>{errors}</p>
            <div className="card" id="card">
                <h5 className="card-header"><p style={{float:"center"}}>Log in</p></h5>
                <div id="form">
                    <form ref={form} onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">@</span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            aria-label="Username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            aria-describedby="basic-addon1"
                            required/>
                    </div>

                    <div className="input-group mb-3">

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            aria-label="password"
                            aria-describedby="basic-addon1"
                            required/>
                    </div>


                    <div className="input-group">
                        <button className="btn btn-warning" type="submit" value="submit">Login</button>
                    </div>
                    </form>
                </div>

            </div>
        </div>
    )
}
export default Form;