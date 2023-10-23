firebase.auth().onAuthStateChanged(user => {
    var adminlink = document.getElementById("admin-link");
    adminlink.classList.remove("initially-hidden");

    if (user) {
        // Verificar se o usuário é um administrador
        firebase.firestore().collection('users').doc(user.uid)
            .get()
            .then((doc) => {
                if (doc.exists && doc.data().admin) {
                    // Se o usuário é um administrador, exibir o link
                    adminlink.style.display = "block";
                } else {
                    // Se o usuário não é um administrador, ocultar o link
                    adminlink.style.display = "none";
                }
            })
            .catch((error) => {
                console.log("Erro ao obter documento:", error);
            });
    } else {
        // Se o usuário não está logado, ocultar o link
        adminlink.style.display = "none";
    }
});
