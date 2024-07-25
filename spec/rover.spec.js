const Rover = require("../rover.js");
const Message = require("../message.js");
const Command = require("../command.js");

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Rover class", function () {
  // 7 tests here!

  // Test 7
  it("constructor sets position and default values for mode and generatorWatts", function () {
    let newRover = new Rover(98382);
    expect(newRover.position).toEqual(98382);
    expect(newRover.mode).toBe("NORMAL");
    expect(newRover.generatorWatts).toEqual(110);
  });

  // Test 8
  it("response returned by receiveMessage contains the name of the message", function () {
    let commands = [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("STATUS_CHECK"),
    ];
    let message = new Message("Test message with two commands", commands);
    let rover = new Rover(98382); // Passes 98382 as the rover's position.
    let response = rover.receiveMessage(message);

    expect(response.message).toBe(message.name);
  });

  // Test 9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function () {
    let commands = [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("STATUS_CHECK"),
    ];
    let message = new Message("Test message with two commands", commands);
    let rover = new Rover(98382); // Passes 98382 as the rover's position.
    let response = rover.receiveMessage(message);

    expect(response.results.length).toEqual(commands.length);
  });

  // Test 10
  it("responds correctly to the status check command", function () {
    let commands = [new Command("STATUS_CHECK")];
    let message = new Message("Status Check Message", commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    let roverStatus = response.results[0].roverStatus;

    expect(roverStatus.mode).toBe(rover.mode);
    expect(roverStatus.generatorWatts).toEqual(rover.generatorWatts);
    expect(roverStatus.position).toEqual(rover.position);
  });

  // Test 11
  it("responds correctly to the mode change command", function () {
    let commands = [new Command("MODE_CHANGE", "LOW_POWER")];
    let message = new Message("Mode Change Message", commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    let completedObject = {'completed' : true}

    expect(rover.mode).toBe("LOW_POWER");
    expect(response.results[0]).toEqual(completedObject);
  });

  // Test 12
  it("responds with a false completed value when attempting to move in LOW_POWER mode", function () {
    let rover = new Rover(98382, 'LOW_POWER');
    let commands = [new Command("MOVE", 150)];
    let message = new Message("Move Message", commands);
    let response = rover.receiveMessage(message);
    let completedObject = {'completed' : false}

    expect(response.results[0]).toEqual(completedObject);
  });

  // Test 13
  it("responds with the position for the move command", function () {
    let rover = new Rover(98382);
    let commands = [new Command("MOVE", 98350)];
    let message = new Message("Move Message", commands);
    let response = rover.receiveMessage(message);

    expect(rover.position).toEqual(98350);
  });

});
