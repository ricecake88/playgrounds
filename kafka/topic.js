// const Kafka = require("kafkajs").Kafka
const { Kafka } = require("kafkajs");

run();
async function run() {
    try {
        
        const kafka = new Kafka({
            "clientId": "myapp", // what is your client ID, you can call it anything you want
            "brokers": ["192.168.8.27:9092"] //can have multiple brokers as an array, and the client can choose who to connect to
        })
        // create an Admin to be able to create a topic
        const admin = kafka.admin();
        console.log("Connecting.....");
        await admin.connect();
        console.log("Connected!");
        // A-M, N-Z
        await admin.createTopics({
            "topics": [{
                "topic": "Users",
                "numPartitions": 2
            }]
        }) // this is a wire call
        console.log("Created Successfully!");
        await admin.disconnect();
    } catch(ex) {
        console.error(`Something bad happened ${ex}`);
    } finally {
        process.exit(0);
    }
}