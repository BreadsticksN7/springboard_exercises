const $imgDiv = $("#imgDiv");
const $giSearch = $("#giphySearch");

async function getRandomImg(){
    let giSearch = $giSearch.val();
    const tokenApi = 'rE7NuTXdtn5svrElwwKdwG4ysRmagdlK';
    const results = await axios.get('http://api.giphy.com/v1/gifs/search', {params: {api_key: tokenApi, q: giSearch}});
    console.log(results.data);
    addImg(results.data);
};

const giphyForm = document.querySelector('#formSearch');
giphyForm.addEventListener("submit", function(ev){
    ev.preventDefault();
    getRandomImg();
    $giSearch.val("");
});

function addImg(res){
    let numResults = res.data.length;
    if (numResults) {
    let randomIdx = Math.floor(Math.random() * numResults);
    let $newCol = $("<div>");
    let $newImg = $("<img>", { src: res.data[randomIdx].images.original.url });
    $newCol.append($newImg);
    $imgDiv.append($newCol);
    console.log(randomIdx);
}};

$("#removeBtn").on('click', function(){
    $imgDiv.empty();
});