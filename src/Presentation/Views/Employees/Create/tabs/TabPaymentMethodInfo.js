// TabDefinitionInfo.js
import React from 'react';
import useViewModel from '../ViewModel';
import { Form, Grid, GridColumn, Segment, Label, Divider } from 'semantic-ui-react';

export default function TabPaymentMothodInfo({ formik }) {
    const {
        profile,
        getBanks,
        getCompanies,
        getPaymentMethods,
    } = useViewModel();
    console.log(formik.values);
    
    const banksOptions = Object.values(getBanks).map((option, index) => ({ key: option.value || index, ...option }));
    const paymmentMethodsOptions = Object.values(getPaymentMethods).map((option, index) => ({ key: option.value || index, ...option }));
    const companiesOptions = Object.values(getCompanies).map((option, index) => ({ key: option.value || index, ...option }));

    return (
        <div className="card-body row">
            <div className="col-md-12">
                <Grid columns={1}>
                    <GridColumn>
                        <Segment raised>
                            <Label as='a' style={{ backgroundColor: profile.myColor, color: '#ffffff' }} ribbon>
                                Forma de Pago
                            </Label>

                            <Divider hidden />

                            <Form.Group>
                                <Form.Select 
                                    id="sys_companies_id" 
                                    name="paymentMethod.sys_companies_id" 
                                    label="Empresa*" 
                                    placeholder="SELECCIONAR EMPRESA" 
                                    options={companiesOptions} 
                                    onChange={(e, { value }) => formik.setFieldValue('paymentMethod.sys_companies_id', value)}
                                    value={ formik.values.paymentMethod.sys_companies_id }
                                    error={ formik.errors.paymentMethod?.sys_companies_id }
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Select 
                                    id="type_payment_method" 
                                    name="paymentMethod.type_payment_method" 
                                    label="TIPO DE FORMA DE PAGO*" 
                                    placeholder="SELECCIONAR TIPO DE FORMA DE PAGO" 
                                    options={[
                                        { key: '1', value: 'principal', text: 'Principal' },
                                        { key: '2', value: 'secundaria', text: 'Secundaria' }
                                    ]} 
                                    onChange={(e, { value }) => formik.setFieldValue('paymentMethod.type_payment_method', value)}
                                    value={formik.values.paymentMethod.type_payment_method}
                                    error={formik.errors.paymentMethod?.type_payment_method}
                                />

                                <Form.Select 
                                    id="payment_method" 
                                    name="paymentMethod.payment_method" 
                                    label="FORMA DE PAGO*" 
                                    placeholder="SELECCIONAR FORMA DE PAGO" 
                                    options={paymmentMethodsOptions} 
                                    onChange={(e, { value }) => formik.setFieldValue('paymentMethod.payment_method', value)}
                                    value={formik.values.paymentMethod.payment_method}
                                    error={formik.errors.paymentMethod?.payment_method}
                                />
                            
                                <Form.Select 
                                    id="bank" 
                                    name="paymentMethod.bank" 
                                    label="BANCO*" 
                                    placeholder="SELECCIONAR BANCO" 
                                    options={banksOptions} 
                                    onChange={(e, { value }) => formik.setFieldValue('paymentMethod.bank', value)}
                                    value={formik.values.paymentMethod.bank}
                                    error={formik.errors.paymentMethod?.bank}
                                />
                            </Form.Group>
                        
                            <Form.Group widths='equal'>
                                <Form.Input  
                                    id="current_account_number"
                                    name="paymentMethod.current_account_number" 
                                    label="CUENTA CORRIENTE*"
                                    type="input" 
                                    placeholder="INGRESAR CUENTA CORRIENTE" 
                                    value={formik.values.paymentMethod.current_account_number}
                                    onChange={formik.handleChange}
                                    error={formik.errors.addressInformation?.current_account_number}
                                />

                                <Form.Input  
                                    id="payment_percentage"
                                    name="paymentMethod.payment_percentage" 
                                    label="PORCENTAGE DE PAGO*"
                                    type="input" 
                                    placeholder="INGRESAR PORCENTAGE DE PAGO" 
                                    value={formik.values.paymentMethod.payment_percentage}
                                    onChange={formik.handleChange}
                                    error={formik.errors.addressInformation?.payment_percentage}
                                />

                                <Form.Input  
                                    id="bic"
                                    name="paymentMethod.bic" 
                                    label="BIC"
                                    type="input" 
                                    placeholder="INGRESAR BIC" 
                                    value={formik.values.paymentMethod.bic}
                                    onChange={formik.handleChange}
                                    error={formik.errors.paymentMethod?.bic}
                                />
                            </Form.Group>
                        </Segment>
                    </GridColumn>
                </Grid> 
            </div>
        </div>
    )
}
