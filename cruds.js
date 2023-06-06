let title        =document.getElementById("title")
let price        =document.getElementById("price")
let taxes        =document.getElementById("taxes")
let adds         =document.getElementById("adds")
let discount     =document.getElementById("discount")
let total        =document.getElementById("total")
let category     =document.getElementById("category")
let count        =document.getElementById("count")
let submit       =document.getElementById("submit")
let search       =document.getElementById("search")




 window.onload=presentdata; //to still present the data even if u closed the the website
// get total price function
function getPrice(){
  if(price.value!="")
  { 
    result =(+price.value+ +taxes.value+ +adds.value)- +discount.value
    total.innerHTML=result;
    total.style.backgroundColor="green";
  }
  else
  {
    total.style.backgroundColor="red";
  }
}


// creation details
let dataStore; //main array
// localStorage save
// to check if there are products still save them in the local storage 

if (localStorage.producs !=null){
    // to add the products local storage in the array storage 
    dataStore=JSON.parse(localStorage.producs);

}
else{
    dataStore=[];
    
}

let indexUpdated; //to use block variable i
let upcreat="create"; //which i will use it to update and create based on it's value 

submit.onclick=function(){
    // if i saved them in an array from the first time ,i will not know whose this value
    //  so i saved them in an objec and saved the objects in an array to save the data to never delete i i make anew product
    let dateproduct={
    title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    adds:adds.value,
    discount:discount.value,
    total:total.innerHTML,
    category:category.value.toLowerCase(),
    count:count.value,
}
if (title.value!= '' 
&& category.value!= ''
&& price.value!= ''
&& count.value < 100){
    if (upcreat==="create"){
        if( count.value >1){
            for (let i = 0; i < count.value; i++) {
                dataStore.push(dateproduct);
            }
        }
        else{
            dataStore.push(dateproduct);
        }
    }
    else{
        dataStore[indexUpdated]=dateproduct
        upcreat="create";
        count.style.display="block" //i don't need it i just update
        submit.innerHTML="Create" ;
    }
    clearinputes() // Clear the input fields
}


localStorage.setItem("producs",JSON.stringify(dataStore) )


presentdata() // Call the presentdata() function to populate the table with the data from the local storage

}



// function to clear the data from the inputes after i click creat 
function clearinputes() {
   title.value="";
   price.value="";
  taxes.value="";
adds.value="";
   discount.value="";
    total.innerHTML="";
    category.value="";
    count.value="";
}




//function to present the data product on the tabble
let tbody        =document.getElementById("tbody")



function presentdata(){
    let present="";
for (let i=0;i<dataStore.length;i++){
    
   present += `<tr>
    
    <td>${i+1}</td>

    <td>${dataStore[i].title}</td>
    <td>${dataStore[i].price}</td>
    <td>${dataStore[i].taxes}</td>
    <td>${dataStore[i].adds}</td>
    <td>${dataStore[i].discount}</td>
    <td>${dataStore[i].total}</td>
    <td>${dataStore[i].category}</td>
    
    <td><button onclick="updatepro(${i})" id="update">update</button></td>
<td><button onclick="deletepro(  ${i} )"  id="delete">delete</button></td>
</tr>` 
 
}

tbody.innerHTML=present;
getPrice()
// this is the part related to the clear btn which will show if there are products
let clearbtn=document.getElementById("clearbtn")
if (dataStore.length >0){

clearbtn.innerHTML=`clear ( Num of products (${dataStore.length}) )`

}
else{
    // to remove the button if there are not products
    clearbtn.innerHTML=`No Products`;

}
} 



// funcion to delete just the product which i want 

function deletepro(i) {

dataStore.splice(i,1)

localStorage.setItem("producs",JSON.stringify(dataStore) )

presentdata()
}; 



// creating function clear all 
function deleteAll(){
    dataStore.splice(0,dataStore.length)
localStorage.clear();
presentdata();
}


// creating function to update

function updatepro(i) {
let product=dataStore[i]
title.value=product.title
price.value=product.price
taxes.value=product.taxes
discount.value=product.discount
category.value=product.category

indexUpdated=i;// to use it in udating function so i make it global 
upcreat="update";
getPrice()  // to count the total price
count.style.display="none" //i don't need it i just update
submit.innerHTML="Update" 
scroll({
    top:0,
behavior:"smooth"
})
}


// function to choose how to search by category or by title
let sarchWay="bytitle"
function searchType(id){


    if (id==="srchTtl"){
       search.placeholder="Search By Title"
      
       sarchWay="bytitle"
     
    }
    else{
        search.placeholder=" Search By Category"
       
       sarchWay="bycategory"

    }
    search.focus()
    search.value=""
    presentdata();
}




// process of searching 
function searching(value){
value.toLowerCase();
    let serTable="";
    for(let i=0;i<dataStore.length;i++){
        if(sarchWay==="bytitle"){
         
                 if(dataStore[i].title.includes(value.toLowerCase())){
                    serTable += `<tr>
    
                    <td>${i+1}</td>
                
                    <td>${dataStore[i].title}</td>
                    <td>${dataStore[i].price}</td>
                    <td>${dataStore[i].taxes}</td>
                    <td>${dataStore[i].adds}</td>
                    <td>${dataStore[i].discount}</td>
                    <td>${dataStore[i].total}</td>
                    <td>${dataStore[i].category}</td>
                    
                    <td><button onclick="updatepro(${i})" id="update">update</button></td>
                <td><button onclick="deletepro(  ${i} )"  id="delete">delete</button></td>
                </tr>` 
                 
                
                
                }}
            else {
                
                    if(dataStore[i].category.includes(value.toLowerCase())){
                        serTable += `<tr>
    
                        <td>${i+1}</td>
                    
                        <td>${dataStore[i].title}</td>
                        <td>${dataStore[i].price}</td>
                        <td>${dataStore[i].taxes}</td>
                        <td>${dataStore[i].adds}</td>
                        <td>${dataStore[i].discount}</td>
                        <td>${dataStore[i].total}</td>
                        <td>${dataStore[i].category}</td>
                        
                        <td><button onclick="updatepro(${i})" id="update">update</button></td>
                    <td><button onclick="deletepro(  ${i} )"  id="delete">delete</button></td>
                    </tr>` 
                     
                    
                    
                   
                   }}
            } tbody.innerHTML=serTable;
            }       



         