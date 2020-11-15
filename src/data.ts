class ColorNumberMap {
  private colors: ColorSensorColor[];
  private numbers: number[];

  constructor() {
    this.colors = [];
    this.numbers = [];
  }

  public put(color: ColorSensorColor, num: number) {
    this.colors.push(color);
    this.numbers.push(num);
  }

  public get(color: ColorSensorColor): number {
    for (let i = 0; i < this.colors.length; i++) if (this.colors[i] == color) return this.numbers[i];
    return -1;
  }

  public set(color: ColorSensorColor, num: number) {
    for (let i = 0; i < this.colors.length; i++) if (this.colors[i] == color) this.numbers[i] = num;
  }
}

class UI {
  private height: number;
  private progressRed: ProgressBar;
  private progressYellow: ProgressBar;
  private progressGreen: ProgressBar;
  private progressBlue: ProgressBar;
  private padding: number;
  private cHeight: number;
  private cWidth: number;
  private progress: {
    red: number;
    yellow: number;
    green: number;
    blue: number;
  };

  constructor() {
    this.height = 128;
    this.cHeight = 90;
    this.cWidth = 32;
    this.padding = 10;
    this.progress = {
      red: 0,
      yellow: 0,
      green: 0,
      blue: 0
    };
    this.progressRed = new ProgressBar(this.padding, 19, this.cWidth, this.cHeight);
    this.progressYellow = new ProgressBar(this.padding * 2 + this.cWidth, 19, this.cWidth, this.cHeight);
    this.progressGreen = new ProgressBar(this.padding * 3 + this.cWidth * 2, 19, this.cWidth, this.cHeight);
    this.progressBlue = new ProgressBar(this.padding * 4 + this.cWidth * 3, 19, this.cWidth, this.cHeight);

    screen.print('R', this.padding + this.cWidth * 0.4, 5, 1);
    screen.print('Y', this.padding * 2 + this.cWidth * 1.4, 5, 1);
    screen.print('G', this.padding * 3 + this.cWidth * 2.4, 5, 1);
    screen.print('B', this.padding * 4 + this.cWidth * 3.4, 5, 1);

    this.progressRed.draw();
    this.progressYellow.draw();
    this.progressGreen.draw();
    this.progressBlue.draw();

    screen.print('0%', this.padding + this.cWidth * 0.3, this.height - 14, 1);
    screen.print('0%', this.padding * 2 + this.cWidth * 1.3, this.height - 14, 1);
    screen.print('0%', this.padding * 3 + this.cWidth * 2.3, this.height - 14, 1);
    screen.print('0%', this.padding * 4 + this.cWidth * 3.3, this.height - 14, 1);
  }

  public updateRed(percentage: number) {
    control.runInParallel(() => {
      for (let index = 0; index < 100; index++) {
        screen.fillRect(this.padding, this.height - 14, this.cWidth, this.height, 0);
        const p: number = Math.round(this.progress.red + percentage / 100) > 100 ? 100 : Math.round(this.progress.red + percentage / 100);
        if (p < 10) screen.print(`${p}%`, this.padding + this.cWidth * 0.3, this.height - 14, 1);
        else if (p > 99) screen.print(`${p}%`, this.padding, this.height - 14, 1);
        else screen.print(`${p}%`, this.padding + this.cWidth * 0.2, this.height - 14, 1);
        this.progress.red += percentage / 100;
        pause(50);
      }
    });
    this.progressRed.update(percentage);
  }

  public updateYellow(percentage: number) {
    control.runInParallel(() => {
      for (let index = 0; index < 100; index++) {
        screen.fillRect(this.padding * 2 + this.cWidth, this.height - 14, this.cWidth, this.height, 0);
        const p: number = Math.round(this.progress.yellow + percentage / 100) > 100 ? 100 : Math.round(this.progress.yellow + percentage / 100);
        if (p < 10) screen.print(`${p}%`, this.padding * 2 + this.cWidth * 1.3, this.height - 14, 1);
        else if (p > 99) screen.print(`${p}%`, this.padding * 2 + this.cWidth, this.height - 14, 1);
        else screen.print(`${p}%`, this.padding * 2 + this.cWidth * 1.2, this.height - 14, 1);
        this.progress.yellow += percentage / 100;
        pause(50);
      }
    });
    this.progressYellow.update(percentage);
  }

  public updateGreen(percentage: number) {
    control.runInParallel(() => {
      for (let index = 0; index < 100; index++) {
        screen.fillRect(this.padding * 3 + this.cWidth * 2, this.height - 14, this.cWidth, this.height, 0);
        const p: number = Math.round(this.progress.green + percentage / 100) > 100 ? 100 : Math.round(this.progress.green + percentage / 100);
        if (p < 10) screen.print(`${p}%`, this.padding * 3 + this.cWidth * 2.3, this.height - 14, 1);
        else if (p > 99) screen.print(`${p}%`, this.padding * 3 + this.cWidth * 2, this.height - 14, 1);
        else screen.print(`${p}%`, this.padding * 3 + this.cWidth * 2.2, this.height - 14, 1);
        this.progress.green += percentage / 100;
        pause(50);
      }
    });
    this.progressGreen.update(percentage);
  }

  public updateBlue(percentage: number) {
    control.runInParallel(() => {
      for (let index = 0; index < 100; index++) {
        screen.fillRect(this.padding * 4 + this.cWidth * 3, this.height - 14, this.cWidth, this.height, 0);
        const p: number = Math.round(this.progress.blue + percentage / 100) > 100 ? 100 : Math.round(this.progress.blue + percentage / 100);
        if (p < 10) screen.print(`${p}%`, this.padding * 4 + this.cWidth * 3.3, this.height - 14, 1);
        else if (p > 99) screen.print(`${p}%`, this.padding * 4 + this.cWidth * 3, this.height - 14, 1);
        else screen.print(`${p}%`, this.padding * 4 + this.cWidth * 3.2, this.height - 14, 1);
        this.progress.blue += percentage / 100;
        pause(50);
      }
    });
    this.progressBlue.update(percentage);
  }
}

class ProgressBar {
  private x: number;
  private y: number;
  private width: number;
  private height: number;

  private progress: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.progress = 0;
  }

  public update(percentage: number) {
    const n: number = (this.height / 100) * percentage;
    for (let index = 0; index < 100; index++) {
      this.progress = this.progress + n / 100 > this.height - 4 ? this.height - 4 : this.progress + n / 100;
      screen.fillRect(this.x + 2, this.y - 2 + (this.height - this.progress), this.width - 4, this.progress, 1);
      pause(50);
    }
  }

  public draw() {
    screen.drawRect(this.x, this.y, this.width, this.height, 1);
  }
}
