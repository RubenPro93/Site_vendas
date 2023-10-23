
//padronizar os id nas chamadas identificadas para ficar mais simples e limpo o codigo. Na qual é possivel navegar usando apenas a identificação do form.
const form = {
    email: () => document.getElementById('email'),
    EmailinvalidError: () => document.getElementById('email-invalid-error'),
    EmailRequiredError: () => document.getElementById('email-required-error'),
    PasswordRequiredError: () => document.getElementById('password-required-error'),
    loginButton: () => document.getElementById('login-button'),
    password: () => document.getElementById('password'),
    recoverPassword: () => document.getElementById('recover-password-button'),
}



//função para validação da email 
function onChangeEmail() {
    alternarBottonsDesabilitados();
    alternarEmailErrors();
}

//função para validação da password
function onChangePassword(){
    alternarBottonsDesabilitados();
    alternarSenhasErrors();
}


//função para validação da email e emitir o alert ao usuario...
function isEmailValid() {
    const email = form.email().value;
    if(email == null) {  //if (!email)
        return false;
    }
    return validateEmail(email);
}

//função para validação da password e emitir o alert ao usuario...
function isPasswordValid() {
    const password = form.password().value;
    if(!password){ //se for == null
        return false;
    }
    return true;
}

//função para mostrar os erros de email para preenchimento do usuario.
function alternarEmailErrors(){
    const email = form.email().value;  //adicionei uma constante abaixo, onde simplifico o document.getelement....
    form.EmailRequiredError().style.display = email ? "none" : "block";
    form.EmailRequiredError().style.display = validateEmail(email) ? "none" : "block";   

}

//função para mostrar os erros de senha para preenchimento do usuario.
function alternarSenhasErrors(){
    const password = form.password().value;
    form.PasswordRequiredError().style.display = password ? "none" : "block";
}


//função para desativar os botão caso não possuir caracter valido para email, ou quando n tiver senha para entrar tambem nao sera possivel..
function alternarBottonsDesabilitados(){
    const emailValid = isEmailValid();
    //vai ficar desabilitado quando o email n for valido!!
    form.recoverPassword().disabled = !emailValid;

    const passwordValid = isPasswordValid();
    form.loginButton().disabled = !emailValid || !passwordValid;

}




//função para realização do login do usuario comum e o admin!
function login() {
    showLoading();
    const email = form.email().value;
    const password = form.password().value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(response => {
            firebase.firestore().collection('users').doc(response.user.uid)
                .get()
                .then((doc) => {
                    hideLoading();
                    if (doc.exists) { //se a coleção do firestore identificar que é um admin: true, liberamos o acesso a pagina do admin.
                        if (doc.data().admin) {
                            window.location.href = "../FrontEnd/admin.html";
                        } else {  //caso contrario, vamos identificar que o admin é false, entao direcionamos o user a pagina comum de inicio.
                            window.location.href = "../FrontEnd/index.html";
                        }
                    } else { //mensagem na qual ajudara o administrador a identificar que o user nao esta adicionado a regra de coleção do firestore.
                        console.log("OBS: Não faz parte da coleção users, verifique com o administrador!");
                    }
                })
                .catch((error) => {  //se nada resolver, mostra mensagem do erro.
                    hideLoading();
                    console.log("Erro ao obter documento:", error);
                });
        })
        .catch(error => { //se nada resolver, mostra mensagem do erro.
            hideLoading();
            alert(getErrorMessage(error));
        });
}


//função para quando o usuario usar o enter do teclado depois de colocar email e senha, ativar automaticamente o botao de ENTRAR como se fosse um clique..
function cliqueenter(event) {
    if (event.keyCode === 13 ) {   //keycode 13 é o numero da tecla do enter
        document.getElementById("login-button").click();
    }
}



//função na qual vou emitir um erro para o usuario caso não encontre o cadastro ou a senha esteja incorreta, seguindo o autenticação do firebase.
function getErrorMessage(error) {

    if(error.code == "auth/user-not-found"){
        return "Usuario não encontrado!";
    }

    else if(error.code == "auth/wrong-password"){
    return "Senha incorreta!";
    }
    return error.message;
}




//usario ficar logado o tempo todo ao realizar o login.
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        db.collection('users').doc(user.uid)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    if (doc.data().admin) { //se for um admin, fica na pagina de admin..
                        window.location.href = "../FrontEnd/admin.html";
                    } else {
                        window.location.href = "../FrontEnd/index.html"; //se for um user comum, fica na pagina de index comum..
                    }
                } else {
                    console.log("Nenhum documento encontrado!");
                }
            })
            .catch((error) => {
                console.log("Erro ao obter documento:", error);
            });
    }
}) 




//direcionar a pagina de cadastro a essa pagina..
function register() {
    window.location.href = "pages/register/register.html";
}


//função para recuperar a senha 
function recoverPassword() {
    showLoading();
    firebase.auth().sendPasswordResetEmail(form.email().value).then(() => {
        hideLoading(); //componente de login desaparecer
        alert("Email enviado com sucesso");
    }).catch(error => {
        hideLoading(); //componente de login desaparecer
        alert(getErrorMessage(error));  //mostrar o erro, seja email inexistente
    })

}




