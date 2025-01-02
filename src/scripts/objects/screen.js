const screen = {
  userProfile: document.querySelector(".profile-data"),
  renderUser(user) {
    this.userProfile.innerHTML = `<div class="info">
                 <img src="${user.avatarUrl}" alt="Foto de perfil do usuário" />
                 <div class="data">
                 <h1>${user.name ?? "Não possui nome cadastrado 😢"}</h1>
                 <p>${user.bio ?? "Não possui bio cadastrada 😢"}</p>
                 <ul>
                 <li><a href="${
                   user.followers ??
                   "Não possui numeros de seguidores cadastrados 😢 "
                 }"target="_blank">Seguidores:${user.followers} </a></li>
                 <li><a href="${
                   user.following ??
                   "Não possui numeros de seguidores cadastrados 😢"
                 }"target="_blank">Seguindo:${user.following} </a></li>
                 </ul>
                 </div>
                 </div> `;

    let repositoriesItens = "";
    user.repositories.forEach(
      (repo) =>
        (repositoriesItens += `<li><a href="${repo.html_url}"target="_blank">${repo.name}</a></li>`)
    );

    if (user.repositories.length > 0) {
      this.userProfile.innerHTML += `<div class="repositories section">
          <h2>Repositorios</h2>
          <ul>
            ${repositoriesItens}
          </ul>
        </div>
        <div class="statistics section">
          <h2>Estatisticas</h2>
          <p>Repositorios:📦 ${user.repositories.length}</p>
          <ul>
            <li>🍴: ${user.forks}</li>
            <li>💫: ${user.stars}</li>
            <li>👀: ${user.watchers}</li>
            <li>👨‍💻: ${
              user.linguages.join(", ") ?? "Nenhuma linguagem cadastrada 😢"
            }</li>
          </ul>
        </div>`;
    }
    let eventsItens = "";
    user.event.forEach((event) => {
      if (event.type === "PushEvent") {
        eventsItens += `<li><p><span>"${event.repo.name}</span>" - "${event.payload.commits[0].message}"</p></li>`;
      } else {
        eventsItens += `<li><p><span>"${event.repo.name}</span>" - "Sem mensagem de commit"</p></li>`;
      }
    });

    if (user.event.length > 0) {
      this.userProfile.innerHTML += `<div class="events">
                                            <h2>Eventos</h2>
                                            <ul class= "eventos">${eventsItens}</ul>
                                           </div>`;
    }
  },
  renderNotFound() {
    this.userProfile.innerHTML = `<div class="not-found section">
          <h2>Usuário não encontrado</h2>
        </div>`;
  },
};

export { screen };
