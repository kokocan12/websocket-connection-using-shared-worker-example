import { LoremIpsum } from 'lorem-ipsum';

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

export function getRandomId() {
  const str = ['a', 'b', 'c', 'd', 'e', 'f', 'g', '0', '1', '2', '3', '4', '5'];

  let id = '';
  for (let i = 0; i < 5; i++) {
    id += str[Math.floor(Math.random() * str.length)];
  }

  return id;
}

export function getRandomText() {
  const sentence = lorem.generateSentences(1);

  return sentence;
}

export function changeStatus(status: string) {
  document.getElementById('status').innerText = status;
}

export function addText(text: string, id: string) {
  const li = document.createElement('li');
  li.innerText = `id: ${id} | text: ${text}`;
  document.getElementById('result').appendChild(li);
}

export function changeUserCount(text: string) {
  document.getElementById('user-count').innerText = text;
}

export function changeUserId(text: string) {
  document.getElementById('title').innerText = text;
}
