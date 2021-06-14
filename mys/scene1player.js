class Scene1Player extends Phaser.Scene {

    constructor ()
    {
        super('Scene1Player');
        this.x = window.innerWidth/2;
        this.y = window.innerHeight/2;
        this.freeze = false;
        this.countClicks = 0;
        this.posiciones = [new Position(-300,0), new Position(-180,0),new Position(-60,0),new Position(60,0),new Position(180,0),new Position(300,0),
            new Position(-300,-120),new Position(-180,-120),new Position(-60,-120),new Position(60,-120),new Position(180,-120),new Position(300,-120),
            new Position(-300,120),new Position(-180,120),new Position(-60,120),new Position(60,120),new Position(180,120),new Position(300,120)];
        this.image1;
        this.image2;
        this.player1text;
        this.numCorrectsPlayer1 = 0;
        this.board = [
            {image:'1',sprite:'carta1',image:'ball'},
            {image:'2',sprite:'carta2',image:'ball'},
            {image:'3',sprite:'carta3',image:'web'},
            {image:'4',sprite:'carta4',image:'web'},
            {image:'5',sprite:'carta5',image:'telephone'},
            {image:'6',sprite:'carta6',image:'telephone'},
            {image:'7',sprite:'carta7',image:'coffee'},
            {image:'8',sprite:'carta8',image:'coffee'},
            {image:'9',sprite:'carta9',image:'heart'},
            {image:'10',sprite:'carta10',image:'heart'},
            {image:'11',sprite:'carta11',image:'dog'},
            {image:'12',sprite:'carta12',image:'dog'},
            {image:'13',sprite:'carta13',image:'person'},
            {image:'14',sprite:'carta14',image:'person'},
            {image:'15',sprite:'carta15',image:'meal'},
            {image:'15',sprite:'carta16',image:'meal'},
            {image:'15',sprite:'carta17',image:'email'},
            {image:'15',sprite:'carta18',image:'email'}
        ];    

        this.numberErrors = 0;

    }

    preload ()
    {
        this.load.image('background', 'mys/assets/background.jpg');

        this.load.spritesheet('interrogation', 'mys/assets/interrogation.png',
        { frameWidth: 150, frameHeight: 150 }  );

        this.load.spritesheet('carta1', 'mys/assets/ball.png',
        { frameWidth: 150, frameHeight: 150 }  );
        
        this.load.spritesheet('carta2', 'mys/assets/ball.png',
        { frameWidth: 150, frameHeight: 150 }   );
         
        this.load.spritesheet('carta3', 'mys/assets/webb.png',
        { frameWidth: 150, frameHeight: 150 }   );
      
        this.load.spritesheet('carta4', 'mys/assets/webb.png',
        { frameWidth: 150, frameHeight: 150 }   );

        this.load.spritesheet('carta5', 'mys/assets/telephone.png',
        { frameWidth: 150, frameHeight: 150 }  );
        
        this.load.spritesheet('carta6', 'mys/assets/telephone.png',
        { frameWidth: 150, frameHeight: 150 }   );
         
        this.load.spritesheet('carta7', 'mys/assets/coffee.png',
        { frameWidth: 150, frameHeight: 150 }   );
      
        this.load.spritesheet('carta8', 'mys/assets/coffee.png',
        { frameWidth: 150, frameHeight: 150 }   );

        this.load.spritesheet('carta9', 'mys/assets/heart.png',
        { frameWidth: 150, frameHeight: 150 }  );
        
        this.load.spritesheet('carta10', 'mys/assets/heart.png',
        { frameWidth: 150, frameHeight: 150 }   );
         
        this.load.spritesheet('carta11', 'mys/assets/dog.png',
        { frameWidth: 150, frameHeight: 150 }   );
      
        this.load.spritesheet('carta12', 'mys/assets/dog.png',
        { frameWidth: 150, frameHeight: 150 }   );

        this.load.spritesheet('carta13', 'mys/assets/person.png',
        { frameWidth: 150, frameHeight: 150 }   );

        this.load.spritesheet('carta14', 'mys/assets/person.png',
        { frameWidth: 150, frameHeight: 150 }   );

        this.load.spritesheet('carta15', 'mys/assets/meal.png',
        { frameWidth: 150, frameHeight: 150 }   );
        
        this.load.spritesheet('carta16', 'mys/assets/meal.png',
        { frameWidth: 150, frameHeight: 150 }   );

        this.load.spritesheet('carta17', 'mys/assets/email.png',
        { frameWidth: 150, frameHeight: 150 }   );

        this.load.spritesheet('carta18', 'mys/assets/email.png',
        { frameWidth: 150, frameHeight: 150 }   );

        //Emojis
        this.load.image('sad', 'mys/assets/sad.png');
        this.load.image('smile', 'mys/assets/smile.png');
      
    }

    create ()
    {
        this.add.image(this.x, this.y,'background');

        this.emojiSad = this.add.image(this.x, this.y-250,'sad');
        this.emojiSmile = this.add.image(this.x, this.y-250,'smile');
        this.emojiSad.setVisible(false);
        this.emojiSmile.setVisible(false);

        var cam  = this.cameras.add(0, 0, this.x*2, this.y*2);    
        cam.setBackgroundColor('0x000000');

        this.piezas = [];
        this.checkPreviousGame(this.posiciones.length);
        
        this.createLevel();
        this.createTexts();

    }

    update()
    {   

    }

    updateCount(image){
        this.countClicks++;
        this.saveClickImage(image);
        if(this.countClicks == 2){
            this.freeze = true;
            this.countClicks = 0;
            if(!this.equalSelectedImages()){
                setTimeout(() => {
                    this.flipImages();
                    this.showWrongMessage();
                    this.updateClickedImages();
                    this.numCorrects = 0;
                    this.freeze = false;
                    this.numberErrors++;
                }, 1500);  
            }else{
                setTimeout(() => {
                    this.destroyCorrectCarts();
                    this.freeze = false; 
                    this.showCelebrationMessage();
                }, 1000);
                if(this.player1text.visible){
                    setTimeout(() => {
                        this.numCorrectsPlayer1++; 
                        this.player1text.setText('Player1: '+ this.numCorrectsPlayer1);
                    }, 1700);  
                if(this.numCorrectsPlayer1 == 8){
                        setTimeout(() => {
                            this.winnerText.setText("Congratulations Player1!!" );
                        this.winnerText.visible=true;
                        this.clickButton.visible=true;
                        this.player1text.visible = false;
                        finishTracking(window.location.href, 'Matching Pairs Game 1 Player', 7,this.numberErrors);
                    }, 2700); 
                    }
                }
            }
        }
    }

    saveClickImage(image){
        if(this.countClicks == 1){
            this.image1 = image;
        }else if(this.countClicks == 2){
            this.image2 = image;
        }
    }

    equalSelectedImages(){
        if(this.image1 == this.image2){
            return true;
        }
        return false;
    }

    getRandomPosition(max,min) {
        return Math.round(Math.random() * (max - min) + min);
      }

    flipImages(){
        this.piezas.forEach(element => {
            element.flip();
        });
    }

    updateClickedImages(){
        this.piezas.forEach(element => {
            element.setClicked();
        });
    }

    destroyCorrectCarts(){
        this.piezas.forEach(element => {
            if(element.isClicked()){
                element.setVisible();
            }
        });
    }

    getFreeze(){
        return this.freeze;
    }

    showWrongMessage(){
        this.emojiSad.setVisible(true);
        setTimeout(() => {
            this.emojiSad.setVisible(false);
        }, 1500);
    }

    showCelebrationMessage(){
        this.emojiSmile.setVisible(true);
        setTimeout(() => {
            this.emojiSmile.setVisible(false);
        }, 1500);
    }

    checkPreviousGame(length){
        if(length == 0){
            this.numberErrors = 0;
            this.posiciones = [new Position(-300,0), new Position(-180,0),new Position(-60,0),new Position(60,0),new Position(180,0),new Position(300,0),
                new Position(-300,-120),new Position(-180,-120),new Position(-60,-120),new Position(60,-120),new Position(180,-120),new Position(300,-120),
                new Position(-300,120),new Position(-180,120),new Position(-60,120),new Position(60,120),new Position(180,120),new Position(300,120)];
            this.numCorrectsPlayer1 = 0;
            this.freeze = false;
        }
    }

    //Creates
    createTexts(){
        this.player1text = this.add.text(this.x-350, this.y-270);
        this.player1text.setStyle({ fontFamily: 'myFont', fontSize:30, fill: '#FFFFFF'});
        this.player1text.setText('Player1: '+ this.numCorrectsPlayer1);
        this.player1text.visible=true;

        this.winnerText = this.add.text(this.x-170, this.y-120);
        this.winnerText.setStyle({ fontFamily: 'myFont', fontSize:30, fill: '#ffff00'});
        this.winnerText.visible=false;

        this.clickButton = new TextButton(this, this.x-220, this.y-50, 'Click here to return to the menu !',
             { fontFamily: 'myFont', fontSize:30, fill: '#ffff00'}, () => this.scene.start('SceneMenu'));
        this.add.existing(this.clickButton);
        this.clickButton.visible=false;
    }

    createLevel(){
        this.board.forEach(element => {
            var posicion = this.getRandomPosition(this.posiciones.length-1,0)
            var xpieza = this.posiciones[posicion];
            var pieza = new Cart ( this, xpieza.getX()+this.x, xpieza.getY()+this.y,'interrogation', element["sprite"], element["image"]);
            this.posiciones.splice(posicion, 1)
            this.piezas.push( pieza );
        });
    }
}