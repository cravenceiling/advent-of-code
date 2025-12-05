import fs from "node:fs";


function part1() {
    const ranges = fs.readFileSync("input.txt", "utf8").split(",");
    let ans = 0

    for (let range of ranges) {
        const [l, r] = range.split("-");
        for (let i = parseInt(l); i <= parseInt(r); i++) {
            const s = i.toString();
            if (s.length % 2 === 0) {
                const res = s.split(s.substring(0, s.length / 2)).every((x) => x === "");
                if (res) ans += i;
            }
        }
    }

    console.log("part 1: ", ans);
}

function part2() {
    const ranges = fs.readFileSync("input.txt", "utf8").split(",");
    let ans = 0
    for (let range of ranges) {
        const [l, r] = range.split("-").map(Number);
        for (let i = l; i <= r; i++) {
            const s = i.toString();
            for (let j = 2; j <= s.length; j++) {
                if (s.length % j === 0 && s.substring(0, s.length / j).repeat(j) === s) {
                    ans += i;
                    break;
                }
            }
        }
    }

    console.log("part 2: ", ans);
}

part1();
part2();
