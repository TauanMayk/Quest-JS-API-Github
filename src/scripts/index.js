import { getUser } from "./services/user.js";
import { getRepos } from "./services/repositories.js";
import { getEvents } from "./services/event.js";
import { getLanguages } from "./services/languages.js";
import { user } from "./objects/user.js";
import { screen } from "./objects/screen.js";

document.getElementById("btn-search").addEventListener("click", () => {
  const userName = document.getElementById("input-search").value;
  if (validateEmptyInput(userName)) return;
  getUserData(userName);
});

document.getElementById("input-search").addEventListener("keyup", (e) => {
  const userName = e.target.value;
  const key = e.which || e.keyCode;
  const isEnterKeyPressed = key === 13;

  if (isEnterKeyPressed) {
    if (validateEmptyInput(userName)) return;
    getUserData(userName);
  }
});

function validateEmptyInput(userName) {
  if (userName.length === 0) {
    alert("Digite o nome de um usuário no GitHub");
    return true;
  }
}

async function getUserData(userName) {
  const userResponse = await getUser(userName);
  const repositoriesResponse = await getRepos(userName);

  if (userResponse.message === "Not Found") {
    screen.renderNotFound();
    return;
  }

  const eventsResponse = await getEvents(userName);
  user.setEvent(eventsResponse);

  const languagesResponse = await getLanguages(userName);
  user.renderLanguages(languagesResponse);

  user.setInfo(userResponse);
  user.setRepositories(repositoriesResponse);

  screen.renderUser(user);
}
