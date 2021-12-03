const api = "https://api.github.com/users/"

const btnSearch = document.querySelector("#btnSearch");
const container = document.querySelector("#container");
const inputValue = document.querySelector('#inputSearch');

let nome = document.querySelector('#name')
let htmlUrl = document.querySelector('#html_url')
let linkPerfil = document.querySelector('#link_perfil')
let avatarImg = document.querySelector('#avatarImg')
let followingView = document.querySelector('#following')
let follow = document.querySelector('#follow')
let emailView = document.querySelector('#email')

inputValue.focus()

btnSearch.addEventListener('click', search)
inputValue.addEventListener('keypress', (e) => {
    (e.key === "Enter") && search(e)

})

async function search(e) {
    e.preventDefault()
    const inputArea = document.querySelector('#searchInputArea')
    if (inputValue.value) {
        const data = await getData(inputValue.value);
        inputArea.classList.contains("error") && inputArea.classList.remove("error")
        document.querySelector('#error-validation').style.display = "none";
        renderItem(data);
        inputValue.value = "";

    } else {

        !inputArea.classList.contains("error") && inputArea.classList.add("error");
        container.classList.add("isPending");
        document.querySelector('#error-validation').style.display = "block";


    }
}



async function getData(value) {
    const response = await fetch(api + value).then(data => data.json());
    return response
}



function renderItem(data) {
    const { html_url, name, avatar_url, public_repos, following, followers, email } = data;
    nome.innerHTML = name;
    htmlUrl.innerHTML = public_repos;
    linkPerfil.innerHTML = "Acesso ao Perfil"
    followingView.innerHTML = following;
    follow.innerHTML = followers;
    emailView.innerHTML = email;
    linkPerfil.setAttribute("href", html_url)
    avatarImg.setAttribute("src", avatar_url)
    container.classList.contains("isPending") && container.classList.remove("isPending")

}