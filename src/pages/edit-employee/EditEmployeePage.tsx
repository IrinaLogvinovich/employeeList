import { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import { IEmployee, TStatus } from "../../types";
import EmployeeForm from "../../components/Form/Form";
import { Typography } from "@mui/material";
import NotFound from "../not-found/NotFound";

const EditEmployeePage: FC = () => {
    const params = useParams()
    const [employee, setEmployee] = useState<IEmployee>()
    const [status, setStatus] = useState<TStatus>('init')

    useEffect(() => {
        setStatus('loading')
        fetch(`http://localhost:3000/employees/${params.id}`)
            .then((data) => {
                if (data.ok) {
                    return data.json()
                } else {
                    throw new Error('Сотрудник не найден')
                }
            })
            .then((data) => {
                setEmployee(data)
                setStatus('success')
            })
            .catch((error) => {
                console.log(error);
                setStatus('error')
            })
    }, [])

    if (status === 'error') return <NotFound message={"Сотрудник не найден"} />

    return (
        <div>
            <Typography variant="h1" className="page-title">
                Редактирование сотрудника
            </Typography>
            {status === 'loading' && <p>ЗАГРУЗКА ДАННЫХ...</p>}
            {status === 'success' && <EmployeeForm defaultData={employee}/>}
        </div>
    );
}
 
export default EditEmployeePage;