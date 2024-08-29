import React from 'react';
import useViewModel from './ViewModel';
import { Form, Button } from 'semantic-ui-react';
import { formatCurrency, parseCurrency } from '../../../../utils/global';

export default function FormRegister() {
    const {
        concepts,
        profile,
        formik,
        getPayrollTemplatesType
    } = useViewModel();

    const conceptsOptions = Object.values(concepts).map((option, index) => ({ key: option.value || index, ...option }));
    const payrollTemplatesTypeOptions = Object.values(getPayrollTemplatesType).map((option, index) => ({ key: option.value || index, ...option }));

    return (
        <div className="card-body">
            <Form className="form" onSubmit={formik.handleSubmit}>
                <div className="card-body row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <Form.Select 
                                id="sys_concept_id" 
                                name="sys_concept_id" 
                                label="CONCEPTO*" 
                                placeholder="SELECCIONAR CONCEPTO" 
                                options={conceptsOptions} 
                                onChange={(e, { name, value }) => {
                                    formik.setFieldValue(name, value);
                                }}
                                value={formik.values.sys_concept_id}
                                error={formik.errors.sys_concept_id}
                            />

                            <Form.Select 
                                id="payroll_templates_type" 
                                name="payroll_templates_type" 
                                label="TIPO DE REGISTRO*" 
                                placeholder="SELECCIONAR TIPO DE REGISTRO" 
                                options={payrollTemplatesTypeOptions} 
                                onChange={(e, { name, value }) => {
                                    formik.setFieldValue(name, value);
                                }}
                                value={formik.values.payroll_templates_type}
                                error={formik.errors.payroll_templates_type}
                            />

                            <Form.Input
                                id="amount"
                                name="amount"
                                label="MONTO*"
                                type="text"
                                placeholder="INGRESAR SUELDO BASE"
                                value={formatCurrency(formik.values.amount)}
                                onChange={(e) => {
                                    // Convierte el valor ingresado en un float
                                    const rawValue = parseCurrency(e.target.value);
                                    formik.setFieldValue('amount', rawValue);
                                }}
                                error={formik.errors.amount}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <Button type="submit" style={{backgroundColor: profile.myColor, color: '#ffffff'}}>
                        {formik.initialValues.name ? 'ACTUALIZAR' : 'REGISTRAR'}
                    </Button>
                </div>
            </Form>
        </div>
  )
}