function roll(lowest, highest){
    return Math.ceil(lowest + Math.random() * (highest - lowest));
}
const x5 = "x 5";
const d5 = "÷ 5";
const empty = " 0 ";
const unknown = "???"
class Field{
    get(position){
        if(this[position] === undefined){
            this[position] = unknown;
        } else if(this[position] === unknown){
            this[position] = ' ? ';
        } else if (this[position] === ' ? '){
            let generated;
            const generate_roll = roll(-99, 99);
            if (0 < generate_roll && generate_roll < 10){
                generated = x5
            } else if (-10 < generate_roll && generate_roll < 0){
                generated = d5
            } else if (generate_roll === 0){
                generated = empty;
            } else {
                if(generate_roll > 0){
                    generated = "+" + generate_roll;
                } else {
                    generated = generate_roll;
                }
            }
            this[position] = generated;
        }/* else if (Number(this[position]) < 0){
            this[position] = " " + (Number(this[position]) + 1);
            this[position] = this[position].substring(this[position].length - 3);
        }*/
        return this[position]
    }
};
class App{
    score = 0;
    logElement = document.getElementById("log");
    scoreElement = document.getElementById("score-counter");
    fieldElement = document.getElementById("field")
    vectorAtDirection = {
        "right": [1, 0],
        "left": [-1, 0],
        "up-left": [0, 1],
        "down-right": [0, -1],
        "up-right": [1, 1],
        "down-left": [-1, -1]
    }    
    position = [0, 0]
    field = new Field();
    constructor(){
        this.log("game start")
        this.draw();
    }
    fromPosition(direction){
        return [this.position[0] + direction[0], this.position[1] + direction[1]]
    }
    log(text){
        var entry = document.createElement('li');
        entry.appendChild(document.createTextNode(text + " = " + this.score));
        this.logElement.appendChild(entry);
    }
    move(vector){
        this.field[this.position] = " -5";
        this.position = this.fromPosition(vector);
        if(this.field[this.position] === ' ? '){
            this.field.get(this.position);
        }
        //this.log("step on " + this.position + this.field[this.position]);
        if (this.field[this.position] === x5){
            this.score *= 5;
            this.log("x5");
        } else if (this.field[this.position] === d5){
            this.score = Math.floor(this.score/5);
            this.log("/5");
        } else if (Number(this.field[this.position])){
            this.score += Number(this.field[this.position]);
            this.log("add score: " + this.field[this.position]);
        }

    }
    buttonPressed(id){
        console.log(this.vectorAtDirection[id]);
        this.move(this.vectorAtDirection[id]);
        this.draw();
    }
    draw(){
        var text = '────┌───┬───┬───┐────\n────│' 
                   + this.field.get(this.fromPosition([0, 2]))
                   + '│'
                   + this.field.get(this.fromPosition([1, 2]))
                   + '│'
                   + this.field.get(this.fromPosition([2, 2]))
                   + '│────\n──┌─┴─┬─┴─┬─┴─┬─┴─┐──\n──│'
                   + this.field.get(this.fromPosition([-1, 1]))
                   + '│'
                   + this.field.get(this.fromPosition([0, 1]))
                   + '│'
                   + this.field.get(this.fromPosition([1, 1]))
                   + '│'
                   + this.field.get(this.fromPosition([2, 1]))
                   + '│──\n┌─┴─┬─┴─┬─┴─┬─┴─┬─┴─┐\n│'
                   + this.field.get(this.fromPosition([-2, 0]))
                   + '│'
                   + this.field.get(this.fromPosition([-1, 0]))
                   + '│'
                   //+ this.field.get(this.fromPosition([0, 0]))
                   + ' Ⰰ '
                   + '│'
                   + this.field.get(this.fromPosition([1, 0]))
                   + '│'
                   + this.field.get(this.fromPosition([2, 0]))
                   + '│\n└─┬─┴─┬─┴─┬─┴─┬─┴─┬─┘\n──│'
                   + this.field.get(this.fromPosition([-2, -1]))
                   + '│'
                   + this.field.get(this.fromPosition([-1, -1]))
                   + '│'
                   + this.field.get(this.fromPosition([0, -1]))
                   + '│'
                   + this.field.get(this.fromPosition([1, -1]))
                   + '│──\n──└─┬─┴─┬─┴─┬─┴─┬─┘──\n────│'
                   + this.field.get(this.fromPosition([-2, -2]))
                   + '│'
                   + this.field.get(this.fromPosition([-1, -2]))
                   + '│'
                   + this.field.get(this.fromPosition([0, -2]))
                   + '│────\n────└───┴───┴───┘────'
        this.fieldElement.innerText = text;
        this.scoreElement.innerText = this.score

    }
}

app = new App();