import fs from "node:fs";

function part1() {
    const [r, a] = fs
        .readFileSync("input.txt", "utf-8")
        .trim()
        .split(/\n\s*\n/);

    const ranges = r.split("\n");
    const available = a.split("\n").map(Number);

    let fresh = 0;

    for (const id of available) {
        for (const r of ranges) {
            const [min, max] = r.split("-").map(Number);
            if (id <= max && id >= min) {
                fresh++;
                break
            }

        }
    }
    console.log("part1 = ", fresh);
}

function part2() {
    const [ranges] = fs
        .readFileSync("input.txt", "utf-8")
        .trim()
        .split(/\n\s*\n/);

    const numRanges = ranges.split("\n").map((r) => r.split("-").map(Number));
    numRanges.sort((a, b) => a[0] - b[0]);

    const merged: number[][] = [];
    let current = [...numRanges[0]];

    for (let i = 1; i < numRanges.length; i++) {
        const [start, end] = numRanges[i];
        if (start <= current[1]) {
            current[1] = Math.max(current[1], end);
        } else {
            merged.push(current);
            current = [start, end];
        }
    }
    merged.push(current);

    let count = 0;
    for (const r of merged) {
        count += r[1] - r[0] + 1;
    }

    console.log("part2 = ", count);
}

part1();
part2();
