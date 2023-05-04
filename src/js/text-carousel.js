import '../css/text-carousel.css'

const configA = {
  container: 1,
  preText: 'Tacos are',
  words: ['delicious', 'amazing', 'tasty'],
  colors: ['#8e44ad', '#c0392b', '#2980b9'],
  speed: 1500,
  byLetter: false,
  headingLevel: 2,
}

function initCarousel(config) {
  let currentWord = 0;

  const {container, pretextContainer, wordContainer, spanContent} = createInitalStructure(config);

  container.style.setProperty('--carousel-color', config.colors[currentWord]);
  spanContent[0].classList.add('active');
  spanContent[1].classList.add('next');

  console.log(spanContent);
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
      charSpan.setAttribute('data-char', char);
      charSpan.textContent = char;
      acc = [...acc, charSpan];
      return acc;
    }, []);
    charSpans.forEach(char => wordSpan.appendChild(char));
  }
  
  return wordSpan
}

function animateCharOut(char) {

}

function animateCharIn(char) {

}

initCarousel(configA);