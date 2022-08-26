class Field{
    data = {};
    get(position){
        return "" + Math.abs(position[0])%10 + ';' + Math.abs(position[1])%10
        if(this.data[position] === undefined){
            this.data[position] = "???";
        }
        return this.data[position]
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
        this.drawVisible();
    }
    fromPosition(direction){
        return [this.position[0] + direction[0], this.position[1] + direction[1]]
    }
    log(text){
        var entry = document.createElement('li');
        entry.appendChild(document.createTextNode(text + ";score: " + this.score));
        this.logElement.appendChild(entry);
    }
    buttonPressed(id){
        this.log("Button Pressed " + id);
        this.score += 1;
        console.log(this.vectorAtDirection[id]);
        this.position = this.fromPosition(this.vectorAtDirection[id]);
        console.log("New position " + this.position);
        this.drawVisible();
    }
    drawVisible(){
        var text = '▲▲▲▲┌───┬───┬───┐▲▲▲▲\n▲▲▲▲│' 
                   + this.field.get(this.fromPosition([0, 2]))
                   + '│'
                   + this.field.get(this.fromPosition([1, 2]))
                   + '│'
                   + this.field.get(this.fromPosition([2, 2]))
                   + '│▲▲▲▲\n▲▲┌─┴─┬─┴─┬─┴─┬─┴─┐▲▲\n▲▲│'
                   + this.field.get(this.fromPosition([-1, 1]))
                   + '│'
                   + this.field.get(this.fromPosition([0, 1]))
                   + '│'
                   + this.field.get(this.fromPosition([1, 1]))
                   + '│'
                   + this.field.get(this.fromPosition([2, 1]))
                   + '│▲▲\n┌─┴─┬─┴─┬─┴─┬─┴─┬─┴─┐\n│'
                   + this.field.get(this.fromPosition([-2, 0]))
                   + '│'
                   + this.field.get(this.fromPosition([-1, 0]))
                   + '│'
                   + this.field.get(this.fromPosition([0, 0]))
                   + '│'
                   + this.field.get(this.fromPosition([1, 0]))
                   + '│'
                   + this.field.get(this.fromPosition([2, 0]))
                   + '│\n└─┬─┴─┬─┴─┬─┴─┬─┴─┬─┘\n▲▲│'
                   + this.field.get(this.fromPosition([-2, -1]))
                   + '│'
                   + this.field.get(this.fromPosition([-1, -1]))
                   + '│'
                   + this.field.get(this.fromPosition([0, -1]))
                   + '│'
                   + this.field.get(this.fromPosition([1, -1]))
                   + '│▲▲\n▲▲└─┬─┴─┬─┴─┬─┴─┬─┘▲▲\n▲▲▲▲│'
                   + this.field.get(this.fromPosition([-2, -2]))
                   + '│'
                   + this.field.get(this.fromPosition([-1, -2]))
                   + '│'
                   + this.field.get(this.fromPosition([0, -2]))
                   + '│▲▲▲▲\n▲▲▲▲└───┴───┴───┘▲▲▲▲'
        this.fieldElement.innerText = text;

    }
}

app = new App();