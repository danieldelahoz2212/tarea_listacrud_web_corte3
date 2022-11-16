import { useState, useEffect } from 'react'
import { collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { listaC } from '../firebase';


function ListaClases() {
    const [materia, setMateria] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [modoEditar, setModoEdiar] = useState(false)
    const [lista, SetLista] = useState([])
    const [id, setId] = useState('')

    const guardar = async (e) => {
        e.preventDefault();
        try {
            if (!materia.trim() || /^\s+$/.test(materia)) {
                alert('Ingrese Materia')
                return
            }
            if (!descripcion.trim() || /^\s+$/.test(descripcion)) {
                alert('Ingrese Descripcion')
                return
            } else {
                const data = await addDoc(collection(listaC, 'cursos'), {
                    nombreMateria: materia,
                    InfDescripcion: descripcion
                })

                SetLista([
                    ...lista,
                    {
                        nombreMateria: materia,
                        InfDescripcion: descripcion,
                        id: data.id
                    }
                ])
            }
            setMateria('')
            setDescripcion('')
        } catch (error) {
            console.log(error)
        }
    }

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

    const editar = item => {
        setMateria(item.nombreMateria)
        setDescripcion(item.InfDescripcion)
        setId(item.id)
        setModoEdiar(true)
    }

    const editarMateria = async e => {
        e.preventDefault()
        try {
            if (!materia.trim() || /^\s+$/.test(materia)) {
                alert('Ingrese Materia')
                return
            }
            if (!descripcion.trim() || /^\s+$/.test(descripcion)) {
                alert('Ingrese Descripcion')
            } else {
                const docRef = doc(listaC, "cursos", id);
                await updateDoc(docRef, {
                    nombreMateria: materia,
                    InfDescripcion: descripcion
                })
                const newArray = lista.map(
                    item => item.id === id ? { id: id, nombreMateria: materia, InfDescripcion: descripcion } : item
                )

                SetLista(newArray)
                setMateria('')
                setDescripcion('')
                setId('')
                setModoEdiar(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const cancelar = () => {
        setModoEdiar(false)
        setMateria('')
        setDescripcion('')
        setId('')
    }

    const eliminar = async id => {
        try {
            await deleteDoc(doc(listaC, 'cursos', id))
        } catch (error) {

        }
    }

    return (
        <div className='container mt-5'>
            <h1 className='text-center'>Cursos</h1>
            <hr />
            <div className='row'>
                <div className='col-8 rounded formulario'>
                    <h4 className='text-center text-light'>Lista De Cursos</h4>
                    <hr />
                    <ul className='list-group'>
                        {
                            lista.map(item => (
                                <li className='list-group-item text-center' key={item.id}>
                                    <span className='lead'><span className='fw-bold'>{item.nombreMateria}</span> <br /> <p className='fw-normal'>{item.InfDescripcion}</p></span>
                                    <button className='btn btn-danger btn-sm float-end mx-2 ' onClick={() => eliminar(item.id)}>Eliminar</button>
                                    <button className='btn btn-warning btn-sm float-end' onClick={() => editar(item)}>Editar</button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="col-4">
                    <form className='rounded formulario' onSubmit={modoEditar ? editarMateria : guardar}>
                        <h4 className="text-center text-light">
                            {
                                modoEditar ? 'Editar Materia' : 'Agregar Materia'
                            }
                        </h4>

                        <input type="text"
                            className='form-control mb-2'
                            placeholder='Ingresar Materia'
                            value={materia}
                            onChange={(e) => setMateria(e.target.value)} />

                        <textarea type="text"
                            className='form-control mb-2'
                            placeholder='Ingresar Descripcion'
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)} />
                        {
                            modoEditar ? (
                                <>
                                    <button button type="submit"
                                        className='btn btn-dark btn-block rounded-3 ingresar text-light form-control mb-2'>Editar</button>

                                    <button type="submit"
                                        className='btn btn-dark btn-block rounded-3 ingresar text-light form-control' onClick={() => cancelar()}>Cancelar</button>
                                </>
                            ) :
                                <button type="submit"
                                    className='btn btn-dark btn-block rounded-3 ingresar text-light form-control'>Agregar</button>
                        }
                    </form>
                </div>
            </div>
        </div >
    )
}

export default ListaClases