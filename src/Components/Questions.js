import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import qs from "qs";

function Questions(){
    const [result,setResult] = useState([]);
    // const [q_id,setQ] = useState('');
    // const [password,setPassword] = useState('');
    const form = useRef(null);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const data = [
            {
                "local_id": 8,
                "start_time": Date().toLocaleString(),
                "location": {
                    "lon": 0.0,
                    "accuracy": 0.0,
                    "lat": 0.0
                },
                "ans": [
                    {
                        "q_id": "1",
                        "q_ans": "John",
                        "column_match": "first_name"
                    },
                    {
                        "q_id": "2",
                        "q_ans": "Doe",
                        "column_match": "last_name"
                    },
                    {
                        "q_id": "3",
                        "q_ans": "+2547**",
                        "column_match": "contact"
                    },
                    {
                        "q_id": "4",
                        "q_ans": "Kenya",
                        "column_match": "country"
                    },
                    {
                        "q_id": "5",
                        "q_ans": "Nairobi",
                        "column_match": "county"
                    },
                    {
                        "q_id": "6",
                        "q_ans": "Kibra",
                        "column_match": "constituency"
                    },
                    {
                        "q_id": "7",
                        "q_ans": "Kibra",
                        "column_match": "ward"
                    },
                    {
                        "q_id": "11",
                        "q_ans": 1,
                        "column_match": "gender"
                    },
                    {
                        "q_id": "10",
                        "q_ans": 1,
                        "column_match": "educaqtion"
                    }
                ],
                "user": "<your user ID>",
                "survey_id": "<survey ID>",
                "end_time": "2021-02-02 09:21:08.032 +0300"
            }
        ]

        const url = "http://fullstack-role.busara.io/api/v1/oauth/token/";

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
            console.log(error);
            window.location.reload();
        });
    }

    useEffect( ()=>{
        const url = "https://fullstack-role.busara.io/api/v1/recruitment/forms/?node_type=Both";

        axios.get(url,{
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })
            .then((response) => {
                setResult(response.data.forms[0].pages);
                console.log(response.data.forms[0].pages);
            }).catch((error)=>{
            console.log(error);
        });
    },[]);



    return (
        <div>
            {
                result.map(pObj=>{
                    return([
                        <div className="card" style={{width: "18px;"}}>
                            <div className="card-body">
                                <h5 key={pObj.id} className="card-title"tyle={{padding: "18rem;"}}>Page: {pObj.id}(Insert All Details)</h5>
                            </div>
                        </div>,
                        pObj.sections.map(qObj=>{
                            return([
                                <h5 key={qObj.id} className="card-title" style={{padding:"10px", marginLeft:"40%", color:"white"}}>Section - {qObj.description}</h5>,
                                qObj.questions.map(rObj=>{
                                    return([
                                        <div className="card" id="card">
                                            <div id="form">
                                                <form ref={form} onSubmit={handleSubmit}>
                                                    <div className="input-group mb-3">
                                                        <label style={{padding:"10px"}} className="form-label" key={rObj.id}>{rObj.description || rObj.column_match}</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder={rObj.description || rObj.column_match}
                                                            aria-label="Username"
                                                            // value={username}
                                                            // onChange={e => setUsername(e.target.value)}
                                                            aria-describedby="basic-addon1"
                                                            required/>
                                                    </div>
                                                </form>
                                            </div>

                                        </div>
                                    ])
                                })
                            ])
                        })
                    ])
                })
            }

                <div className="card-body">
                <button className="btn btn-success">Submit Answers</button>
                </div>
        </div>
    )
}
export default Questions;