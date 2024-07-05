import React from 'react';
import { map, size } from 'lodash';
import Title from '../../../components/Title/Title';
import { Link } from 'react-router-dom';
import { Icon, Table, Dropdown } from 'semantic-ui-react';
import useViewModel from './ViewModel';
import './List.scss';

export default function Institutions() {
    const { 
        profile, 
        deleteInstitutions, 
        handleInstitutionChange, 
        institutionOptions,
        selectedInstitutions,
        selectedInstitution
    } = useViewModel();

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <Title
                    title='INSTITUCIONES'
                    component='HOME '
                    position='/ INSTITUCIONES'
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
                                                pathname: "/institutions/create",
                                                state: { institutionOptions } // Pasar institutionOptions
                                            }}
                                            placeholder="Agregando un nuevo Registro"
                                            style={{ backgroundColor: profile.myColor, borderColor: profile.myColor }}
                                            disabled={!selectedInstitution}
                                        >
                                            <Icon className="fas fa-plus" />
                                        </Link>

                                        <Link type="button" className="btn-general btn btn-secondary" to="/">
                                            <Icon className="fas fa-window-close" />
                                        </Link>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="session-search">
                                        <Dropdown
                                            placeholder='Seleccione una institución'
                                            selection
                                            options={institutionOptions}
                                            onChange={handleInstitutionChange}
                                        />
                                    </div>

                                    <Table style={{ 'borderTop': `0.2em solid ${profile.myColor}` }}>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>ID</Table.HeaderCell>
                                                <Table.HeaderCell>RUT</Table.HeaderCell>
                                                <Table.HeaderCell>DESCRIPCIONES</Table.HeaderCell>
                                                <Table.HeaderCell>VALOR</Table.HeaderCell>
                                                <Table.HeaderCell>ACCIONES</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>

                                        <Table.Body>
                                            {size(selectedInstitutions) > 0 ? (
                                                selectedInstitutions.filter(institution => institution.deleted_at === null).length > 0 ? (
                                                map(
                                                    selectedInstitutions.filter(institution => institution.deleted_at === null), 
                                                    (institution) => (
                                                        <Table.Row key={institution.id}>
                                                            <Table.Cell>{institution.id}</Table.Cell>
                                                            <Table.Cell>{institution.rut_institution}</Table.Cell>
                                                            <Table.Cell>{institution.name}</Table.Cell>
                                                            <Table.Cell>{institution.value}</Table.Cell>
                                                            <Table.Cell>
                                                                <Dropdown text='Acciones'>
                                                                    <Dropdown.Menu>
                                                                        <Link to={{
                                                                            pathname: `/institutions/update/${institution.id}`
                                                                        }} className="dropdown-item">
                                                                            <Icon name="pencil" /> Editar
                                                                        </Link>
                                                                        <Link to=""
                                                                            onClick={(event) => deleteInstitutions(event, institution.id)}
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
                                                        SELECCIONA UNA INSTITUCION PARA DESPLEGAR LOS REGISTROS
                                                    </Table.Cell>
                                                </Table.Row>
                                              )
                                            ) : (
                                                <Table.Row>
                                                    <Table.Cell colSpan="5">
                                                        SELECCIONA UNA INSTITUCION PARA DESPLEGAR LOS REGISTROS
                                                    </Table.Cell>
                                                </Table.Row>
                                            )}
                                        </Table.Body>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}