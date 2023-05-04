import './style.css'

const configA = {
  container: 1,
  headingLevel: 2,
  rotate: 'word',
  speed: 1500,
  mainText: 'Tacos are',
  rotateText: [
    {
      text: 'delicious',
      color: '#8e44ad',
    },
    {
      text: 'amazing',
      color: '#c0392b',
    },
    {
      text: 'great',
      color: '#2980b9',
    },
    {
      text: 'awesome',
      color: '#b176ac',
    },
    {
      text: 'tasty',
      color: '#16a085',
    }
  ],
}

const configB = {
  container: 2,
  headingLevel: 3,
  rotate: 'letter',
  speed: 4000,
  mainText: 'Pizza is',
  rotateText: [
    {
      text: 'cheesy',
      color: '#F66747',
    },
    {
      text: 'delicious',
      color: '#FF9F52',
    },
    {
      text: 'life',
      color: '#EFC358',
    },
    {
      text: 'great',
      color: '#00A08E',
    },
    {
      text: 'fantastic',
      color: '#1C4755',
    }
  ],
}

function initializeStructure(configObj) {
  const containerElement = document.querySelector(`[data-rotate="${configObj.container}"]`);
  const mainTextElement = document.createElement(`h${configObj.headingLevel}`);
  const rotatingTextElement = document.createElement(`h${configObj.headingLevel}`);

  const mainText = document.createTextNode(configObj.mainText);

  mainTextElement.appendChild(mainText);
  [mainTextElement, rotatingTextElement].forEach(el => {
    el.classList.add('text-container');
    containerElement.appendChild(el);
  })

  return {
    containerElement,
    mainTextElement,
    rotatingTextElement,
  }
}

function getColors(configArr) {
  return configArr.reduce((acc, item) => {
    acc = [...acc, item.color];
    return acc
  }, [])
}

function getWords(configArr) {
  return configArr.reduce((acc, item) => {
    acc = [...acc, item.text];
    return acc
  }, [])
}

function getWordsArray(wordsArr) {
  return wordsArr.reduce((acc, word, index) => {
    const wordContainer = document.createElement('span');
    wordContainer.classList.add('word');
    wordContainer.style.color = 'white';
    wordContainer.innerHTML = word;
    acc = [...acc, wordContainer];
    return acc
  }, [])
}

function setInitialState({containerEl, textEl, wordsArray, color}) {
  wordsArray.forEach(word => textEl.appendChild(word));

  wordsArray[0].classList.add('in');
  wordsArray[1].classList.add('next');

  containerEl.style.setProperty('--bg-color', color);
}

function initRotate(config) {
  let currentWord = 0;

  const {containerElement, mainTextElement, rotatingTextElement} = initializeStructure(config);

  const words = getWords(config.rotateText);
  const colors = getColors(config.rotateText);
  const wordsArray = getWordsArray(words);

  const initialConfig = {
    containerEl: containerElement,
    textEl: rotatingTextElement,
    wordsArray: wordsArray,
    color: colors[currentWord],
  }

  setInitialState(initialConfig);

  setInterval(() => {
      const wordOut = currentWord;
      const wordIn = currentWord === wordsArray.length - 1 ? 0 : currentWord + 1;
      const wordNext = (wordIn + 1 > wordsArray.length - 1) ? 0 : wordIn + 1;
    
      containerElement.style.setProperty('--bg-color', colors[wordIn]);
    
      wordsArray[wordOut].classList.remove('in');
      wordsArray[wordOut].classList.add('out');
    
      wordsArray[wordIn].classList.remove('next');
      wordsArray[wordIn].classList.add('in');
    
      wordsArray[wordNext].classList.add('next');
    
      wordsArray.forEach((word, index) => {
        if (index !== wordOut && index !== wordIn && index !== wordNext) {
          word.classList.remove('out');
          word.classList.remove('in');
          word.classList.remove('next');
        }
      })
    
      currentWord = (currentWord === wordsArray.length - 1) ? 0 : currentWord+1;
    }, config.speed);
}

initRotate(configA)
initRotate(configB)