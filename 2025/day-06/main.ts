import fs from "node:fs";


function part1() {
    const input = fs
        .readFileSync("input.txt", "utf-8")
        .trim()
        .split("\n")
        .map(x => x.trim());
    const ops = input[input.length - 1].split(/\s+/);

    const values: number[][] = [];
    for (let i = 0; i < input.length - 1; i++) {
        const r = input[i];
        values.push(r.split(/\s+/).map(Number));
    }

    const results: number[] = values[0];

    for (let i = 1; i < values.length; i++) {
        for (let j = 0; j < values[i].length; j++) {
            switch (ops[j]) {
                case "+":
                    results[j] += values[i][j];
                    break;
                case "*":
                    results[j] *= values[i][j];
                    break;
            }
        }
    }
    let total = 0;
    for (const v of results) {
        total += v;
    }

    console.log("part1 = ", total);

}

function part2() {
    const input = fs.readFileSync("input.txt", "utf-8").split("\n");

    input.pop();

    const opStr = input.pop()!;
    const ops: Record<string, string> = {};
    for (let i = 0; i < opStr.length; i++) {
        if (opStr[i] === "+" || opStr[i] === "*") {
            ops[i] = opStr[i];
        }
    }

    // get the numbers
    const len = input[0].length;
    const vals: Record<string, Record<string, string>> = {};

    for (let i = 0; i < input.length; i++) {
        let idx = 0;
        for (let j = 0; j < len; j++) {
            const d = input[i][j];

            if (Object.keys(ops).includes(j.toString())) {
                idx = j;
            }

            if (d === "" || d === " ") continue;

            if (!vals[idx]) {
                vals[idx] = {};
                vals[idx][j] = d;
                continue
            }

            if (!vals[idx][j]) {
                vals[idx][j] = d;
                continue;
            }

            vals[idx][j] += d;
        }
    }

    let total = 0;
    for (const idx of Object.keys(ops)) {
        let ans: number;
        if (ops[idx] === "+") {
            ans = 0;
            for (const v of Object.values(vals[idx])) {
                ans += parseInt(v);
            }
        } else {
            ans = 1;
            for (const v of Object.values(vals[idx])) {
                ans *= parseInt(v);
            }
        }
        total += ans;

    }

    console.log("part2 = ", total);
}


part1();
part2();
