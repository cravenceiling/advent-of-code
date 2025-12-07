import fs from "node:fs";

function part1() {
    const input = fs.readFileSync("input.txt", "utf-8").trim().split("\n");
    let S = input[0].indexOf("S");
    const beams: Set<number> = new Set([S]);
    let count = 0;

    for (let row = 1; row < input.length; row++) {
        const remove: Set<number> = new Set();
        const add: number[] = [];
        for (const b of beams) {
            if (input[row][b] !== "^") continue;

            count++;

            if (input[row][b - 1] !== "^" && !beams.has(b - 1)) {
                add.push(b - 1);
            }

            if (input[row][b + 1] !== "^" && !beams.has(b + 1)) {
                add.push(b + 1);
            }
            remove.add(b);
        }
        remove.forEach(x => beams.delete(x));
        add.forEach(x => beams.add(x));
    }

    console.log("part1 =", count);
}



function part2() {
    const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

    const cols = input[0].length;
    const S = input[0].indexOf("S");

    // counts[c] = number of timeinput currently at column c (initially at row 0)
    let counts: number[] = new Array(cols).fill(0);
    counts[S] = 1;

    // after processing r up to n-2 the counts represent positions at row n-1)
    for (let r = 1; r <= input.length - 2; r++) {
        const next = new Array(cols).fill(0);
        const line = input[r];

        // iterate only over columns that currently have non-zero counts
        for (let c = 0; c < cols; c++) {
            const cnt = counts[c];
            if (cnt === 0) continue;

            if (line[c] !== "^") {
                next[c] += cnt;
            } else {
                // splitter: branch to c-1 and/or c+1 if those positions are not '^'
                if (c > 0 && line[c - 1] !== "^") next[c - 1] += cnt;
                if (c + 1 < cols && line[c + 1] !== "^") next[c + 1] += cnt;
            }
        }

        counts = next;
    }

    const total = counts.reduce((a, b) => a + b, 0);
    console.log("part2 =", total);
}

part1();
part2();
