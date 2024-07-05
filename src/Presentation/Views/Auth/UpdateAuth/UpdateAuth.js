import React from 'react';
import './UpdateAuth.scss';
import PropTypes from 'prop-types';
import { map, size } from 'lodash';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import useViewModel from './ViewModel';
import { Divider } from '@mui/material';
import Modal from '@mui/material/Modal';
import { SketchPicker } from 'react-color';
import CakeIcon from '@mui/icons-material/Cake';
import FeedIcon from '@mui/icons-material/Feed';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { Button, Form, Image, Table } from 'semantic-ui-react';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import logo from '../../../../assets/png/remunerateWhite.png';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
            <Box sx={{ p: 3 }}>
                <div>
                    {children}
                </div>
            </Box>
        )}
      </div>
    );
}
  
CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export const UpdateAuth = ({title,openModal, setOpenModal, widthModal, heightModal}) => {
    const { 
        formik, 
        profile, 
        typeOptions, 
        genderOptions, 
        newColor, 
        tabWiew,
        a11yProps,
        handleChange,
        handleNewColorChange 
    } = useViewModel();

    const { myColor, address_information } = profile;

    const tabTextColor = newColor ? newColor : myColor;

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        Headers: 400,
        borderradius: 10,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p:0
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    return (
        <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box 
                className="modal-basic"
                sx={{ ...style, width: widthModal, height: heightModal }}
            >
                <div className='modal-title' >
                    <h2 id="parent-modal-title" style={{color: tabTextColor}}>{title}</h2>
                </div>

                <Divider />

                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs 
                        value={tabWiew} 
                        onChange={handleChange} 
                        aria-label="tabs edit profile"
                        sx={{
                            '.css-aym9vq-MuiButtonBase-root-MuiTab-root.Mui-selected': {
                                color: tabTextColor,
                            },
                            '& .Mui-selected': {
                                color: tabTextColor,
                            },
                            '& .MuiTabs-indicator': {
                                backgroundColor: tabTextColor,
                            },
                        }}
                    >
                        <Tab icon={<PermContactCalendarIcon />} label="INF. PERSONAL" {...a11yProps(0)} />
                        <Tab icon={<CakeIcon />} label="INF. CIVIL" {...a11yProps(1)} />
                        <Tab icon={<HealthAndSafetyIcon />} label="INF. SALUD" {...a11yProps(2)} />
                        <Tab icon={<FeedIcon />} label="INF. SOCIAL" {...a11yProps(3)} />
                        <Tab icon={<FmdGoodIcon />} label="DIRECCIONES" {...a11yProps(4)} />
                        <Tab icon={<ColorLensIcon />} label="MI ESTILO" {...a11yProps(5)} />
                    </Tabs>
                </Box>

                <Form onSubmit={formik.handleSubmit}>
                    <div className='modal-container'>
                        <div className='modal-body' style={{height: heightModal - 180}}>
                            <CustomTabPanel value={tabWiew} index={0}>
                                <label>Nombre</label>
                                <Form.Input 
                                    id="name"
                                    name="name" 
                                    type="text" 
                                    placeholder="Nombre" 
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    error={formik.errors.name}
                                />

                                <label>Apellido paterno</label>
                                <Form.Input 
                                    id="lastname"
                                    name="lastname" 
                                    type="text" 
                                    placeholder="Apellido Paterno" 
                                    value={formik.values.lastname}
                                    onChange={formik.handleChange}
                                    error={formik.errors.lastname}
                                />
                                
                                <label>Apellido materno</label>
                                <Form.Input 
                                    id="mother_lastname"
                                    name="mother_lastname" 
                                    type="text" 
                                    placeholder="Apellido Materno" 
                                    value={formik.values.mother_lastname}
                                    onChange={formik.handleChange}
                                    error={formik.errors.mother_lastname}
                                />
                                
                                <label>Tipo de documento</label>
                                <Form.Select 
                                    id="type_document"
                                    name="type_document"
                                    value={formik.values.type_document}
                                    placeholder='Tipo de Documento' 
                                    onChange={(e, { name, value }) => formik.setFieldValue(name, value)}
                                    options={typeOptions} 
                                    error={formik.errors.type_document}
                                />

                                <label>Numero de documento</label>
                                <Form.Input 
                                    id="document_number"
                                    name="document_number" 
                                    type="text" 
                                    placeholder="Numero de Documento" 
                                    value={formik.values.document_number}
                                    onChange={formik.handleChange}
                                    error={formik.errors.document_number}
                                />
                                
                                <label>Genero</label>
                                <Form.Select 
                                    id="gender"
                                    name="gender"
                                    placeholder='Género' 
                                    value={formik.values.gender}
                                    onChange={(e, { name, value }) => formik.setFieldValue(name, value)}
                                    options={genderOptions} 
                                    error={formik.errors.gender}
                                />
                            </CustomTabPanel>

                            <CustomTabPanel value={tabWiew} index={1}>
                                <label>Fecha de nacimiento</label>
                                <Form.Input 
                                    id="birthdate"
                                    name="birthdate" 
                                    type="date" 
                                    value={formik.values.birthdate}
                                    onChange={formik.handleChange}
                                    error={formik.errors.birthdate}
                                />

                                <label>Lugar de nacimiento</label>
                                <Form.Input 
                                    id="country_birth"
                                    name="country_birth" 
                                    type="text" 
                                    placeholder="Pais de nacimiento" 
                                    value={formik.values.country_birth}
                                    onChange={formik.handleChange}
                                    error={formik.errors.country_birth}
                                    autoComplete="phone"
                                />

                                <label>Nacionalidad</label>
                                <Form.Input 
                                    id="nationality"
                                    name="nationality" 
                                    type="text" 
                                    placeholder="Pais de nacimiento" 
                                    value={formik.values.nationality}
                                    onChange={formik.handleChange}
                                    error={formik.errors.nationality}
                                    autoComplete="phone"
                                />
                            </CustomTabPanel>
                            
                            <CustomTabPanel value={tabWiew} index={2}>
                                <label>Tipo de sangre</label>
                                <Form.Input 
                                    id="blood_type"
                                    name="blood_type" 
                                    type="text" 
                                    placeholder="Tipo de sangre" 
                                    value={formik.values.blood_type}
                                    onChange={formik.handleChange}
                                    error={formik.errors.blood_type}
                                />

                                <label>Alergia</label>
                                <Form.Input 
                                    id="allergy"
                                    name="allergy" 
                                    type="text" 
                                    placeholder="Alergias" 
                                    value={formik.values.allergy}
                                    onChange={formik.handleChange}
                                    error={formik.errors.allergy}
                                    autoComplete="phone"
                                />

                                <label>Observación</label>
                                <Form.TextArea 
                                    id="observation"
                                    name="observation" 
                                    type="text" 
                                    placeholder="Ingresar observación" 
                                    value={formik.values.observation}
                                    onChange={formik.handleChange}
                                    error={formik.errors.observation}
                                    autoComplete="phone"
                                />
                            </CustomTabPanel>

                            <CustomTabPanel value={tabWiew} index={3}>
                                <Form.Input 
                                    id="email"
                                    name="email" 
                                    type="text" 
                                    disabled
                                    placeholder="Correo electronico" 
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.errors.email}
                                />

                                <Form.Input 
                                    id="phone"
                                    name="phone" 
                                    type="text" 
                                    disabled
                                    placeholder="Numero Telefónico" 
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    error={formik.errors.phone}
                                    autoComplete="phone"
                                />
                            </CustomTabPanel>

                            <CustomTabPanel value={tabWiew} index={4}>
                                <Table selectable style={{'border-top': `0.2em solid ${myColor}`}}>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>DIRECCIONES</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                    <Table.Body>
                                        {size(address_information) > 0 
                                            ? map(address_information, (address, index) => (
                                                <Table.Row key={address.id}>
                                                    <Table.Cell>{`${address.address}, Departamento ${address.department_number}`}</Table.Cell>
                                                </Table.Row>
                                            )) : (
                                                <Table.Row>
                                                    <Table.Cell colSpan='6'>
                                                        LOS REGISTROS NO SE PUDIERON CARGAR O NO TIENE DATOS REGISTRADOS!
                                                    </Table.Cell>
                                                </Table.Row>
                                            )
                                        }
                                    </Table.Body>
                                </Table>
                            </CustomTabPanel>

                            <CustomTabPanel value={tabWiew} index={5}>
                                <div 
                                    className='cardStyle'
                                    style={{ 
                                        backgroundColor: tabTextColor
                                    }}
                                >
                                    <div 
                                        className='cardLeft'
                                    >
                                        <div className='cardLeftTop'>
                                            <Image src={logo} />
                                        </div>
                                    </div>

                                    <div className='cardRight'>
                                        <SketchPicker 
                                            className="SketchPicker" 
                                            color={ newColor ? newColor : myColor } 
                                            onChange={handleNewColorChange} 
                                        />
                                    </div>
                                </div>
                            </CustomTabPanel>
                        </div>
                        
                        <div className='modal-footer'>
                            <Button 
                                type="submit" 
                                attached='bottom'
                                className="ui primary btn-submit"
                                style={{ backgroundColor: newColor ? newColor : myColor }}
                                onClick={formik.handleSubmit}
                            >
                                Registrarse
                            </Button>
                        </div>
                    </div>
                </Form>
            </Box>
        </Modal>
    );
}
