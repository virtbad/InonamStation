const version : number = 1.0;
console.sendToScreen();
console.log("Running InonamStation v" + version);

console.log("Initializing Values");
const detectorThreshold : number = 5;

const colorPartMap : ColorNumberMap = new ColorNumberMap();
colorPartMap.put(ColorSensorColor.Red, 0);
colorPartMap.put(ColorSensorColor.Yellow, 1);
colorPartMap.put(ColorSensorColor.Green, 2);
colorPartMap.put(ColorSensorColor.Blue, 3);

console.log("Initializing Conveyor Belts")
const collector : ConveyorBelt = new ConveyorBelt(false, 50, 7, motors.largeB);
const elevator : ConveyorBelt = new ConveyorBelt(false, 50, 3.5, motors.largeA);
const ejector : ConveyorBelt = new ConveyorBelt(false, 50, 12, motors.largeC);

console.log("Initializing Distributor")
const distributor : Distributor = new Distributor(motors.mediumD, 400, 4, 10);

console.log("Initializing Sensors")
const detector : sensors.UltraSonicSensor = sensors.ultrasonic2;
const color : sensors.ColorSensor = sensors.color1;

console.log("Initializing Triggers");
const firstTrigger : sensors.TouchSensor = sensors.touch3;
const secondTrigger : sensors.TouchSensor = sensors.touch4;

console.log("Setting up inbuilt Listeners")
firstTrigger.onEvent(ButtonEvent.Pressed, trigger);
secondTrigger.onEvent(ButtonEvent.Pressed, trigger);

console.log("Setting up manual Listeners")
forever (() => {
    if (detector.distance() <= detectorThreshold) analyse();
});

console.log("Finished Initializing!")

function trigger(){
    console.log("Detected Something");
    collector.run(20);
    control.runInParallel(() => collector.run(20))
    elevator.go();
}

function analyse(){
    elevator.stop();

    pause(1000);

    let part : number = colorPartMap.get(color.color());
    console.log("Found Brick: " + part);

    pause(1000);

    elevator.run(15);
    distributor.aim(part);
    ejector.run(40);
    distributor.reset();

    console.log("Deposited Brick")
}