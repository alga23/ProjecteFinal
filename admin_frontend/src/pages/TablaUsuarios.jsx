import { useEffect, useState } from "react"
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import profile from '../assets/default_profile_picture.png';

export default function TablaUsuarios() {

    const [data, setData] = useState([...Array(40).fill(0)]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [showButton, setShowButton] = useState(false);

    const [currentPage, setCurrentPage] = useState(0);
    const itemPerPage = 5;

    const nextPage = ({ selected }) => {
        setCurrentPage(selected);
    }

    const toggleCheckbox = (index) => {
        const selectedIndex = selectedItems.indexOf(index);
        console.log(selectedIndex);
        
        if (selectedIndex === -1) {
            setSelectedItems([...selectedItems, index]);
        } else {
            setSelectedItems(selectedItems.filter(i => i !== index));
        }
    }
    
    return (
        <section className='interaccion-table'>
            <header className='cabecera-interaccion'>
                <div className='buscador'>
                    <input type='search' name='buscador' placeholder='Buscar por el nombre' />
                </div>
                <div className="button-table">
                {selectedItems.length >= 2 && (
                    <button className='eliminar-icon'><FontAwesomeIcon icon={faMinus} /> Eliminar usuario</button>
                )}
                <button className='añadir-icon'><FontAwesomeIcon icon={faPlus} /> Añadir usuario</button>
                </div>

            </header>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Username</th>
                        <th>Biografia</th>
                        <th>Rol</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {data.slice(currentPage * itemPerPage, (currentPage + 1) * itemPerPage).map((item, index) => (
                        <tr key={index}>
                            <td className="name">
                                <input type="checkbox" name="select" onClick={() => toggleCheckbox(index)} /> 
                                <img src={profile} alt="Imagen de perfil del administrador" />
                                Juanito Perez
                            </td>
                            <td>_Juanito_WW</td>
                            <td className="bio">Me llamo juanito</td>
                            <td>User</td>
                            <td className="icons">

                                <button><FontAwesomeIcon icon={faPencil} /></button>
                                <button><FontAwesomeIcon icon={faTrash} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <footer className="paginacion">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="Siguiente"
                    onPageChange={nextPage}
                    pageCount={Math.ceil(data.length / itemPerPage)}
                    pageRangeDisplayed={3}
                    previousLabel="Anterior"
                    activeClassName={"page-active"}
                    renderOnZeroPageCount={null} />
            </footer>
        </section>
    )
}