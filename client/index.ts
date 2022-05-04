import {
  addText,
  changeStatus,
  changeUserCount,
  changeUserId,
  getRandomText,
} from '../shared/function';
import {
  BROADCASTING_CHANNEL,
  ID_MSG_CHANGE,
  RECEIVE_TEXT,
  SEND_TEXT,
  STATUS_CHANGE,
  USER_COUNT_CHANGE,
} from '../shared/constant';

const worker = new SharedWorker('worker.ts');
const broadcastChannel = new BroadcastChannel(BROADCASTING_CHANNEL);

broadcastChannel.addEventListener('message', ({ data }) => {
  const { type, text, id } = data;

  switch (type) {
    case ID_MSG_CHANGE:
      changeUserId(text);
      break;
    case STATUS_CHANGE:
      changeStatus(text);
      break;

    case RECEIVE_TEXT:
      addText(text, id);
      break;

    case USER_COUNT_CHANGE:
      changeUserCount(text);
      break;
  }
});

const btn = document.getElementById('btn');
btn.addEventListener('click', () => {
  const text = getRandomText();
  worker.port.postMessage({ type: SEND_TEXT, text });
});
