//import payform from 'payform';
//import './index.css';
//import 'materialize-css/bin/materialize.js';
//import 'materialize-css/sass/materialize.scss';
//import numeral from 'numeral';

/*import './js/search';
import './js/navbar';
import './js/best-seller';
import './js/payform-validate';
import './js/validation';*/

import * as localForage from 'localforage';
import {getUsers} from './api/userApi';
import './sass/main.scss';

// Para deshabilitar la regla se pone el siguiente comentario
/* eslint-disable no-console */

//const courseValue = numeral(1000).format('$0,0.00');
//debugger; // Enables debug and shows exactly the code in web dev tools.
//console.log(`I would pay ${courseValue} for this awesome course!`);

//global.courseValue = courseValue;
//global.window.courseValue = courseValue;
//global.document.courseValue = courseValue;
//window.courseValue = courseValue;


function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}
// requires and returns all modules that match


localForage.getItem('bestGames', (err, value) => {
    if (err) {
        $.ajax(
            "/api/best-seller",
            function(result) {
                localForage.setItem('bestGames', result).then( err => {
                    if (err) console.log("couldn't save data correctly");
                });
            }
        )
    }
})




localForage.setItem('key', 'value', function (err) {
  // if err is non-null, we got an error
  //debugger;
  if (err){
      alert("Error:" + err);
  }else{

    localForage.getItem('key', function (err2, value) {
        if (err){
           alert("Error2:" + err2);
        } else {
           alert("Value: " + value);
        }
        // if err is non-null, we got an error. otherwise, value is the value
    });
  }
});
