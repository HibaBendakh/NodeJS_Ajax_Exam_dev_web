let test= (author,joke)=>{
    if(!author)
      return {msg:"field must has a value",stat:false}
    if(joke.length<4)
      return {msg:"joke must be > 4 char",stat:false}
    return {msg:"",stat:true}



}


module.exports={
    test
}