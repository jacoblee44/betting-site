1. We will use redis as a "source of truth" distributed database (using redis streams for event sourcing)
2. We will have several servers that consume the redis API to build their own local, up-to-date databases
3. The servers will use redis locking mechanisms to ensure consistency and ordering of operations
4. We will use websockets to communicate changes live to users. The websocket connections will be distributed over the servers.
5. Clients will connect to one of the servers (either through REST API or websockets) and retrieve data through this server, as well as send actions through this server (e.g. placing bids)

Client architecture:
1. Server side rendering will be important!
2. Live updating data will also be important (check out gRPC)
3. Use presentational/smart component split
4. Components should be small, <200 lines if possible

Caching:

On a conceptual level, caching should work similar to rxjs. If we have some central source of data (redis), and we have an operation without side-effects on that data to compute some value for the user, we only need to compute it once. All users accessing the result can just subscribe to the final pipe, instead of creating a new subscription on the source redis.

redis$.pipe(filter, map) -> user data


[System Architecture]

```
 +-----------+        +-------------+
 |   Users   |<--WS-->|   Server 1  |
 +-----------+        +------^------+
                             |
                             | Streams
                        +----v----+
                        |  Redis  |
                        +----^----+
                             |
                             | Streams
 +-----------+        +------v------+
 |   Users   |<--WS-->|   Server 2  |
 +-----------+        +-------------+
```

[Caching Mechanism using Pipes]

```
+--------+   Source  
|  Redis |-------------------------+
+--------+   Stream               |
                                  |
                                  |
   +-------+ Compute              |
   | Bid   |<---------------------+
   +---^---+   Bid                |
       |                          |
       | Subscribe                |
   +---+---+                      |
   | User A |                     |
   +-------+                      |
                                  |
                                  |
   +-----------+ Compute          |
   | Auction   |<-----------------+
   +----^------+   Name           
        |      +----+             
        | Subscribe | Subscribe   
   +----+----+   +----+----+      
   | User B   |  | User A  |      
   +---------+   +---------+      
```