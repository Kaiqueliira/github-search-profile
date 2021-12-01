const api = "https://api.github.com/users/"

const btnSearch = document.querySelector("#btnSearch");


let nome = document.querySelector('#name')
let htmlUrl = document.querySelector('#html_url')
let linkPerfil = document.querySelector('#link_perfil')

btnSearch.onclick = async (e) => {
    e.preventDefault()
    const inputValue = document.querySelector('#inputSearch');
    const data = await pegarDados(inputValue.value);
    renderItem(data);
    inputValue.value = "";
}

async function pegarDados(value) {
    const response = await fetch(api + value).then(data => data.json());
    return response
}

function renderItem(data) {
    const { login, html_url } = data;
    nome.innerHTML = login;
    htmlUrl.innerHTML = html_url;
    linkPerfil.innerHTML = "Perfil"
    linkPerfil.setAttribute("href", html_url)
}
