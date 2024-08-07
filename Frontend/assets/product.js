let productList=document.querySelector("#productList")
let logoutBtn=document.querySelector(".logout")

async function getProducts(){
    let token=localStorage.getItem("token")
    let products= await axios.get("http://localhost:7070/products",{
        headers:{
            "x-auth-token":token
        }
    })

    showProducts(products.data)
}


function showProducts(productz){
    console.log(productz)
    productz.forEach(element => {
        productList.innerHTML+=`
        
        <div class="product-item">
        <span>${element.name} - $${element.price}</span>
        <button class="trash-btn">🗑️</button>
    </div>
        
        
        `
    });
}


logoutBtn.addEventListener("click",function(){
    localStorage.removeItem("token")
    window.location.href="register.html"
})


function tokenControlUI(){
    let token=localStorage.getItem("token")
    if(!token){
        window.location.href="register.html"
    }
}


getProducts()
tokenControlUI()