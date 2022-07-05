// We keep, in this file, all the necessary responsabilities for preloading, drawing and moving, and also creating instances of poop or diarrhea

class Player {
  constructor() {
    this.left = 50;
    this.top = 0;
    this.width = 50;
    this.height = 50;
    this.velocity = 0;
    // this value was calculated with trial and error, nothing magical here
    this.floor = 412;
    this.jumpCount = 0;
    // shitHole
    this.poopArray = [];
  }

  preload() {
    this.img = loadImage("./images/character-left.png");
  }

  // this instance checks which keys are being pressed and acts accordingly
  keyPressed() {
    if (keyCode === ARROW_UP) {
      this.jump();
    }
    if (keyCode === SPACE_BAR) {
      this.shootPoop();
    }
  }

  // the player has a set of two consecutive jumps that it can do before it needs to reset it (by touching the floor)
  jump() {
    // if the player has jumped twice already, then it shouldn't be able to jump again
    if (this.jumpCount === 2) {
      return;
    }
    // moves the player vertically up. remember: in p5 decreasing the x axis moves the player left, decreasing the y axis moves the player up
    this.top -= 45;
    // by removing velocity we ensure the player still "hovers" until gravity, inevitably starts pulling the player to the floor
    this.velocity -= 5;
    // we count the number of jumps to make sure the player cant jump forever
    this.jumpCount++;
  }

  // we calculate the location of the player's "behind" and then add a new 'poop' to the list of 'poops'
  shootPoop() {
    const assLocation = this.geoffreysAssLocation();
    this.poopArray.push(new Poop(assLocation.top, assLocation.left));
  }

  // this calculation was done with trial and error. was just changing the values until we find the "shittiest" location
  geoffreysAssLocation() {
    return {
      top: this.top + 40,
      left: this.left + 30,
    };
  }

  drawPlayer() {
    // per each frame, geoffrey, our chinless viking, gains more momentum towards the floor
    this.velocity += GRAVITY;
    this.top += this.velocity;
    image(this.img, this.left, this.top, this.width, this.height);

    // whenever geoffrey, our chinless viking, reaches the floor, it stops falling. we say that geoffrey, our chinless viking, wont go anywhere below the floor and now gravity wont pull geoffrey, our chinless viking, with more strength. he is not falling
    if (this.hasReachedTheGround()) {
      // here, we are basically resetting the player's basic information. its no longer falling (becase it already 'fell' - reached the ground)
      // and set jumpCount to 0, because now it can jump
      this.top = this.floor;
      this.velocity = 0;
      this.jumpCount = 0;
    }

    // this is where we make sure that every instance of poop gets drawn into the canvas
    this.poopArray.forEach((poopie) => {
      poopie.throwPoopies();
    });

    // as seen below, this clears the `poopArray`
    this.flush();

    // we moved the logic to methods, because the code blocks were starting to be a little bit to big
    if (keyIsDown(ENTER_KEY)) {
      // if you are pressing the `ENTER_KEY`, this would create an instance of Diarrhea (if none existed beforehand) and make it grow, always attached to the player's behind
      this.createDiarrhea();
      this.moveLiquidPoopOnEnter();
    } else {
      // we are not longer pressing enter.
      this.begonePoopieNeedToCleanTheWhatWhatTheButt();
    }
  }

  // this is very similar to the `moveLiquidPoopOnEnter`, in the sense that it is responsible for drawing the instance (diarrhea)
  // the diference is that this method is called whenever we stop pressing enter (but a diarrhea instance already exists)
  begonePoopieNeedToCleanTheWhatWhatTheButt() {
    if (this.diarrhea) {
      const noLongerInGeoffreysButt = false;
      // we tell the instance (diarrhea) that it should no longer be attached to the player. for more information on what `this.tookImodium()` does read below the comments above that method
      this.diarrhea.drawLiquidPoop(noLongerInGeoffreysButt, this.tookImodium());
      // this.diarrhea.drawLiquidPoop(noLongerInGeoffreysButt, console.log);
    }
  }

  // ignoring the `return () =>` syntax, for now. we will have time to get more familiar with this syntax later
  // this method is here to do the following. Whenever someone calls this function, it should set the `this.diarrhea` property back to null
  tookImodium() {
    return () => {
      if (this.diarrhea) {
        this.diarrhea = null;
      }
    };
  }

  // by checking wether `this.diarrhea` is truthy beforehand, we make sure we have only one instance of that element in the current player
  createDiarrhea() {
    if (!this.diarrhea) {
      this.diarrhea = new Diarrhea();
    }
  }

  // we created this method in order to ensure the `drawPlayer` didn't become a huge mess, but this method is called when we are pressing the `ENTER_KEY`.
  // we calculate the player's behind.  and we tell the instance (diarrhea) what the coordinates of the player's "behind" are
  // we also tell that instance (the diarrhea) that it is still to be attached to the players "behind"
  moveLiquidPoopOnEnter() {
    if (this.diarrhea) {
      const assLocation = this.geoffreysAssLocation();
      this.diarrhea.followGeoffreysAss(assLocation.left, assLocation.top);

      const isDiarrheaStillAttachedToGeoffreyOurChinlessVikingsButt = true;
      this.diarrhea.drawLiquidPoop(
        isDiarrheaStillAttachedToGeoffreyOurChinlessVikingsButt
      );
    }
  }

  // here we are just making sure the player has both "feet" on the ground, on no more than that
  hasReachedTheGround() {
    return this.top >= this.floor;
  }

  // in this case we are clearing the array of 'poops' to make sure that we dont have huge amounts of elements taking into account. if they are no longer visible, we shouldnt be calculating anyuthing on them or drawing. this way were are preventing memory leaks, and computers of overheating for making unnecessary stuff.
  // #JOKE, flushing the poops, help combat global warming. True story.
  flush() {
    this.poopArray = this.poopArray.filter(
      (poopie) => poopie.left <= CANVAS_WIDTH
    );
  }
}
//  this was the previous flush implementation, we found better plumbing, so now we can remove poopies more effectively
// this.poopArray.forEach((poopie, _, array) => {
//   if (poopie.left >= CANVAS_WIDTH) {
//     array.shift();
//   }
// });
