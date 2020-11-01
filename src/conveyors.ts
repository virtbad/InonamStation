class ConveyorBelt {
    private direction: boolean;
    private speed: number;
    private lengthPerRound: number;
    private motor: motors.Motor;


    constructor(direction: boolean, speed: number, cmPerRound: number, motor: motors.Motor) {
        this.direction = direction;
        this.speed = speed;
        this.lengthPerRound = cmPerRound;
        this.motor = motor;        
    }

    public run(length: number) :void {
        let rounds : number = (length / this.lengthPerRound) * (this.direction ? 1 : -1);
        this.motor.run(this.speed, rounds, MoveUnit.Rotations);
    }

    public stop() :void{
        this.motor.stop();
    }

    public go() : void {
        this.motor.run((this.direction ? 1 : -1) * this.speed);
    }
}