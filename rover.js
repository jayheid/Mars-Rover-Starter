class Rover {
  constructor(position, mode = "NORMAL", generatorWatts = 110) {
    this.position = position;
    this.mode = mode;
    this.generatorWatts = generatorWatts;
  }

  receiveMessage(message) {
    let commandTypeArray = [];
    let commandValueArray = [];

    for (let i = 0; i < message.commands.length; i++) {
      commandTypeArray.push(message.commands[i].commandType);
      commandValueArray.push(message.commands[i].value);
    }

    let resultArray = [];

    for (let i = 0; i < commandTypeArray.length; i++) {
      if (commandTypeArray[i] === "MOVE") {
        if (this.mode === "LOW_POWER") {
          resultArray.push({ completed: false });
        } else {
          this.position = commandValueArray[i];
          resultArray.push({ completed: true });
        }
      }
      else if (commandTypeArray[i] === "STATUS_CHECK") {
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
        this.mode = commandValueArray[i];
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
