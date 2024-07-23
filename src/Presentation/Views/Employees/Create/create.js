import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Title from '../../../components/Title/Title';
import FormRegister from './FormRegister';

export default function CreateCompany() {
    const { id } = useParams(); // Para obtener el ID de la URL

    return (
        <div className="content-wrapper">
            <div className="content-header">
            <Title
                    title='EMPLEADOS'
                    component='HOME / EMPLEADOS '
                    position={id ? '/ EDITAR' : '/ NUEVO'}
                    path='/employees'
                />
            </div>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">{id ? 'Editar Empleados' : 'Registrar Empleados'}</h3>
                                    <div className="btn-group option-general">
                                        <Link type="button" className="btn btn-secondary" to="/employees">
                                            <i className="fas fa-window-close"></i>
                                        </Link>
                                    </div>
                                </div>
                                <FormRegister />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
