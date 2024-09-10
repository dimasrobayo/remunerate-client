import React from 'react';
import { map, size } from 'lodash';
import { Link, useParams } from 'react-router-dom';
import Title from '../../../components/Title/Title';
import PayrollTemplateViewModel from './ViewModel';
import { formatCurrency } from '../../../../utils/global'
import { Icon, Table, Dropdown, Pagination, FormField, Input, FormGroup, Form, Divider } from 'semantic-ui-react';

/**
 * Componente funcional que muestra y gestiona las categorías internas con paginación.
 */
export default function List() {
    const { id } = useParams(); // Para obtener el ID de la URL

    // Extraer datos y funciones del ViewModel personalizado
    const { 
        profile,
        pageSize,
        searchTerm, 
        currentPage,
        plantillaOwner,
        filteredResults,
        paginatedResults,
        setSearchTerm,
        setCurrentPage,
        deletedConcepts
    } = PayrollTemplateViewModel();

    return (
        <div className="content-wrapper">
            <div className="content-header">
                {/* Título del componente */}
                <Title
                    title={`PLANTILLA`}
                    component='HOME / EMPLEADOS '
                    position='/ PLANTILLA'
                    path='/employees'
                />
            </div>

            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    {/* Encabezado de la tarjeta */}
                                    <h3 className="card-title">{plantillaOwner}</h3>
                                    {/* Botones de acción */}
                                    <div className="btn-group option-general">
                                        {/* Botón para añadir nueva compania */}
                                            <Link 
                                                type="button" 
                                                className="btn-general btn btn-success" 
                                                to={{
                                                    pathname: `/PayrollTemplate/create/${id}`
                                                }}
                                                placeholder="Agregando un nuevo registro"
                                                style={{backgroundColor: profile.myColor, borderColor: profile.myColor}}
                                            >
                                                <Icon className="fas fa-plus" />
                                            </Link>

                                            <Link 
                                                type="button" 
                                                className="btn-general btn btn-success" 
                                                to=''
                                                placeholder="Agregando un nuevo registro"
                                                style={{backgroundColor: profile.myColor, borderColor: profile.myColor}}
                                            >
                                                <Icon className="calculator" />
                                            </Link>

                                        {/* Botón para cerrar */}
                                        <Link type="button" className="btn-general btn btn-secondary" to="/employees">
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
                                                    label='BUSQUEDA CONCEPTO'
                                                    icon='search'
                                                    iconPosition='left'
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
                                                <Table.HeaderCell style={{ textAlign: 'center' }}>Nro.</Table.HeaderCell>
                                                <Table.HeaderCell style={{ textAlign: 'center' }}>NOMBRE</Table.HeaderCell>
                                                <Table.HeaderCell style={{ textAlign: 'center' }}>CATEGORIA</Table.HeaderCell>
                                                <Table.HeaderCell style={{ textAlign: 'center' }}>VALOR</Table.HeaderCell>
                                                <Table.HeaderCell style={{ textAlign: 'center' }}>FORMULA</Table.HeaderCell>
                                                <Table.HeaderCell style={{ textAlign: 'center' }}>ESTADO</Table.HeaderCell>
                                                <Table.HeaderCell>ACIONES</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>

                                        <Table.Body>
                                            {/* Renderizar las filas de la tabla */}
                                            {size(paginatedResults) > 0 
                                                ? map(paginatedResults, (concept) => (
                                                    <Table.Row key={concept.id}>
                                                        {/* Celdas de cada fila */}
                                                        <Table.Cell style={{ textAlign: 'center' }}>
                                                            { concept.id }
                                                        </Table.Cell>

                                                        <Table.Cell>
                                                            <Link to={{
                                                                pathname:`/payrolltemplate/update/${concept.user_personal_info_id}/${concept.sys_concept_id}`
                                                            }}
                                                            >
                                                                { concept.sysConcept.remunerationBook.code + ' - ' + concept.sysConcept.name }
                                                            </Link>
                                                        </Table.Cell>
                                                        
                                                        <Table.Cell style={{ textAlign: 'center' }}>
                                                            { 
                                                                concept.sysConcept.remunerationBook.typeLRE.description.toUpperCase()
                                                            }
                                                        </Table.Cell>
                                                        
                                                        <Table.Cell style={{ textAlign: 'center' }}>{ formatCurrency(concept.amount) }</Table.Cell>

                                                        <Table.Cell style={{ textAlign: 'center' }}>
                                                            {
                                                                concept.sysConcept.formula ?
                                                                <Icon 
                                                                    name="check circle outline" 
                                                                    color="green" 
                                                                    title={concept.sysConcept.formula} 
                                                                    size="large"
                                                                /> : ''

                                                            }
                                                        </Table.Cell>

                                                        <Table.Cell style={{ textAlign: 'center' }}>
                                                            {concept.sysConcept.status === 1 ? 'ACTIVO' : 'INACTIVO'}
                                                        </Table.Cell>
                                                        

                                                        <Table.Cell>
                                                            {/* Menú desplegable de acciones */}
                                                            <Dropdown text='Acciones'>
                                                                <Dropdown.Menu>
                                                                    {/* Enlace para editar */}
                                                                    <Link 
                                                                        to={{
                                                                            pathname:`/payrolltemplate/update/${concept.user_personal_info_id}/${concept.sys_concept_id}`
                                                                        }} 
                                                                        className="dropdown-item"
                                                                    >
                                                                        <Icon name="pencil" /> Editar
                                                                    </Link>

                                                                    <Divider />
                                                                    
                                                                    {/* Enlace para borrar */}
                                                                    <Link to=""
                                                                        onClick={(event) => deletedConcepts(event, concept.user_personal_info_id)}
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
                                        totalPages={Math.ceil(filteredResults.length / pageSize)}
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