

//função onde criamos um elemento de loading na pagina, onde carrega o html e se cria uma div, com uma label dizendo sobre o carregamento dentro do HTML...
function showLoading(){
    //para o alert de carregar aparecer na tela
    const div = document.createElement("div");
    div.classList.add("loading","centralize");
    
    const label = document.createElement("label");
    label.innerText = "Carregando...";

    div.appendChild(label);
    document.body.appendChild(div);

}





function hideLoading() {
    //encontrar o componente pela class, ou seja encontrar o loading...
    const loadings = document.getElementsByClassName("loading");

    //se encontrar o componente loading na tela, pegamos e removemos o primeiro elemento que surgir para sair o carregamento da tela....
    if(loadings.length){
        loadings[0].remove();
    }
}



















/*   
Algumas informações de estudos meus


    //para o alert de carregar desaparecer da tela em 2s
    setTimeout(() => hideLoading(), 2000);






*/