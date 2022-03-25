var found;
var type;
var Removed = [];
class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiplay = 0;
    }
    DirectionFunc() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    getDirection(t) {
        this.DirectionFunc();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (y >= matrix.length || y < 0) continue;
            if (x < 0 || x >= matrix[0].length) continue;
            if (matrix[y][x] == t) {
                found.push(this.directions[i]);
            }
        }
        return found;
    }
    mul() {
        this.multiplay++;
        if (this.multiplay == 8) {
            found = this.getDirection(0);
            if (found.length != 0) {
                found = random(found);
                matrix[found[1]][found[0]] = 1;
                GrassArray.push(new Grass(found[0], found[1]));
            }
            this.multiplay = 0;
        }
    }
    del(num) {
        if (matrix[this.y][this.x] != 1) {
            GrassArray.splice(num, 1);
        }
    }
}

class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.type = 2;
        this.diecount = 0;
        this.movecount = 0;
        this.eatcount = 0;
    }
    DirectionFunc() {
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],

            [this.x - 2, this.y - 1],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 1],

            [this.x - 2, this.y],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x + 2, this.y],

            [this.x - 2, this.y + 1],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 1],

            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2]
        ];

    }
    getDirection(t) {
        this.DirectionFunc();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (y >= matrix.length || y < 0) continue;
            if (x < 0 || x >= matrix[0].length) continue;
            if (matrix[y][x] == t) {
                found.push(this.directions[i]);
            }
        }
        return found;
    }
    move() {
        found = this.getDirection(0);
        if (found.length != 0) {
            found = random(found);
            matrix[this.y][this.x] = 0;
            matrix[found[1]][found[0]] = 2;
            this.x = found[0];
            this.y = found[1];
            this.movecount++;
            this.eatcount = 0;
        }
    }

    eat() {
        found = this.getDirection(1);
        if (found.length != 0) {
            found = random(found);
            matrix[this.y][this.x] = 0;
            matrix[found[1]][found[0]] = 2;
            this.x = found[0];
            this.y = found[1];
            for (var n in GrassArray) {
                GrassArray[n].del(n);
            }
            this.eatcount++;
            this.mul();
            this.movecount = 0;
        } else {
            this.move();
        }
    }


    mul() {
        if (this.eatcount >= 5) {
            found = this.getDirection(0);
            if (found.length != 0) {
                found = random(found);
                matrix[found[1]][found[0]] = 2;
                GrassEaterArray.push(new GrassEater(found[0], found[1]));
            }
            this.eatcount = 0;
        }
    }
    delbyeat(num) {
        if (matrix[this.y][this.x] != 2) {
            GrassEaterArray.splice(num, 1);
        }
    }
    delbyhungry(num) {
        if (this.movecount >= 5) {
            matrix[this.y][this.x] = 4;
            GrassEaterArray[num].diecount++;
            if (this.diecount < 3) Removed.push(GrassEaterArray[num]);
            GrassEaterArray.splice(num, 1);
        }
    }
}

class Monster {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.type = 3;
        this.gender = random([0, 1]);
        this.movecount = 0;
        this.diecount = 0;
        this.eatcount = 0;
        this.multiplay = 0;
    }
    DirectionFunc() {
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],

            [this.x - 2, this.y - 1],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 1],

            [this.x - 2, this.y],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x + 2, this.y],

            [this.x - 2, this.y + 1],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 1],

            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2]
        ];
    }
    getDirection(t) {
        this.DirectionFunc();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (y >= matrix.length || y < 0) continue;
            if (x < 0 || x >= matrix[0].length) continue;
            if (matrix[y][x] == t) {
                found.push(this.directions[i]);
            }
        }
        return found;
    }
    move() {
        found = this.getDirection(0);
        if (found.length != 0) {
            found = random(found);
            matrix[this.y][this.x] = 0;
            matrix[found[1]][found[0]] = 3;
            this.x = found[0];
            this.y = found[1];
            this.movecount++;
        }
    }

    eat() {
        found = this.getDirection(2);
        if (found.length != 0) {
            found = random(found);
            matrix[this.y][this.x] = 0;
            matrix[found[1]][found[0]] = 3;
            this.x = found[0];
            this.y = found[1];
            this.gender = random([0, 1]);
            this.eatcount++;
            this.movecount = 0;
        } else {
            this.move();
        }
    }
    mul() {
        if (this.gender == 0 && this.eatcount >= 5) {
            this.eatcount = 0;
            found = this.getDirection(0);
            if (found.length != 0) {
                found = random(found);
                matrix[found[1]][found[0]] = 3;
                MonsterArray.push(new Monster(found[0], found[1]));
            }
        }
    }
    eatmon(num) {
        found = this.getDirection(3);
        if (found.length >= 2) {
            matrix[this.y][this.x] = 0;
            MonsterArray.splice(num, 1);
        }
    }
    die(num) {
        if ((this.getDirection(0).length == 0 && this.getDirection(2).length == 0) || this.movecount >= 20) {
            matrix[this.y][this.x] = 4;
            MonsterArray[num].diecount++;
            if (this.diecount < 3) Removed.push(MonsterArray[num]);
            MonsterArray.splice(num, 1);
        }
    }
}

