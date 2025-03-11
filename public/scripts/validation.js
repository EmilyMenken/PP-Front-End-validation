

document.addEventListener("DOMContentLoaded", function () {

    const authorInput = document.getElementById("author");
    const titleInput = document.getElementById("title");
    const contentInput = document.getElementById("content");

    const authorError = document.getElementById("err-author");
    const titleError = document.getElementById("err-title");
    const contentError = document.getElementById("err-content");

    function validateAuthor() {
        if (!authorInput.value || /\d/.test(authorInput.value)) {
            authorError.style.display = "inline";  // Show error
            return false;
        } else {
            authorError.style.display = "none";  // Hide error
            return true;
        }
    }

    function validateTitle() {
        if (!titleInput.value) {
            titleError.style.display = "inline";  // Show error
            return false;
        } else {
            titleError.style.display = "none";  // Hide error
            return true;
        }
    }

    function validateContent() {
        if (!contentInput.value) {
            contentError.style.display = "inline";  // Show error
            return false;
        } else {
            contentError.style.display = "none";  // Hide error
            return true;
        }
    }

    authorInput.addEventListener("input", validateAuthor);
    titleInput.addEventListener("input", validateTitle);
    contentInput.addEventListener("input", validateContent);

    const form = document.getElementById("blog");
    form.addEventListener("submit", function (e) {
        const isAuthorValid = validateAuthor();
        const isTitleValid = validateTitle();
        const isContentValid = validateContent();

        if (!isAuthorValid || !isTitleValid || !isContentValid) {
            e.preventDefault(); 
        }
    });

});
