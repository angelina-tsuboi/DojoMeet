import { useState, React } from 'react';
import fire from '../config/fire-conf';
import { useRouter } from 'next/router';
import Login from '../components/Landing/views/IndexSections/Login';



const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notify, setNotification] = useState('');
  const router = useRouter();
  const handleLogin = (e) => {
    e.preventDefault();
    fire.auth()
      .signInWithEmailAndPassword(username, password)
      .catch((err) => {
        console.log(err.code, err.message)
        setNotification(err.message)
        setTimeout(() => {
          setNotification('')
        }, 2000)
      })
    setUsername('')
    setPassword('')
    router.push("/")
  }
  
  return (
    <Login router={router}/>
  )
}
export default LoginPage;