import fs from 'node:fs';


function part1() {
    const banks = fs.readFileSync('input.txt', 'utf8').split('\n');
    let sum = 0;
    for (const bank of banks) {
        if (bank === "") continue;
        let start = 1;
        let l = parseInt(bank[0]);
        let i = 0;

        do {
            const b = parseInt(bank[i]);
            if (b > l) {
                l = b;
                start = i + 1;
            }
            i += 1;
        } while (i < bank.length - 1);

        let r = parseInt(bank[start]);
        for (; start < bank.length; start++) {
            const b = parseInt(bank[start]);
            if (b > r) r = b;
        }
        const num = l * 10 + r;
        sum += num;
    }

    console.log("part1 %d", sum);
}

function part2() {
    const banks = fs.readFileSync("input.txt", "utf8").trim().split("\n");
    let sum = 0;

    for (const bank of banks) {
        const remaining = 12;
        let result = "";
        let start = 0;

        for (let picked = 0; picked < remaining; picked++) {
            const remainingToPick = remaining - picked;
            const maxIndex = bank.length - remainingToPick;

            let bestDigit = -1;
            let bestPos = start;

            for (let i = start; i <= maxIndex; i++) {
                const d = bank[i];
                const num = parseInt(d);
                if (num > bestDigit) {
                    bestDigit = num;
                    bestPos = i;
                    if (d === "9") break;
                }
            }

            result += bestDigit;
            start = bestPos + 1;
        }
        sum += parseInt(result);
    }

    console.log("part2 =", sum.toString());
}

part1();
part2();
