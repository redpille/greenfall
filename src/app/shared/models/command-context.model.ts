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
        var header = Math.ceil(Math.random() * 2);
        var length = Math.floor(Math.random() * 20) + 4;
        var tickRate = Math.pow(2, Math.ceil(Math.random() * 4));
        var mutationRate = 0;
        return new CommandContext(header, length, tickRate, mutationRate);
    }
}
