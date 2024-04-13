async function getword() {
    let wordInput = document.querySelector('.searchInput').value;
    let wordElement = document.querySelector('.word');
    let meaningElement = document.querySelector('.meaning');
    let exampleElement = document.querySelector('.example');

    document.querySelector(".wordRow").style.display = "block";
    document.querySelector(".meaningRow").style.display = "block";
    document.querySelector(".exampleRow").style.display = "block";

    wordElement.innerText = '';
    meaningElement.innerHTML = '';
    exampleElement.innerHTML = '';
  
    let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${wordInput}`;
    try {
      let response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let data = await response.json();
  
      if (data.length === 0) {
        // No definition found
        wordElement.innerText = 'No definition found for "' + wordInput + '"';
        return;
      }

      wordElement.innerText = data[0].word;
  

      for (let meaning of data[0].meanings) {
        meaningElement.innerHTML += `<h4>${meaning.partOfSpeech}</h4>`;
  

        for (let definition of meaning.definitions) {

          meaningElement.innerHTML += `<p>${definition.definition}</p>`;

          if (definition.example) {
            exampleElement.innerHTML += `<p>${definition.example}</p>`;
          }
        }
      } 
    document.querySelector(".wordRow").style.display = "block";
    document.querySelector(".meaningRow").style.display = "block";
    document.querySelector(".exampleRow").style.display = "block";

    document.querySelector('footer').style.position = "relative"
    } catch (error) {
      alert(`Fetch Error: , ${error}`);
    }

  }
  