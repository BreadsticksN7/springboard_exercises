$(function() {
    let deckUrl = "http://deckofcardsapi.com/api/deck";

    //Step 1
    async function part1(){
        let data = await $.getJSON(`${deckUrl}/new/draw/`);
        let { suit, value } = data.cards[0];
        console.log(`P1: ${value.toLowerCase()} of ${suit.toLowerCase()}`);
    };
    part1();

    //Step 2
    async function part2(){
        let firstCard = await $.getJSON(`${deckUrl}/new/draw/`);
        let deckId = firstCard.deck_id;
        let secondCard = await $.getJSON(`${deckUrl}/${deckId}/draw/`);
        [firstCard, secondCard].forEach(card => {
            let { suit, value} = card.cards[0];
            console.log(`P2: ${value.toLowerCase()} of ${suit.toLowerCase()}`);
        });
    };
    part2();

    //Step 3
    async function part3(){
        let $btn = $('button');
        let $cardArea = $('#card-area');
        let deckData = await $.getJSON(`${deckUrl}/new/shuffle/`);

        $btn.show().on('click', async function(){
            let newCard = await $.getJSON(`${deckUrl}/${deckData.deck_id}/draw/`);
            let cardSrc = newCard.cards[0].image;
            let angle = Math.random() * 90 - 45;
            let randomX = Math.random() * 40 - 20;
            let randomY = Math.random() * 40 - 20;
            $cardArea.append($('<img>', {src: cardSrc, css: {transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`}}));
            if (newCard.remaining === 0) $btn.remove();
        });
    };
    part3();
});