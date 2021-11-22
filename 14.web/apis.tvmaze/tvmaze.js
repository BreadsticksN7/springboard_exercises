/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
const missingImg = 'http://tinyurl.com/missing-tv';
async function searchShows(query) {
  // TODO: Make an ajax request to the searchShows api.  Remove
  // hard coded data.
  let res = await axios.get(`http://api.tvmaze.com/search/shows?q=${query}`);
  let tvResults = res.data.map(res => {
  let show = res.show;
  return{
    id: show.id,
    name: show.name,
    summary: show.summary,
    image: show.image ? show.image.medium : missingImg
  };
});
 return tvResults;
};



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
         <img class="card-img-top" src="${show.image}">
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
             <button class="btn btn-primary get-episodes">Episodes</button>
           </div>
         </div>
       </div>
      `);

    $showsList.append($item);
  }
}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);
});


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  let res = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`);
  let eps = res.data.map(epi => ({
    id: epi.id,
    name: epi.name,
    season: epi.season,
    number: epi.number,
  }));
  return eps;
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes

  // TODO: return array-of-episode-info, as described in docstring above
}

function populateEps(eps) {
  const $epsList = $("#episodes-list");
  $epsList.empty();

  for (let ep of eps) {
    let $item = $(
      `<li>
        ${ep.name}(season ${ep.season}, episode ${ep.number})
      </li>`
    );

    $epsList.append($item);
  }
  $("#episodes-area").show();
}

$("#shows-list").on("click", ".get-episodes", async function clickEvt(evt){
  let showId = $(evt.target).closest(".Show").data("show-id");
  let episodes = await getEpisodes(showId);
  populateEps(episodes);
});