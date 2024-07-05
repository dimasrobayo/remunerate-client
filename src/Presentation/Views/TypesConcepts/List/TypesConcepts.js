import React from 'react';
import { map, size } from 'lodash';
import Title from '../../../components/Title/Title';
import { Link } from 'react-router-dom';
import { Icon, Table, Dropdown, Pagination } from 'semantic-ui-react';
import useViewModel from './ViewModel';

export default function TypesConcepts() {
    const { typesConcepts, profile, currentPage, pageSize, setCurrentPage, deleteTypesConcepts } = useViewModel();
    console.log(typesConcepts);
    // Paginate the internal categories
    const paginatedTypesConcepts = paginate(typesConcepts, pageSize, currentPage);
    console.log(paginatedTypesConcepts);
    return (
        <div className="content-wrapper">
            <div className="content-header">
                <Title
                    title='TIPOS DE CONCEPTOS'
                    component='HOME '
                    position='/ TIPOS DE CONCEPTOS'
                    path='/'
                />
            </div>

            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Listado</h3>
                                    <div className="btn-group option-general">
                                        <Link 
                                            type="button" 
                                            className="btn-general btn btn-success" 
                                            to="/typesconcepts/create" 
                                            placeholder="Agregando un nuevo curso"
                                            style={{backgroundColor: profile.myColor, borderColor: profile.myColor}}
                                        >
                                            <Icon className="fas fa-plus" />
                                        </Link>

                                        <Link type="button" className="btn-general btn btn-secondary" to="/">
                                            <Icon className="fas fa-window-close" />
                                        </Link>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <Table style={{'borderTop': `0.2em solid ${profile.myColor}`}}>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>ID</Table.HeaderCell>
                                                <Table.HeaderCell>DESCRIPCIONES</Table.HeaderCell>
                                                <Table.HeaderCell>ACCIONES</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>

                                        <Table.Body>
                                            {size(paginatedTypesConcepts) > 0 
                                                ? map(paginatedTypesConcepts, (typeConcept, index) => (
                                                    <Table.Row key={typeConcept.id}>
                                                        <Table.Cell>{typeConcept.id}</Table.Cell>
                                                        <Table.Cell>{typeConcept.name}</Table.Cell>
                                                        <Table.Cell>
                                                            <Dropdown text='Acciones'>
                                                                <Dropdown.Menu>
                                                                    <Link to={{
                                                                        pathname:`/typesconcepts/update/${typeConcept.id}`}} 
                                                                        className="dropdown-item"
                                                                    >
                                                                        <Icon name="pencil" /> Editar
                                                                    </Link>
                                                                    <Link to=""
                                                                        onClick={(event) => deleteTypesConcepts(event, typeConcept.id)}
                                                                        className="dropdown-item"
                                                                    >
                                                                        <Icon name="trash" /> Borrar
                                                                    </Link>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </Table.Cell>
                                                    </Table.Row>
                                                )) : (
                                                    <Table.Row>
                                                        <Table.Cell colSpan='6'>
                                                            LOS REGISTROS NO SE PUDIERON CARGAR O NO TIENE DATOS REGISTRADOS!
                                                        </Table.Cell>
                                                    </Table.Row>
                                                )
                                            }
                                        </Table.Body>
                                    </Table>

                                    <Pagination
                                        activePage={currentPage}
                                        onPageChange={(e, { activePage }) => setCurrentPage(activePage)}
                                        totalPages={Math.ceil(typesConcepts.length / pageSize)}
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

const paginate = (array, pageSize, pageNumber) => {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
};