let suggestionsList = [];
       fetch("words_alpha.txt")
        .then(response => response.text())
        .then(data => {
        suggestionsList = data.split("\n").map(word => word.trim()).filter(word => word.length > 0);
        })
    .catch(error => console.error("Error loading words:", error));


        const searchInput = document.getElementById("search");
        const suggestionsBox = document.getElementById("suggestions");

        searchInput.addEventListener("input", function() {
            let input = this.value.toLowerCase();
            suggestionsBox.innerHTML = "";
            if (input) {
                const filteredSuggestions = suggestionsList.filter(item => item.toLowerCase().startsWith(input));
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