const authorElm = document.getElementById("authorElm");
const authorSpan = document.getElementById("authorSpan");
const jokeElm = document.getElementById("jokeElm");
const jokeSpan = document.getElementById("jokeSpan")
const errorInput = document.getElementById("errorInput");
const resetBtn = document.getElementById("resetBtn");
const generateBtn = document.getElementById("generateBtn");
const jokesList = document.getElementById("jokesList");
const submitBtn = document.getElementById("submitBtn")
const url = "http://localhost:3000/jokes";

generateBtn.addEventListener('click',()=>{
    const xhr = new XMLHttpRequest();
    xhr.open("get","https://api.chucknorris.io/jokes/random",true)
    xhr.send()
    xhr.addEventListener('load',()=>{
         console.log(JSON.parse(xhr.response))
        const myData = JSON.parse(xhr.response)
        authorElm.value= "Chuck Norris"
        jokeElm.innerText = myData.value;   
    })
})


let addJoke = (au,jo,id)=>{
    //let {au,jo} = data;
    const li = document.createElement("li");
    const likesDiv = document.createElement("div");
    const likCounter = document.createElement("span");
    const content = document.createElement("div")
    const author = document.createElement("h3");
    const joke = document.createElement("p")
    const divBtn = document.createElement("div")
    const btnDelete = document.createElement("button")
    const btnLike = document.createElement("button")
    
    likesDiv.classList.add("likes")
    content.classList.add("content")
    divBtn.classList.add("btns")
    btnDelete.classList.add("delete");
    btnLike.classList.add("likeBtn");
    
    likesDiv.appendChild(likCounter);
    likesDiv.innerText = "likes" ;
    likCounter.innerHTML=0;

    likesDiv.appendChild(likCounter);
    
    
    author.innerText =  au;
    joke.innerText = jo;
    btnDelete.innerText = "delete"
    btnLike.innerText = "like"

    content.appendChild(author);
    content.appendChild(joke);

    divBtn.appendChild(btnDelete);
    divBtn.appendChild(btnLike)

    li.appendChild(likesDiv);
    li.appendChild(content);
    li.appendChild(divBtn);

    jokesList.appendChild(li);

    btnDelete.addEventListener('click',()=>{
        const xhr = new XMLHttpRequest();
        xhr.open("delete",url+"/"+id,true)
        xhr.send()
        xhr.addEventListener('load',()=>{
             if(xhr.status!=200)
              return alert(xhr.response)
            li.remove()
           
        })
    })

    btnLike.addEventListener('click',()=>{
        likCounter.innerHTML++;
    })
}


let addList = ()=>{
    jokesList.innerHTML ="";
    const xhr = new XMLHttpRequest();
    xhr.open("get",url,true);
    xhr.send();
    xhr.addEventListener('load',()=>{
        if(xhr.status!=200)
         return alert(xhr.response);
        const list = JSON.parse(xhr.response);
        list.forEach(element => {
            addJoke(element.author,element.joke,element.id)
        });
    })
    xhr.addEventListener('error',()=>{
        return alert('error')
    })
}
addList();

authorElm.addEventListener('input',()=>{
    if(!authorElm.value)
   {
    authorSpan.innerText = "field is required"
    submitBtn.setAttribute('disabled', '');
     return false 
    }
    authorSpan.innerText ="";
    submitBtn.removeAttribute('disabled');
    return true;
})


jokeElm.addEventListener('input',()=>{
    if(jokeElm.value.length<4)
    {
        jokeSpan.innerText="joke length must be >4"
        return false
    }
    jokeSpan.innerText ="";
    return true;
})

submitBtn.addEventListener('click',()=>{
    let authorInput = authorElm.value;
    let jokeInput = jokeElm.value;
    const xhr = new XMLHttpRequest();
    xhr.open("post",url,true)
    xhr.setRequestHeader("Content-Type","application/json")
    const dataToSend = {
        author:authorInput,
        joke:jokeInput
    }
    xhr.addEventListener('load',()=>{
        if(xhr.status!=200)
         return alert(xhr.response)
        addJoke(dataToSend.author,dataToSend.joke)
    })
    xhr.send(JSON.stringify(dataToSend))
})
resetBtn.addEventListener('click',()=>{
    authorElm.value ="";
    jokeElm.innerText ="";
})










// <!-- <li>
//                     <div class="likes">
//                         12 likes
//                     </div>
                  
                    
//                     <div class="content">
//                         <h3>Mehdi Tmimi</h3>
//                         <p>Que demande un footballeur à son coiffeur ? La coupe du monde s'il vous plait</p>
//                     </div>
//                     <div class="btns">
//                         <button class="delete">delete</button>
//                         <button class="likeBtn">like</button>
//                     </div>

//                 </li> -->