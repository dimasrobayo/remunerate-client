import React from 'react';
import { map, size } from 'lodash';
import { Link, useParams } from 'react-router-dom';
import Title from '../../../components/Title/Title';
import ContractsViewModel from './ViewModel';
import { Icon, Table, Dropdown, Pagination, FormField, Input, FormGroup, Form, Divider } from 'semantic-ui-react';

/**
 * Componente funcional que muestra y gestiona las categorías internas con paginación.
 */
export default function Contracts() {
    const { id } = useParams(); // Para obtener el ID de la URL

    // Extraer datos y funciones del ViewModel personalizado
    const { 
        profile,
        pageSize,
        searchTerm, 
        currentPage,
        filteredContracts,
        paginatedContracts,
        setSearchTerm,
        setCurrentPage,
        deletedContracts
    } = ContractsViewModel();

    return (
        <div className="content-wrapper">
            <div className="content-header">
                {/* Título del componente */}
                <Title
                    title='CONTRATOS'
                    component='HOME / EMPLEADOS '
                    position='/ CONTRATOS'
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
                                    <h3 className="card-title">Listado de Contratos</h3>
                                    {/* Botones de acción */}
                                    <div className="btn-group option-general">
                                        {/* Botón para añadir nueva compania */}
                                        {size(paginatedContracts) === 0 && (

                                            <Link 
                                                type="button" 
                                                className="btn-general btn btn-success" 
                                                to={`/contracts/create/${id}`} 
                                                placeholder="Agregando un nuevo registro"
                                                style={{backgroundColor: profile.myColor, borderColor: profile.myColor}}
                                            >
                                                <Icon className="fas fa-plus" />
                                            </Link>
                                        )}

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
                                                    label='BUSQUEDA CONTRATO'
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
                                                <Table.HeaderCell style={{ textAlign: 'center' }}>ESTADO</Table.HeaderCell>
                                                <Table.HeaderCell style={{ textAlign: 'center' }}>NOMBRE</Table.HeaderCell>
                                                <Table.HeaderCell style={{ textAlign: 'center' }}>FECHA INICIO</Table.HeaderCell>
                                                <Table.HeaderCell style={{ textAlign: 'center' }}>EMPRESA</Table.HeaderCell>
                                                <Table.HeaderCell style={{ textAlign: 'center' }}>TIPO</Table.HeaderCell>
                                                <Table.HeaderCell>ACIONES</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>

                                        <Table.Body>
                                            {/* Renderizar las filas de la tabla */}
                                            {size(paginatedContracts) > 0 
                                                ? map(paginatedContracts, (contract) => (
                                                    <Table.Row key={contract.id}>
                                                        {/* Celdas de cada fila */}
                                                        <Table.Cell style={{ textAlign: 'center' }}>
                                                            { contract.id }
                                                        </Table.Cell>

                                                        <Table.Cell style={{ textAlign: 'center' }}>
                                                            {contract.status === 1 ? 'ACTIVO' : 'INACTIVO'}
                                                        </Table.Cell>
                                                        
                                                        <Table.Cell>
                                                            <Link to={{pathname:`/contracts/update/${contract.user_personal_info_id}`}}>
                                                                { contract.nombre_contrato }
                                                            </Link>
                                                        </Table.Cell>
                                                        
                                                        <Table.Cell style={{ textAlign: 'center' }}>
                                                            {new Date(contract.fecha_inicio).toLocaleDateString('es-ES', {
                                                                day: '2-digit',
                                                                month: '2-digit',
                                                                year: 'numeric'
                                                            })}
                                                        </Table.Cell>
                                                        
                                                        <Table.Cell style={{ textAlign: 'center' }}>
                                                            { contract.userPersonalInfo.paymentMethod.company.business_name }
                                                        </Table.Cell>
                                                        
                                                        <Table.Cell style={{ textAlign: 'center' }}>{ contract.tipo_contrato }</Table.Cell>

                                                        <Table.Cell>
                                                            {/* Menú desplegable de acciones */}
                                                            <Dropdown text='Acciones'>
                                                                <Dropdown.Menu>
                                                                    {/* Enlace para editar */}
                                                                    <Link to={{
                                                                        pathname:`/contracts/update/${contract.user_personal_info_id}`}} 
                                                                        className="dropdown-item"
                                                                    >
                                                                        <Icon name="pencil" /> Editar
                                                                    </Link>

                                                                    <Divider />
                                                                    
                                                                    {/* Enlace para borrar */}
                                                                    <Link to=""
                                                                        onClick={(event) => deletedContracts(event, contract.user_personal_info_id)}
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
                                        totalPages={Math.ceil(filteredContracts.length / pageSize)}
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