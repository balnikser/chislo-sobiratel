function roll(lowest, highest){
    return Math.ceil(lowest + Math.random() * (highest - lowest));
}

const x5 = "x_5";
const d5 = "÷_5";
const empty = " 0 ";
const unknown = "???"
class Field{
    playerPosition = Array(0, 0);
    selected = '??'
    generate(position){
        let generated;
        const lowestRoll = (this.fromPlayer([0, 0]) < 2)? 0: -99;
        const generate_roll = roll(lowestRoll, 40);
        if (0 < generate_roll && generate_roll < 10){
            generated = x5
        } else if (-25 < generate_roll && generate_roll < 0){
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

    }
    explore(position){
        if(this[position] === unknown){
            this[position] = '_?_';
        } else if (this[position] === '_?_'){
            this.generate(position);
        }
    }
    /**Snake distance on hex grid from player position */
    fromPlayer(position){
        return (Math.abs(position[0] - this.playerPosition[0]) 
                + Math.abs(position[1] - this.playerPosition[1])
                + Math.abs(position[0] - position[1] - this.playerPosition[0] + this.playerPosition[1])
               )/2
    }
    get(position){
        if(this[position] === undefined){
            this[position] = unknown;
        } 
        if(this.fromPlayer(position) < 2){
            this.explore(position);
        }/* else if (Number(this[position]) < 0){
            this[position] = " " + (Number(this[position]) + 1);
            this[position] = this[position].substring(this[position].length - 3);
        }*/
        if(position[0] === this.selected[0] && position[1] === this.selected[1]){
            console.log("selected field: " + '>' + this[position] + '<')
            return '>' + this[position] + '<'
        }
        return '[' + this[position] + ']'
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
    field = new Field();
    constructor(){
        this.log("")
        this.draw();
    }
    fromPosition(direction){
        return [this.field.playerPosition[0] + direction[0], this.field.playerPosition[1] + direction[1]]
    }
    log(text){
        var entry = document.createElement('li');
        entry.appendChild(document.createTextNode(text + " -> " + this.score));
        this.logElement.appendChild(entry);
    }
     move(vector){
        this.field[this.field.playerPosition] = " -5";
        this.field.explore(this.fromPosition(vector));
        this.field.playerPosition = this.fromPosition(vector);
        //this.log("step on " + this.field.playerPosition + this.field[this.field.playerPosition]);
        if (this.field[this.field.playerPosition] === x5){
            this.score *= 5;
            this.log("x5");
        } else if (this.field[this.field.playerPosition] === d5){
            this.score = Math.floor(this.score/5);
            this.log("/5");
        } else if (Number(this.field[this.field.playerPosition])){
            this.score += Number(this.field[this.field.playerPosition]);
            this.log(this.field[this.field.playerPosition]);
        }

    }
    buttonPressed(id){
        console.log(this.vectorAtDirection[id]);
        this.move(this.vectorAtDirection[id]);
        this.draw();
    }
    draw(){
        var text = this.field.get(this.fromPosition([-1, 2]))
                   + this.field.get(this.fromPosition([0, 2]))
                   + this.field.get(this.fromPosition([1, 2]))
                   + this.field.get(this.fromPosition([2, 2]))
                   + this.field.get(this.fromPosition([3, 2]))
                   + '\n'
                   + '\n?]'
                   + this.field.get(this.fromPosition([-1, 1]))
                   + this.field.get(this.fromPosition([0, 1]))
                   + this.field.get(this.fromPosition([1, 1]))
                   + this.field.get(this.fromPosition([2, 1]))
                   + '[?\n'
                   + '\n'
                   + this.field.get(this.fromPosition([-2, 0]))
                   + this.field.get(this.fromPosition([-1, 0]))
                   + '_🏃_'
                   + this.field.get(this.fromPosition([1, 0]))
                   + this.field.get(this.fromPosition([2, 0]))
                   + '\n'
                   + '\n?]'
                   + this.field.get(this.fromPosition([-2, -1]))
                   + this.field.get(this.fromPosition([-1, -1]))
                   + this.field.get(this.fromPosition([0, -1]))
                   + this.field.get(this.fromPosition([1, -1]))
                   + '[?\n'
                   + '\n'
                   + this.field.get(this.fromPosition([-3, -2]))
                   + this.field.get(this.fromPosition([-2, -2]))
                   + this.field.get(this.fromPosition([-1, -2]))
                   + this.field.get(this.fromPosition([0, -2]))
                   + this.field.get(this.fromPosition([1, -2]))
        this.fieldElement.innerText = text;
        this.scoreElement.innerText = this.score

    }
}

app = new App();