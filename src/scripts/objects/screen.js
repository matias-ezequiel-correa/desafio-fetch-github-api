const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info section">
                                        <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                                        <div class= "data">
                                         <h1>${user.name ?? 'Não possui nome cadastrado 😥'}</h1>
                                        <p>${user.bio ?? 'Não possui bio cadastrada 😥'}</p>
                                        <div class="follows">
                                        <h3>${user.followers} 👥 Seguidores</h3>
                                        <h3>${user.following} 👥 Seguindo</h3>
                                        </div>
                                        </div>
                                    </div>`

        if (user.repositories.length > 0) {
            let repositoriesItens = ''
            user.repositories.forEach(repo =>

                repositoriesItens += `<li><a href="${repo.html_url}" target="_blank"><h4>${repo.name}</h4>
                <i>🍴 ${repo.forks_count}</i>
                <i>⭐ ${repo.stargazers_count}</i>
                <i>👀 ${repo.watchers_count}</i>
                <i>👩‍💻 ${repo.language ?? 'Sem linguagem'}</i>
                </a></li>`)

            this.userProfile.innerHTML += `<div class="repositories section">
                                            <h2>Repositórios</h2>
                                            <ul>${repositoriesItens}</ul>
                                           </div>`                                 
        }

        if (user.events.length > 0) {
            let eventsItens = ''
            user.events.forEach(event => {
                if(event.payload){
                    if(event.payload.commits){
                        const commits = event.payload.commits
                        const commistsList = commits.map(commit => `<span>${commit.message}</span>`)

                        eventsItens += `<li><strong>${event.repo.name} -</strong> ${commistsList}</li>`
                    }
                }
            })

            this.userProfile.innerHTML += `<div class="events section">
                                            <h2>Eventos</h2>
                                            <ul>${eventsItens}</ul>
                                           </div>`                                 
        }
    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }
