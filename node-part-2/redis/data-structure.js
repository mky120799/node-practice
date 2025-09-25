const redis = require("redis");

async function redisDataStructures() {
  const client = redis.createClient({
    url: "redis://localhost:6379",
  });

  client.on("error", (err) => console.error("Redis Client Error", err));

  try {
    // connect
    await client.connect();

    // String -> SET, GET
    await client.set("user:name", "Sangam Mukharjee");
    const name = await client.get("user:name");
    console.log("Name:", name);

    // Multiple set and get
    await client.mSet({
      "user:email": "sangam@gmail.com",
      "user:age": "60",
      "user:country": "India",
    });

    const values = await client.mGet([
      "user:email",
      "user:age",
      "user:country",
    ]);

    console.log("Values:", values);
  } catch (e) {
    console.error("Error:", e);
  } finally {
    // close connection properly
    await client.quit();
  }
}

module.exports = { redisDataStructures };
