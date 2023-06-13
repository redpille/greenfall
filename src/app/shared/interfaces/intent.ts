import { Message } from "../enum/message";

export interface Intent {
    type: Message;
    data?: any;
}
