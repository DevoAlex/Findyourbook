async function requestSubjectData() {
    const response = await fetch ("https://openlibrary.org/subjects/love.json")
    const data = await response.json();
    console.log(data);
}

requestSubjectData();