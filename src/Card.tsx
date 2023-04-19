import React from 'react';

function UserCard(props: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> |
        React.ReactFragment | null | undefined; birthday: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | React.ReactFragment | React.ReactPortal | null | undefined; phone: string | number | boolean | React.ReactElement<any, string |
        React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; email: string | number | boolean |
        React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; days: string |
        number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> |
        React.ReactFragment | React.ReactPortal | null | undefined; wage: string | number | boolean | React.ReactElement<any, string |
        React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) {
    return (
        <div className="user-card">
            <h2>{props.name}</h2>
            <ul>
                <li>Имя: {props.name}</li>
                <li>Дата рождения: {props.birthday}</li>
                <li>Телефон: {props.phone}</li>
                <li>Email: {props.email}</li>
                <li>Кол-во отработанных дней: {props.days}</li>
                <li>Ставка/день: {props.wage}</li>
            </ul>
        </div>
    );
}

export default UserCard;
