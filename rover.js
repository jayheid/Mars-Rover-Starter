class Rover {
  constructor(position, mode = "NORMAL", generatorWatts = 110) {
    this.position = position;
    this.mode = mode;
    this.generatorWatts = generatorWatts;
  }

  receiveMessage(message) {
   // for each command in message
      // if command is MOVE
         // update rover.position = posiion rover should move to (message.commands[i].value)

    let resultObject = {
      name: message.name,
    };
    return resultObject;
  }
}

module.exports = Rover;
