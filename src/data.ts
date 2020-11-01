class ColorNumberMap {
    private colors : ColorSensorColor[];
    private numbers : number[];

    constructor(){
        this.colors = [];
        this.numbers = [];
    }

    public put(color : ColorSensorColor, num : number){
        this.colors.push(color);
        this.numbers.push(num);
    }

    public get(color : ColorSensorColor) : number {
        for (let i = 0; i < this.colors.length; i++) {
            if (this.colors[i] == color) return this.numbers[i];
        }
        return -1;
    }

    public set(color : ColorSensorColor, num : number){
        for (let i = 0; i < this.colors.length; i++) {
            if (this.colors[i] == color) this.numbers[i] = num;
        }
    }
}