import './index.css';
//import 'materialize-css/bin/materialize.js';
//import 'materialize-css/sass/materialize.scss';
//import numeral from 'numeral';
import './sass/main.scss';
import {getUsers} from './api/userApi';

// Para deshabilitar la regla se pone el siguiente comentario
/* eslint-disable no-console */

//const courseValue = numeral(1000).format('$0,0.00');
//debugger; // Enables debug and shows exactly the code in web dev tools.
//console.log(`I would pay ${courseValue} for this awesome course!`);


getUsers().then( result => {
    console.log(`I entered getUsers`);
    let usersBody = "";

    result.forEach( user => {
        usersBody += `<tr>
        <td><a href="#" data-id="${user.id}" class="deleteUser">Delete</a></td>
        <td>${user.id}</td>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.email}</td>
        </tr>`
    });

    global.document.getElementById('users').innerHTML = usersBody;
});
