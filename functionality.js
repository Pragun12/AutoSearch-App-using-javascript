

function myAutoComplete(event)
{
   

    var name_list = document.getElementById('name_list');
    name_list.innerHTML = "";
    
    
    var user_info = document.getElementById('user_info');

    
    var inpt=event.target.value+event.key;
  
  
    
    user_info.innerHTML = "";
    var checkForWhiteSpace=inpt.replace(/ /g,'');
    if(checkForWhiteSpace.length==0){
        return false;
    }
    
    let dataList=new Promise(function(resolve,reject){

        let username="";
        let xhr=new XMLHttpRequest();
        xhr.open("GET","https://api.github.com/users?q=username");
        xhr.onload=function(){
            if(this.status>=200 && this.status<300){
  
                
                resolve(xhr.response);
            }
            else{
                reject({

                    status:this.status,
                    statusText:xhr.statusText
                });
            }
        };
        xhr.onerror=function(){

            reject({

                status:this.status,
                statusText:xhr.statusText
            });
        };
        xhr.send();
    }    
);

 dataList.then(function(data){
     
     var users=JSON.parse(data);
     
     user_info.innerHTML+=`<div class="row">`;
     var count=0;
     
     for(user of users){
     

        username=user.login;
        username=username.toUpperCase();
       var str=inpt;
       str=str.toUpperCase();
     

      
      
     if(username.startsWith(str.charAt(0))){
        count++;
        var option = document.createElement('option');
        option.className="usernames";
        option.id=username;
        option.value = username;
       
        name_list.appendChild(option);
        user_info.innerHTML+=`<a href="http://localhost/training/users.html?q=${user.login}">
        <div class="col-sm-4  user-record"> 
        <img src="${user.avatar_url}" class="img-responsive" width="180">
        <span> ${user.login}</span>
        </div> </a>
        `;


       

     }
    
    }

   
    
    var userRecords=document.getElementsByClassName("user-record");
    userRecords[0].className+=' active';

    user_info.innerHTML+=`</div>`;

    if(count>1){
        user_info.innerHTML+=`
        <div class="row">
        <div class="col-sm-12 text-center">
        <button type="button" class="btn btn-primary" id="previousBtn" onClick="prevNext(this)"> << Prev </button> 
        <button type="button" class="btn btn-primary" id="nextBtn" onClick="prevNext(this)">Next >> </button>
        </div>
        </div>
        `;

      
    }
     
 }).catch(function(err){

    console.log(err);
 });


}



function prevNext(event){
   

    
    var userRecords=document.getElementsByClassName("user-record");
    
   
    for(var i=0;i<userRecords.length;i++){
        
        
        if(userRecords[i].classList.contains("active")){

        
            if(event.id=="previousBtn"){

                if(i==0)
                break;
                
            userRecords[i-1].className+=' active';
            }
            else{

                if(i==(userRecords.length-1))
                break;

            userRecords[i+1].className+=' active';
            }
          userRecords[i].className =  userRecords[i].className.replace(" active", "");
           break;

         }
        

    }
}

function getUser(){
    var userInput=document.getElementById("searchField").value;

    var checkForWhiteSpace=userInput.replace(/ /g,'');
    
    if(checkForWhiteSpace.length==0){
        return false;
    }
    else{
        var userRecords=document.getElementsByClassName("user-record");
        var activeDiv=document.getElementsByClassName("active");
         activeDiv[0].className=activeDiv[0].className.replace(" active", "");
         

        for(var i=0;i<userRecords.length;i++){
         var user_name=userRecords[i].getElementsByTagName('span')[0].innerHTML;

         user_name=user_name.replace(/ /g,'').toUpperCase();
         var strg=checkForWhiteSpace.toUpperCase();
         

         if(user_name.startsWith(strg)){

            
            userRecords[i].className+=" active";
            break;
         }

        }
    }
     
}


function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}


function getUserInfo(username){

    let userDetails = document.getElementById('userDetails');

    let userInfo=new Promise(function(resolve,reject){

        
        let xhr=new XMLHttpRequest();
        xhr.open("GET",`https://api.github.com/users/${username}`);
        xhr.onload=function(){
            if(this.status>=200 && this.status<300){
  
                
                resolve(xhr.response);
            }
            else{
                reject({

                    status:this.status,
                    statusText:xhr.statusText
                });
            }
        };
        xhr.onerror=function(){

            reject({

                status:this.status,
                statusText:xhr.statusText
            });
        };
        xhr.send();
    }    
);
userInfo.then(function(data){
     
    var user=JSON.parse(data);

    userDetails.innerHTML+=`
    <img src="${user.avatar_url}" class="img-responsive" width="180">
        <span> ${user.login}</span>
    `;
    
});

}
