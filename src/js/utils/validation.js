'user strict';

    /**
     * Rename the default uploaded file name to a related one
     *
     */
        function validateForm(){
            setAllError();
            var inputs = document.getElementsByTagName('input');

            for (var i = 0; i < inputs.length; i++){
                if (inputs[i].name === 'name'){
                    onlyLetters(inputs[i]);
                }
                else if (inputs[i].name === 'number'){
                    onlyNumbers(inputs[i]);
                }
                else if (inputs[i].name === 'email'){
                    validateEmail(inputs[i]);
                }
                else if (inputs[i].name === 'password'){
                    requiredField(inputs[i]);
                }
                else if (inputs[i].name === 'username'){
                    validateUsername(inputs[i]);
                }
                else if (inputs[i].name === 'alphanumeric'){
                    alphanumeric(inputs[i]);
                }
                else if (inputs[i].name === 'zip'){
                    validateZIP(inputs[i]);
                }
            }
        }

    /**
     * Validate Email Input
     *
     * @param input
     */
        function validateEmail(input) {
            requiredField(input);
            var email = input.value;
            if (!email.match("/[_+a-zA-Z0-9-]+(\.[_+a-zA-Z0-9-])*@[_+a-zA-Z0-9-]+(\.([a-zA-Z]{2,}))+/i")) {
                setError(input, 'Email incorrector');
                return false;
            }
            setError(input, '');
        }

        function requiredField(input)
        {
            if (input.value.length == 0)
            {
                setError(input, 'Se requiere este campo');
                return false;
            }
            setError(input, '');
            return true;
        }

        function onlyLetters(input)
        {
        requiredField(input);

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

            //requiredField FIELD



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
            requiredField(input);
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

        function validateUsername(input){
            requiredField(input);

            var usernameRegex = /^[a-zA-Z0-9]+$/;
            if(input.value.match(usernameRegex)) {
               return true;
            }  else {
                setError(input, 'Solo se aceptan valores de Usuario, Primero letras');
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
            setError(input, "Por favor ingresa un valor entre " +minlength+ " y " +maxlength);
                return false;
            }
        }

        function validateZIP(input){
            onlyNumbers(input);

            if (input.value.length != 5){
                setError(input, 'El tamaño del codigo debe ser de 5 numeros');
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