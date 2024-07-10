// TabDefinitionInfo.js
import React from 'react';
import useViewModel from '../ViewModel';
import { Form, Grid, GridColumn, Segment, Label, Divider } from 'semantic-ui-react';

export default function TabDefinitionInfo({ formik }) {
    const {
        profile
    } = useViewModel();

    return (
        <div className="card-body row">
            <div className="col-md-12">
                <Grid columns={1}>
                    <GridColumn>
                        <Segment raised>
                            <Label as='a' style={{ backgroundColor: profile.myColor, color: '#ffffff' }} ribbon>
                                DATOS DE EMPRESA
                            </Label>

                            <Divider hidden />

                            <Form.Group widths='equal'>
                                <Form.Input  
                                    id="national_identifier"
                                    name="national_identifier"
                                    label="IDENTIFICADOR NACIONAL" 
                                    type="input" 
                                    placeholder="INGRESAR IDENTIFICADOR NACIONAL" 
                                    value={formik.values.national_identifier}
                                    onChange={formik.handleChange}
                                    error={formik.errors.national_identifier}
                                />
                            
                                <Form.Input  
                                    id="business_name"
                                    name="business_name" 
                                    label="RAZON SOCIAL"
                                    type="input" 
                                    placeholder="INGRESAR RAZON SOCIAL" 
                                    value={formik.values.business_name}
                                    onChange={formik.handleChange}
                                    error={formik.errors.business_name}
                                />
                            
                                <Form.Input  
                                    id="email_human_resources"
                                    name="email_human_resources" 
                                    label="EMAIL DE RECURSOS HUMANOS"
                                    type="input" 
                                    placeholder="INGRESAR EMAIL DE RECURSOS HUMANOS" 
                                    value={formik.values.email_human_resources}
                                    onChange={formik.handleChange}
                                    error={formik.errors.email_human_resources}
                                />
                            </Form.Group>
                        </Segment>
                    </GridColumn>
                </Grid>

                <Grid columns={1}>
                    <GridColumn>
                        <Segment raised>
                            <Label as='a' style={{ backgroundColor: profile.myColor, color: '#ffffff' }} ribbon>
                                DATOS DEL REPRESENTANTE LEGAL
                            </Label>

                            <Divider hidden />

                            <Form.Group widths='equal'>
                                <Form.Input  
                                    id="legal_representative_name"
                                    name="legal_representative_name" 
                                    label="NOMBRE COMPLETO"
                                    type="input" 
                                    placeholder="INGRESAR NOMBRE COMPLETO" 
                                    value={formik.values.legal_representative_name}
                                    onChange={formik.handleChange}
                                    error={formik.errors.legal_representative_name}
                                />

                                <Form.Input  
                                    id="national_id_legal_representative"
                                    name="national_id_legal_representative" 
                                    label="IDENTIFICADOR NACIONAL"
                                    type="input" 
                                    placeholder="INGRESAR ID. NACIONAL" 
                                    value={formik.values.national_id_legal_representative}
                                    onChange={formik.handleChange}
                                    error={formik.errors.national_id_legal_representative}
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input  
                                    id="email_legal_representative"
                                    name="email_legal_representative" 
                                    label="EMAIL"
                                    type="email" 
                                    placeholder="INGRESAR EMAIL" 
                                    value={formik.values.email_legal_representative}
                                    onChange={formik.handleChange}
                                    error={formik.errors.email_legal_representative}
                                />

                                <Form.Input  
                                    id="phone_legal_representative"
                                    name="phone_legal_representative" 
                                    label="TELEFONO"
                                    type="input" 
                                    placeholder="INGRESAR TELEFONO" 
                                    value={formik.values.phone_legal_representative}
                                    onChange={formik.handleChange}
                                    error={formik.errors.phone_legal_representative}
                                />
                            </Form.Group>
                        </Segment>
                    </GridColumn>
                </Grid>  

                <Grid columns={1}>
                    <GridColumn>
                        <Segment raised>
                            <Label as='a' style={{ backgroundColor: profile.myColor, color: '#ffffff' }} ribbon>
                                DATOS DE PRESTACIONES
                            </Label> 

                            <Divider hidden />

                            <Form.Group widths='equal'>
                                <Form.Input  
                                    id="sys_institutions_id_ccaf"
                                    name="sys_institutions_id_ccaf" 
                                    label="CAJA DE COMPENSACION"
                                    type="input" 
                                    placeholder="INGRESAR CAJA DE COMPENSACION" 
                                    value={formik.values.sys_institutions_id_ccaf}
                                    onChange={formik.handleChange}
                                    error={formik.errors.sys_institutions_id_ccaf}
                                />

                                <Form.Input  
                                    id="sys_institutions_id_mutual"
                                    name="sys_institutions_id_mutual" 
                                    label="MUTUAL"
                                    type="input" 
                                    placeholder="INGRESAR MUTUAL" 
                                    value={formik.values.sys_institutions_id_mutual}
                                    onChange={formik.handleChange}
                                    error={formik.errors.sys_institutions_id_mutual}
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input  
                                    id="actividad_economica"
                                    name="actividad_economica" 
                                    label="ACTIVIDAD ECONOMICA"
                                    type="input" 
                                    placeholder="INGRESAR ACTIVIDAD ECONOMICA" 
                                    value={formik.values.actividad_economica}
                                    onChange={formik.handleChange}
                                    error={formik.errors.actividad_economica}
                                />

                                <Form.Input  
                                    id="codigo_actividad_economina"
                                    name="codigo_actividad_economina" 
                                    label="CODIGO ACTIVIDAD ECONOMICA"
                                    type="input" 
                                    placeholder="INGRESAR CODIGO DE ACTIVIDAD ECONOMICA" 
                                    value={formik.values.codigo_actividad_economina}
                                    onChange={formik.handleChange}
                                    error={formik.errors.codigo_actividad_economina}
                                />
                            </Form.Group>

                            <Divider hidden />

                            <Form.Input  
                                id="cotizacion_mutual"
                                name="cotizacion_mutual" 
                                label="COTIZACION"
                                type="input" 
                                placeholder="INGRESAR COTIZACION" 
                                value={formik.values.cotizacion_mutual}
                                onChange={formik.handleChange}
                                error={formik.errors.cotizacion_mutual}
                            />
                        </Segment>
                    </GridColumn>
                </Grid> 
            </div>
        </div>
    )
}
