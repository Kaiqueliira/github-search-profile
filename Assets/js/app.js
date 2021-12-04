const api = "https://api.github.com/users/"

const btnSearch = document.querySelector("#btnSearch");
const container = document.querySelector("#container");
const inputValue = document.querySelector('#inputSearch');
let listRepository = document.querySelector('#list-repositories')
let repositories = []
let profile = []

inputValue.focus()

btnSearch.addEventListener('click', search)
inputValue.addEventListener('keypress', (e) => {
    (e.key === "Enter") && search(e)

})

function removeAllChild(element) {
    const el = document.querySelector(element)
    while (el.firstChild) {
        el.removeChild(el.firstChild)
    }
}

async function search(event) {
    event.preventDefault()
    const inputArea = document.querySelector('#searchInputArea')
    if (inputValue.value) {

        const data = await getData(inputValue.value);
        if (data) {
            await getRepository(inputValue.value).then(data => {
                repositories = data
            })
            await removeAllChild("#list-repositories")
            inputArea.classList.contains("error") && inputArea.classList.remove("error");
            document.querySelector('#error-validation').style.display = "none";
            inputValue.value = "";
            renderItem(data);
            renderRepository(repositories)
            inputValue.focus()
        } else {
            const errorValidation = document.querySelector("#error-validation")

            errorValidation.innerHTML = "O Perfil Não Existe! Por favor Digite o Nome Correto";
            !inputArea.classList.contains("error") && inputArea.classList.add("error");
            container.classList.add("isPending");
            errorValidation.style.display = "block";
        }


    } else {
        !inputArea.classList.contains("error") && inputArea.classList.add("error");
        container.classList.add("isPending");
        document.querySelector('#error-validation').style.display = "block";
    }
}


async function getData(value) {
    const response = await fetch(api + value)
        .then((data) => {
            if (data.status == 200) {
                return data.json()
            } else {
                return null
            }
        })
    return response
}
getData('a')
async function getRepository(name) {
    const response = await fetch(api + name + "/repos")
        .then((response) => {
            if (response.status == 200) {
                return response.json()
            } else {
                return false
            }
        })
    return response;
}

function renderItem(data) {

    let nome = document.querySelector('#name')
    let htmlUrl = document.querySelector('#html_url')
    let linkPerfil = document.querySelector('#link_perfil')
    let avatarImg = document.querySelector('#avatarImg')
    let followingView = document.querySelector('#following')
    let follow = document.querySelector('#follow')
    let emailView = document.querySelector('#email')

    const { html_url, name, avatar_url, public_repos, following, followers, email } = data;

    nome.innerHTML = name || 'Nome Inexistente';
    htmlUrl.innerHTML = public_repos;
    linkPerfil.innerHTML = "Ir para o Perfil"
    followingView.innerHTML = following;
    follow.innerHTML = followers;
    emailView.innerHTML = email || 'email Inexistente';
    linkPerfil.setAttribute("href", html_url)
    linkPerfil.setAttribute("target", "_blank")
    avatarImg.setAttribute("src", avatar_url)
    container.classList.contains("isPending") && container.classList.remove("isPending")
}

function validateDate(date) {
    const newDate = new Date(date);
    const dateFormated = Intl.DateTimeFormat("pt-BR").format(newDate);

    return dateFormated;

}

function renderRepository(repository) {

    repository.map(({ created_at, name, updated_at, language, html_url }) => {
        let divCard = document.createElement('div')
        let spanName = document.createElement('span')
        let createdAt = document.createElement('span')
        let updatedAt = document.createElement('span')
        let languageRepo = document.createElement('span')
        let urlRepo = document.createElement('a')
        let itemList = document.createElement('li')

        spanName.innerHTML = `Nome: ${name}`
        createdAt.innerHTML = `Criado em: ${validateDate(created_at)}`
        updatedAt.innerHTML = `Atualizado em: ${validateDate(updated_at)}`
        languageRepo.innerHTML = `Linguagem: ${language}`
        urlRepo.setAttribute('href', html_url)
        urlRepo.setAttribute('target', "_blank")
        urlRepo.innerHTML = "Link do Repositório"
        divCard.appendChild(spanName)
        divCard.appendChild(createdAt)
        divCard.appendChild(updatedAt)
        divCard.appendChild(urlRepo)
        itemList.appendChild(divCard)
        listRepository.appendChild(itemList)
    })
}