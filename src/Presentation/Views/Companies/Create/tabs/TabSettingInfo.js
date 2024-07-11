import React from 'react'
import useViewModel from '../ViewModel';
import { Form, Grid, GridColumn, Segment, Label, Divider } from 'semantic-ui-react';

export default function TabSettingInfo({ formik }) {
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
                                AVANZADOS
                            </Label>

                            <Divider hidden />

                            <Form.Group widths='equal'>
                                <Form.Input  
                                    id="cutting_day"
                                    name="cutting_day"
                                    label="DIA DE CORTE" 
                                    type="input" 
                                    placeholder="INGRESAR DIA DE CORTE" 
                                    value={formik.values.cutting_day}
                                    onChange={formik.handleChange}
                                    error={formik.errors.cutting_day}
                                />
                            
                                <Form.Input  
                                    id="grouping_use"
                                    name="grouping_use" 
                                    label="AGRUPACION A UTILIZAR"
                                    type="input" 
                                    placeholder="INGRESAR AGRUPACION A UTILIZAR" 
                                    value={formik.values.grouping_use}
                                    onChange={formik.handleChange}
                                    error={formik.errors.grouping_use}
                                />
                            
                                <Form.Select
                                    id="is_contracts_temporary_services"
                                    name="is_contracts_temporary_services"
                                    label="CONTRATO POR SERVICIOS TRANSITORIOS"
                                    options={[
                                        { key: 'no', value: false, text: 'No' },
                                        { key: 'si', value: true, text: 'Sí' }
                                    ]}
                                    placeholder="SELECCIONAR"
                                    value={formik.values.is_contracts_temporary_services}
                                    onChange={(e, { value }) => formik.setFieldValue('is_contracts_temporary_services', value)}
                                    error={formik.errors.is_contracts_temporary_services}
                                />
                            </Form.Group>
                        </Segment>
                    </GridColumn>
                </Grid>

                <Grid columns={1}>
                    <GridColumn>
                        <Segment raised>
                            <Label as='a' style={{ backgroundColor: profile.myColor, color: '#ffffff' }} ribbon>
                                AUSENTISMO
                            </Label>

                            <Divider hidden />

                            <Form.Group widths='equal'>
                                <Form.Input  
                                    id="date_use_previred"
                                    name="date_use_previred" 
                                    label="FECHA A USER PREVIRED"
                                    type="input" 
                                    placeholder="INGRESAR FECHA A USER PREVIRED" 
                                    value={formik.values.date_use_previred}
                                    onChange={formik.handleChange}
                                    error={formik.errors.date_use_previred}
                                />

                                <Form.Select
                                    id="use_cutoff_date_for_application_date"
                                    name="use_cutoff_date_for_application_date"
                                    label="USAR FECHA DE CORTE PARA FECHA DE APLICAION"
                                    options={[
                                        { key: 'no', value: false, text: 'No' },
                                        { key: 'si', value: true, text: 'Sí' }
                                    ]}
                                    placeholder="SELECCIONAR"
                                    value={formik.values.use_cutoff_date_for_application_date}
                                    onChange={(e, { value }) => formik.setFieldValue('use_cutoff_date_for_application_date', value)}
                                    error={formik.errors.use_cutoff_date_for_application_date}
                                />
                            </Form.Group>
                        </Segment>
                    </GridColumn>
                </Grid>  

                <Grid columns={1}>
                    <GridColumn>
                        <Segment raised>
                            <Label as='a' style={{ backgroundColor: profile.myColor, color: '#ffffff' }} ribbon>
                                AMONESTACIONES Y CONGRATULACIONES
                            </Label> 

                            <Divider hidden />

                            <Form.Group widths='equal'>
                                <Form.Select
                                    id="use_cutoff_date_for_disciplinary_events"
                                    name="use_cutoff_date_for_disciplinary_events"
                                    label="USAR FECHA DE CORTE PARA FECHA DE APLICAION"
                                    options={[
                                        { key: 'no', value: false, text: 'No' },
                                        { key: 'si', value: true, text: 'Sí' }
                                    ]}
                                    placeholder="SELECCIONAR"
                                    value={formik.values.use_cutoff_date_for_disciplinary_events}
                                    onChange={(e, { value }) => formik.setFieldValue('use_cutoff_date_for_disciplinary_events', value)}
                                    error={formik.errors.use_cutoff_date_for_disciplinary_events}
                                />
                            </Form.Group>
                        </Segment>
                    </GridColumn>
                </Grid> 

                <Grid columns={1}>
                    <GridColumn>
                        <Segment raised>
                            <Label as='a' style={{ backgroundColor: profile.myColor, color: '#ffffff' }} ribbon>
                                PERMISOS ADMINISTRATIVOS
                            </Label> 

                            <Divider hidden />

                            <Form.Group widths='equal'>
                                <Form.Input  
                                    id="vacation_days_remaining"
                                    name="vacation_days_remaining" 
                                    label="CANTIDAD DE DIAS DE VACACIONES RESTANTES"
                                    type="number" 
                                    placeholder="INGRESAR CANTIDAD DE DIAS DE VACACIONES RESTANTES" 
                                    value={formik.values.vacation_days_remaining}
                                    onChange={formik.handleChange}
                                    error={formik.errors.vacation_days_remaining}
                                />

                                <Form.Select
                                    id="consider_proportional_vacation_days"
                                    name="consider_proportional_vacation_days"
                                    label="CONSIDERAR DIAS PROPORCIONALES DE VACACIONES"
                                    options={[
                                        { key: 'no', value: false, text: 'No' },
                                        { key: 'si', value: true, text: 'Sí' }
                                    ]}
                                    placeholder="SELECCIONAR"
                                    value={formik.values.consider_proportional_vacation_days}
                                    onChange={(e, { value }) => formik.setFieldValue('consider_proportional_vacation_days', value)}
                                    error={formik.errors.consider_proportional_vacation_days}
                                />
                            </Form.Group>
                        </Segment>
                    </GridColumn>
                </Grid> 
            </div>
        </div>
    )
}
