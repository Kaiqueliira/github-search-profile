const api = "https://api.github.com/users/"

const btnSearch = document.querySelector("#btnSearch");
const container = document.querySelector("#container");

let nome = document.querySelector('#name')
let htmlUrl = document.querySelector('#html_url')
let linkPerfil = document.querySelector('#link_perfil')
let avatarImg = document.querySelector('#avatarImg')

let campos = [nome, htmlUrl, linkPerfil, avatarImg, container];

btnSearch.onclick = async (e) => {
    e.preventDefault()
    const inputArea = document.querySelector('#searchInputArea')
    const inputValue = document.querySelector('#inputSearch');
    if (inputValue.value) {
        inputArea.classList.contains("error") && inputArea.classList.remove("error")
        const data = await pegarDados(inputValue.value);
        renderItem(data);
        inputValue.value = "";
        containerArea.style = "display: flex"
    } else {
        !inputArea.classList.contains("error") && inputArea.classList.add("error")
        campos.map(el => el.setAttribute('class', 'isPending'))
    }
}

async function pegarDados(value) {
    const response = await fetch(api + value).then(data => data.json());
    return response
}

function removeAttribute(element, atr, value) {
    return element.map(el => el.removeAttribute(atr, value))
}

function renderItem(data) {
    const { html_url, name, avatar_url, public_repos, created_at } = data;
    nome.innerHTML = name;
    htmlUrl.innerHTML = public_repos;
    linkPerfil.innerHTML = "Acesso ao Perfil"
    linkPerfil.setAttribute("href", html_url)
    avatarImg.setAttribute("src", avatar_url)
    removeAttribute(campos, "class", 'isPending')

}
