
const form = {
    confirmPassword: () => document.getElementById('confirmPassword'),
    email: () => document.getElementById('email'),
    password: () => document.getElementById('password'),
    emailInvalidError:() => document.getElementById('email-invalid-error'),
    emailRequiredError:() => document.getElementById('email-required-error'),
    passwordRequiredError:() => document.getElementById('password-required-error'),
    passwordMinLengthError:() => document.getElementById('password-min-length-error'),
    passwordDoesntMatchError:() => document.getElementById('password-doesnt-match-error'),
    registerButton:() => document.getElementById('register-button')
}


//função para identificar os erros para a tela de registro
function onChangeEmail() {
const email = form.email().value;
form.emailRequiredError().style.display = email ? "none" : "block";  //se o email existe eu n mostro o erro na tela, caso n exista, aparece...
form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block"; //se o email for valido, esconde da tela o erro, se nao aparece...

toggleRegisterButtonDisable();  //tenho que chamar essa funçao, cada vez que o formulario for modificado.. 
}

//erro campo password
function onChangePassword() {
const password = form.password().value;
form.passwordRequiredError().style.display = password ? "none" : "block";
form.passwordMinLengthError().style.display = password.length >= 6 ? "none" : "block";  //se a senha for maior ou igual a 6, esconde o erro.. caso contrario aparece..

//para o campo identificar a função da confirmar senha e senha iguais.. e sumir o erro
validatePasswordsMatch();
toggleRegisterButtonDisable();  //tenho que chamar essa funçao, cada vez que o formulario for modificado.. 
}


//erro confirmar senha
function onChangeConfirmPassword(){
    validatePasswordsMatch(); //para o campo identificar a função da confirmar senha e senha iguais.. e sumir o erro
    toggleRegisterButtonDisable();  //tenho que chamar essa funçao, cada vez que o formulario for modificado.. 
}

//função para verificar se a senha e conf.senha sao iguais..
function validatePasswordsMatch() {
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;

    form.passwordDoesntMatchError().style.display = password == confirmPassword ? "none" : "block";  //se a confirmar senha é igual a senha entao o erro some, caso contrario aparece..
}


//função na qual o botao de registrar vai ficar desativado caso o formulario n seja valido
function toggleRegisterButtonDisable() {
    form.registerButton().disabled = !isFormValid();

}

//função para validar os campos do formulario...
function isFormValid(){
    const email = form.email().value;
    if(!email || !validateEmail(email)) {  //se o email n existir e se nao funcionar a validaçao, retornar falso...
        return false;
    }

    const password = form.password().value;
    if(!password || password.length < 6) {  //se o password n existir e a senha for menor que 6..retornar falso..
        return false;
    }

    const confirmPassword = form.confirmPassword().value;
    if(password != confirmPassword) {  //se a confirmação de senha for diferente da senha.. retorna falso
        return false;
    }

    return true;  //se caso nenhum if funcionar, o formulario é VALIDO entao retorna TRUE...
}




function register() {
    showLoading();

    const email = form.email().value;
    const password = form.password().value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            return firebase.firestore().collection('users').doc(userCredential.user.uid).set({ // se os passos acimas estiver tudo correto cria um documento na coleção 'users' no firestore
                admin: false, //campo na qual define que esses user vao ser false, mas podemos adicionar mais campos, para assegurar o codigo.
            })
                .then(() => { //entao, vamos esconder o "carregamento.." e logo mostrar a pagina de index.html que é os produtos para user comum e anonimo..
                    hideLoading();
                    window.location.replace("../../../FrontEnd/index.html");
                });
        }).catch(error => {
            hideLoading();
            alert(getErrorMessage(error)); //porem se tudo der errado, pegamos nesse alert o erro da mensagem!
        });
}



//função para o erro do registro...
function getErrorMessage(error) {

    if(error.code == "auth/email-already-in-use"){
        return "Aviso: O e-mail fornecido já está vinculado a uma conta existente!";
    }

    return error.message;
}

/*
//usuario ficar logado o tempo todo ao realizar o login.
firebase.auth().onAuthStateChanged(user => 
    { if(user) {
        window.location.href = "../../FrontEnd/index.html";
    }
})*/


