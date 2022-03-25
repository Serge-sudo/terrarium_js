var x = 50;
var y = 20;
var side = 25;
var matrix = [];
var GrassArray = [];
var GrassEaterArray = [];
var MonsterArray = [];
var DeadArray = [];
var GodArray = [];

function setup() {
    frameRate(5);
    createCanvas(x * side, y * side);

    //create matrix
    for (var i = 0; i < y; i++) {
        matrix[i] = [];
        for (var k = 0; k < x; k++) {
            matrix[i][k] = 0;
        }
    }
    //create function for build rect by %
    function ranproc(value, num) {
        count = 0;
        proc = value;
        if (proc > 100 || proc < 0) return 1;
        var rarr = null;
        var rel = null;
        while (((count / (x * y)) * 100) < proc) {
            do {
                rarr = Math.round(random(0, y - 1));
                rel = Math.round(random(0, x - 1));
            } while (matrix[rarr][rel] != 0)

            matrix[rarr][rel] = num;
            count++;
        }
    }
    //build grass
    ranproc(30, 1);
    //build grassEater
    ranproc(5, 2);
    //build Monsters
    ranproc(2,3);
    //----------Dead and God--------
    ranproc(0.1, 5);
    ranproc(0.1, 6);
    //--------------------
    //Sorted Rect by Type
    for (var m = 0; m < matrix.length; m++) {
        for (var n = 0; n < matrix[m].length; n++) {
            if (matrix[m][n] == 1)
                GrassArray.push(new Grass(n, m));
            if (matrix[m][n] == 2)
                GrassEaterArray.push(new GrassEater(n, m));
            if (matrix[m][n] == 3)
                MonsterArray.push(new Monster(n, m));
            if (matrix[m][n] == 5)
                DeadArray.push(new Dead(n, m));
            if (matrix[m][n] == 6)
                GodArray.push(new God(n, m));
        }
    }

}
var count = 0;

function draw() {
    background("#acacac");
    for (var j in GrassEaterArray) {
        GrassEaterArray[j].eat();
    }
    for (var k in GrassEaterArray) {
        GrassEaterArray[k].delbyhungry(k);
    }
    for (var b in GrassEaterArray) {
        GrassEaterArray[b].mul();
    }
    for (var k in GrassArray) {
        GrassArray[k].mul();
    }
    for (var t in MonsterArray) {
        MonsterArray[t].eatmon(t);
    }
    for (var t in MonsterArray) {
        MonsterArray[t].eat();
    }
    for (var t in MonsterArray) {
        MonsterArray[t].mul();
    }
    for (var t in MonsterArray) {
        MonsterArray[t].die(t);
    }
    for (var c in GrassEaterArray) {
        GrassEaterArray[c].delbyeat(c);
    }
    for (var c in DeadArray) {
        DeadArray[c].get();
    }
    for (var c in GodArray) {
        GodArray[c].revive();
    }

    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                fill("green");
                rect(j * side, i * side, side, side);
            }
            if (matrix[i][j] == 2) {
                fill("yellow");
                rect(j * side, i * side, side, side);
            }
            if (matrix[i][j] == 3) {
                fill("red");
                rect(j * side, i * side, side, side);
            }
            if (matrix[i][j] == 4) {
                fill("aqua");
                rect(j * side, i * side, side, side);
            }
            if (matrix[i][j] == 5) {
                fill("black");
                rect(j * side, i * side, side, side, 100);
            }
            if (matrix[i][j] == 6) {
                fill("gold");
                rect(j * side, i * side, side, side, 100);
            }
        }
    }
      console.clear();
     console.log(count);
    count++;
}