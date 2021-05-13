# Upstash
Serverless Database for Redis

[Start free in 30 seconds](https://console.upstash.com/)

## Always Free <Badge text="Without Credit Card" type="tip"/>
- Max 10,000 Commands Daily
- Max 256 MB Data Size Per DB
- Max 20 Concurrent Connections

## Quick Start

<code-group>
<code-block title="Node" active>
```js
// hello-world.mjs
import redis from 'redis';

const client = redis.createClient({
  host: 'us1-x-instance.upstash.io',
  port: '33310',
  password: 'change-the-password',
  tls: {}
});

client.on('error', function (error) {
  console.error(error);
});

client.set('learn', 'redis', redis.print);
client.get('learn', redis.print);

client.quit(redis.print);
```
</code-block>

<code-block title="Java">
```java
// Library: https://github.com/xetorthio/jedis

public static void main(String[] args) {
  Jedis jedis = new Jedis("us1-x-instance.upstash.io", 33310, true);
  jedis.auth("change-the-password");
  jedis.set("foo", "bar");
  String value = jedis.get("foo");
}
```
</code-block>
</code-group>

## References
- [Redis in 21 minutes](/blogs/redis-in-21-mins.md)
- [Pricing](https://upstash.com/#section-pricing)
