import { useState } from 'react';
import TablaUsuarios from './TablaUsuarios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

export default function PanelAdministrador() {

    const [active, setActive] = useState('usuarios');

    return (
        <div>
            <header className='cabecera'>
                <h2>Juan Carlos</h2>
                <h1>Panel Administrador</h1>
                <FontAwesomeIcon icon={faSignOutAlt} />
            </header>

            <main className='contenedor'>
                <div className='gestionContainer'>
                    <button onClick={() => setActive('usuarios')}>Gestionar usuarios</button>
                    <button onClick={() => setActive('post')}>Gestionar posts</button>
                </div>

                <div className='line'></div>
                {active == 'usuarios' ?
                    <div className='line-active'></div> : <div className='line-active post'></div>}

                {active == 'usuarios' && (
                    <TablaUsuarios />
                )}
            </main>
        </div>
    )
}