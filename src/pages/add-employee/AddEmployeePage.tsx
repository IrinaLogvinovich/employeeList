import { FC } from "react";
import EmployeeForm from "../../components/Form/Form";
import { Typography } from "@mui/material";

const AddEmployeePage: FC = () => {
    return (
        <div>
            <Typography variant="h1" className="page-title">
                Добавление сотрудника
            </Typography>
            <EmployeeForm />
        </div>
    );
}
 
export default AddEmployeePage;