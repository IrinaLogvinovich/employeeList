import { FC, useEffect, useState } from "react";
import { IEmployee, useAppSelector } from "../../types";
import css from './styles.module.scss'
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { TEmployeeFormSchema, employeeFormSchema } from "../../components/Form/config/formSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import { RoleDictionary, useAppDispatch, TRole } from '../../types/index';
import { fetchNewEmployee, fetchEditEmployee } from "../../store/actions";
import { Button, Checkbox, FormControl, FormControlLabel, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { PatternFormat } from "react-number-format";
import Popup from "../Popup/Popup";
import { changeSubmitStatus } from "../../store/reducers/employee";
import { useNavigate } from "react-router-dom";



interface EmployeeFormProps {
    defaultData?: IEmployee
}
 
const EmployeeForm: FC<EmployeeFormProps> = ({defaultData}) => {
    const dispatch = useAppDispatch()
    const submitStatus = useAppSelector(({employee}) => employee.submitStatus);
    const [popupOpen, setPopupOpen] = useState(false)
    const navigate = useNavigate();
    
    const { control, handleSubmit, setValue, register, reset, formState: { errors } } = useForm<TEmployeeFormSchema>({
        resolver: zodResolver(employeeFormSchema),
        shouldFocusError: false,
        defaultValues: defaultData,
        mode: 'onBlur',
    });
    const onSubmit: SubmitHandler<TEmployeeFormSchema> = (data) => {
        const info = data as IEmployee
        
        if ( defaultData) {
            info.id = defaultData.id
            dispatch(fetchEditEmployee(info))
        } else {
            dispatch(fetchNewEmployee(info))
            
            reset({
                'name': '',
                'phone': '',
                'birthday': '',
            })
            reset()
        }
    }

    const onPopupClose = () => {
        setPopupOpen(false);
        dispatch(changeSubmitStatus('init'))
    }

    const onPageClose = () => {
        navigate('/')
        dispatch(changeSubmitStatus('init'))
    }

    useEffect(()=> {
        if (submitStatus === 'success') setPopupOpen(true)
    }, [submitStatus])


    return (
        <>
            <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
                <TextField 
                    label="Фамилия Имя" 
                    inputProps={register('name')}
                    error={Boolean(errors?.name)} 
                    helperText={errors?.name?.message} 

                />
                
                <Controller name="phone"
                    control={control}
                    render={({ field: {ref, ...props }}) => {
                        return <PatternFormat 
                            type="tel" 
                            allowEmptyFormatting 
                            format="+7 ### ###-####" 
                            mask="_" 
                            label="Номер телефона"
                            error={Boolean(errors?.phone)} 
                            helperText={errors?.phone?.message}
                            customInput={TextField} 
                            getInputRef={ref}
                            {...props} 
                        />
                    }} 
                />
                <Controller name="birthday"
                    control={control}
                    render={({ field: { ref, ...props } }) => {
                        return <PatternFormat
                            type="text"
                            allowEmptyFormatting
                            format="##.##.####"
                            mask="_"
                            label="Дата рождения"
                            error={Boolean(errors?.birthday)}
                            helperText={errors?.birthday?.message}
                            customInput={TextField}
                            getInputRef={ref}
                            {...props}
                        />
                    }}
                />

                <FormControl fullWidth error={Boolean(errors?.role)}>
                    <InputLabel id="role-label">Должность</InputLabel>
                    <Controller name="role"
                        control={control}
                        render={({ field }) => <Select
                                labelId="role-label"
                                id="role"
                                label="Должность"
                                {...field}
                                value={field.value ?? ''}
                            >
                                {Object.keys(RoleDictionary).map((key) => (
                                    <MenuItem key={key} value={key}>{RoleDictionary[key as TRole]}</MenuItem>
                                ))}
                            </Select>
                            }
                    />
                    {errors?.role?.message && <FormHelperText>{errors?.role?.message}</FormHelperText>}
                </FormControl>

                <Controller name="isArchive"
                    control={control}
                    render={({ field }) => <FormControlLabel control={<Checkbox {...field} checked={field.value ?? false} />} label="В архив" />}
                />
                <Button variant="contained" type="submit" size="large" disabled={submitStatus === 'loading'}>Сохранить</Button>
            </form>
            <Popup status={popupOpen} onClose={onPopupClose}>
                {submitStatus === 'success' && <>
                    <Typography variant="h2" className={css.innerTitle}>
                        Данные успешло сохранены
                    </Typography>
                    <div className={css.innerButtons}>
                        <Button variant="contained" fullWidth onClick={onPageClose}>К списку сотрудников</Button>
                        <Button variant="contained" onClick={onPopupClose} fullWidth>Закрыть</Button>
                    </div>
                </>}
                {submitStatus === 'error' && <>
                    <Typography variant="h2" className={css.innerTitle}>
                        При сохранении данных произошла ошибка
                    </Typography>
                    <div className={css.innerButtons}>
                        <Button variant="contained" onClick={onPopupClose} fullWidth>Закрыть</Button>
                    </div>
                </>}
            </Popup>
        </>
    );
}
 
export default EmployeeForm;