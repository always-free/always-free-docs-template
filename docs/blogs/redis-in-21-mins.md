---
title: Redis in 21 minutes
description: Quick refresher on Redis along with hands-on
author: Prasad Jayakumar
type: article
---
# Redis in 21 Minutes

[Redis Home](https://redis.io/)

Redis is an open source (BSD licensed), in-memory data structure store, used as a database, cache, and message broker. 

## Online Playground

[Try Redis](https://try.redis.io/)

## Installation <Badge text="Optional" type="tip"/>

[Ref](https://redis.io/download)
  
<code-group>
<code-block title="Ubuntu" active>
```bash
$ sudo add-apt-repository ppa:redislabs/redis
$ sudo apt-get update
$ sudo apt-get install redis
$ sudo service redis-server start
```
</code-block>

<code-block title="Mac">
```bash
$ brew install redis
$ brew services start redis
```
</code-block>
</code-group>



## Use Cases

Redis features will be detailed using "Blog Web app like Medium" in their simplified form.

<br/>

1. Manage user session
   - User profile: 
     - name
     - followers
     - following
     - status
2. Blog post statistics
   - Views, reads and claps statistics
   - Number of people who clapped
3. Notifications
   - New
   - Recent notifications
4. Latest Blogs
   - From the followings
5. Blog search by title and tags

## Implementation

Redis key pattern should be decided for any use case.

### Manage User Session

<br/>

- Key - session:{user-id}:profile
- Value - Hash data type

<br/>

```cli
> hmset session:prasad_j:profile name Prasad followers 90 following 6 status online
OK
> hmget session:prasad_j:profile name status
1) "Prasad"
2) "online"
> hset session:prasad_j:profile status offline
(integer) 0
> hget session:prasad_j:profile status
"offline"
```

### Blog Post Statistics

#### Views, reads and claps statistics

<br/>

- Key - blog:{id}:stats
- Value - Hash data type 

<br/>

```cli
> hmset blog:1001:stats views 0 reads 0 claps 0
OK
> hincrby blog:1001:stats claps 5
(integer) 5
> hmget blog:1001:stats views reads claps
1) "0"
2) "0"
3) "5"
> hgetall blog:1001:stats
1) "views"
2) "0"
3) "reads"
4) "0"
5) "claps"
6) "5"
```

#### Number of people who clapped for a blog

<br/>

- Key - blog:{id}:claps
- Value - Set data type 

<br/>

1. Add fan user-ids into a set

```cli
> sadd blog:1001:fans john
(integer) 1
> sadd blog:1001:fans harry mary
(integer) 1
> smembers blog:1001:fans
1) "mary"
2) "harry"
3) "john"
```
2. Add an existing fan into a set
   
```cli
> sadd blog:1001:fans harry
(integer) 0
> sismember blog:1001:fans harry
(integer) 1
> sadd blog:1002:fans harry
(integer) 1
```

3. Get the total members in a set

```cli
> scard blog:1001:fans
(integer) 3
```

## Data Types

Redis is a key-value pair database. Key is a kind of string datatype.  Value can be one of the following datatype

- String
- Hashes
- Lists
- Sets
- Sorted Sets

[An introduction to Redis data types and abstractions](https://redis.io/topics/data-types-intro)

## String

String is [Simple Dynamic String (SDS)](https://redis.io/topics/internals-sds). String can be used as number, array, bit set and binary data

```c
struct sdshdr {
  long len;    // The free field stores the number of additional bytes available for use
  long free;   // The len field stores the length of buf
  char buf[];  // The buf character array stores the actual string
};
```

::: tip
- The len field makes obtaining the length of a Redis string an O(1) operation.
- Together the len and free field can be thought of as holding the metadata of the buf character array.
:::

### Basic Commands

[Full List of Commands](https://redis.io/commands#string)

| Command                                  | Args                   | Purpose                                                | Time Complexity |
| ---------------------------------------- | ---------------------- | ------------------------------------------------------ | --------------: |
| [SET](https://redis.io/commands/set)     | key value [EX seconds] | Set the string value of a key                          |            O(1) |
| [SETNX](https://redis.io/commands/setex) | key value              | Set the value of a key, only if the key does not exist |            O(1) |
| [GET](https://redis.io/commands/get)     | key                    | Get the value of a key                                 |            O(1) |


For numerics only

| Command                                              | Args          | Purpose                                                  | Time Complexity |
| ---------------------------------------------------- | ------------- | -------------------------------------------------------- | --------------: |
| [INCR](https://redis.io/commands/incr)               | key           | Increment the integer value of a key by one              |            O(1) |
| [INCRBY](https://redis.io/commands/incrby)           | key increment | Increment the integer value of a key by the given amount |            O(1) |
| [INCRBYFLOAT](https://redis.io/commands/incrbyfloat) | key increment | Increment the float value of a key by the given amount   |            O(1) |


Bitmaps are not an actual data type, but a set of bit-oriented operations defined on the String type.

| Command                                        | Args                            | Purpose                                                                                       | Time Complexity |
| ---------------------------------------------- | ------------------------------- | --------------------------------------------------------------------------------------------- | --------------: |
| [SETBIT](https://redis.io/commands/setbit)     | key offset value                | Sets or clears the bit at offset in the string value stored at key                            |            O(1) |
| [GETBIT](https://redis.io/commands/getbit)     | key offset                      | Get the bit value at offset in the string value stored at key                                 |            O(1) |
| [BITCOUNT](https://redis.io/commands/bitcount) | key [start end]                 | Count set bits in a string                                                                    |            O(N) |
| [BITOP](https://redis.io/commands/bitop)       | operation destkey key [key ...] | Perform a bitwise operation between multiple keys and store the result in the destination key |            O(N) |

## Hash Map

Hashes, which are maps composed of fields associated with values. Both the field and the value are strings.

### Basic Commands

[Full List of Commands](https://redis.io/commands#hash)

| Command                                      | Args                              | Purpose                                     | Time Complexity |
| -------------------------------------------- | --------------------------------- | ------------------------------------------- | --------------: |
| [HSET](https://redis.io/commands/hset)       | key field value [field value ...] | Set the string value of a hash field        |     O(1) / O(N) |
| [HGET](https://redis.io/commands/hget)       | key field                         | Get the value of a hash field               |            O(1) |
| [HGETALL](https://redis.io/commands/hgetall) | key field                         | Get all the fields and values in a hash     |            O(N) |
| [HMGET](https://redis.io/commands/hmget)     | key field [field ...]             | Get the values of all the given hash fields |     O(1) / O(N) |

## Sandbox Commands

Commands to keep your sandbox environment clean.

::: danger
Don't run these commands on any development or production server without proper understanding
:::

```cli
$ redis-cli
> keys *
1) "entity:id"
> flushdb
OK
> keys *
(empty array)
> 
```

## References
- [Redis University - Free enroll](https://university.redislabs.com/#courses)
- [Redis Explained :tv:](https://youtube.com/playlist?list=PL83Wfqi-zYZHtpd4Glbj-NBIz7RB0Jw5u)
- [Redis in Action - Free eBook](https://redislabs.com/ebook/redis-in-action/)
- [Retail Use Cases](https://redislabs.com/solutions/industries/retail/)