//-----------------------------------+++++++++++++---------------------
class Dead {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 4;
        this.multiplay = 0;
    }
    DirectionFunc() {
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],

            [this.x - 2, this.y - 1],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 1],

            [this.x - 2, this.y],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x + 2, this.y],

            [this.x - 2, this.y + 1],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 1],

            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2]
        ];
    }
    getDirection(t) {
        this.DirectionFunc();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (y >= matrix.length || y < 0) continue;
            if (x < 0 || x >= matrix[0].length) continue;
            if (matrix[y][x] == t) {
                found.push(this.directions[i]);
            }
        }
        return found;
    }

    getAllDirection(t) {
        var foo = [];
        for (var i in matrix) {
            for (var k in matrix[i]) {
                if (matrix[i][k] == t) {
                    foo.push([k, i]);
                }
            }
        }
        return foo;
    }

    move() {
        found = [];
        for (var i in matrix) {
            for(var k in matrix[i]){
                if(matrix[i][k] == 4)
                    found.push([k,i]);
        }
        }
        if (found.length != 0) {
            found = found[0];
            if (found[0] < this.x && found[1] < this.y) {
                if (matrix[this.y - 1][this.x - 1] == 0) {
                    matrix[this.y][this.x] = 0;
                    this.x = this.x - 1;
                    this.y = this.y - 1;
                    matrix[this.y][this.x] = 5;
                } else this.change(this.x - 1, this.y - 1, this.x, this.y);
            }
            if (found[0] > this.x && found[1] > this.y) {
                if (matrix[this.y + 1][this.x + 1] == 0) {
                    matrix[this.y][this.x] = 0;
                    this.x = this.x + 1;
                    this.y = this.y + 1;
                    matrix[this.y][this.x] = 5;
                } else this.change(this.x + 1, this.y + 1, this.x, this.y);
            }
            if (found[0] > this.x && found[1] < this.y) {
                if (matrix[this.y - 1][this.x + 1] == 0) {
                    matrix[this.y][this.x] = 0;
                    this.x = this.x + 1;
                    this.y = this.y - 1;
                    matrix[this.y][this.x] = 5;
                } else this.change(this.x + 1, this.y - 1, this.x, this.y);
            }
            if (found[0] < this.x && found[1] > this.y) {
                if (matrix[this.y + 1][this.x - 1] == 0) {
                    matrix[this.y][this.x] = 0;
                    this.x = this.x - 1;
                    this.y = this.y + 1;
                    matrix[this.y][this.x] = 5;
                } else this.change(this.x - 1, this.y + 1, this.x, this.y);
            }
            if (found[0] == this.x && found[1] < this.y) {
                if (matrix[this.y - 1][this.x] == 0) {
                    matrix[this.y][this.x] = 0;
                    this.x = this.x;
                    this.y = this.y - 1;
                    matrix[this.y][this.x] = 5;
                } else this.change(this.x, this.y - 1, this.x, this.y);
            }
            if (found[0] == this.x && found[1] > this.y) {
                if (matrix[this.y + 1][this.x] == 0) {
                    matrix[this.y][this.x] = 0;
                    this.x = this.x;
                    this.y = this.y + 1;
                    matrix[this.y][this.x] = 5;
                } else this.change(this.x, this.y + 1, this.x, this.y);
            }
            if (found[0] < this.x && found[1] == this.y) {
                if (matrix[this.y][this.x - 1] == 0) {
                    matrix[this.y][this.x] = 0;
                    this.x = this.x - 1;
                    this.y = this.y;
                    matrix[this.y][this.x] = 5;
                } else this.change(this.x - 1, this.y, this.x, this.y);
            }
            if (found[0] > this.x && found[1] == this.y) {
                if (matrix[this.y][this.x + 1] == 0) {
                    matrix[this.y][this.x] = 0;
                    this.x = this.x + 1;
                    this.y = this.y;
                    matrix[this.y][this.x] = 5;
                } else this.change(this.x + 1, this.y, this.x, this.y);
            }
        }
    }

    change(x, y, xo, yo) {
        if (matrix[y][x] == 1) {
            for (var i in GrassArray) {
                if (GrassArray[i].x == x && GrassArray[i].y == y) {
                    matrix[yo][xo] = 1;
                    GrassArray[i].x = xo;
                    GrassArray[i].y = yo;
                    matrix[y][x] = 5;
                    this.x = x;
                    this.y = y;
                    break;
                }
            }
        }
        if (matrix[y][x] == 4) {
            for (var i in Removed) {
                if (Removed[i].x == x && Removed[i].y == y) {
                    matrix[yo][xo] = 4;
                    Removed[i].x = xo;
                    Removed[i].y = yo;
                    matrix[y][x] = 5;
                    this.x = x;
                    this.y = y;
                    break;
                }
            }
        }
    }

    get() {
        found = this.getDirection(4);
        if (found.length != 0) {
            found = random(found);
            matrix[this.y][this.x] = 0;
            matrix[found[1]][found[0]] = 5;
            this.x = found[0];
            this.y = found[1];
            for (var m in Removed) {
                if (Removed[m].x == this.x && Removed[m].y == this.y)
                    Removed.splice(m, 1);
            }
        } else {
            this.move();
        }
    }


}
//-------
class God {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 4;
        this.multiplay = 0;
    }
    DirectionFunc() {
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],

            [this.x - 2, this.y - 1],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 1],

            [this.x - 2, this.y],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x + 2, this.y],

            [this.x - 2, this.y + 1],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 1],

            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2]
        ];
    }
    getDirection(t) {
        this.DirectionFunc();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (y >= matrix.length || y < 0) continue;
            if (x < 0 || x >= matrix[0].length) continue;
            if (matrix[y][x] == t) {
                found.push(this.directions[i]);
            }
        }
        return found;
    }


    getAllDirection(t) {
        var foo = [];
        for (var i in matrix) {
            for (var k in matrix[i]) {
                if (matrix[i][k] == t) {
                    foo.push([k, i]);
                }
            }
        }
        return foo;
    }

    move() {
        found = [];
        for (var i in Removed) {
            found.push([Removed[i].x, Removed[i].y]);
        }
        if (found.length != 0) {
            found = found[0];
            if (found[0] < this.x && found[1] < this.y) {
                if (matrix[this.y - 1][this.x - 1] == 0) {
                    matrix[this.y][this.x] = 1;
                    GrassArray.push(new Grass(this.x,this.y));
                    this.x = this.x - 1;
                    this.y = this.y - 1;
                    matrix[this.y][this.x] = 6;
                } else this.change(this.x - 1, this.y - 1, this.x, this.y);
            }
            if (found[0] > this.x && found[1] > this.y) {
                if (matrix[this.y + 1][this.x + 1] == 0) {
                    matrix[this.y][this.x] = 1;
                    GrassArray.push(new Grass(this.x,this.y));
                    this.x = this.x + 1;
                    this.y = this.y + 1;
                    matrix[this.y][this.x] = 6;
                } else this.change(this.x + 1, this.y + 1, this.x, this.y);
            }
            if (found[0] > this.x && found[1] < this.y) {
                if (matrix[this.y - 1][this.x + 1] == 0) {
                    matrix[this.y][this.x] = 1;
                    GrassArray.push(new Grass(this.x,this.y));
                    this.x = this.x + 1;
                    this.y = this.y - 1;
                    matrix[this.y][this.x] = 6;
                } else this.change(this.x + 1, this.y - 1, this.x, this.y);
            }
            if (found[0] < this.x && found[1] > this.y) {
                if (matrix[this.y + 1][this.x - 1] == 0) {
                    matrix[this.y][this.x] = 1;
                    GrassArray.push(new Grass(this.x,this.y));
                    this.x = this.x - 1;
                    this.y = this.y + 1;
                    matrix[this.y][this.x] = 6;
                } else this.change(this.x - 1, this.y + 1, this.x, this.y);
            }
            if (found[0] == this.x && found[1] < this.y) {
                if (matrix[this.y - 1][this.x] == 0) {
                    matrix[this.y][this.x] = 1;
                    GrassArray.push(new Grass(this.x,this.y));
                    this.x = this.x;
                    this.y = this.y - 1;
                    matrix[this.y][this.x] = 6;
                } else this.change(this.x, this.y - 1, this.x, this.y);
            }
            if (found[0] == this.x && found[1] > this.y) {
                if (matrix[this.y + 1][this.x] == 0) {
                    matrix[this.y][this.x] = 1;
                    GrassArray.push(new Grass(this.x,this.y));
                    this.x = this.x;
                    this.y = this.y + 1;
                    matrix[this.y][this.x] = 6;
                } else this.change(this.x, this.y + 1, this.x, this.y);
            }
            if (found[0] < this.x && found[1] == this.y) {
                if (matrix[this.y][this.x - 1] == 0) {
                    matrix[this.y][this.x] = 1;
                    GrassArray.push(new Grass(this.x,this.y));
                    this.x = this.x - 1;
                    this.y = this.y;
                    matrix[this.y][this.x] = 6;
                } else this.change(this.x - 1, this.y, this.x, this.y);
            }
            if (found[0] > this.x && found[1] == this.y) {
                if (matrix[this.y][this.x + 1] == 0) {
                    matrix[this.y][this.x] = 1;
                    GrassArray.push(new Grass(this.x,this.y));
                    this.x = this.x + 1;
                    this.y = this.y;
                    matrix[this.y][this.x] = 6;
                } else this.change(this.x + 1, this.y, this.x, this.y);
            }

        }
    }
    change(x, y, xo, yo) {
        if (matrix[y][x] == 1) {
            for (var i in GrassArray) {
                if (GrassArray[i].x == x && GrassArray[i].y == y) {
                    matrix[yo][xo] = 1;
                    GrassArray[i].x = xo;
                    GrassArray[i].y = yo;
                    matrix[y][x] = 6;
                    this.x = x;
                    this.y = y;
                    break;
                }
            }
        }
        if (matrix[y][x] == 4) {
            for (var i in Removed) {
                if (Removed[i].x == x && Removed[i].y == y) {
                    matrix[yo][xo] = 4;
                    Removed[i].x = xo;
                    Removed[i].y = yo;
                    matrix[y][x] = 6;
                    this.x = x;
                    this.y = y;
                    break;
                } else {
                    matrix[y][x] = 6;
                    this.x = x;
                    this.y = y;
                    matrix[yo][xo] = 4;
                }
            }
        }
    }

    revive() {
        found = this.getDirection(4);
        if (found.length != 0 && Removed.length != 0) {
            found = random(found);
            for (var r in Removed) {
                if (Removed[r].x == found[0] && Removed[r].y == found[1]) {
                    type = Removed[r].type;
                    if (type == 2) {
                        Removed[r].movecount = 0;
                        GrassEaterArray.push(Removed[r]);
                        matrix[found[1]][found[0]] = type;
                    }
                    if (type == 3) {
                        Removed[r].movecount = 0;
                        MonsterArray.push(Removed[r]);
                        matrix[found[1]][found[0]] = type;
                    }
                    Removed.splice(r, 1);
                }
            }
            this.move();
        } else {
            this.move();
        }
    }


}