import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import moment from "moment";
import {Alert, Breadcrumbs, Card, Chip, emphasize, SnackbarContent, TextField} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import {styled} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";

function Questions() {
    const [result, setResult] = useState([]);
    const [q_id, setQ] = useState('');
    const [q_ans, setQans] = useState('');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [time, setTime] = useState(moment().format())
    const form = useRef(null);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [q_error, setQerror] = useState(false);
    let history = useHistory();

    const StyledBreadcrumb = styled(Chip)(({theme}) => {
        const backgroundColor =
            theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[800];
        return {
            backgroundColor,
            height: theme.spacing(3),
            color: theme.palette.text.primary,
            fontWeight: theme.typography.fontWeightRegular,
            '&:hover, &:focus': {
                backgroundColor: emphasize(backgroundColor, 0.06),
            },
            '&:active': {
                boxShadow: theme.shadows[1],
                backgroundColor: emphasize(backgroundColor, 0.12),
            },
        };
    });

    const handleSubmit = (evt) => {
        setQerror(true);
        setTimeout(() => { setQerror(false); }, 2000);
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
                "survey_id": "2",
                "end_time": moment().format()
            }
        ];


        const url = "http://fullstack-role.busara.io/api/v1/recruitment/answers/submit/";

        const options = {
            method: 'POST',
            headers: {
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
            console.log(error);
        });
    }

    useEffect(() => {
        setLoading(true);
        const url = "https://fullstack-role.busara.io/api/v1/recruitment/forms/?node_type=Both";

        axios.get(url, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })
            .then((response) => {
                setResult(response.data.forms[0].pages);
                console.log(response.data);
                setLoading(false);
                setSuccess(true);
                setTimeout(() => { setSuccess(false); }, 2000);
            }).catch((error) => {
            setLoading(false);
            setError(true);
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
    let successMes;
    let errorMes;
    let qErrorMes;
    if (loading) {
        loading2 = <p style={{color:"white",marginLeft:"40%",marginRight:"40%",marginTop:"20px"}}>Loading...</p>
    }
    if(success){
        successMes = <Alert sx={{margin:"10px"}} severity="success">All Questions Loaded Successfully!</Alert>
    }
    if(error){
        errorMes = <Alert sx={{margin:"10px"}} severity="error">There was an error. Check your internet!</Alert>
    }
    if(q_error){
        qErrorMes = <Alert sx={{margin:"10px"}} severity="error">Object Mapping Pending!</Alert>
    }


    return (
        <div>
            <Breadcrumbs aria-label="breadcrumb" style={{marginLeft: "10%", marginTop: "20px"}}>
                <StyledBreadcrumb
                    component="a"
                    onClick={() => {
                        history.push('/home')
                    }}
                    label="Home"
                    icon={<HomeIcon fontSize="small"/>}
                />
                <StyledBreadcrumb component="a" onClick={() => {
                    history.push('/questions')
                }} label="Questions"/>
            </Breadcrumbs>
            {loading2}{successMes}{errorMes}
            {
                result.map(pObj => {
                    return ([
                        <h5 key={pObj.id} className="card-title"
                            style={{padding: "10px", marginLeft: "35%", color: "white"}}>Page: {pObj.id}(Insert
                            All Details)</h5>,
                        pObj.sections.map(qObj => {
                            return ([
                                <h5 key={qObj.id} className="card-title"
                                    style={{padding: "10px", marginLeft: "35%", color: "white"}}>Section
                                    - {qObj.description}</h5>,
                                qObj.questions.map(rObj => {
                                    return ([
                                        <Card sx={{maxWidth: 345, margin: "auto", marginBottom: "5px"}}>
                                            <div id="form">
                                                <form ref={form} onSubmit={handleSubmit}>
                                                    <div className="input-group mb-3">
                                                        <TextField
                                                            id="filled-basic"
                                                            placeholder={rObj.description || rObj.column_match}
                                                            label={rObj.description || rObj.column_match}
                                                            style={{margin: "auto", width: "500px"}}
                                                            variant="outlined"
                                                            value={q_ans}
                                                            onChange={e => setQans(e.target.value)}/>
                                                    </div>
                                                </form>
                                            </div>

                                        </Card>
                                    ])
                                })
                            ])
                        })
                    ])
                })
            }
            {qErrorMes}

            <div className="card-body">
                <button onClick={handleSubmit} className="btn btn-primary">Submit Answers</button>
            </div>
        </div>
    )
}

export default Questions;