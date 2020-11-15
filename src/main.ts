// Priority: -1
music.playTone(Note.A, 100);

const version : number = 1.2;
console.sendToScreen();
console.log("Running InonamStation v" + version);

console.log("Initializing Values");
const detectorThreshold : number = 5;
const triggerThreshold : number = 70;

const colorPartMap : ColorNumberMap = new ColorNumberMap();
colorPartMap.put(ColorSensorColor.Red, 0);
colorPartMap.put(ColorSensorColor.Yellow, 1);
colorPartMap.put(ColorSensorColor.Green, 2);
colorPartMap.put(ColorSensorColor.Blue, 3);

console.log("Initializing Conveyor Belts")
const collector : ConveyorBelt = new ConveyorBelt(false, 50, 7, motors.largeA);
const elevator : ConveyorBelt = new ConveyorBelt(false, 50, 3.5, motors.largeB);
const ejector : ConveyorBelt = new ConveyorBelt(false, 50, 12, motors.largeD);

console.log("Initializing Distributor")
const distributor : Distributor = new Distributor(motors.mediumC, 400, 4, 10);

console.log("Initializing Sensors")
const detector : sensors.UltraSonicSensor = sensors.ultrasonic1;
const color : sensors.ColorSensor = sensors.color2;
color.setMode(ColorSensorMode.Color);

console.log("Initializing Triggers");
const trigger : sensors.InfraredSensor = sensors.infrared3;

console.log("Setting up manual Listeners")
let triggerSame : boolean = false;
let detectorSame : boolean = false;
forever (() => {
    if (detector.distance() <= detectorThreshold){
        if (!detectorSame) analyse();
        detectorSame = true;
    }
    else detectorSame = false;

    if (trigger.proximity() <= triggerThreshold){
        if (!triggerSame) triggered();
        triggerSame = true;
    }
    else triggerSame = false;
});

console.log("Finished Initializing!")

function triggered(){
    console.log("Detected Something");
    collector.run(20);
    control.runInParallel(() => collector.run(40));
    elevator.go();
}

function analyse(){
    let firstColor : ColorSensorColor = color.color();
    if(firstColor == ColorSensorColor.Black || firstColor == ColorSensorColor.None){ // Sometimes returns random noise
        return;
    }

    elevator.stop();

    pause(1000);

    let current : ColorSensorColor = color.color();
    if (current == ColorSensorColor.Brown) current = ColorSensorColor.Yellow; //Sometimes detects yellow as brown

    let part : number = colorPartMap.get(current);
    console.log("Found Brick: " + colorToString(current));

    pause(1000);

    elevator.run(15);
    ejector.run(10);
    if(part != -1) distributor.aim(part);
    ejector.run(40);
    if(part != -1) distributor.reset();

    console.log("Deposited Brick")
}

function colorToString(color : ColorSensorColor) : string {
    switch (color){
        case ColorSensorColor.White: return "White";
        case ColorSensorColor.Black: return "Black";
        case ColorSensorColor.Brown: return "Brown";
        case ColorSensorColor.Red: return "Red";
        case ColorSensorColor.Green: return "Green";
        case ColorSensorColor.Blue: return "Blue";
        case ColorSensorColor.Yellow: return "Yellow";
        default: return "None";
    }
}
