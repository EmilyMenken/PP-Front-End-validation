document.getElementById('blog').onsubmit = () => 
    {
        clearErrors();
        let isValid = true;
    
        //Validate first name
        let author = document.getElementById('author').value.trim();
        let title = document.getElementById('title').value.trim();
        let content = document.getElementById('content').value.trim();
    
    
        if(author === "")
        {
            document.getElementById("err-author").style.display = "block";
            isValid = false;
        }
        if(title === "")
        {
            document.getElementById("err-title").style.display = "block";
            isValid = false;
        }
        if(content === "")
        {
            document.getElementById("err-content").style.display = "block";
            isValid = false;
        }
    
        return isValid;
    }
    
    function clearErrors()
    {
        let errors = document.getElementsByClassName("err");
        for(let i = 0;  i < errors.length; i++)
        {
            errors[i].style.display = "none";
        }
    }
    
    