class Distributor {
    private range : number;
    private parts : number;
    private speed : number;

    private motor : motors.Motor;

    constructor (motor : motors.Motor, range : number, parts : number, speed : number){
        this.motor = motor;
        this.range = range;
        this.speed = speed;
        this.parts = parts;

        this.motor.reset();
    }
    
    public aim(part : number){
        let degrees : number = ((this.range * 2) / (this.parts - 1) * part) - this.range;
        console.log("Degrees: " + degrees);
        let move : number = degrees - this.motor.angle();
        console.log("Move: " + move);
        this.motor.run(this.speed, move, MoveUnit.Degrees);
    }

    public reset(){
        this.motor.run(this.speed, 0 - this.motor.angle(), MoveUnit.Degrees);
    }
}