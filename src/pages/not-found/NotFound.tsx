import { Button, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface NotFoundProps {
    message?: string
}
 
const NotFound: FC<NotFoundProps> = ({message}) => {
    const navigate = useNavigate()
    return (
        <div>
            <Typography variant="h1" className="page-title">
                {message ? message : 'Страница не найдена'}
            </Typography>
            <Button variant="contained" onClick={() => navigate('/')}>К списку сотрудников</Button>
        </div>
    );
}
 
export default NotFound;