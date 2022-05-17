// const Kafka = require("kafkajs").Kafka
const { Kafka, Partitioners } = require("kafkajs");
const msg = process.argv[2];

run();
async function run() {
    try {
        
        const kafka = new Kafka({
            "clientId": "myapp", // what is your client ID, you can call it anything you want
            "brokers": ["192.168.8.27:9092"] //can have multiple brokers as an array, and the client can choose who to connect to
        })
        // create an Admin to be able to create a topic
        const producer = kafka.producer();
        console.log("Connecting.....");
        await producer.connect();
        console.log("Connected!");
        // A-M 0, N-Z 1
        console.log(msg[0])
        const partition = msg[0].toUpperCase() < "N" ? 0 : 1;
        console.log(partition);
        const result = await producer.send({
            "topic": "Users",
            "createPartitioner": Partitioners.LegacyPartitioner,
            "messages": [
                {
                    "value":msg,
                    "partition": partition
                    
                }
            ]
        })
        console.log(`Sent Successfully~ ${JSON.stringify(result)}`);
        await producer.disconnect();
    } catch(ex) {
        console.error(`Something bad happened ${ex}`);
    } finally {
        process.exit(0);
    }
}