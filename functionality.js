
function displayUser(){
    
    
    var inpt = document.getElementById('searchField').value;
    var checkForWhiteSpace=inpt.replace(/ /g,'');
    var user_info = document.getElementById('user_info');
  
    user_info.innerHTML = "";
    if(checkForWhiteSpace.length==0){
        return false;
    }

           
    let dataList=new Promise(function(resolve,reject){

        let username="";
        let xhr=new XMLHttpRequest();
        xhr.open("GET","https://jsonplaceholder.typicode.com/users");
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
    });
    
    dataList.then(function(data){
     
        var users=JSON.parse(data);
        var str=inpt;
       
        for(user of users){

            username=user.name;
            username=username.toUpperCase();
            if(username==str){


                user_info.innerHTML=`<div class="row user-record">
                <div class="col-sm-12"><b>Name:</b> ${user.name} </div> 
                <div class="col-sm-12"><b>Email:</b> ${user.email}</div>
                <div/>`;
            }
        }
        
    });

    
}

function myAutoComplete()
{
   
    var name_list = document.getElementById('name_list');
    name_list.innerHTML = "";
    
    
    var user_info = document.getElementById('user_info');
  
    var inpt = document.getElementById('searchField').value;
    user_info.innerHTML = "";
    var checkForWhiteSpace=inpt.replace(/ /g,'');
    if(checkForWhiteSpace.length==0){
        return false;
    }
    
    let dataList=new Promise(function(resolve,reject){

        let username="";
        let xhr=new XMLHttpRequest();
        xhr.open("GET","https://jsonplaceholder.typicode.com/users");
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
     for(user of users){
     
        username=user.name;
        username=username.toUpperCase();
       var str=inpt;
       str=str.toUpperCase();
      
     if(username.startsWith(str)){
         
        var option = document.createElement('option');
        option.value = username;
        name_list.appendChild(option);
        user_info.innerHTML+=`<div class="row user-record">
        <div class="col-sm-12"><b>Name:</b> ${user.name} </div> 
        <div class="col-sm-12"><b>Email:</b> ${user.email}</div>
        <div/>`;

     }
     
      

     
    }

 }).catch(function(err){

    console.log(err);
 });


}