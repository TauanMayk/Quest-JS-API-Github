import {
  baseUrl,
  repositoriesQuantity,
  languagesQuantity,
} from "../variables.js";

async function getLanguages(userName) {
  const response = await fetch(
    `${baseUrl}/${userName}/repos?per_page=${repositoriesQuantity}`
  );
  const repositories = await response.json();
  const languages = repositories.reduce((acc, repo) => {
    const language = repo.language;
    if (language && !acc.includes(language)) {
      acc.push(language);
    }
    return acc;
  }, []);
  return languages.slice(0, languagesQuantity);
}

export { getLanguages };
