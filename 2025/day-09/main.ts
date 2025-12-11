import fs from "node:fs";


function part1() {
    const input = fs
        .readFileSync("input.txt", "utf-8")
        .trim()
        .split("\n")
        .map(x => x.trim().split(",").map(Number));

    let far = -Infinity;

    for (let i = 0; i < input.length; i++) {
        const p = input[i];
        for (let j = i + 1; j < input.length; j++) {
            const q = input[j];

            const x = Math.abs(p[0] - q[0]) + 1;
            const y = Math.abs(p[1] - q[1]) + 1;
            const area = x * y;
            if (area > far) {
                far = area
            }
        }
    }

    console.log("part1 =", far);
}

part1();
