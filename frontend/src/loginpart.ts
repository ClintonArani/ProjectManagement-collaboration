let userlogin_email = document.getElementById("login-email") as HTMLInputElement
let userlogin_pass = document.getElementById("login-password") as HTMLInputElement
let emailError = document.getElementById('email-error') as HTMLParagraphElement

let loginForm = document.getElementById('loginForm') as HTMLFormElement

loginForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    let email = userlogin_email.value.trim()
    let password = userlogin_pass.value.trim()

    if(email == ''){
        userlogin_email.style.border = 'red solid 1px'
        emailError.textContent = 'Email is required'
    }

    let login_details = email != '' && password != ''

    if(login_details){
        let promise2 = new Promise<{error?:string, message?:string, token?:string}>((resolve, reject)=>{
            fetch('http://localhost:5300/auth/login',{
                headers:{
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    email, password
                })
            }).then(res=>res.json()).then(data=>{
                console.log(data);
                
                if(data.token){
                    localStorage.setItem("token", data.token)
                    redirect()
                }

                resolve(data)
            }).catch(error=>{
                reject(error)
            })
        })

        function redirect(){
            const token = localStorage.getItem('token') as string

            new Promise<{
                info?:{
                    id?:string,
                    name?: string,
                    role?:string,
                    email?:string,
                }
                error: {
                    name?:string,
                    message?:string
                }
            }>((resolve, rej)=>{
                fetch('http://localhost:5300/auth/check-details',{
                    headers:{
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                        'token': token
                    },
                    method: "GET"
                }).then(res=> res.json()).then(data=>{
                    console.log(data);
                    
                    if(data.info.role === 'user'){
                        localStorage.setItem('user_id', data.info.id)
                        setTimeout(() => {
                            window.location.href = 'users.html'
                        }, 2000);
                    }else if(data.info.role === 'admin'){
                        localStorage.setItem('user_id', data.info.id)
                        setTimeout(() => {
                            window.location.href = 'index.html'
                        }, 2000);
                    }

                    resolve(data)
                })
            })
        }
    }
})