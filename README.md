# Introduce
![1](https://user-images.githubusercontent.com/49009864/166714532-e6de49f4-ff73-4862-aaa8-d6734e2f64cf.gif)

Apps like github provide users with real-time reponses,
I can see changes without refreshing the page when something in server is changed.

To implement this, polling or websocket are used.

Github uses websocket, but I don't see websocket connection.

![image](https://user-images.githubusercontent.com/49009864/166716878-9e16c085-2b07-4958-b148-8cfc4345cbc2.png)

Where is the websocket connection?

# SharedWorker

![image](https://user-images.githubusercontent.com/49009864/166717351-1e0966c9-f548-499f-8ff4-90a2b4d5ac3d.png)

![image](https://user-images.githubusercontent.com/49009864/166725714-540d3f71-e2b6-43b2-b2e2-5c4f76340a44.png)

The websocket connection is maded in the shared worker.
You can see it at <chrome://inspect/#workers>

# Why should I use SharedWorker when using a websocket connection?

When using a shared worker, all tabs and windows shared the context of worker. It means that even if many tabs are opened, the connection through the worker is only once.
It can reduce the load on the server.

# A shared worker alone is not enough.

![image](https://user-images.githubusercontent.com/49009864/166721812-37175724-b177-46c2-8d8e-f2360f7d56b5.png)

When many tabs are opened, The changes should be reflected into all tabs. Using BroadCastChannel makes this easier. BroadCastChannel sends a message to all tabs at the same time.

# Conclusion
I get some advantages when making websocket connection with server using shared worker.
Also the BroadCastChannel is good choice to reflect the change into all tabs.

# Demo

![3](https://user-images.githubusercontent.com/49009864/166724566-97f0dcff-4749-4237-8a3b-bb3acaed6e89.gif)

The context of shared worker persists until all tabs are closed. Even if an additional tab is opened, it will use already exist websocket connection that is maded in shared worker. UI updates are done through the BroadCastChannel
