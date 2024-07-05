import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Title from '../../../components/Title/Title';
import FormRegister from './FormRegister';

export default function CreateInternalCategories() {
    const { id } = useParams(); // Para obtener el ID de la URL

    return (
        <div className="content-wrapper">
            <div className="content-header">
            <Title
                    title='CATEGORIAS INTERNAS'
                    component='HOME / CATEGORIAS INTERNAS '
                    position={id ? '/ EDITAR' : '/ NUEVO'}
                    path='/internalcategories'
                />
            </div>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">{id ? 'Editar Categoría' : 'Registrar Categoría'}</h3>
                                    <div className="btn-group option-general">
                                        <Link type="button" className="btn btn-secondary" to="/courses">
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
