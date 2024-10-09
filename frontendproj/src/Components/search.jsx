function TrieNode(letter) {
  
    this.letter = letter;
    this.prevLetter = null;
    this.nextLetters = {}; 
    this.isComplete = false; 
  
    
    this.getWord = getWord;
  
    
    function getWord() {
        var node = this;
        var wordLetters = [];
        while (node.prevLetter) {
            wordLetters.unshift(node.letter);
            node = node.prevLetter; 
        }
        return wordLetters.join("");
    };
  }
  
  function Trie() {
    
    this.root = new TrieNode(null);
  
    
    function normalize(letter) {
      
      const diacriticsMap = {
          'ά': 'α',
          'έ': 'ε',
          'ή': 'η',
          'ί': 'ι',
          'ό': 'ο',
          'ύ': 'υ',
          'ώ': 'ω'
          
      };
  
      return diacriticsMap[letter] || letter.toLowerCase();
    }
  
    
    this.insert = insert; 
    this.contains = contains; 
    this.find = find; 
  
    
    function insert(word) {
        var node = this.root; 
        for (let i = 0; i < word.length; i++) {
            const current_letter = word[i];
            var lowercase_letter = normalize(current_letter); 
  
            if (!node.nextLetters[lowercase_letter]) { 
                node.nextLetters[lowercase_letter] = new TrieNode(current_letter); 
                node.nextLetters[lowercase_letter].prevLetter = node; 
            }
            node = node.nextLetters[lowercase_letter]; 
  
            
            if (i === word.length - 1) {
                node.isComplete = true;
            }
        }
    };
  
    
    function contains(word) {
        var node = this.root; 
        for (let i = 0; i < word.length; i++) {
            const current_letter = word[i];
            const lowercase_letter = normalize(current_letter); 
  
            let next_node = node.nextLetters[lowercase_letter];
            if (next_node) { 
                node = next_node; 
            } else {
                return false;
            }
        }
        return node.isComplete; 
    };
  
    
    function find(clue_letters) {
        var node = this.root; 
        var output = [];
        for (let i = 0; i < clue_letters.length; i++) {
            const clue_letter = clue_letters[i];
            const lowercase_clue = normalize(clue_letter); 
  
            let next_node = node.nextLetters[lowercase_clue];
            if (next_node) { 
                node = next_node; 
            } else {
                return output;
            }
        }
  
        
        findAllWords(node, output);
        return output;
    };
  
    
    function findAllWords(node, arr) {
        if (node.isComplete) { 
            arr.unshift(node.getWord()); 
        }
  
        
        for (var next_letter in node.nextLetters) {
            findAllWords(node.nextLetters[next_letter], arr);
        }
    }
  }
  
  export default Trie;
  
  
  