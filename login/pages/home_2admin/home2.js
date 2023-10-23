

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // Usuario logado, vamos buscar no Firestore se ele é admin.
    firebase.firestore().collection('users').doc(user.uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        if (doc.data().admin) {
          // usuário é um admin, vamos exibir o conteúdo da página
          document.body.classList.remove("hide-content");
        } else {
          // usuário não é admin, vamos redirecioná-lo para a página inicial.
          alert("ACESSO NEGADO: APENAS USUARIOS ADMIN");
          window.location.href = "index.html";
        }
      } else {
        // documento do usuário não encontrado, vamos redirecioná-lo para a página inicial.
        alert("ACESSO NEGADO: APENAS USUARIOS ADMIN");
        window.location.href = "index.html";
      }
    })
    .catch((error) => {
      console.log("Erro ao obter documento:", error);
      // ocorreu um erro, vamos redirecioná-lo para a página inicial.
      alert("ACESSO NEGADO: APENAS USUARIOS ADMIN");
      window.location.href = "index.html";
    });
  } else {
    // nenhum usuário logado, vamos redirecioná-lo para a página inicial.
    window.location.href = "index.html";
  }
});




//ao realizar o logout com o user admin, volta a pagina index de usuario comum e anonimo
function logout() {
    firebase.auth().signOut().then(() => {
      window.location.href = "index.html";
    }).catch(() => {
      alert("Erro ao fazer logout!!!");
    });
  }



firebase.auth().onAuthStateChanged(user => {
  var logoutButton = document.getElementById("logout-button");
  var loginLink = document.getElementById("login-link");
  var adminlink = document.getElementById("admin-link");

  // Adicionando a verificação para cada elemento
  if(adminlink) adminlink.classList.remove("initially-hidden");
  if(logoutButton) logoutButton.classList.remove("initially-hidden");
  if(loginLink) loginLink.classList.remove("initially-hidden");

  if (user) {
      // Exibe o botão de sair
      if(logoutButton) logoutButton.style.display = "block";
      // Oculta o link de login
      if(loginLink) loginLink.style.display = "none"; 
      // Oculta o link de admin
      if(adminlink) adminlink.style.display = "none";
  } else {
      // Oculta o botão de sair
      if(logoutButton) logoutButton.style.display = "none";
      // Exibe o link de login
      if(loginLink) loginLink.style.display = "block";
  }
});



















  