const container = document.getElementById('manga-container');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

function searchManga(searchQuery) {
    fetch(`https://api.mangadex.org/manga?title=${searchQuery}&limit=10&includes%5B%5D=cover_art`)
        .then((response) => response.json())
        .then((data) => {
            container.innerHTML = '';
            for (let i = 0; i < data.data.length; i++) {
                const req = data.data[i];
                let title = req.attributes.title.en;
                let description = req.attributes.description.en;
                let mangaId = req.id;
                let FileName = req.relationships[2].attributes.fileName;

                container.innerHTML += `<div class="manga-box">
                                    <h1>${title}</h1> 
                                    <img src="https://uploads.mangadex.org/covers/${mangaId}/${FileName}"id="img">
                                    <p>${description}</p> 
                                    </div>`
            }
        })
}

searchButton.addEventListener('click', function () {
    const searchTerm = searchInput.value;
    searchManga(searchTerm);
});

searchInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        searchManga(searchInput.value);
    }
});

window.onload = function () {
    searchManga('');
};
