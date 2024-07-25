class Rover {
  constructor(position, mode = "NORMAL", generatorWatts = 110) {
    this.position = position;
    this.mode = mode;
    this.generatorWatts = generatorWatts;
  }

  receiveMessage(message) {
    // Create array of each command type in message
    let commandTypeArray = [];
    let commandValueArray = [];
    for (let i = 0; i < message.commands.length; i++) {
      commandTypeArray.push(message.commands[i].commandType);
      commandValueArray.push(message.commands[i].value);
    }
    // create result object
    let resultArray = [];
    // for each command in message
    for (let i = 0; i < commandTypeArray.length; i++) {
      // if command is MOVE
      if (commandTypeArray[i] === "MOVE") {
        // If this.mode = LOW_POWER
        if (this.mode === "LOW_POWER") {
          // completed = false (can't be moved in this state)
          resultArray.push({ completed: false });
        } else {
          // else: update rover.position = posiion rover should move to (message.commands[i].value)
          this.position = commandValueArray[i];
          // add new key value pair to result object
          // completed: true
          resultArray.push({ completed: true });
        }
      }
      // if command is STATUS_CHECK
      else if (commandTypeArray[i] === "STATUS_CHECK") {
        // add new key value pairs to result object
        // completed : true
        // roverStatus : {mode : this.mode, generatorWatts: this.generatorWatts, position: this.position}
        let roverStatus = {
          mode: this.mode,
          generatorWatts: this.generatorWatts,
          position: this.position,
        };
        resultArray.push({
          completed: true,
          roverStatus,
        });
      } else if (commandTypeArray[i] === "MODE_CHANGE") {
        // if command is MODE_CHANGE
        // this.mode = message.commands[i].value
        this.mode = commandValueArray[i];
        // add new key value pairs to result object
        // completed : true
        resultArray.push({
          completed: true,
        });
      }
    }

    let responseObject = {
      message: message.name,
      results: resultArray,
    };
    return responseObject;
  }
}

module.exports = Rover;
