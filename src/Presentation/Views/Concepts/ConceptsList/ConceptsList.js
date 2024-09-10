import React from 'react';
import { map, size } from 'lodash';
import { Link } from 'react-router-dom';
import Title from '../../../components/Title/Title';
import useConceptsViewModel from './ViewModel';
import { Icon, Table, Dropdown, Pagination, FormField, Input, FormGroup, Form } from 'semantic-ui-react';

/**
 * Componente funcional que muestra y gestiona las categorías internas con paginación.
 */
export default function ConceptsList() {
    // Extraer datos y funciones del ViewModel personalizado
    const { 
        profile, 
        pageSize, 
        searchTerm, 
        currentPage, 
        filteredConcepts,
        paginatedConcepts,
        setSearchTerm,
        setCurrentPage, 
        deleteConcepts 
    } = useConceptsViewModel();
    console.log(paginatedConcepts);

    return (
        <div className="content-wrapper">
            <div className="content-header">
                {/* Título del componente */}
                <Title
                    title='CONCEPTOS'
                    component='HOME '
                    position='/ CONCEPTOS'
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
                                    <h3 className="card-title">Listado de Conceptos</h3>
                                    {/* Botones de acción */}
                                    <div className="btn-group option-general">
                                        {/* Botón para añadir nueva categoría */}
                                        <Link 
                                            type="button" 
                                            className="btn-general btn btn-success" 
                                            to="/concepts/create" 
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
                                                    label='BUSQUEDAR CONCEPTOS'
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
                                                <Table.HeaderCell>ID</Table.HeaderCell>
                                                <Table.HeaderCell>NOMBRE</Table.HeaderCell>
                                                <Table.HeaderCell>TIPO</Table.HeaderCell>
                                                <Table.HeaderCell>PREC.</Table.HeaderCell>
                                                <Table.HeaderCell>REB</Table.HeaderCell>
                                                <Table.HeaderCell>COMP</Table.HeaderCell>
                                                <Table.HeaderCell>HABILITAR</Table.HeaderCell>
                                                <Table.HeaderCell>ACCIONES</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>

                                        <Table.Body>
                                            {/* Renderizar las filas de la tabla */}
                                            {size(paginatedConcepts) > 0 
                                                ? map(paginatedConcepts, (concepts) => (
                                                    <Table.Row key={concepts.id}>
                                                        {/* Celdas de cada fila */}
                                                        <Table.Cell>{concepts.id}</Table.Cell>
                                                        <Table.Cell>
                                                            <Link to={{pathname:`/concepts/update/${concepts.id}`}}>
                                                                {concepts.name}
                                                            </Link>
                                                        </Table.Cell>
                                                        <Table.Cell>{concepts.typesConcept.name}</Table.Cell>
                                                        <Table.Cell>
                                                            {concepts.attributes.es_preconcepto === 1 ? 'SI' : 'NO'}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            {concepts.attributes.se_rebaja_por_dias_no_trabajados === 1 ? 'SI' : 'NO'}
                                                        </Table.Cell>
                                                        <Table.Cell>{concepts.comportamiento}</Table.Cell>
                                                        <Table.Cell>{concepts.status === 1 ? 'SI' : 'NO'}</Table.Cell>
                                                        <Table.Cell>
                                                            {/* Menú desplegable de acciones */}
                                                            <Dropdown text='Acciones'>
                                                                <Dropdown.Menu>
                                                                    {/* Enlace para editar */}
                                                                    <Link to={{
                                                                        pathname:`/concepts/update/${concepts.id}`}} 
                                                                        className="dropdown-item"
                                                                    >
                                                                        <Icon name="pencil" /> Editar
                                                                    </Link>
                                                                    {/* Enlace para borrar */}
                                                                    <Link to=""
                                                                        onClick={(event) => deleteConcepts(event, concepts.id)}
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
                                        totalPages={Math.ceil(filteredConcepts.length / pageSize)}
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