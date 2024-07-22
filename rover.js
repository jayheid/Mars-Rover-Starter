class Rover {
   constructor(position, mode = 'NORMAL', generatorWatts = 110){
      this.position = position;
      this.mode = mode;
      this.generatorWatts = generatorWatts;
   }

   receiveMessage(message){
      let resultObject = {
         name : message.name
      }
      return resultObject;
   }
   
}

module.exports = Rover;