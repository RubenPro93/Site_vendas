
/**
 * 
 * @param {*} validateEmail
 * @returns função na qual corresponde a um formato de e-mail válido.
 *          isso significa que os /\S+@\S+\.\S+/. tem suas regras definidas.
 *          
 *          (\S+) -> verifica se o e-mail contém pelo menos um caractere não vazio 
 *           demais caracter -> @ e "."
 *         
 *         fim: retorna true se o e-mail for válido de acordo com o padrão da expressão regular 
 */

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

