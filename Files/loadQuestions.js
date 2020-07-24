let input = document.querySelector('input');

input.addEventListener('change', () => {
    let files = input.files;
 
    if(files.length == 0) return;
 
    const file = files[0];
 
    let reader = new FileReader();

    reader.onload = (e) => {
        let lines;
        const file = e.target.result;
        lines = file.split(/\r\n|\n/);

        if (lines) {
            let questions = [];
            let categoryIndex = -1;
            let category;
            let line;
            let letter;
            let keyword;
            for (let i = 0; i<lines.length; i++) {
                console.log(lines[i]);
                if (lines[i] === '') {
                } 
                else if (lines[i][0] === '-' && lines[i].split(';')[1]) {
                    line = lines[i].split(';');
                    letter = line[1].substring(1);
                    keyword = line[0].substring(2);
                    if (letter.length === 0 && keyword.length === 0) {
                        document.getElementById('loadfile').value = "";
                        $( "#snackbar ").html( "Zły format pliku. Błąd w linii " + i + '.');
                        showSnackBar();
                        return;
                    } else {
                        category.words.push({word: keyword, letter: letter});
                    }
                } else {
                    if(categoryIndex !== -1) {
                        if (category.words.length === 0) {
                            document.getElementById('loadfile').value = "";
                            $( "#snackbar ").html( "Zły format pliku. Pusta kategoria: \'"  + " \'.");
                            showSnackBar();
                            questions.push(category);
                        } else {
                            questions.push(category);
                        }
                    }
                    categoryIndex ++;
                    category = {name: lines[i].replace(/ /g, '-'), words: []};
                }
            }
            questions.push(category);
            localStorage.setItem('questions', JSON.stringify(questions));
        }
    };
 
    reader.onerror = (e) => alert(e.target.error.name);
 
    reader.readAsText(file); 
    
});

function showSnackBar() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
  }
  