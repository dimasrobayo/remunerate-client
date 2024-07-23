import React from 'react';
import useViewModel from './ViewModel';
import { Tab } from 'semantic-ui-react';
import { Form, Button } from 'semantic-ui-react';
import TabProfileInfo from './tabs/TabProfileInfo';
import TabAddressInfo from './tabs/TabAddressInfo';
import TabHeartInfo from './tabs/TabHeartInfo';
import TabPaymentMethodInfo from './tabs/TabPaymentMethodInfo';

export default function FormRegister() {
    const {
        profile,
        formik
    } = useViewModel();
    
    const panes = [
        { 
            menuItem: { key: 'user', icon: 'user', content: 'PERFIL', style: { fontWeight: 'bold' }}, 
            render: () => <Tab.Pane><TabProfileInfo formik={formik} /></Tab.Pane> 
        },
        {
            menuItem: { key: 'address book', icon: 'address book', content: 'DIRECCION', style: { fontWeight: 'bold' }}, 
            render: () => <Tab.Pane><TabAddressInfo formik={formik} /></Tab.Pane> 
        },
        {
            menuItem: { key: 'heart', icon: 'heart', content: 'PREVISIÓN Y SALUD', style: { fontWeight: 'bold' }}, 
            render: () => <Tab.Pane><TabHeartInfo formik={formik} /></Tab.Pane> 
        },
        {
            menuItem: { key: 'payment', icon: 'payment', content: 'FORMA DE PAGO', style: { fontWeight: 'bold' }}, 
            render: () => <Tab.Pane><TabPaymentMethodInfo formik={formik} /></Tab.Pane> 
        }
    ]

    return (
        <div className="card-body">
            <Form className="form" onSubmit={formik.handleSubmit}>
                <div className="card-body row">
                    <div className="col-md-12">
                        <Tab 
                            menu={{ 
                                inverted: true, 
                                attached: false, 
                                tabular: false, 
                                style: { backgroundColor: profile.myColor }
                            }}
                            panes={panes} 
                        />
                    </div>
                </div>

                <div>
                    <Button type="submit" style={{backgroundColor: profile.myColor, color: '#ffffff'}}>
                        {formik.initialValues.business_name ? 'ACTUALIZAR' : 'REGISTRAR'}
                    </Button>
                </div>
            </Form>
        </div>
    )
}