import fs from 'fs';

function part1() {
    const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n');

    const adjacents = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1],
    ];

    let rolls = 0;

    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            let count = 0;
            if (input[i][j] !== "@") {
                process.stdout.write(input[i][j]);
                continue;
            }
            for (const x of adjacents) {
                const row = input[i + x[0]];
                const char = row ? row.charAt(j + x[1]) : undefined;
                if (char === "@") count++;
                if (count === 4) break;
            };
            if (count < 4) {
                rolls++
                process.stdout.write("x");
            } else {
                process.stdout.write(input[i][j]);
            }
        }
        console.log();
    }

    console.log("part1 = ", rolls);
}

function part2() {
    const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n');

    const adjacents = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1],
    ];

    let rolls = 0;
    let canContinue = false;

    do {
        canContinue = false;
        for (let i = 0; i < input.length; i++) {
            let newRow = "";
            for (let j = 0; j < input[i].length; j++) {
                let count = 0;
                if (input[i][j] !== "@") {
                    newRow += input[i][j];
                    process.stdout.write(input[i][j]);
                    continue;
                }
                for (const x of adjacents) {
                    const row = input[i + x[0]];
                    const char = row ? row.charAt(j + x[1]) : undefined;
                    if (char === "@") count++;
                    if (count === 4) break;
                };
                if (count < 4) {
                    canContinue = true;
                    rolls++
                    newRow += "x"
                    process.stdout.write("x");
                } else {
                    newRow += input[i][j];
                    process.stdout.write(input[i][j]);
                }
            }
            input[i] = newRow;
            console.log();
        }
    } while (canContinue);

    console.log("part2 = ", rolls);
}

part1();
part2();
