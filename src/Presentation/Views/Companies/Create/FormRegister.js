import React from 'react';
import useViewModel from './ViewModel';
import { Tab } from 'semantic-ui-react';
import { Form, Button } from 'semantic-ui-react';
import TabDefinitionInfo from './tabs/TabDefinitionInfo';
import TabAddressInfo from './tabs/TabAddressInfo';
import TabSettingInfo from './tabs/TabSettingInfo';

export default function FormRegister() {
    const {
        profile,
        formik
    } = useViewModel();
    
    const panes = [
        { 
            menuItem: { key: 'building', icon: 'building', content: 'DEFINICIÓN', style: { fontWeight: 'bold' }}, 
            render: () => <Tab.Pane><TabDefinitionInfo formik={formik} /></Tab.Pane> 
        },
        { 
            menuItem: { key: 'address book', icon: 'address book', content: 'DIRECCIÓN', style: { fontWeight: 'bold' }}, 
            render: () => <Tab.Pane><TabAddressInfo formik={formik} /></Tab.Pane> 
        },
        { 
            menuItem: { key: 'settings', icon: 'settings', content: 'CONFIGURACIÓN', style: { fontWeight: 'bold' }}, 
            render: () => <Tab.Pane><TabSettingInfo formik={formik} /></Tab.Pane> 
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