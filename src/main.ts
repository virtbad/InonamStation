const version: number = 1.1;

const detectorThreshold: number = 5;
const objectsToFind: number = 3;

const colorPartMap: ColorNumberMap = new ColorNumberMap();
const ui = new UI();
colorPartMap.put(ColorSensorColor.Red, 0);
colorPartMap.put(ColorSensorColor.Yellow, 1);
colorPartMap.put(ColorSensorColor.Green, 2);
colorPartMap.put(ColorSensorColor.Blue, 3);

const collector: ConveyorBelt = new ConveyorBelt(false, 50, 7, motors.largeB);
const elevator: ConveyorBelt = new ConveyorBelt(false, 50, 3.5, motors.largeA);
const ejector: ConveyorBelt = new ConveyorBelt(false, 50, 12, motors.largeC);

const distributor: Distributor = new Distributor(motors.mediumD, 400, 4, 10);

const detector: sensors.UltraSonicSensor = sensors.ultrasonic2;
const color: sensors.ColorSensor = sensors.color1;

const firstTrigger: sensors.TouchSensor = sensors.touch3;
const secondTrigger: sensors.TouchSensor = sensors.touch4;

firstTrigger.onEvent(ButtonEvent.Pressed, trigger);
secondTrigger.onEvent(ButtonEvent.Pressed, trigger);

forever(() => {
  if (detector.distance() <= detectorThreshold) analyse();
});

function trigger() {
  collector.run(20);
  control.runInParallel(() => collector.run(20));
  elevator.go();
}

function analyse() {
  elevator.stop();

  pause(1000);

  let part: number = colorPartMap.get(color.color());

  pause(1000);

  elevator.run(15);
  distributor.aim(part);
  control.runInParallel(() => ejector.run(40));
  distributor.reset();
  switch (color.color()) {
    case 5:
      ui.updateRed(100 / objectsToFind);
      break;
    case 4:
      ui.updateYellow(100 / objectsToFind);
      break;
    case 3:
      ui.updateGreen(100 / objectsToFind);
      break;
    case 2:
      ui.updateBlue(100 / objectsToFind);
      break;
  }
}
