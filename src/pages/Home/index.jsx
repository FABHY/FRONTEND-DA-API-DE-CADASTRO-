import { useEffect, useState, useRef } from 'react';
import "./style.css";
import Trash from "../../assets/Trash.svg";
import Backend from "../../services/Backend";




function Home() {
 const [users, setUsers] = useState([])


 const inputName = useRef()
 const inputAge = useRef()
 const inputEmail = useRef()

  async function getUsers(){
   const usersFromBackend = await Backend.get('/usuarios')

   setUsers  (usersFromBackend.data )
   
  }


  async function createUsers(){
    await Backend.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })
 
    getUsers()
    
   }

   async function deleteUsers(id){
   await Backend.delete(`/usuarios/${id}`)
 
   getUsers()
    
   }

  useEffect(() => {
    getUsers()

  }, [])
    

  return (
    <div className="conatiner">
      <form>
        <h1> Registro de Usuarios </h1>
        <input placeholder="Nome"name="nome" type="text"  ref={inputName}/>
        <input placeholder="Idade"name="idade" type="number" ref={inputAge}/>
        <input placeholder="Email"name="email" type="email" ref={inputEmail}/>
        <button type="button" onClick={createUsers}>Registrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>Nome: <span>{user.name} </span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} />
          </button>
        </div>
      ))}

      <div>
        <div>
          <p>Nome: </p>
          <p>Idade: </p>
          <p>Email: </p>
        </div>
        <button>
          <img src={Trash} />
        </button>
      </div>
    </div>
  );
}

export default Home;
