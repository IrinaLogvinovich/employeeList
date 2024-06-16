import { FC } from "react";
import { Link } from "react-router-dom";
import css from './styles.module.scss'

interface MenuProps {
    
}
 
const Menu: FC<MenuProps> = () => {
    return (
        <div className={css.menu}>
            <Link className={css.menu__link} to="/">Список сотрудников</Link>
            <Link className={css.menu__link} to="/add-employee">Добавить сотрудника</Link>
        </div>
    );
}
 
export default Menu;