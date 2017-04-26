"use strict";


function validateEmail(input) {
    required(input);
    var email = input.value;
    if (!email.test("/(.+)@(.+){2,}\.(.+){2,}/")) {
        setError(input, 'Email incorrecto');
        return false;
    }  
}

function required(input)   
   {  
     if (input.value.length == 0)  
      {   
         setError(input, 'Ingresa algun valor al campo');  
         return false;   
      }       
      return true;   
    } 

function onlyLetters(input)  
  {  
   var letters = /^[A-Za-z]+$/;  
   if(input.value.match(letters))  
     {  
      return true;  
     }  
   else  
     {  
      setError(input, 'Solo se aceptan Letras');  
      return false;   
     }  
  }  

     //required FIELD



function onlyNumbers(input)  
   {  
      var numbers = /^[0-9]+$/;  
      if(!input.value.match(numbers))  
      {  
      setError(input, 'Solo se aceptan numeros');  
      return false;   
      }  
   }  

   // Function to check letters and numbers  
function alphanumeric(input)  
{  
 var letterNumber = /^[0-9a-zA-Z]+$/;  
 if(input.value.match(letterNumber))   
  {  
   return true;  
  }  
else  
      {  
      setError(input, 'Solo se aceptan valores alfanumericos');  
      return false;   
      }  
}  

function lengthRange(input, minlength, maxlength)  
{     
   var userInput = input.value;    
   if(userInput.length >= minlength && userInput.length <= maxlength)  
      {       
        return true;      
      }  
   else  
      {       
     setError(input, "Por favor ingresa un valore entre " +minlength+ " y " +maxlength);         
        return false;     
      }    
}  

function setAllError(){
    var elems = document.getElementsByClassName("help-block");

    for (var i = 0; i < elems.length; i++){
        elems[i].innerHTML = "";
    }
}

function setError(input, err){
    var next = input.parentNode.nextElementSibling || input.parentNode.nextSibling;
    next.innerHTML = err;
}