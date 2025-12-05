import { readFileSync } from 'node:fs';

function part1() {
    const lines = readFileSync("input.txt", "utf8").split("\n");

    let dial = 50;
    let pass = 0;

    for (let line of lines) {
        const dir = line[0];
        const distance = parseInt(line.slice(1));

        if (dir == 'R') {
            dial = (dial + distance) % 100;
        } else {
            dial = (dial - distance + 100) % 100;
        }

        if (dial == 0) pass++;
    }

    console.log("part 1: ", pass);
}

function part2() {
    const lines = readFileSync("input.txt", "utf8").split("\n");

    let dial = 50;
    let pass = 0;

    for (let line of lines) {
        const dir = line[0];
        let distance = parseInt(line.slice(1));
        for (; distance > 0; distance--) {

            if (dir == 'R') {
                dial = (dial + 1) % 100;
            } else {
                dial = (dial - 1 + 100) % 100;
            }

            if (dial == 0) pass++;
        }
    }
    console.log("part 2: ", pass);
}

part1();
part2();
