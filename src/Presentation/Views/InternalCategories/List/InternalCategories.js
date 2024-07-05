import React, { useState } from 'react';
import { map, size, filter } from 'lodash';
import Title from '../../../components/Title/Title';
import { Link } from 'react-router-dom';
import { Icon, Table, Dropdown, Pagination } from 'semantic-ui-react';
import useInternalCategoriesViewModel from './ViewModel';

/**
 * Componente funcional que muestra y gestiona las categorías internas con paginación.
 */
export default function InternalCategories() {
    // Extraer datos y funciones del ViewModel personalizado
    const { internalCategories, currentPage, pageSize, setCurrentPage, profile, deleteInternalCategories } = useInternalCategoriesViewModel();
    const [searchTerm, setSearchTerm] = useState(''); // Estado para almacenar el término de búsqueda

    // Función para filtrar las categorías internas según el término de búsqueda
    const filteredInternalCategories = filter(internalCategories, category => {
        return category.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // Aplicar paginación a las categorías internas
    const paginatedInternalCategories = paginate(filteredInternalCategories, pageSize, currentPage);

    return (
        <div className="content-wrapper">
            <div className="content-header">
                {/* Título del componente */}
                <Title
                    title='CATEGORIAS INTERNAS'
                    component='HOME '
                    position='/ CATEGORIAS INTERNAS'
                    path='/'
                />
            </div>

            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    {/* Encabezado de la tarjeta */}
                                    <h3 className="card-title">Listado de Categorias Internas</h3>
                                    {/* Botones de acción */}
                                    <div className="btn-group option-general">
                                        {/* Botón para añadir nueva categoría */}
                                        <Link 
                                            type="button" 
                                            className="btn-general btn btn-success" 
                                            to="/internalcategories/create" 
                                            placeholder="Agregando un nuevo curso"
                                            style={{backgroundColor: profile.myColor, borderColor: profile.myColor}}
                                        >
                                            <Icon className="fas fa-plus" />
                                        </Link>

                                        {/* Botón para cerrar */}
                                        <Link type="button" className="btn-general btn btn-secondary" to="/">
                                            <Icon className="fas fa-window-close" />
                                        </Link>
                                    </div>
                                </div>

                                <div className="card-body">
                                    {/* Barra de búsqueda */}
                                    <div className="input-group mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Buscar..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                    {/* Tabla de categorías internas */}
                                    <Table style={{'borderTop': `0.2em solid ${profile.myColor}`}}>
                                        <Table.Header>
                                            {/* Encabezados de la tabla */}
                                            <Table.Row>
                                                <Table.HeaderCell>ID</Table.HeaderCell>
                                                <Table.HeaderCell>DESCRIPCIONES</Table.HeaderCell>
                                                <Table.HeaderCell>ACCIONES</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>

                                        <Table.Body>
                                            {/* Renderizar las filas de la tabla */}
                                            {size(paginatedInternalCategories) > 0 
                                                ? map(paginatedInternalCategories, (internalCategory) => (
                                                    <Table.Row key={internalCategory.id}>
                                                        {/* Celdas de cada fila */}
                                                        <Table.Cell>{internalCategory.id}</Table.Cell>
                                                        <Table.Cell>{internalCategory.name}</Table.Cell>
                                                        <Table.Cell>
                                                            {/* Menú desplegable de acciones */}
                                                            <Dropdown text='Acciones'>
                                                                <Dropdown.Menu>
                                                                    {/* Enlace para editar */}
                                                                    <Link to={{
                                                                        pathname:`/internalcategories/update/${internalCategory.id}`}} 
                                                                        className="dropdown-item"
                                                                    >
                                                                        <Icon name="pencil" /> Editar
                                                                    </Link>
                                                                    {/* Enlace para borrar */}
                                                                    <Link to=""
                                                                        onClick={(event) => deleteInternalCategories(event, internalCategory.id)}
                                                                        className="dropdown-item"
                                                                    >
                                                                        <Icon name="trash" /> Borrar
                                                                    </Link>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </Table.Cell>
                                                    </Table.Row>
                                                )) : (
                                                    // Mensaje cuando no hay registros para mostrar
                                                    <Table.Row>
                                                        <Table.Cell colSpan='3'>
                                                            LOS REGISTROS NO SE PUDIERON CARGAR O NO TIENE DATOS REGISTRADOS!
                                                        </Table.Cell>
                                                    </Table.Row>
                                                )
                                            }
                                        </Table.Body>
                                    </Table>

                                    {/* Componente de paginación */}
                                    <Pagination
                                        activePage={currentPage}
                                        onPageChange={(e, { activePage }) => setCurrentPage(activePage)}
                                        totalPages={Math.ceil(filteredInternalCategories.length / pageSize)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

/**
 * Función utilitaria para paginar un array.
 * @param {Array} array - El array que se desea paginar.
 * @param {number} pageSize - Tamaño de la página.
 * @param {number} pageNumber - Número de la página actual.
 * @returns {Array} - Subconjunto paginado del array original.
 */
const paginate = (array, pageSize, pageNumber) => {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
};
