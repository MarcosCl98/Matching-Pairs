class Cart extends Phaser.GameObjects.Sprite{

    constructor (scene, x, y, texture, texture2, image)
      {
        super(scene, x, y, texture);
        this.texture = texture;
        this.texture2 = texture2; 
        this.scene = scene;
        this.image = image;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setInteractive().on('pointerdown', this.onClick.bind(this));
        this.clicked = false;
      }
  
    onClick(piece, pointer, localX, localY, event){
      if(!this.clicked && !this.scene.getFreeze()){
        this.clicked = true;
        this.setTexture(this.texture2);
        this.scene.updateCount(this.image);
      }
    }

    getImage(){
      return this.image;
    }

    isClicked(){
      return this.clicked;
    }

    setClicked(){
      this.clicked = false;
    }

    setVisible(){
      this.visible = false;
    }

    flip(){
      this.setTexture('interrogation');
    }

    update(){
      this.setTexture(this.texture2);
    }
}