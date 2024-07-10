import React from 'react'
import useViewModel from '../ViewModel';
import { Form, Grid, GridColumn, Segment, Label, Divider } from 'semantic-ui-react';

export default function TabHealtInfo({ formik }) {
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
                                DIRECCIÓN REGIÓN Y CIUDAD
                            </Label>

                            <Divider hidden />

                            <Form.Group widths='equal'>
                                <Form.Input  
                                    id="street_name"
                                    name="street_name"
                                    label="NOMBRE DE CALLE" 
                                    type="input" 
                                    placeholder="INGRESAR NOMBRE DE LA CALLE" 
                                    value={formik.values.street_name}
                                    onChange={formik.handleChange}
                                    error={formik.errors.street_name}
                                />
                            
                                <Form.Input  
                                    id="street_number"
                                    name="street_number" 
                                    label="NUMERO DE CALLE"
                                    type="input" 
                                    placeholder="INGRESAR NUMERO DE CALLE" 
                                    value={formik.values.street_number}
                                    onChange={formik.handleChange}
                                    error={formik.errors.street_number}
                                />
                            
                                <Form.Input  
                                    id="postal_code"
                                    name="postal_code" 
                                    label="CODIGO POSTAL"
                                    type="input" 
                                    placeholder="INGRESAR CODIGO POSTAL" 
                                    value={formik.values.postal_code}
                                    onChange={formik.handleChange}
                                    error={formik.errors.postal_code}
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input  
                                    id="department_number"
                                    name="department_number"
                                    label="NUMERO DE DEPARTAMENTO" 
                                    type="input" 
                                    placeholder="INGRESAR NUMERO DE DEPARTAMENTO" 
                                    value={formik.values.department_number}
                                    onChange={formik.handleChange}
                                    error={formik.errors.department_number}
                                />
                            
                                <Form.Input  
                                    id="town"
                                    name="town" 
                                    label="VILLA"
                                    type="input" 
                                    placeholder="INGRESAR VILLA" 
                                    value={formik.values.town}
                                    onChange={formik.handleChange}
                                    error={formik.errors.town}
                                />
                            
                                <Form.Input  
                                    id="block"
                                    name="block" 
                                    label="BLOQUE"
                                    type="input" 
                                    placeholder="INGRESAR BLOQUE" 
                                    value={formik.values.block}
                                    onChange={formik.handleChange}
                                    error={formik.errors.block}
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input  
                                    id="sys_region_id"
                                    name="sys_region_id"
                                    label="REGION" 
                                    type="input" 
                                    placeholder="INGRESAR REGION" 
                                    value={formik.values.sys_region_id}
                                    onChange={formik.handleChange}
                                    error={formik.errors.sys_region_id}
                                />
                            
                                <Form.Input  
                                    id="sys_community_id"
                                    name="sys_community_id" 
                                    label="COMUNIDAD"
                                    type="input" 
                                    placeholder="INGRESAR COMUNIDAD" 
                                    value={formik.values.sys_community_id}
                                    onChange={formik.handleChange}
                                    error={formik.errors.sys_community_id}
                                />
                            </Form.Group>
                        </Segment>
                    </GridColumn>
                </Grid>
            </div>
        </div>
    )
}
