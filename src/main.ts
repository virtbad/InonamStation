const collector : ConveyorBelt = new ConveyorBelt(false, 50, 10, motors.largeB);
const elevator : ConveyorBelt = new ConveyorBelt(false, 50, 5.9, motors.largeA);
const ejector : ConveyorBelt = new ConveyorBelt(false, 50, 17.5, motors.largeC);

const distributor : Distributor = new Distributor(motors.mediumD, 400, 6, 10);

console.sendToScreen();

