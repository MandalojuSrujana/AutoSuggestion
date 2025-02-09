class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }

    searchPrefix(prefix) {
        let node = this.root;
        for (let char of prefix) {
            if (!node.children[char]) {
                return [];
            }
            node = node.children[char];
        }
        return this.getWordsFromNode(node, prefix);
    }

    getWordsFromNode(node, prefix) {
        let words = [];
        if (node.isEndOfWord) {
            words.push(prefix);
        }
        for (let char in node.children) {
            words.push(...this.getWordsFromNode(node.children[char], prefix + char));
        }
        return words;
    }
}

const trie = new Trie();

// Load words into the Trie
fetch("words_alpha.txt")
    .then(response => response.text())
    .then(data => {
        let words = data.split("\n").map(word => word.trim()).filter(word => word.length > 0);
        words.forEach(word => trie.insert(word));
    })
    .catch(error => console.error("Error loading words:", error));

const searchInput = document.getElementById("search");
const suggestionsBox = document.getElementById("suggestions");

searchInput.addEventListener("input", function() {
    let input = this.value.toLowerCase();
    suggestionsBox.innerHTML = "";
    if (input) {
        const filteredSuggestions = trie.searchPrefix(input);
        if (filteredSuggestions.length > 0) {
            suggestionsBox.style.display = "block";
            filteredSuggestions.forEach(suggestion => {
                let suggestionElement = document.createElement("div");
                suggestionElement.textContent = suggestion;
                suggestionElement.addEventListener("click", function() {
                    searchInput.value = suggestion;
                    suggestionsBox.style.display = "none";
                });
                suggestionsBox.appendChild(suggestionElement);
            });
        } else {
            suggestionsBox.style.display = "none";
        }
    } else {
        suggestionsBox.style.display = "none";
    }
});

document.addEventListener("click", function(e) {
    if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
        suggestionsBox.style.display = "none";
    }
});
