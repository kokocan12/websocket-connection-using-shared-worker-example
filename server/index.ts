import { USER_COUNT_CHANGE, RECEIVE_TEXT } from '../shared/constant';
const WebSocketServer = require('ws').Server;

const server = new WebSocketServer({ port: 3000 });
let users = [];

function informCurrentUserCount() {
  users.forEach((user) => {
    user.send(JSON.stringify({ type: USER_COUNT_CHANGE, text: users.length }));
  });
}

server.on('connection', (ws) => {
  users.push(ws);
  informCurrentUserCount();

  ws.on('message', (data) => {
    const parsed = JSON.parse(data);
    users.forEach((user) => {
      user.send(JSON.stringify({ ...parsed, type: RECEIVE_TEXT }));
    });
  });

  ws.on('close', () => {
    users = users.filter((user) => user !== ws);
    informCurrentUserCount();
  });
});
