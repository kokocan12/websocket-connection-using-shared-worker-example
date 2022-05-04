import { getRandomId } from '../shared/function';
import {
  BROADCASTING_CHANNEL,
  CONNECTION_OPEN,
  CONNECTION_RECONNECT,
  CONNECTION_WAIT,
  COUNT_WAIT,
  ID_MSG_CHANGE,
  DEFAULT_ID_MSG,
  RECEIVE_TEXT,
  STATUS_CHANGE,
  USER_COUNT_CHANGE,
  WS_URL,
} from '../shared/constant';

const randomId = getRandomId();
const idMsg = DEFAULT_ID_MSG + randomId;
let countMsg = COUNT_WAIT;
let connectionStatus = CONNECTION_WAIT;

let ws = new WebSocket('ws://localhost:3000');
const broadcastChannel = new BroadcastChannel(BROADCASTING_CHANNEL);

ws.onopen = () => {
  connectionStatus = CONNECTION_OPEN;
  broadcastChannel.postMessage({ type: STATUS_CHANGE, text: connectionStatus });
};

ws.onclose = () => {
  connectionStatus = CONNECTION_RECONNECT;
  broadcastChannel.postMessage({ type: STATUS_CHANGE, text: connectionStatus });
  ws = new WebSocket(WS_URL);
};

ws.onmessage = ({ data }) => {
  const parsed = JSON.parse(data);
  const { type, id, text } = parsed;

  switch (type) {
    case RECEIVE_TEXT:
      broadcastChannel.postMessage({ type, text, id });
      break;

    case USER_COUNT_CHANGE:
      countMsg = COUNT_WAIT + text;
      broadcastChannel.postMessage({ type: USER_COUNT_CHANGE, text: countMsg });
      break;
  }
};

onconnect = (e) => {
  const port = e.ports[0];
  broadcastChannel.postMessage({ type: USER_COUNT_CHANGE, text: countMsg });
  broadcastChannel.postMessage({ type: STATUS_CHANGE, text: connectionStatus });
  broadcastChannel.postMessage({ type: ID_MSG_CHANGE, text: idMsg });

  port.onmessage = (e) => {
    const text = e.data.text;
    ws.send(JSON.stringify({ id: randomId, text }));
  };
};
