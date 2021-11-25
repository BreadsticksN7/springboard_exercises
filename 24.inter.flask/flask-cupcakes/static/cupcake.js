const BASE_URL = "http://localhost:5000/api";

function generateCupCake(cupcake){
    return `
    <div data-cupcake-id=${cupcake.id}>
    <li>
        Flavor: ${cupcake.flavor} / Size: ${cupcake.size} / Rating: ${cupcake.rating}
        <button class="delete-button">X</button>
    </li>
    <img class="Cupcake-img" src="${cupcake.image}"></img>
    </div>
    `;
}

async function showCupcakes(){
    const response = await axios.get(`${BASE_URL}/cupcakes`);

    for (let cupcake of response.data.cupcakes){
        let newCupCake = $(generateCupCake(cupcake));
        $("#cupcakes-list").append(newCupCake);
    }
}

$("#new-cupcake").on("submit", async function(e){
    e.preventDefault();
    let flavor = $("#form-flavor").val();
    let rating = $("#form-rating").val();
    let size = $("#form-size").val();
    let image = $("#form-image").val();

    const newCupCakeRes = await axios.post(`${BASE_URL}/cupcakes`, {
        flavor,
        rating,
        size,
        image
    });

    let newCupCake = $(generateCupCake(newCupCakeRes.data.cupcake));
    $("#cupcakes-list").append(newCupCake);
    $("#new-cupcake").trigger("reset");
});

$("#cupcakes-list").on("click", ".delete-button", async function(e){
    e.preventDefault();
    let $cupcake = $(e.target).closest("div");
    let cupcakeId = $cupcake.attr("data-cupcake-id");
    await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
    $cupcake.remove();
});

$(showCupcakes);