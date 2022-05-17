// const Kafka = require("kafkajs").Kafka
const { Kafka, Partitioners } = require("kafkajs");

run();
async function run() {
    try {
        
        const kafka = new Kafka({
            "clientId": "myapp", // what is your client ID, you can call it anything you want
            "brokers": ["192.168.8.27:9092"] //can have multiple brokers as an array, and the client can choose who to connect to
        })
        // create an Admin to be able to create a topic
        const consumer = kafka.consumer({
            "groupId": "test"
        });
        console.log("Connecting.....");
        await consumer.connect();
        console.log("Connected!");
        // A-M 0, N-Z 1
        await consumer.subscribe({
            "topic": "Users",
            "fromBeginning": true
        })
        await consumer.run({
            "eachMessage": async result => {
                console.log(`Received Message: ${result.message.value} on partition ${result.partition}`)
            } // this function gets ran for each message received.
        })
    } catch(ex) {
        console.error(`Something bad happened ${ex}`);
    } finally {
        // make this always running
    }
}