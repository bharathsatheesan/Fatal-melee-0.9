class Game{
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
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
      player = new Player();
      home = new Home();
      home.display();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
    }

    player1 = createSprite(100, 100);
    player1.addImage(HittingPlayerImage);
    player2 = createSprite(displayWidth-100, 100);
    player2.addImage(HittingPlayerImage);
    player3 = createSprite(100, displayHeight-100);
    player3.addImage(HittingPlayerImage);
    player4 = createSprite(displayWidth-100, displayHeight-100);
    player4.addImage(HittingPlayerImage);

    players.push(player1, player2, player3, player4);
  }

  play(){
    Player.getPlayerInfo();
    home.hideForGame();
    
    if(allPlayers !== undefined){
      background("#C68767");
      image(battlegroundImage, 0, 0, windowWidth, windowHeight);

      var index = 0;

      for(var plr in allPlayers){
        index = index + 1;

        var x = allPlayers[plr].x
        var y = allPlayers[plr].y

        players[index-1].x = x
        players[index-1].y = y

        if (index === player.index){
          textSize(25);
          strokeWeight(2);
          stroke("black");
          fill("white");
          text("You", players[index-1].x, players[index-1].y);
        }
      }

      if(keyDown(UP_ARROW) && player.index !== null){
        player.y -= 3;
      }

      if(keyDown(DOWN_ARROW) && player.index !== null){
        player.y += 3;
      }

      if(keyDown(RIGHT_ARROW) && player.index !== null){
        player.x -= 3;
      }

      if(keyDown(LEFT_ARROW) && player.index !== null){
        player.x += 3;
      }
    } 
  }
}