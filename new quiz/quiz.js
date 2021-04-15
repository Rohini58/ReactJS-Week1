var username;
var rollnum;
var score = 0;
var attempt=0;
var displayname;
function saveLogin()
 { 
    username = document.getElementById("username").value;
    rollnum = document.getElementById("rollnum").value;
    localStorage.setItem("uname", "username")
    localStorage.setItem("rollnum", "rollnum")
    localStorage.setItem("score", score)
    window.location.href = "q1.html"

}
function nextPage(qid, name, type, page)
{
    if(type == "radio" && qid == "q1"){
        ql = document.getElementsByName(name)
        for(let i = 0; i < ql.length; i++)
        {
            console.log(ql[i].value)
            if(ql[i].checked){attempt++}
            if(ql[i].checked && ql[i].value == '41')
            {
                score = Number(getScore()) + 1
                setScore(score)
                // setScore(Number(getAttempt()) + 1)
            }
        }
    }
   
    if(type == "radio" && qid == "q2"){
        ql = document.getElementsByName(name)
        for(let i = 0; i < ql.length; i++)
        {
            console.log(ql[i].value)
            if(ql[i].checked){attempt++}
            if(ql[i].checked && ql[i].value == 'Age')
            {
                score = Number(getScore()) + 1
                setScore(score)
            }
        }
    }

    if(type == "radio" && qid == "q3"){
        ql = document.getElementsByName(name)
        for(let i = 0; i < ql.length; i++)
        {
            console.log(ql[i].value)
            if(ql[i].checked){attempt++}
            if(ql[i].checked && ql[i].value == 'ICU')
            {
                score = Number(getScore()) + 1
                setScore(score)

            }
        }
    }
   if(type == "radio" && qid == "q4"){
        ql = document.getElementsByName(name)
        for(let i = 0; i < ql.length; i++)
        {
            console.log(ql[i].value)
            if(ql[i].checked){attempt++}
            if(ql[i].checked && ql[i].value == 'Egg')
            {
                score = Number(getScore()) + 1
                setScore(score)

            }
        }
    }
   if(type == "radio" && qid == "q5"){
        ql = document.getElementsByName(name)
        for(let i = 0; i < ql.length; i++)
        {
            console.log(ql[i].value)
            if(ql[i].checked){attempt++}
            if(ql[i].checked && ql[i].value == 'Your breath')
            {
                score = Number(getScore()) + 1
                setScore(score)

            }
        }
    }
    
    window.location.href = page;
}

function getScore(){
    return localStorage.getItem("score", score)
}

function setScore(score){
    localStorage.setItem("score", score)
}

displayname = localStorage.getItem("uname")
displayroll = localStorage.getItem("rollnum")
displayscore = localStorage.getItem("score")
console.log(displayname, score, displayroll)

document.getElementById("result").innerHTML=  displayscore
// document.getElementById("attempted").innerHTML="Attempted: "+ attempt
// document.getElementById("result").innerHTML = "Score: "+displayscore+"/3"

 window.onunload = () =>{
            window.localStorage.clear();
        }