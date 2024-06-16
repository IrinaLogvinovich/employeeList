import { Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select } from "@mui/material";
import { FC } from "react";
import { RoleDictionary, TRole, useAppDispatch, useAppSelector } from "../../types";
import { changeFilterArchive, changeFilterRole, changeFilterSort, resetFilter } from "../../store/reducers/employee";
import css from './styles.module.scss'

interface FilterProps {
    
}
 
const Filter: FC<FilterProps> = () => {
    const dispatch = useAppDispatch();
    const filter = useAppSelector(({ employee }) => employee.filter)
    return (
        <form className={css.filter}>
            <FormControl fullWidth>
                <InputLabel id="sort-label">Сортировать</InputLabel>
                <Select
                    labelId="sort-label"
                    id="sort"
                    label="Сортировать"
                    value={filter.sort}
                    onChange={(e) => dispatch(changeFilterSort(e.target.value))}
                >
                    <MenuItem value={'name'}>По имени</MenuItem>
                    <MenuItem value={'birthday'}>По дате рождения</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="role-label">Должность</InputLabel>
                <Select
                    labelId="role-label"
                    id="role"
                    label="Должность"
                    value={filter.role}
                    onChange={(e) => dispatch(changeFilterRole(e.target.value))}
                >
                    {Object.keys(RoleDictionary).map((key) => (
                        <MenuItem key={key} value={key}>{RoleDictionary[key as TRole]}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControlLabel control={<Checkbox checked={filter.isArchive} onChange={(e) => dispatch(changeFilterArchive(e.target.checked))}/>} label="В архиве" />
            <Button type="reset" size="large" variant="contained" onClick={() => dispatch(resetFilter())}>Сбросить</Button>
        </form>
    );
}
 
export default Filter;