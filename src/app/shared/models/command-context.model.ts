export class CommandContext {
    // number of character belongs to the header  
    header: number = 0;
    // total length of the command
    length: number = 0;
    // how frequent the command descend 
    tickRate: number = 0;
    // how frequent the command mutate
    mutationRate: number = 0;

    constructor(header: number, length: number, tickRate: number, mutationRate: number) {
        this.header = header;
        this.length = length;
        this.tickRate = tickRate;
        this.mutationRate = mutationRate;
    }

    public static generate(): CommandContext {
        var header = Math.floor(Math.random() * 3);
        var length = Math.floor(Math.random() * 16) + 4;
        var tickRate = this.weightedRandom([1, 2, 4], [0.5, 1.5, 8]);
        var mutationRate = 0.3;
        return new CommandContext(header, length, tickRate, mutationRate);
    }

    private static weightedRandom(value: number[], weight: number[]): number {
        var totalWeight = weight.reduce((prev, curr) => prev + curr, 0);
        var rand = Math.floor(Math.random() * totalWeight);

        var accuWeight = 0;
        for (var i = 0; i < value.length; i++) {
            accuWeight += weight[i];
            if (accuWeight > rand) {
                return value[i];
            }
        }
        return value[value.length - 1];
    }
}
