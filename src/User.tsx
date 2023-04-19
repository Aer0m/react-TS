import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import {Button, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import UserCard from './Card';
import { myStore } from './Employees';

function User(){
    const {userId}: any = useParams();

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(myStore.initialList[userId].name);
    const [birthday, setBirthday] = useState(myStore.initialList[userId].birthday);
    const [phone , setPhone] = useState(myStore.initialList[userId].phone);
    const [email, setEmail] = useState(myStore.initialList[userId].email);
    const [days, setDays] = useState(myStore.initialList[userId].days);
    const [wage, setWage] = useState(myStore.initialList[userId].wage);

    const [nameDirty, setNameDirty] = useState(false);
    const [birthdayDirty, setBirthdayDirty] = useState(false);
    const [phoneDirty, setPhoneDirty] = useState(false);
    const [emailDirty, setEmailDirty] = useState(false);
    const [daysDirty, setDaysDirty] = useState(false);
    const [wageDirty, setWageDirty] = useState(false);
    const [inputValid, setInputValid] = useState(false);

    const [nameError, setNameError] = useState('Имя не может быть пустым.');
    const [birthdayError, setBirthdayError] = useState('Укажите дату рождения!');
    const [phoneError, setPhoneError] = useState('Укажите телефон!');
    const [emailError, setEmailError] = useState('Почта не может быть пустой.');
    const [daysError, setDaysError] = useState('Работник должен отрабатывать хотя бы 1 день!');
    const [wageError, setWageError] = useState('Ставка должна соответствовать МРОТ!');

    useEffect(() =>{
        if (nameError || birthdayError || phoneError || emailError || daysError || wageError){
            setInputValid(false);
        }
        else {
            setInputValid(true);
        }
    }, [nameError, birthdayError, phoneError, emailError, daysError, wageError]);

    const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        const val = e.target.value;
        if (val !== ''){
            setNameError('');
        }
        else{
            setNameError('Имя не может быть пустым.');
        }
    }

    const birthdayHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBirthday(e.target.value);
        const re = /^\d{4}-\d{2}-\d{2}$/;
        if (!re.test(String(e.target.value))){
            setBirthdayError('Введите дату рождения!');
        }
        else{
            setBirthdayError('');
        }
    }

    const phoneHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
        const re = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
        if (!re.test(String(e.target.value))){
            setPhoneError('Некорректный номер телефона');
        }
        else{
            setPhoneError('');
        }
    }

    const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(e.target.value).toLowerCase())){
            setEmailError('Некорректный e-mail');
        }
        else{
            setEmailError('');
        }
    }

    const daysHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDays(parseInt(e.target.value));
        const re = /^(3[01]|[12]\d|[1-9])$/;
        if (!re.test(String(e.target.value).toLowerCase())){
            setDaysError('Количество дней может быть от 1 до 31.');
        }
        else{
            setDaysError('');
        }
    }

    const wageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWage(parseInt(e.target.value));
        const val = parseInt(e.target.value);
        if(val > 0){
            setWageError('');
        }
        else{
            setWageError('Ставка должна быть больше 0!');
        }
    }

    const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setIsEditing(true);
    }

    const handleSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        myStore.initialList[userId].name = name;
        myStore.initialList[userId].birthday = birthday;
        myStore.initialList[userId].phone = phone;
        myStore.initialList[userId].email = email;
        myStore.initialList[userId].days = days;
        myStore.initialList[userId].wage = wage;

        setIsEditing(false);
    }

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setName(myStore.initialList[userId].name);
        setBirthday(myStore.initialList[userId].birthday);
        setPhone(myStore.initialList[userId].phone);
        setEmail(myStore.initialList[userId].email);
        setDays(myStore.initialList[userId].days);
        setWage(myStore.initialList[userId].wage);

        setIsEditing(false);
    }


    const blurHandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        switch (e.target.name){
            case 'name':
                setNameDirty(true);
                break;

            case 'birthday':
                setBirthdayDirty(true);
                break;

            case 'phone':
                setPhoneDirty(true);
                break;

            case 'email':
                setEmailDirty(true);
                break;

            case 'days':
                setDaysDirty(true);
                break;

            case 'wage':
                setWageDirty(true);
                break;
        }
    }

    return(
        <Container style={{ justifyContent: 'center' }}>
            <UserCard
                name={isEditing? (
                    <div>
                        {(nameDirty && nameError) && <div style={{color:'red'}}>{nameError}</div>}
                        <input type="name" name={"name"}
                               onChange={e => nameHandler(e)}
                               onBlur={e => blurHandler(e)}
                               value={name}
                               onSubmit={e => setName(e.currentTarget.value)}/>
                    </div>): name}
                birthday={isEditing?(
                    <div>
                        {(birthdayDirty && birthdayError) && <div style={{color:'red'}}>{birthdayError}</div>}
                        <input type={"date"} name={"birthday"}
                               onChange={e => birthdayHandler(e)}
                               onBlur={e => blurHandler(e)}
                               value={birthday}
                               onSubmit={e => setBirthday(e.currentTarget.value)} />
                    </div>
                ): birthday}
                phone={isEditing? (
                    <div>
                        {(phoneDirty && phoneError) && <div style={{color:'red'}}>{phoneError}</div>}
                        <input type={"tel"} name={"phone"}
                               onChange={e => phoneHandler(e)}
                               onBlur={e => blurHandler(e)}
                               value={phone}
                               onSubmit={e => setPhone(e.currentTarget.value)} />
                    </div>): phone}
                email={isEditing?(
                    <div>
                        {(emailDirty && emailError) && <div style={{color:'red'}}>{emailError}</div>}
                        <input type={"email"} name={"email"}
                               onChange={e => emailHandler(e)}
                               onBlur={e => blurHandler(e)}
                               value={email}
                               onSubmit={e => setEmail(e.currentTarget.value)} />
                    </div>
                ): email}
                days={isEditing?(
                    <div>
                        {(daysDirty && daysError) && <div style={{color:'red'}}>{daysError}</div>}
                        <input type={"text"} name={"days"}
                               onChange={e => daysHandler(e)}
                               onBlur={e => blurHandler(e)}
                               value={days}
                               onSubmit={e => setDays(parseInt(e.currentTarget.value))} />
                    </div>
                ): days}
                wage={isEditing?(
                    <div>
                        {(wageDirty && wageError) && <div style={{color:'red'}}>{wageError}</div>}
                        <input type={"text"} name={"wage"}
                               onChange={e => wageHandler(e)}
                               onBlur={e => blurHandler(e)}
                               value={wage}
                               onSubmit={e => setWage(parseInt(e.currentTarget.value))} />
                    </div>
                ):wage}
            />
            <div>{isEditing? (
                    <div>
                        <Button as={"input"} type={"reset"} value={"Отмена"} variant={"danger"} onClick={e => handleCancel(e)}/>
                        <Button disabled={!inputValid} as={"input"} type={"submit"} value={"Сохранить"} variant={"success"} onClick={e => handleSave(e)}/>
                    </div>):
                <div>
                    <Button as={"input"} type={"submit"} value={"Изменить"} variant={"primary"} onClick={e => handleEdit(e)}/>
                </div>
            }
            </div>
        </Container>
    );
}

export default User;