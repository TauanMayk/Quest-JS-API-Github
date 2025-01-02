const user = {
  avatarUrl: "",
  name: "",
  bio: "",
  userName: "",
  repositories: [],
  followers: 0,
  following: 0,
  event: [],
  forks: 0,
  stars: 0,
  watchers: 0,
  linguages: [],
  setInfo(gitHubUser) {
    this.avatarUrl = gitHubUser.avatar_url;
    this.name = gitHubUser.name;
    this.bio = gitHubUser.bio;
    this.userName = gitHubUser.login;
    this.followers = gitHubUser.followers;
    this.following = gitHubUser.following;
  },
  setRepositories(repositories) {
    this.repositories = repositories;
    this.forks = this.repositories.reduce(
      (total, repo) => total + repo.forks,
      0
    );
    this.stars = this.repositories.reduce(
      (total, repo) => total + repo.stargazers_count,
      0
    );
    this.watchers = this.repositories.reduce(
      (total, repo) => total + repo.watchers,
      0
    );
  },
  setEvent(event) {
    this.event = event;
  },
  renderLanguages(languages) {
    this.linguages = languages;
  },
};

export { user };
