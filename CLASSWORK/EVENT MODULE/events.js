/*event module
//event class uses -on() as listener and emit() as event trigger
const EventEmitter = require('events');
const event = new EventEmitter;*/
const EventEmitter = require("events");

class MyEmitter extends EventEmitter {
    greet() {
        this.emit("greet");
    }

    exit() {
        this.emit("exit");
    }
}

const myEmitter = new MyEmitter();

// Register event listeners
myEmitter.on("greet", () => {
    console.log("Hello! Welcome.");
});

myEmitter.on("exit", () => {
    console.log("Goodbye! Exiting...");
});

// Trigger the events
myEmitter.greet();
myEmitter.exit();