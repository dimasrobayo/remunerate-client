import React, { useEffect } from 'react'
import useViewModel from '../ViewModel';
import { Form, Grid, GridColumn, Segment, Label, Divider } from 'semantic-ui-react';

export default function TabAddressInfo({ formik }) {
    const {
        profile,
        getRegions,
        getCommunes,
        getAllCommunes
    } = useViewModel();

    const regionOptions = Object.values(getRegions).map((option, index) => ({ key: option.value || index, ...option }));

    useEffect(() => {
        // Cargar las comunas para la región inicial
        /* if (formik.values.community.province.region_id) {
            getAllCommunes(formik.values.community.province.region_id);
        } */
    }, []);

    const addressInfo = formik.values.addressInformation && formik.values.addressInformation[0] ? formik.values.addressInformation[0] : {};

    return (
        <div className="card-body row">
            <div className="col-md-12">
                <Grid columns={1}>
                    <GridColumn>
                        <Segment raised>
                            <Label as='a' style={{ backgroundColor: profile.myColor, color: '#ffffff' }} ribbon>
                                DIRECCIÓN COMPLETA DEL EMPLEADO
                            </Label>

                            <Divider hidden />

                            <Form.Group widths='equal'>
                                <Form.Input  
                                    id="address"
                                    name="addressInformation[0].address"
                                    label="DIRECCION COMPLETA*" 
                                    type="input" 
                                    placeholder="INGRESAR DIRECCION" 
                                    value={addressInfo.address || ''}
                                    onChange={formik.handleChange}
                                    error={formik.errors.addressInformation?.[0]?.address}
                                />

                                <Form.Input  
                                    id="department_number"
                                    name="addressInformation[0].department_number"
                                    label="NUMERO DE DEPARTAMENTO*" 
                                    type="input" 
                                    placeholder="INGRESAR NUMERO DE DEPARTAMENTO" 
                                    value={addressInfo.department_number || ''}
                                    onChange={formik.handleChange}
                                    error={formik.errors.addressInformation?.[0]?.department_number}
                                />

                                <Form.Select 
                                    id="housing_type" 
                                    name="addressInformation[0].housing_type" 
                                    label="TIPO DE VIVIENDA*" 
                                    placeholder="SELECCIONAR TIPO DE VIVIENDA" 
                                    options={[
                                        { key: 'm', value: 'departamento', text: 'Departamento' },
                                        { key: 'f', value: 'local', text: 'Local' },
                                        { key: 'o', value: 'oficina', text: 'Oficina' }
                                    ]} 
                                    onChange={(e, { name, value }) => {
                                        formik.setFieldValue(name, value);
                                    }}
                                    value={addressInfo.housing_type || ''}
                                    error={formik.errors.addressInformation?.[0]?.housing_type}
                                />
                            
                                <Form.Input  
                                    id="codigo_postal"
                                    name="addressInformation[0].codigo_postal" 
                                    label="CODIGO POSTAL"
                                    type="input"
                                    placeholder="INGRESAR CODIGO POSTAL" 
                                    value={addressInfo.codigo_postal || ''}
                                    onChange={formik.handleChange}
                                    error={formik.errors.addressInformation?.[0]?.codigo_postal}
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input  
                                    id="block"
                                    name="addressInformation[0].block" 
                                    label="BLOQUE"
                                    type="input" 
                                    placeholder="INGRESAR BLOQUE" 
                                    value={addressInfo.block || ''}
                                    onChange={formik.handleChange}
                                    error={formik.errors.addressInformation?.[0]?.block}
                                />
                                
                                <Form.Select 
                                    id="sys_region_id" 
                                    name="sys_region_id" 
                                    label="REGION*" 
                                    placeholder="SELECCIONAR REGION" 
                                    options={regionOptions} 
                                    onChange={(e, { name, value }) => {
                                        getAllCommunes(value);
                                    }}
                                />

                                <Form.Select 
                                    id="sys_community_id" 
                                    name="addressInformation[0].sys_community_id" 
                                    label="COMUNA*"
                                    placeholder="SELECCIONAR COMUNA" 
                                    options={getCommunes.map((option, index) => ({ key: option.value || index, ...option }))} 
                                    onChange={(e, { name, value }) => formik.setFieldValue(name, value)}
                                    value={addressInfo.sys_community_id || ''}
                                    error={formik.errors.addressInformation?.[0]?.sys_community_id}
                                />
                            </Form.Group>
                        </Segment>
                    </GridColumn>
                </Grid>
            </div>
        </div>
    )
}
