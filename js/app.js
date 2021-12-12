const Utils = {
    clearAllFields() {
        DOM.repositoryContainer.innerHTML = ""
        DOM.profileContainer.innerHTML = ""
    },
    validateDate(date) {
        const newDate = new Date(date);
        const dateFormated = Intl.DateTimeFormat("pt-BR").format(newDate);

        return dateFormated;

    }
}

const Repository = {
    repositoriesList: [],
    Api: "https://api.github.com/users/",

    async getProfile(profile) {
        const response = await fetch(Repository.Api + profile)
            .then((data) => {
                if (data.status == 200) {
                    return data.json()
                } else {
                    throw new Error("O Perfil Pesquisado não Existe!")
                }
            })
        await Repository.getListRepository(profile)

        return response
    },
    async getListRepository(name) {
        const response = await fetch(Repository.Api + name + "/repos")
            .then((response) => {
                if (response.status == 200) {
                    return response.json()
                } else {
                    throw new Error("Não existem os Repositorios pequisados!")
                }
            }).then(res => Repository.repositoriesList = res)
        return response;
    },

}

const DOM = {
    repositoryContainer: document.querySelector("#list-repositories"),
    profileContainer: document.querySelector("#aside"),

    innerHTMLItemRepository(itemRepository) {
        const { created_at, name, updated_at, html_url } = itemRepository;

        const html = `
            <li class="item-repository">
                <div>
                    <span>Nome: ${name}</span>
                    <span>Criado em: ${created_at}</span>
                    <span>Atualizado em: ${updated_at}</span>
                    <a href="${html_url}" target="_blank">Link do Repositório</a>
                </div>
            </li>

        `
        return html
    },
    innerHTMLProfile(profile) {

        const { html_url, name, avatar_url, public_repos, following, followers, email } = profile;

        const html = `
        <div id="imagem-avatar-content">
            <img id="avatarImg" src="${avatar_url} alt="Image-Profile"></img>
        </div>
        <div class="informationsProfile">
            <div>
                <span>Nome:</span> <span>${name || 'nome Inexistente'}</span>
            </div>
            <div>
                <span>Quantidade de Repositorios:</span> <span>${public_repos}</span>
            </div>
            <div>
                <span>Seguindo:</span> <span>${following}</span>
            </div>
            <div>
                <span>Seguidores:</span> <span>${followers}</span>
            </div>
            <div>
                <span>Email:</span> <span>${email || 'Email Inexistente'}</span>
            </div>
            <a id="link_perfil" target="_blank" href="${html_url}">Link do Perfil</a>
        </div>

        `
        return html
    },
    addProfile(profile) {
        DOM.profileContainer.innerHTML = DOM.innerHTMLProfile(profile);
        container.classList.contains("isPending") && container.classList.remove("isPending")
    },
    addRepositoryItem(item) {
        DOM.repositoryContainer.innerHTML += DOM.innerHTMLItemRepository(item)
    },
    renderRepositoryList(item) {
        item.forEach((item) => DOM.addRepositoryItem(item))
    }


}

const Form = {
    inputSearch: document.querySelector("#inputSearch"),
    validadeFields() {
        if (Form.inputSearch.value.trim() === "") throw new Error("Por Favor, preencha todos os campos")
    },
    getValue() {
        return inputSearch.value
    }
}

const App = {
    inputValue: document.querySelector("#inputSearch"),
    container: document.querySelector("#container"),
    async search(event) {
        let error = document.querySelector("#error")
        event.preventDefault()

        try {
            Form.validadeFields()
            if (error.classList.contains("error")) error.innerHTML = ""
            Utils.clearAllFields()
            const data = await Repository.getProfile(Form.getValue())
            DOM.addProfile(data)
            DOM.renderRepositoryList(Repository.repositoriesList)
            App.inputValue.innerHTML = ""
            App.inputValue.focus()

        } catch (e) {

            error.classList.add("error")
            error.style.display = "block"
            error.innerHTML = e.message
            App.container.classList.add("isPending");
            Utils.clearAllFields()
        }
    }
}