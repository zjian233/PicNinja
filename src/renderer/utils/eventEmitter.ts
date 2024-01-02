

type callback = (data: any) => void;

class EventEmitter {
    listener: Record<string, Array<callback>> = {};

    on(eventName: string, fn:callback) {
        if (!this.listener[eventName]) {
            this.listener[eventName] = [];
        }
        this.listener[eventName].push(fn);
    }
    off(eventName: string, fn: callback) {
        if (this.listener[eventName]) {
            this.listener[eventName] = this.listener[eventName].filter(item => item !== fn);
        }
    }
    emit(eventName:string, data?:any) {
        if (this.listener[eventName]) {
            for (let fn of this.listener[eventName]) {
                fn(data);
            }
        }
    }
}

export default new EventEmitter();