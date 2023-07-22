import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Register() {
    const [fname,setFname] = useState('');
    const [lname,setLname] = useState('');
    const [email,setEmail] = useState('');
    const [pass,setPass] = useState('');
    const [conpass,setConpass] = useState('');
    const [isSignedup,setIsSignedup] = useState(false);
    const [logemail,setLogEmail] = useState('');
    const [logpass,setLogPass] = useState('');
    let navigate = useNavigate();
    let users = JSON.parse(localStorage.getItem('users')) || [];

    let handleSignup = (e) => {
        e.preventDefault();
        if(fname==='' || lname==='' || email==='' || pass==='' || conpass===''){
            alert('All the input fields are required');
        }
        else if(conpass!==pass){
            alert('Password and Confirm Password doesnot match');
        }
        else{
            let object = {
                firstName:fname,
                lastName:lname,
                email,
                password:pass,
                confirmPassword:conpass,
                accessKey: generateKey()
            }
            let exists = false;
            for(let i=0;i<users.length;i++){
                if(users[i].email === email) exists = true;
            }

            if(exists){
                alert('user already exist. Please log in');
                return;
            }
            else{
                users.push(object);
                console.log(object,users);
            }
    
            localStorage.setItem('users',JSON.stringify(users)); //store the updated users
            localStorage.setItem('currUser',JSON.stringify(object));
            alert('You are signed up successfully')
            navigate('/data');
        }
    }

    let generateKey = () => {
        let string = '';
        let content = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for(let i=0;i<16;i++){
            string += content[Math.round(Math.random()*62)]; //get 16 charactered random string
        }
        //console.log(string);
        return string;
    }

    let handleLogin = (e) => {
        e.preventDefault();
        let code = '',exists=false;

        if(logemail === '' || logpass === ''){
            alert('all inputs are mandatory');
        }
        else{
            for(let i=0;i<users.length;i++){
                if(users[i].email === logemail && users[i].password === logpass && users[i].accessKey){
                    code = users[i].accessKey;
                    localStorage.setItem('currUser',JSON.stringify(users[i]));
                    exists = true;
                }
            }
    
            if(exists){
                navigate('/data');
                console.log(code,'code');
            }
            else{
               alert('User does not Exist. Sign up to continue');
            }
        }
    }

  return (
    <div>
        {isSignedup?
        <form className='container' onSubmit={handleLogin}>
            <h1>Log In Page</h1>
            <div>
                <label htmlFor='login-email'>Email Id</label>
                <br/>
                <input id='login-email' placeholder='enter your email id' type='email' value={logemail} onChange={(e)=>setLogEmail(e.target.value)}/>
            </div>
            <div>
                <label htmlFor='login-password'>Password</label>
                <br/>
                <input id='login-password' placeholder='enter your password' type='password' value={logpass} onChange={(e)=>setLogPass(e.target.value)}/>
            </div>
            <button className='btn'>Log In</button>
            <p onClick={()=>setIsSignedup(false)}>You have not signed up? Sign Up</p>
        </form>:
        <form className='container' onSubmit={handleSignup}>
            <h1>Sign Up Page</h1>
            <div>
                <label htmlFor='fname'>First Name</label>
                <br/>
                <input id='fname' placeholder='enter your first name' type='text' value={fname} onChange={(e)=>setFname(e.target.value)}/>
            </div>
            <div>
                <label htmlFor='lname'>Last Name</label>
                <br/>
                <input id='lname' placeholder='enter your last name' type='text' value={lname} onChange={(e)=>setLname(e.target.value)}/>
            </div>
            <div>
                <label htmlFor='email'>Email Id</label>
                <br/>
                <input id='email' placeholder='enter your email id' type='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <br/>
                <input id='password' placeholder='enter your password' type='password' value={pass} onChange={(e)=>setPass(e.target.value)}/>
            </div>
            <div>
                <label htmlFor='conpassword'>Confirm Password</label>
                <br/>
                <input id='conpassword' placeholder='confirm your password' type='text' value={conpass} onChange={(e)=>setConpass(e.target.value)}/>
            </div>
            <button className='btn'>Sign Up</button>
            <p onClick={()=>setIsSignedup(true)}>Already an user? Log in</p>
        </form>
        }
    </div>
  )
}

export default Register;
