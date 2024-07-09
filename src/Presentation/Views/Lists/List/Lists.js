import React from 'react';
import { map, size } from 'lodash';
import Title from '../../../components/Title/Title';
import { Link } from 'react-router-dom';
import { Icon, Table, Dropdown, Pagination, Input, Form, FormGroup, FormField } from 'semantic-ui-react';
import useViewModel from './ViewModel';
import './List.scss';

export default function Lists() {
    const { 
        profile,
        pageSize,
        searchTerm,
        currentPage,
        listsOptions,
        selectedList,
        filteredLists,
        paginatedLists,
        setSearchTerm,
        setCurrentPage,
        deleteLists,
        handleListsChange 
    } = useViewModel();

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <Title
                    title='LISTAS'
                    component='HOME '
                    position='/ LISTAS'
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
                                            to={{
                                                pathname: "/lists/create",
                                                state: { listsOptions } // Pasar institutionOptions
                                            }}
                                            placeholder="Agregando un nuevo Registro"
                                            style={{ backgroundColor: profile.myColor, borderColor: profile.myColor }}
                                            disabled={!selectedList}
                                        >
                                            <Icon className="fas fa-plus" />
                                        </Link>

                                        <Link type="button" className="btn-general btn btn-secondary" to="/">
                                            <Icon className="fas fa-window-close" />
                                        </Link>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="input-group mb-3" style={{"display": 'flex', "justify-content": 'flex-end'}}>
                                        <Dropdown
                                            placeholder='Seleccione una institución'
                                            selection
                                            options={listsOptions}
                                            onChange={handleListsChange}
                                            style={{"margin-right": '10px', 'margin-bottom': '12px'}}
                                        />

                                        <Form>
                                            <FormGroup widths='equal'>
                                                <FormField
                                                    id='search-input'
                                                    control={Input}
                                                    placeholder="BUSCAR..." 
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                />            
                                            </FormGroup>
                                        </Form>
                                    </div>

                                    <Table style={{ 'borderTop': `0.2em solid ${profile.myColor}` }}>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>ID</Table.HeaderCell>
                                                <Table.HeaderCell>ITEM</Table.HeaderCell>
                                                <Table.HeaderCell>DESCRIPCIONES</Table.HeaderCell>
                                                <Table.HeaderCell>VALOR A</Table.HeaderCell>
                                                <Table.HeaderCell>VALOR B</Table.HeaderCell>
                                                <Table.HeaderCell>VALOR C</Table.HeaderCell>
                                                <Table.HeaderCell>ACCIONES</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>

                                        <Table.Body>
                                            {size(paginatedLists) > 0 ? (
                                                paginatedLists.filter(list => list.deleted_at === null).length > 0 ? (
                                                map(
                                                    paginatedLists.filter(list => list.deleted_at === null), 
                                                    (list) => (
                                                        <Table.Row key={list.id}>
                                                            <Table.Cell>{list.id}</Table.Cell>
                                                            <Table.Cell>{list.item}</Table.Cell>
                                                            <Table.Cell>{list.name}</Table.Cell>
                                                            <Table.Cell>{list.value_a}</Table.Cell>
                                                            <Table.Cell>{list.value_b}</Table.Cell>
                                                            <Table.Cell>{list.value_c}</Table.Cell>
                                                            <Table.Cell>
                                                                <Dropdown text='Acciones'>
                                                                    <Dropdown.Menu>
                                                                        <Link to={{
                                                                            pathname: `/lists/update/${list.id}`
                                                                        }} className="dropdown-item">
                                                                            <Icon name="pencil" /> Editar
                                                                        </Link>
                                                                        <Link to=""
                                                                            onClick={(event) => deleteLists(event, list.id)}
                                                                            className="dropdown-item"
                                                                        >
                                                                            <Icon name="trash" /> Borrar
                                                                        </Link>
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                            </Table.Cell>
                                                        </Table.Row>
                                                    )
                                                )
                                            ) : (
                                                <Table.Row>
                                                    <Table.Cell colSpan="5">
                                                        SELECCIONA UNA LISTA PARA DESPLEGAR LOS REGISTROS
                                                    </Table.Cell>
                                                </Table.Row>
                                              )
                                            ) : (
                                                <Table.Row>
                                                    <Table.Cell colSpan="5">
                                                        SELECCIONA UNA LISTA PARA DESPLEGAR LOS REGISTROS
                                                    </Table.Cell>
                                                </Table.Row>
                                            )}
                                        </Table.Body>
                                    </Table>

                                    <Pagination
                                        activePage={currentPage}
                                        onPageChange={(e, { activePage }) => setCurrentPage(activePage)}
                                        totalPages={Math.ceil(filteredLists.length / pageSize)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
