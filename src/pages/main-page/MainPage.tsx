import { FC, useEffect } from "react";
import { IEmployee, useAppDispatch, useAppSelector } from "../../types";
import { fetchEmployeeList } from "../../store/actions";
import { Grid, Typography } from "@mui/material";
import Filter from "../../components/Filter/Filter";
import EmployeeItem from "../../components/EmployeeItem/EmployeeItem";
import NotFound from "../not-found/NotFound";

const MainPage: FC = () => {
    const { employeeList, filter, status } = useAppSelector(({ employee }) => employee);
    const dispatch = useAppDispatch();
    
    useEffect(()=> {
        dispatch(fetchEmployeeList());
    }, [])

    if (status === 'error') return <NotFound message="При загрудке приложения произошла ошибка, попробуйте позже"/>

    const filterList: IEmployee[] = employeeList.filter((item) => {
        return ((filter.isArchive === false || filter.isArchive === item.isArchive) &&
            (filter.role === '' || filter.role === item.role)) 
    }).sort((a, b)=> {
        if (filter.sort === 'name') {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
            }
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
            }
            return 0;
        }

        if (filter.sort === 'birthday') {
            return Date.parse(a.birthday.split('.').reverse().join('.')) - Date.parse(b.birthday.split('.').reverse().join('.'))
        }

        return 0
    })

    return (
        <>
            <Typography variant="h1" className="page-title">
                Список сотрудников
            </Typography>
            {status === 'loading' && <p>ЗАГРУЗКА ДАННЫХ...</p>}
            
            {status === 'success' && <>
                <Filter />
                <Grid container spacing={0}>
                    {filterList.map((item) => (
                        <Grid item xs={12} key={item.id}>
                            <EmployeeItem employee={item} />
                        </Grid>
                    ))}
                </Grid>
            </>}
        </>
    );
}
 
export default MainPage;