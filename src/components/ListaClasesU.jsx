import { useState, useEffect } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { listaC } from '../firebase';


function ListaClases() {
    const [lista, SetLista] = useState([])


    useEffect(() => {
        const traerDatos = async () => {
            try {
                onSnapshot(collection(listaC, 'cursos'), (query) => {
                    SetLista(query.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                })
            } catch (error) {
                console.log(error)
            }
        }
        traerDatos();
    }, [])

    return (
        <div className='container mt-5'>
            <h1 className='text-center'>Cursos</h1>
            <hr />
            <div className=''>
                <div className='col-7 position-absolute top-30 start-50 translate-middle-x rounded formulario'>
                    <h4 className='text-center text-light'>Lista De Cursos</h4>
                    <hr />
                    <ul className='list-group'>
                        {
                            lista.map(item => (
                                <li className='list-group-item text-center' key={item.id}>
                                    <span className='lead'><span className='fw-bold'>{item.nombreMateria}</span> <br /> <span className='fw-normal'>{item.InfDescripcion}</span></span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div >
    )
}

export default ListaClases
