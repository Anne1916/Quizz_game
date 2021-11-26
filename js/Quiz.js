class Quiz {
  constructor(){}

  getState(){
    let gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      let contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    question.hide();
    background("Yellow");
    fill(0);
    textSize(26);
    text("Resultado del Cuestionario",340, 50);
    text("----------------------------------------",320, 65);
    Contestant.getPlayerInfo();
    if(allContestants !== undefined){
      debugger;
      let display_Answers = 230;
      fill("Blue");
      textSize(20);
      text("*NOTA: ¡El concursante que respondió correctamente, está resaltado en color verde!",130,230);

      for(var plr in allContestants){
        debugger;
        let correctAns = "2";
        if (correctAns === allContestants[plr].answer)
          fill("Green")
        else
          fill("red");

        display_Answers+=30;
        textSize(20);
        text(allContestants[plr].name + ": " + allContestants[plr].answer, 250,display_Answers)
      }
    }
  }
}
