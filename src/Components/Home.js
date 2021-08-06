import './styles.css';
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import HomeIcon from '@material-ui/icons/Home';
import {useDispatch} from "react-redux";
import NavigationIcon from '@material-ui/icons/Navigation';
import {
    Alert,
    Avatar,
    Badge,
    Breadcrumbs,
    Card, Chip, emphasize, Fab,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText, SnackbarContent,
    Typography
} from "@material-ui/core";
import { styled } from '@material-ui/core/styles';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
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

function Home() {
    let history = useHistory();
    const [user, setUser] = useState([]);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }));

    useEffect(() => {
        const url = "https://fullstack-role.busara.io/api/v1/users/current-user";

        axios.get(url, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })
            .then((response) => {
                setUser(response.data);
                setSuccess(true);
                setTimeout(() => { setSuccess(false); }, 3000);
                console.log(response.status);

            }).catch((error) => {
                setError(true);
                setTimeout(() => { setError(false); }, 3000);
                if(error.response.status === 401){
                    history.push('/login');
                }else{
                    history.push('/login');
                }
                console.log(error.response.status);
        });
    }, []);

    let successMes;
    let errorMes;
    if(success){
        successMes = <SnackbarContent
            message={
                'All User Details Loaded Successfully'
            }
        />
    }
    if(error){
        errorMes = <SnackbarContent
            message={
                'There was an error. You need to log in!'
            }
        />
    }
    return (
        <div>
            {successMes}{errorMes}
            <Breadcrumbs aria-label="breadcrumb" style={{marginLeft:"10%",marginTop:"20px"}}>
                <StyledBreadcrumb
                    component="a"
                    onClick={() => {
                        history.push('/home')
                    }}
                    label="Home"
                    icon={<HomeIcon fontSize="small" />}
                />
                <StyledBreadcrumb component="a" onClick={() => {
                    history.push('/questions')
                }} label="Questions" />
            </Breadcrumbs>
            <Card sx={{ maxWidth: 500, margin:"auto", marginTop:"3%", borderRadius:"20px" }}>
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                    style={{marginLeft:"46%",marginTop:"20px"}}
                >
                    <Avatar alt={user.name || '...'}  />
                </StyledBadge>
                <div className="card-body">
                    <Typography gutterBottom sx={{margin:"auto"}} variant="h5" component="div">
                        User Details
                    </Typography>

                </div>

                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <ListItem>
                        <ListItemText primary="Name" secondary={user.name || 'Loading...'} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Email" secondary={user.email || 'Loading...'} />
                    </ListItem>
                    <ListItem>

                        <ListItemText primary="Phone Number" secondary={user.phone_number || 'Loading...'} />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <LocationOnIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Universe Name" secondary={user.universe_name || 'Loading...'} />
                    </ListItem>
                </List>
            </Card>
        </div>
    )
}

export default Home;