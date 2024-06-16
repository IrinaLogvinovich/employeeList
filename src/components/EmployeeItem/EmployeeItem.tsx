import { FC } from "react";
import { IEmployee } from "../../types";
import { Link } from "react-router-dom";
import css from './styles.module.scss'
import { RoleDictionary } from '../../types/index';

interface EmployeeItemProps {
    employee: IEmployee
}
 
const EmployeeItem: FC<EmployeeItemProps> = ({ employee }) => {
    return (

        <Link to={`/edit-employee/${employee.id}`} className={css.employee}>
            <div>
                <div className={css.employee__name}>{employee.name}</div>
            </div>
            <div>
                <div className={css.employee__centerAlign}>{employee.phone}</div>
            </div>
            <div >
                <div className={css.employee__centerAlign}>{RoleDictionary[employee.role]}</div>
            </div>
        </Link>

    );
}
 
export default EmployeeItem;