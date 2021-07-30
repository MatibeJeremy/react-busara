import React, {useEffect, useRef, useState} from "react";
import axios from "axios";

function Questions() {
    const [result, setResult] = useState([]);
    const [q_id, setQ] = useState('');
    const [q_ans, setQans] = useState('');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(null);
    const [time, setTime] = useState(Date().toLocaleString())
    const form = useRef(null);

    const handleSubmit = (evt) => {
        setLoading(true);
        evt.preventDefault();
        const data = [
            {
                "local_id": 8,
                "start_time": time,
                "location": {
                    "lon": 0.0,
                    "accuracy": 0.0,
                    "lat": 0.0
                },
                "ans": [
                    {
                        "q_id": q_id,
                        "q_ans": q_ans,
                        "column_match": "first_name"
                    },
                    {
                        "q_id": q_id,
                        "q_ans": q_ans,
                        "column_match": "last_name"
                    },
                    {
                        "q_id": q_id,
                        "q_ans": q_ans,
                        "column_match": "contact"
                    },
                    {
                        "q_id": q_id,
                        "q_ans": q_ans,
                        "column_match": "country"
                    },
                    {
                        "q_id": q_id,
                        "q_ans": q_ans,
                        "column_match": "county"
                    },
                    {
                        "q_id": q_id,
                        "q_ans": q_ans,
                        "column_match": "constituency"
                    },
                    {
                        "q_id": q_id,
                        "q_ans": q_ans,
                        "column_match": "ward"
                    },
                    {
                        "q_id": q_id,
                        "q_ans": q_ans,
                        "column_match": "gender"
                    },
                    {
                        "q_id": q_id,
                        "q_ans": q_ans,
                        "column_match": "education"
                    }
                ],
                "user": user.id,
                "survey_id": "",
                "end_time": Date().toLocaleString()
            }
        ]

        const url = "http://fullstack-role.busara.io/api/v1/recruitment/answers/submit/";

        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            'HTTP_VERSIONCODE': 200,
            'VERSIONCODE': 200,

            data: data,
            url,
        };
        axios(options)
            .then((response) => {
                console.log(response)
            }).catch((error) => {
            setLoading(false);
            console.log(error);
        });
    }

    useEffect(() => {
        const url = "https://fullstack-role.busara.io/api/v1/recruitment/forms/?node_type=Both";

        axios.get(url, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })
            .then((response) => {
                setResult(response.data.forms[0].pages);
                console.log(response.data);
            }).catch((error) => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        const url = "https://fullstack-role.busara.io/api/v1/users/current-user";

        axios.get(url, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })
            .then((response) => {
                setUser(response.data);
                console.log(response.data);
            }).catch((error) => {
            console.log(error);
        });
    }, []);

    let loading2;
    if (loading) {
        loading2 = <p>Loading...</p>
    }


    return (
        <div>
            {
                result.map(pObj => {
                    return ([
                        <div className="card" style={{width: "18px;"}}>
                            <div className="card-body">
                                <h5 key={pObj.id} className="card-title" tyle={{padding: "18rem;"}}>Page: {pObj.id}(Insert
                                    All Details)</h5>
                            </div>
                        </div>,
                        pObj.sections.map(qObj => {
                            return ([
                                <h5 key={qObj.id} className="card-title"
                                    style={{padding: "10px", marginLeft: "40%", color: "white"}}>Section
                                    - {qObj.description}</h5>,
                                qObj.questions.map(rObj => {
                                    return ([
                                        <div className="card" id="card">
                                            <div id="form">
                                                {loading2}
                                                <form ref={form} onSubmit={handleSubmit}>
                                                    <div className="input-group mb-3">
                                                        <label style={{padding: "10px"}} className="form-label"
                                                               key={rObj.id}>{rObj.description || rObj.column_match}</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder={rObj.description || rObj.column_match}
                                                            aria-label="Username"
                                                            value={q_ans}
                                                            onChange={e => setQans(e.target.value)}
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
                <button onClick={handleSubmit} className="btn btn-success">Submit Answers</button>
            </div>
        </div>
    )
}

export default Questions;