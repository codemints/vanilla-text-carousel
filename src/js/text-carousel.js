import '../css/text-carousel.css'

const configA = {
  container: 1,
  preText: 'Tacos are',
  words: ['delicious', 'amazing', 'tasty'],
  colors: ['#8e44ad', '#c0392b', '#2980b9'],
  speed: 2000,
  byLetter: true,
  headingLevel: 2,
}

const configB = {
  container: 2,
  preText: 'Burritos are',
  words: ['beautiful', 'thick', 'delicious', 'saucey'],
  colors: ['#8e44ad', '#c0392b', '#2980b9', '#b176ac'],
  speed: 1000,
  byLetter: false,
  headingLevel: 3,
}

function initCarousel(config) {
  let currentWord = 0;
  
  const {container, pretextContainer, wordContainer, spanContent} = createInitalStructure(config);
  
  const allChars = Array.from(wordContainer.querySelectorAll('.char'));
  if (allChars.length > 0) {
    allChars.forEach(char => char.style.display = 'inline-block');
  }

  container.style.setProperty('--carousel-color', config.colors[currentWord]);

  if (!config.byLetter) {
    spanContent[0].classList.add('active');
  } else {
    spanContent[0].style.opacity = 1;
    const nextChars = Array.from(spanContent[1].querySelectorAll('.char'));
    nextChars.forEach(char => char.classList.add('next'));
  }

  setInterval(() => {
    const wordOut = currentWord;
    const wordIn = currentWord === spanContent.length - 1 ? 0 : currentWord + 1;
    const wordNext = (wordIn + 1 > spanContent.length - 1) ? 0 : wordIn + 1;
    
    
    if (!config.byLetter) {
      container.style.setProperty('--carousel-color', config.colors[wordIn]);
      spanContent[wordOut].classList.remove('active');
      spanContent[wordIn].classList.add('active');
      
      spanContent.forEach((word, index) => {
        if (index !== wordOut && index !== wordIn && index !== wordNext) {
          word.classList.remove('active');
        }
      });
    }
    
    if (config.byLetter) {
      const charSpansOut = Array.from(spanContent[wordOut].querySelectorAll('span'));
      const charSpansIn = Array.from(spanContent[wordIn].querySelectorAll('span'));
      const charSpansNext = Array.from(spanContent[wordNext].querySelectorAll('span'));
      
      charSpansOut.forEach((char, index, array) => {
        setTimeout(() => {
          char.classList.remove('in');
          char.classList.remove('next');
          char.classList.add('out');
        }, index * 80);
      })
      
      charSpansIn.forEach((char, index, array) => {
        charSpansIn[0].parentElement.classList.add('active');
        setTimeout(() => {
          container.style.setProperty('--carousel-color', config.colors[wordIn]);
          char.classList.remove('out');
          char.classList.remove('next');
          char.classList.add('in');
        }, 340 + (index * 80));
      })

      charSpansNext.forEach((char, index, array) => {
        char.classList.add('next');
        char.classList.remove('in');
        char.classList.remove('out');
      })
    }

    currentWord = (currentWord === spanContent.length - 1) ? 0 : currentWord+1;
  }, config.speed);
}

function createInitalStructure(config) {
  const container = document.querySelector(`[data-carousel="${config.container}"]`);
  const pretextContainer = document.createElement(`h${config.headingLevel}`);
  const wordContainer = document.createElement(`h${config.headingLevel}`);
  const spanContent = config.words.map(word => createSpanContent(word, config.byLetter));

  pretextContainer.textContent = config.preText;

  [pretextContainer, wordContainer].forEach((item, index) => {
    item.classList.add('text-carousel--inner');
    if (index === 1) {
      config.byLetter
      ? item.setAttribute('data-rotate', 'letter')
      : item.setAttribute('data-rotate', 'word');
    }
    container.appendChild(item);
  });

  for (let i = 0; i < spanContent.length; i++) {
    wordContainer.appendChild(spanContent[i]);
    if (config.byLetter) {
      spanContent[i].style.setProperty('--word-width', `${spanContent[i].offsetWidth}px`);
    }
  }

  return {
    container,
    pretextContainer,
    wordContainer,
    spanContent,
  }
}

function createSpanContent(word, bool) {
  const wordSpan = document.createElement('span');
  wordSpan.classList.add('word');
  wordSpan.setAttribute('data-word', word);

  if (!bool) {
    wordSpan.textContent = word;
  } else {
    const chars = word.split('');
    const charSpans = chars.reduce((acc, char) => {
      const charSpan = document.createElement('span');
      charSpan.classList.add('char');
      charSpan.setAttribute('data-char', char);
      charSpan.textContent = char;
      acc = [...acc, charSpan];
      return acc;
    }, []);
    charSpans.forEach(char => wordSpan.appendChild(char));
  }

  return wordSpan
}

initCarousel(configA);
initCarousel(configB);