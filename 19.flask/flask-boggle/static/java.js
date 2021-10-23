class BoggleGame {
    constructor(boardId, secs = 60){
        this.secs = secs;
        this.showTimer();
        this.score = 0;
        this.words = new Set();
        this.board = $("#" + boardId);
        this.timer = setInterval(this.tick.bind(this), 1000);

        $(".add-word", this.board).on("submit", this.handleSubmit.bind(this));
    }

    showWord(word){
        $(".words", this.board).append($("<li>", { text: word}));
    }

    showScore(){
        $(".score", this.board).text(this.score);
    }

    showTimer(){
        $(".timer", this.board).text(this.secs);
    }

    async tick(){
        this.secs -= 1;
        this.showTimer();
        if (this.secs === 0){
            clearInterval(this.timer);
            await this.scoreGame();
        }
    }

    showMessage(msg, cls) {
        $(".msg", this.board)
        .text(msg)
        .removeClass()
        .addClass(`msg ${cls}`);
    }
    
    async handleSubmit(e){
        e.preventDefault();
        const $word = $(".word", this.board);
        let word = $word.val();
        if (!word) return;
        
        if (this.words.has(word)){
            this.showMessage(`Already found ${word}`, "err");
            return;
        }

        const res = await axios.get("/checkword", { params: { word: word }});
        if (res.data.result === "not-word") {
            this.showMessage(`${word} is not a valid word`, "err");
        } else if (res.data.result === "not-on-board") {
            this.showMessage(`${word} is not on board`, "err");
        } else {
            this.showWord(word);
            this.score += word.length;
            this.showScore();
            this.words.add(word);
            this.showMessage(`${word} was added`, "ok");
            
        }
        $word.val("").focus();
    }

    async scoreGame(){
        $(".add-word", this.board).hide();
        const res = await axios.post("/postscore", { score: this.score });
        if (res.data.brokeRecord){
            this.showMessage(`New record: ${this.score}`, "ok");
        } else {
            this.showMessage(`Final score: ${this.score}`, "ok");
        }
    }
}