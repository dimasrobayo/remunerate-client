import React from 'react';
import { map, size } from 'lodash';
import { Link } from 'react-router-dom';
import Title from '../../../components/Title/Title';
import useRemunerationBookViewModel from './ViewModel';
import { Icon, Table, Dropdown, Pagination, FormField, Input, FormGroup, Form } from 'semantic-ui-react';

/**
 * Componente funcional que muestra y gestiona las categorías internas con paginación.
 */
export default function RemunerationBook() {
    // Extraer datos y funciones del ViewModel personalizado
    const { 
        profile, 
        pageSize, 
        searchTerm, 
        currentPage, 
        filteredRemunerationBook,
        paginatedRemunerationBook,
        setSearchTerm,
        setCurrentPage, 
        deleteRemunerationBook 
    } = useRemunerationBookViewModel();

    return (
        <div className="content-wrapper">
            <div className="content-header">
                {/* Título del componente */}
                <Title
                    title='LIBRO DE REMUNERACIONES'
                    component='HOME '
                    position='/ LIBRO DE REMUNERACIONES'
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
                                    <h3 className="card-title">Listado de Libro de Remuneraciones</h3>
                                    {/* Botones de acción */}
                                    <div className="btn-group option-general">
                                        {/* Botón para añadir nueva categoría */}
                                        <Link 
                                            type="button" 
                                            className="btn-general btn btn-success" 
                                            to="/remunerationbook/create" 
                                            placeholder="Agregando un nuevo registro"
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
                                    <div className="input-group mb-3" style={{"display": 'flex', "justifyContent": 'flex-end'}}>
                                        <Form>
                                            <FormGroup widths='equal'>
                                                <FormField
                                                    id='search-input'
                                                    control={Input}
                                                    label='BUSQUEDAR LIBRO DE REMUNERACIONES'
                                                    placeholder="BUSCAR..." 
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                />            
                                            </FormGroup>
                                        </Form>
                                    </div>
                                    {/* Tabla de categorías internas */}
                                    <Table style={{'borderTop': `0.2em solid ${profile.myColor}`}}>
                                        <Table.Header>
                                            {/* Encabezados de la tabla */}
                                            <Table.Row>
                                                <Table.HeaderCell>COD.</Table.HeaderCell>
                                                <Table.HeaderCell>GLOSA</Table.HeaderCell>
                                                <Table.HeaderCell>TIPO</Table.HeaderCell>
                                                <Table.HeaderCell>ACCIONES</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>

                                        <Table.Body>
                                            {/* Renderizar las filas de la tabla */}
                                            {size(paginatedRemunerationBook) > 0 
                                                ? map(paginatedRemunerationBook, (remunerationBook) => (
                                                    <Table.Row key={remunerationBook.id}>
                                                        {/* Celdas de cada fila */}
                                                        <Table.Cell>{remunerationBook.code}</Table.Cell>
                                                        <Table.Cell>
                                                            <Link to={{pathname:`/remunerationbook/update/${remunerationBook.id}`}}>
                                                                {remunerationBook.description}
                                                            </Link>
                                                        </Table.Cell>
                                                        <Table.Cell>{remunerationBook.typeLRE.description}</Table.Cell>
                                                        <Table.Cell>
                                                            {/* Menú desplegable de acciones */}
                                                            <Dropdown text='Acciones'>
                                                                <Dropdown.Menu>
                                                                    {/* Enlace para editar */}
                                                                    <Link to={{
                                                                        pathname:`/remunerationbook/update/${remunerationBook.id}`}} 
                                                                        className="dropdown-item"
                                                                    >
                                                                        <Icon name="pencil" /> Editar
                                                                    </Link>
                                                                    {/* Enlace para borrar */}
                                                                    <Link to=""
                                                                        onClick={(event) => deleteRemunerationBook(event, remunerationBook.id)}
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
                                        totalPages={Math.ceil(filteredRemunerationBook.length / pageSize)}
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