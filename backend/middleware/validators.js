const validators = require('validator');

const Validators = (body) => {

    // Los siguientes campos comprueba que no este vacio y tenga una longitud minimo y maximo de caracteres
    let nombreCompleto = !validators.isEmpty(body.nombreCompleto) 
                    && validators.isLength(body.nombreCompleto, { min: 3, max: 35 });
    
    if (!nombreCompleto) {
        throw new Error("El nombre completo no cumple con los requisitos");
    }
    
    let nick = !validators.isEmpty(body.nick) 
            && validators.isLength(body.nick, { min: 3, max: 20 });
    
    if (!nick) {
        throw new Error("El nick no cumple con los requisitos");
    }

    let username = !validators.isEmpty(body.username) 
                && validators.isLength(body.username, { min: 3, max: 20 });

    if (!username) {
        throw new Error("El username no cumple con los requisitos");
    }

    // Utiliza el metodo .isEmail que ya comprueba que introduzcas un email vacio
    let email = !validators.isEmpty(body.email) && validators.isEmail(body.email);

    if (!email) {
        throw new Error("El email no cumple con los requisitos");
    }

    // Tiene que contener una minuscula, una mayuscula que este en 
    // rango de caracteres (5 - 40) y un numero
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{5,40}$/;
    let password = !validators.isEmpty(body.password) 
                && validators.isLength(body.password) 
                && validators.matches(body.password, regex);

    if (!password) {
        throw new Error("La contraseña no cumple con los requisitos");
    }
}

module.exports = Validators;