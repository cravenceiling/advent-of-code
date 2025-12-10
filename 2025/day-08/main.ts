import fs from "node:fs";


function part1() {
    const input = fs
        .readFileSync("input.txt", "utf-8")
        .trim()
        .split("\n")
        .map(x => x.split(",").map(Number));

    const dis: number[][] = [];
    const size = input.length;
    const sz: number[] = new Array(size).fill(0);
    const id = new Array(size).fill(0);

    let numComponents = size;

    for (let i = 0; i < size; i++) {
        id[i] = i;
        sz[i] = 1;
    }

    for (let i = 0; i < size; i++) {
        const j1 = input[i];
        for (let j = i + 1; j < size; j++) {
            const j2 = input[j];
            if (j === i) continue;
            const d = Math.sqrt(
                Math.pow(j1[0] - j2[0], 2) +
                Math.pow(j1[1] - j2[1], 2) +
                Math.pow(j1[2] - j2[2], 2)
            );

            dis.push([i, j, d]);
        }
    }

    dis.sort((a, b) => a[2] - b[2]);

    const find = (p: number) => {
        let root = p;
        while (root != id[root]) root = id[root];

        while (p != root) {
            const next = id[p];
            id[p] = root;
            p = next;
        }

        return root;
    }

    const connected = (p: number, q: number) => {
        return find(p) === find(q);
    }

    const unify = (p: number, q: number) => {
        if (connected(p, q)) return;

        const r1 = find(p);
        const r2 = find(q);

        if (sz[r1] < sz[r2]) {
            sz[r2] += sz[r1];
            id[r1] = r2;
            sz[r1] = 0;
        } else {
            sz[r1] += sz[r2];
            id[r2] = r1;
            sz[r2] = 0
        }

        numComponents--;
    }

    let i = 0;
    while (i < 1000) {
        const v = dis.splice(0, 1)[0];
        const p = v[0];
        const q = v[1];
        unify(p, q);
        i++;
    }
    sz.sort((a, b) => b - a);

    const result = sz[0] * sz[1] * sz[2];
    console.log("part1 =", result);
}

function part2() {
    const input = fs
        .readFileSync("input.txt", "utf-8")
        .trim()
        .split("\n")
        .map(x => x.split(",").map(Number));

    const dis: number[][] = [];
    const size = input.length;
    const sz: number[] = new Array(size).fill(0);
    const id = new Array(size).fill(0);

    let numComponents = size;

    for (let i = 0; i < size; i++) {
        id[i] = i;
        sz[i] = 1;
    }

    for (let i = 0; i < size; i++) {
        const j1 = input[i];
        for (let j = i + 1; j < size; j++) {
            const j2 = input[j];
            if (j === i) continue;
            const d = Math.sqrt(
                Math.pow(j1[0] - j2[0], 2) +
                Math.pow(j1[1] - j2[1], 2) +
                Math.pow(j1[2] - j2[2], 2)
            );

            dis.push([i, j, d]);
        }
    }

    dis.sort((a, b) => a[2] - b[2]);

    const find = (p: number) => {
        let root = p;
        while (root != id[root]) root = id[root];

        while (p != root) {
            const next = id[p];
            id[p] = root;
            p = next;
        }

        return root;
    }

    const connected = (p: number, q: number) => {
        return find(p) === find(q);
    }

    const unify = (p: number, q: number) => {
        if (connected(p, q)) return;

        const r1 = find(p);
        const r2 = find(q);

        if (sz[r1] < sz[r2]) {
            sz[r2] += sz[r1];
            id[r1] = r2;
            sz[r1] = 0;
        } else {
            sz[r1] += sz[r2];
            id[r2] = r1;
            sz[r2] = 0
        }

        numComponents--;
    }

    let l1 = 1;
    let l2 = 1;
    while (!sz.includes(size)) {
        const v = dis.splice(0, 1)[0];
        const p = v[0];
        const q = v[1];
        unify(p, q);
        [l1, l2] = [p, q];
    }

    const result = input[l1][0] * input[l2][0];
    console.log("part2 =", result);
}

part1();
part2();
