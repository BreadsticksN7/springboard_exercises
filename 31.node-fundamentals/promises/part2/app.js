$(function() {
    let deckUrl = "http://deckofcardsapi.com/api/deck";
    
    //Step 1
    $.getJSON(`${deckUrl}/new/draw/`).then(data => {
        let { suit, value } = data.cards[0];
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    });

    //Step 2
    let firstCard = null
    $.getJSON(`${deckUrl}/new/draw/`).then(data => {
        firstCard = data.cards[0];
        let deckId = data.deck_id;
        return $.getJSON(`${deckUrl}/${deckId}/draw/`);
    })
    .then(data => {
        let secondCard = data.cards[0];
        [firstCard, secondCard].forEach(function(card) {
            console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`);
        });
    });

    //Step 3
    let deckId = null;
    let $btn = $('button');
    let $cardArea = $('#card-area');

    $.getJSON(`${deckUrl}/new/shuffle/`).then(data => {
        deckId = data.deck_id;
        $btn.show();
    });

    $btn.on('click', function() {
        $.getJSON(`${deckUrl}/${deckId}/draw/`).then(data => {
            let cardSrc = data.cards[0].image;
            let angle = Math.random() * 90 - 45;
            let randomX = Math.random() * 40 - 20;
            let randomY = Math.random() * 40 - 20;
            $cardArea.append($('<img>', {src: cardSrc, css: {transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`}
            }));
            if (data.remaining === 0) $btn.remove();
        });
    });
});