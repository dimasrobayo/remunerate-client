// TabProfileInfo.js
import React from 'react';
import useViewModel from '../ViewModel';
import { Form, Grid, GridColumn, Segment, Label, Divider } from 'semantic-ui-react';

export default function TabProfileInfo({ formik }) {
    const {
        profile,
        getRelation,
        getStudyLevel,
        driverLicense,
        getProfession,
        occupationalLevel,
    } = useViewModel();
    
    const studyLevelOptions = Object.values(getStudyLevel).map((option, index) => ({ key: option.value || index, ...option }));
    const driverLicenseOptions = Object.values(driverLicense).map((option, index) => ({ key: option.value || index, ...option }));
    const professionOptions = Object.values(getProfession).map((option, index) => ({ key: option.value || index, ...option }));
    const occupationalLevelOptions = Object.values(occupationalLevel).map((option, index) => ({ key: option.value || index, ...option }));
    const relationOptions = Object.values(getRelation).map((option, index) => ({ key: option.value || index, ...option }));

    return (
        <div className="card-body row">
            <div className="col-md-12">
                <Grid columns={1}>
                    <GridColumn>
                        <Segment raised>
                            <Label as='a' style={{ backgroundColor: profile.myColor, color: '#ffffff' }} ribbon>
                                DATOS DE PRINCIPALES
                            </Label>

                            <Divider hidden />

                            <Form.Group>
                                <Form.Select 
                                    id="type_document" 
                                    name="type_document" 
                                    label="TIPO DOCUMENTO*" 
                                    placeholder="SELECCIONAR TIPO DOCUMENTO" 
                                    options={[{ key: 'RUT', text: 'RUT', value: 'rut' }]} 
                                    onChange={(e, { name, value }) => {
                                        formik.setFieldValue(name, value);
                                    }}
                                    value={formik.values.type_document}
                                    error={formik.errors.type_document}
                                />

                                <Form.Input  
                                    id="document_number"
                                    name="document_number"
                                    label="RUT*" 
                                    type="input" 
                                    placeholder="INGRESAR RUT" 
                                    value={formik.values.document_number}
                                    onChange={formik.handleChange}
                                    error={formik.errors.document_number}
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input  
                                    id="name"
                                    name="name" 
                                    label="NOMBRES*"
                                    type="input" 
                                    placeholder="INGRESAR NOMBRES" 
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    error={formik.errors.name}
                                />
                            
                                <Form.Input  
                                    id="lastname"
                                    name="lastname" 
                                    label="APELLIDO PATERNO*"
                                    type="input" 
                                    placeholder="INGRESAR APELLIDO PATERNO" 
                                    value={formik.values.lastname}
                                    onChange={formik.handleChange}
                                    error={formik.errors.lastname}
                                />

                                <Form.Input  
                                    id="mother_lastname"
                                    name="mother_lastname" 
                                    label="APELLIDO MATERNO"
                                    type="input" 
                                    placeholder="INGRESAR APELLIDO MATERNO" 
                                    value={formik.values.mother_lastname}
                                    onChange={formik.handleChange}
                                    error={formik.errors.mother_lastname}
                                />

                                <Form.Input  
                                    id="birthdate"
                                    name="civilianInformation.birthdate" 
                                    label="FECHA NACIMIENTO*"
                                    type="date" 
                                    placeholder="INGRESAR FECHA NACIMIENTO" 
                                    value={formik.values.civilianInformation.birthdate}
                                    onChange={formik.handleChange}
                                    error={formik.errors.civilianInformation?.birthdate}
                                />

                                <Form.Select 
                                    id="gender" 
                                    name="gender" 
                                    label="SEXO*" 
                                    placeholder="SELECCIONAR SEXO" 
                                    options={[
                                        { key: 'm', value: 'masculino', text: 'Masculino' },
                                        { key: 'f', value: 'femenino', text: 'Femenino' },
                                        { key: 'o', value: 'otro', text: 'Otro' }
                                    ]} 
                                    onChange={(e, { name, value }) => {
                                        formik.setFieldValue(name, value);
                                    }}
                                    value={formik.values.gender}
                                    error={formik.errors.gender}
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Select 
                                    id="civil_status" 
                                    name="civilianInformation.civil_status" 
                                    label="ESTADO CIVIL*" 
                                    placeholder="SELECCIONAR ESTADO CIVIL" 
                                    options={[
                                        { key: 'single', value: 'Single', text: 'Soltero(a)' },
                                        { key: 'married', value: 'Married', text: 'Casado(a)' },
                                        { key: 'divorced', value: 'Divorced', text: 'Divorciado(a)' },
                                        { key: 'widowed', value: 'Widowed', text: 'Viudo(a)' },
                                        { key: 'separated', value: 'Separated', text: 'Separado(a)' },
                                        { key: 'civil_union', value: 'Civil Union', text: 'Unión Civil' }
                                    ]} 
                                    onChange={(e, { name, value }) => {
                                        formik.setFieldValue(name, value);
                                    }}
                                    value={formik.values.civilianInformation.civil_status}
                                    error={formik.errors.civilianInformation?.civil_status}
                                />

                                <Form.Select 
                                    id="study_level" 
                                    name="civilianInformation.study_level" 
                                    label="NIVELES DE ESTUDIO*" 
                                    placeholder="SELECCIONAR NIVEL ESTUDIO" 
                                    options={studyLevelOptions} 
                                    onChange={(e, { name, value }) => {
                                        formik.setFieldValue(name, value);
                                    }}
                                    value={formik.values.civilianInformation.study_level}
                                    error={formik.errors.civilianInformation?.study_level}
                                />

                                <Form.Select 
                                    id="driver_license" 
                                    name="civilianInformation.driver_license" 
                                    label="LICENCIA CONDUCIR*" 
                                    placeholder="SELECCIONAR LICENCIA" 
                                    options={driverLicenseOptions} 
                                    onChange={(e, { name, value }) => {
                                        formik.setFieldValue(name, value);
                                    }}
                                    value={formik.values.civilianInformation.driver_license}
                                    error={formik.errors.civilianInformation?.driver_license}
                                />

                                <Form.Select 
                                    id="profession" 
                                    name="civilianInformation.profession" 
                                    label="PROFESION*" 
                                    placeholder="SELECCIONAR PROFESION" 
                                    options={professionOptions} 
                                    onChange={(e, { name, value }) => {
                                        formik.setFieldValue(name, value);
                                    }}
                                    value={formik.values.civilianInformation.profession}
                                    error={formik.errors.civilianInformation?.profession}
                                />

                                <Form.Select 
                                    id="occupational_level" 
                                    name="civilianInformation.occupational_level" 
                                    label="NIVEL OCUPACIONAL" 
                                    placeholder="SELECCIONAR OCUPACION" 
                                    options={occupationalLevelOptions} 
                                    onChange={(e, { name, value }) => {
                                        formik.setFieldValue(name, value);
                                    }}
                                    value={formik.values.civilianInformation.occupational_level}
                                    error={formik.errors.civilianInformation?.occupational_level}
                                />
                            </Form.Group>
                        </Segment>
                    </GridColumn>
                </Grid>

                <Grid columns={1}>
                    <GridColumn>
                        <Segment raised>
                            <Label as='a' style={{ backgroundColor: profile.myColor, color: '#ffffff' }} ribbon>
                                DATOS DE CONTACTO
                            </Label>

                            <Divider hidden />

                            <Form.Group widths='equal'>
                                <Form.Input  
                                    id="email"
                                    name="socialInformation.email" 
                                    label="EMAIL PRINCIPAL*"
                                    type="email" 
                                    placeholder="INGRESAR EMAIL PRINCIPAL" 
                                    value={formik.values.socialInformation.email}
                                    onChange={formik.handleChange}
                                    error={formik.errors.socialInformation?.email}
                                />

                                <Form.Input  
                                    id="phone"
                                    name="socialInformation.phone" 
                                    label="TELEFONO DE CONTACTO*"
                                    type="tel" 
                                    placeholder="INGRESAR TELEFONO DE CONTRACTO" 
                                    value={formik.values.socialInformation.phone}
                                    onChange={formik.handleChange}
                                    error={formik.errors.socialInformation?.phone}
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input  
                                    id="email_corporative"
                                    name="socialInformation.email_corporative" 
                                    label="EMAIL CORPORATIVO"
                                    type="email" 
                                    placeholder="INGRESAR EMAIL CORPORATIVO" 
                                    value={formik.values.socialInformation.email_corporative}
                                    onChange={formik.handleChange}
                                    error={formik.errors.socialInformation?.email_corporative}
                                />

                                <Form.Input  
                                    id="phone2"
                                    name="socialInformation.phone2" 
                                    label="TELEFONO ALTERNATIVO"
                                    type="tel" 
                                    placeholder="INGRESAR TELEFONO" 
                                    value={formik.values.socialInformation.phone2}
                                    onChange={formik.handleChange}
                                    error={formik.errors.socialInformation?.phone2}
                                />
                            </Form.Group>
                        </Segment>
                    </GridColumn>
                </Grid>  

                <Grid columns={1}>
                    <GridColumn>
                        <Segment raised>
                            <Label as='a' style={{ backgroundColor: profile.myColor, color: '#ffffff' }} ribbon>
                                DATOS DE EMERGENCIA
                            </Label> 

                            <Divider hidden />

                            <Form.Group widths='equal'>
                                <Form.Input 
                                    id="blood_type" 
                                    name="healthInformation.blood_type" 
                                    label="TIPO DE SANGRE" 
                                    type="input" 
                                    placeholder="INGRESAR TIPO DE SANGRE" 
                                    value={formik.values.healthInformation.blood_type}
                                    onChange={formik.handleChange}
                                    error={formik.errors.healthInformation?.blood_type}
                                />

                                <Form.Input 
                                    id="allergy" 
                                    name="healthInformation.allergy" 
                                    label="ALERGIAS" 
                                    type="input" 
                                    placeholder="INGRESAR ALERGIAS" 
                                    value={formik.values.healthInformation.allergy}
                                    onChange={formik.handleChange}
                                    error={formik.errors.healthInformation?.allergy}
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input  
                                    id="emergency_name"
                                    name="healthInformation.emergency_name" 
                                    label="NOMBRE DE CONTACTO"
                                    type="input" 
                                    placeholder="INGRESAR NOMBRE DE CONTACTO" 
                                    value={formik.values.healthInformation.emergency_name}
                                    onChange={formik.handleChange}
                                    error={formik.errors.healthInformation?.emergency_name}
                                />

                                <Form.Select 
                                    id="emergency_relationship" 
                                    name="healthInformation.emergency_relationship" 
                                    label="VINCULO" 
                                    placeholder="SELECCIONAR VINCULO" 
                                    options={relationOptions} 
                                    onChange={(e, { name, value }) => {
                                        formik.setFieldValue(name, value);
                                    }}
                                    value={formik.values.healthInformation.emergency_relationship}
                                    error={formik.errors.healthInformation?.emergency_relationship}
                                />

                                <Form.Input
                                    id="emergency_phone1"
                                    name="healthInformation.emergency_phone1" 
                                    label="TELEFONO 1"
                                    type="input" 
                                    placeholder="INGRESAR TELEFONO DE CONTACTO" 
                                    value={formik.values.healthInformation.emergency_phone1}
                                    onChange={formik.handleChange}
                                    error={formik.errors.healthInformation?.emergency_phone1}
                                />

                                <Form.Input  
                                    id="emergency_phone2"
                                    name="healthInformation.emergency_phone2" 
                                    label="TELEFONO 2"
                                    type="input" 
                                    placeholder="INGRESAR TELEFONO DE CONTACTO" 
                                    value={formik.values.healthInformation.emergency_phone2}
                                    onChange={formik.handleChange}
                                    error={formik.errors.healthInformation?.emergency_phone2}
                                />
                            </Form.Group>
                        </Segment>
                    </GridColumn>
                </Grid> 
            </div>
        </div>
    )
}
