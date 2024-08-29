import React from 'react';
import useViewModel from './ViewModel';
import { Tab } from 'semantic-ui-react';
import { Form, Button } from 'semantic-ui-react';
import TabContainerInfo from './tabs/TabContainerInfo';
import TabWorkingDayInfo from './tabs/TabWorkingDayInfo';
import TabPriceInfo from './tabs/TabPriceInfo';
import TabEndContractInfo from './tabs/TabEndContractInfo';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import UpdateIcon from '@mui/icons-material/Update';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';

export default function FormRegister() {
    const {
        profile,
        formik
    } = useViewModel();
    
    const panes = [
        { 
            menuItem: { 
                key: 'contenido', 
                icon: <AssignmentIndIcon />, 
                content: 'CONTENIDO', 
                style: { fontWeight: 'bold' }
            }, 
            render: () => <Tab.Pane><TabContainerInfo formik={formik} /></Tab.Pane> 
        },
        {
            menuItem: { 
                key: 'jornada', 
                icon: <UpdateIcon />, 
                content: 'JORNADA', 
                style: { fontWeight: 'bold' }
            }, 
            render: () => <Tab.Pane><TabWorkingDayInfo formik={formik} /></Tab.Pane> 
        },
        {
            menuItem: { 
                key: 'cotizaciones', 
                icon: <FactCheckOutlinedIcon />, 
                content: 'COTIZACIONES', 
                style: { fontWeight: 'bold' }
            }, 
            render: () => <Tab.Pane><TabPriceInfo formik={formik} /></Tab.Pane> 
        },
        {
            menuItem: { 
                key: 'payment', 
                icon: <RemoveDoneIcon />, 
                content: 'TERMINO CONTRATO', 
                style: { fontWeight: 'bold' }
            }, 
            render: () => <Tab.Pane><TabEndContractInfo formik={formik} /></Tab.Pane> 
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
                        {formik.initialValues.nombre_contrato ? 'ACTUALIZAR' : 'REGISTRAR'}
                    </Button>
                </div>
            </Form>
        </div>
    )
}