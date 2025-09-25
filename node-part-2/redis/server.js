const redis = require("redis");
const {redisDataStructures} = require('./data-structure')
const client = redis.createClient({
  url: "redis://localhost:6379",
});

// event listener
client.on("error", (error) => {
  console.error("Redis client error occurred!", error);
});

async function testRedisConnection() {
  try {
    await client.connect();
    console.log("connected to redis");

    // set a value
    await client.set("key", "sangam");


    // get the value back
    const extractValue = await client.get("key");
    console.log("Value from Redis:", extractValue);
    
    const deleteCount = await client.del("name")

    console.log(deleteCount)
    const extractUpdatedValue = await client.get("name");
    console.log(extractUpdatedValue);

    console.log("Connected to Redis successfully");
  } catch (error) {
    console.error("Connection failed:", error);
  } finally {
    await client.quit();
  }
}

testRedisConnection();
redisDataStructures();

module.exports = {client}