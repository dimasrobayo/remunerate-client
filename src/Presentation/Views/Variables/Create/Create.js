import React from 'react';
import { Link } from 'react-router-dom';
import Title from '../../../components/Title/Title';
import FormRegister from './FormRegister';

export default function CreateVariables() {
    return (
        <div className="content-wrapper">
            <div className="content-header">
                <Title
                    title='VARIABLES GENERALES'
                    component='HOME / VARIABLES GENERALES '
                    position={'/ DATA'}
                    path={`/home`}
                />
            </div>
            
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">{'Data Registro'}</h3>
                                    <div className="btn-group option-general">
                                        <Link type="button" className="btn btn-secondary" to={`/home`}>
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