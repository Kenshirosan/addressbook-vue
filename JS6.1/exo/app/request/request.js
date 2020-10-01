async function getUser(username) {
    const url = `https://api.github.com/users/${username}`;
    const response = await fetch(url);
    if (response.ok) {
        return await response.json();
    }
}

export default getUser;
