export class CommandContext {
    // number of character belongs to the header  
    header: number = 0;
    // total length of the command
    length: number = 0;
    // how frequent the command descend 
    tickRate: number = 0;
    // how frequent the command mutate
    mutationRate: number = 0;
}
