import { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { size } from 'lodash';
import { useFormik } from 'formik'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { allRegions } from '../../../../Store/Slices/regionsSlice';
import { ApiRemunerate } from '../../../../Store/utils/ApiRemunerate';

const useEmployeesViewModel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams(); // Para obtener el ID de la URL
    const profile = JSON.parse(localStorage.getItem(('my_profile')));
    const getRegions = useSelector(state => state.regions.allRegions);
    const [getCommunes, setGetCommunes] = useState([]);
    const [getStudyLevel, setGetStudyLevel] = useState([]);
    const [driverLicense, setDriverLicense] = useState([]);
    const [getProfession, setGetProfession] = useState([]);
    const [occupationalLevel, setOccupationalLevel] = useState([]);
    const [getRelation, setGetRelation] = useState([]);
    const [getCountries, setGetCountries] = useState([]);
    const [getAFP, setGetAFP] = useState([]);
    const [getISAPRE, setGetISAPRE] = useState([]);
    const [getPaymentMethods, setGetPaymentMethods] = useState([]);
    const [getBanks, setGetBanks] = useState([]);
    const [getCompanies, setGetCompanies] = useState([]);
    const [initialValues, setInitialValues] = useState({ 
        name: '',
        lastname: '',
        mother_lastname: '',
        type_document: '', 
        document_number: '',
        gender: '',
        phone: '',
        image: '',
        civilianInformation: {
            birthdate: '',
            country_birth: '',
            nationality: '',
            civil_status: '',
            study_level: '',
            driver_license: '',
            profession: '',
            occupational_level: '',
            observaciones: ''
        },
        socialInformation: {
            email: '',
            email_corporative: '',
            phone: '',
            phone2: ''
        },
        healthInformation: {
            blood_type: '',
            allergy: '',
            emergency_name: '',
            emergency_relationship: '',
            emergency_phone1: '',
            emergency_phone2: '',
            observation: ''
        },
        addressInformation: [
            {
                address: '',
                codigo_postal: '',
                department_number: '',
                housing_type: '',
                block: '',
                sys_community_id: null,
                sys_region_id: null,
            }
        ],
        healthPension: {
            sys_countries_id: null,
            family_allowance_section: 'tramo_d',
            retired: '',
            fun: '',
            quote_pension_health: '',
            pension_system: '',
            afp_box: '',
            afp_date: '0000-00-00',
            isapre_health: '',
            money: '',
            uf: 0,
            pesos: 0
        },
        paymentMethod: {
            sys_companies_id: null,
            payment_method: null,
            bank: null,
            current_account_number: '',
            payment_percentage: '',
            type_payment_method: '',
            bic: ''
        }
    });

    useEffect(() => {
        if (id) {
            ApiRemunerate.get(`/employees/${id}`)
                .then(response => {
                    const { data } = response.data;
    
                    setInitialValues({
                        name: data.name || '',
                        lastname: data.lastname || '',
                        mother_lastname: data.mother_lastname || '',
                        type_document: data.type_document || 'rut',
                        document_number: data.document_number || '',
                        gender: data.gender || '',
                        phone: data.phone || '',
                        image: data.image || '',
                        civilianInformation: {
                            birthdate: data.civilianInformation?.birthdate || '',
                            country_birth: data.civilianInformation?.country_birth || '',
                            nationality: data.civilianInformation?.nationality || '',
                            civil_status: data.civilianInformation?.civil_status || '',
                            study_level: data.civilianInformation?.study_level || '',
                            driver_license: data.civilianInformation?.driver_license || '',
                            profession: data.civilianInformation?.profession || '',
                            occupational_level: data.civilianInformation?.occupational_level || '',
                            observaciones: data.civilianInformation?.observaciones || ''
                        },
                        socialInformation: {
                            email: data.socialInformation?.email || '',
                            email_corporative: data.socialInformation?.email_corporative || '',
                            phone: data.socialInformation?.phone || '',
                            phone2: data.socialInformation?.phone2 || ''
                        },
                        healthInformation: {
                            blood_type: data.healthInformation?.blood_type || '',
                            allergy: data.healthInformation?.allergy || '',
                            emergency_name: data.healthInformation?.emergency_name || '',
                            emergency_relationship: data.healthInformation?.emergency_relationship || '',
                            emergency_phone1: data.healthInformation?.emergency_phone1 || '',
                            emergency_phone2: data.healthInformation?.emergency_phone2 || '',
                            observation: data.healthInformation?.observation || ''
                        },
                        addressInformation: data.addressInformation?.map(addr => ({
                            address: addr.address || '',
                            codigo_postal: addr.codigo_postal || '',
                            department_number: addr.department_number || '',
                            housing_type: addr.housing_type || '',
                            block: addr.block || '',
                            sys_community_id: addr.sys_community_id || '',
                            sys_region_id: addr.community.province.region_id || ''
                        })) || [],
                        healthPension: {
                            sys_countries_id: data.healthPension?.sys_countries_id || '',
                            family_allowance_section: data.healthPension?.family_allowance_section || '',
                            retired: data.healthPension?.retired || '',
                            fun: data.healthPension?.fun || '',
                            quote_pension_health: data.healthPension?.quote_pension_health || '',
                            pension_system: data.healthPension?.pension_system || '',
                            afp_box: parseInt(data.healthPension?.afp_box, 10) || 0,
                            afp_date: data.healthPension?.afp_date || '',
                            isapre_health: parseInt(data.healthPension?.isapre_health, 10) || 0,
                            money: data.healthPension?.money || '',
                            uf: parseInt(data.healthPension?.uf, 10) || 0,
                            pesos: parseInt(data.healthPension?.pesos, 10) || 0
                        },
                        paymentMethod: {
                            sys_companies_id: data.paymentMethod?.sys_companies_id || '',
                            payment_method: data.paymentMethod?.payment_method || '',
                            bank: data.paymentMethod?.bank || '',
                            current_account_number: data.paymentMethod?.current_account_number || '',
                            payment_percentage: data.paymentMethod?.payment_percentage || '',
                            type_payment_method: data.paymentMethod?.type_payment_method || '',
                            bic: data.paymentMethod?.bic || ''
                        }
                    });
                })
                .catch(error => {
                    if (error.response) {
                        if (error.response.status === 404) {
                            toast.error('Empleado no encontrado');
                            navigate("/employees");
                        } else {
                            console.log(`Error: ${error.response.status} - ${error.response.statusText}`)
                        }
                    } else if (error.request) {
                        toast.error('No se recibió respuesta del servidor');
                    } else {
                        toast.error('Error al hacer la solicitud: ' + error.message);
                    }
                });
        }
    }, [id, navigate]);


    /**
     * Efecto para cargar las regiones desde la API al cargar el componente.
     */
    useEffect(() => {
        const fetchRegions = async () => {
            try {
                if (!getRegions || size(getRegions) === 0) {
                    const response = await ApiRemunerate.get(`/utils/regions`);
                    const { data } = response.data;
                    if (data) {
                        const regionsArray = data.map((region, index) => ({
                            key: region.id || index,
                            value: region.id,
                            text: region.region
                        }));
                        dispatch(allRegions(regionsArray));
                    }
                }
            } catch (error) {
                console.error("Error fetching regions:", error);
                // Aquí puedes manejar el error como desees (por ejemplo, mostrar un mensaje al usuario)
            }
        };
        fetchRegions();
    }, [getRegions, dispatch]);

    /**
     * Efecto para cargar las comunas desde la API al cargar el componente.
     */
    const getAllCommunes = useCallback(async (idRegion) => {
        if (idRegion) {
            try {
                const response = await ApiRemunerate.get(`/utils/communityByRegions/${idRegion}`);
                const { data } = response.data;
                if (data) {
                    const communesArray = data.map((commune) => ({
                        key: commune.id,
                        value: commune.id,
                        text: commune.comuna
                    }));
                    setGetCommunes(communesArray);
                }
            } catch (error) {
                console.error("Error fetching communes:", error);
                // Aquí puedes manejar el error como desees
            }
        }
    }, []);

    /**
     * Efecto para cargar study_level desde la API al cargar el componente.
     */
    useEffect(() => {
        const fetchStudyLevel = async () => {
            try {
                if (!getStudyLevel || size(getStudyLevel) === 0) {
                    const response = await ApiRemunerate.get(`/lists/listsvaluesbyid/20`);
                    const { data } = response.data;
                    if (data) {
                        const studyLevelArray = data.values.map((type, index) => ({
                            key: type.id || index,
                            value: type.id,
                            text: type.name
                        }));
                        setGetStudyLevel(studyLevelArray);
                    }
                }
            } catch (error) {
                console.error("Error fetching study levels:", error);
                // Aquí puedes manejar el error como desees
            }
        };
        fetchStudyLevel();
    }, [getStudyLevel]);

    /**
     * Efecto para cargar driver_license desde la API al cargar el componente.
     */
    useEffect(() => {
        const fetchDriverLicense = async () => {
            try {
                if (!driverLicense || size(driverLicense) === 0) {
                    const response = await ApiRemunerate.get(`/lists/listsvaluesbyid/41`);
                    const { data } = response.data;
                    if (data) {
                        const driverLicenseArray = data.values.map((type, index) => ({
                            key: type.id || index,
                            value: type.id,
                            text: type.name
                        }));
                        setDriverLicense(driverLicenseArray);
                    }
                }
            } catch (error) {
                //console.error("Error fetching driver licenses:", error);
                // Aquí puedes manejar el error como desees
            }
        };
        fetchDriverLicense();
    }, [driverLicense]);

    /**
     * Efecto para cargar profession desde la API al cargar el componente.
     */
    useEffect(() => {
        const fetchProfession = async () => {
            try {
                if (!getProfession || size(getProfession) === 0) {
                    const response = await ApiRemunerate.get(`/lists/listsvaluesbyid/22`);
                    const { data } = response.data;
                    if (data) {
                        const professionArray = data.values.map((type, index) => ({
                            key: type.id || index,
                            value: type.id,
                            text: type.name
                        }));
                        setGetProfession(professionArray);
                    }
                }
            } catch (error) {
                console.error("Error fetching professions:", error);
                // Aquí puedes manejar el error como desees
            }
        };
        fetchProfession();
    }, [getProfession]);

    /**
     * Efecto para cargar occupational_level desde la API al cargar el componente.
     */
    useEffect(() => {
        const fetchOccupationalLevel = async () => {
            try {
                if (!occupationalLevel || size(occupationalLevel) === 0) {
                    const response = await ApiRemunerate.get(`/lists/listsvaluesbyid/40`);
                    const { data } = response.data;
                    if (data) {
                        const occupationalLevelArray = data.values.map((type, index) => ({
                            key: type.id || index,
                            value: type.id,
                            text: type.name
                        }));
                        setOccupationalLevel(occupationalLevelArray);
                    }
                }
            } catch (error) {
                // console.error("Error fetching occupational levels:", error);
                // Aquí puedes manejar el error como desees
            }
        };
        fetchOccupationalLevel();
    }, [occupationalLevel]);

    /**
     * Efecto para cargar relation desde la API al cargar el componente.
     */
    useEffect(() => {
        const fetchRelation = async () => {
            try {
                if (!getRelation || size(getRelation) === 0) {
                    const response = await ApiRemunerate.get(`/lists/listsvaluesbyid/23`);
                    const { data } = response.data;
                    if (data) {
                        const relationArray = data.values.map((type, index) => ({
                            key: type.id || index,
                            value: type.id,
                            text: type.name
                        }));
                        setGetRelation(relationArray);
                    }
                }
            } catch (error) {
                console.error("Error fetching relations:", error);
                // Aquí puedes manejar el error como desees
            }
        };
        fetchRelation();
    }, [getRelation]);

    /**
     * Efecto para cargar countries desde la API al cargar el componente.
     */
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                if (!getCountries || size(getCountries) === 0) {
                    const response = await ApiRemunerate.get(`/utils/countries`);
                    const { data } = response.data;
                    if (data) {
                        const countriesArray = data.map((type, index) => ({
                            key: type.id || index,
                            value: type.id,
                            text: type.name
                        }));
                        setGetCountries(countriesArray);
                    }
                }
            } catch (error) {
                console.error("Error fetching countries:", error);
                // Aquí puedes manejar el error como desees
            }
        };
        fetchCountries();
    }, [getCountries]);

    /**
     * Efecto para cargar AFP desde la API al cargar el componente.
     */
    useEffect(() => {
        const fetchAFP = async () => {
            try {
                if (!getAFP || size(getAFP) === 0) {
                    const response = await ApiRemunerate.get(`/institutions/listinstitutionsbycondition/1`);
                    const { data } = response.data;
                    if (data) {
                        const afpArray = data.map((type, index) => ({
                            key: type.id || index,
                            value: type.id,
                            text: type.name
                        }));
                        setGetAFP(afpArray);
                    }
                }
            } catch (error) {
                console.error("Error fetching AFP:", error);
                // Aquí puedes manejar el error como desees
            }
        };
        fetchAFP();
    }, [getAFP]);

    /**
     * Efecto para cargar ISAPRE desde la API al cargar el componente.
     */
    useEffect(() => {
        const fetchISAPRE = async () => {
            try {
                if (!getISAPRE || size(getISAPRE) === 0) {
                    const response = await ApiRemunerate.get(`/institutions/listinstitutionsbycondition/2`);
                    const { data } = response.data;
                    if (data) {
                        const isapreArray = data.map((type, index) => ({
                            key: type.id || index,
                            value: type.id,
                            text: type.name
                        }));
                        setGetISAPRE(isapreArray);
                    }
                }
            } catch (error) {
                console.error("Error fetching ISAPRE:", error);
                // Aquí puedes manejar el error como desees
            }
        };
        fetchISAPRE();
    }, [getISAPRE]);

    /**
     * Efecto para cargar PAYMENT METHODS desde la API al cargar el componente.
     */
    useEffect(() => {
        const fetchPaymentMethods = async () => {
            try {
                if (!getPaymentMethods || size(getPaymentMethods) === 0) {
                    const response = await ApiRemunerate.get(`/lists/listsvaluesbyid/19`);
                    const { data } = response.data;
                    if (data) {
                        const paymentMethodsArray = data.values.map((type, index) => ({
                            key: type.id || index,
                            value: type.id,
                            text: type.name
                        }));
                        setGetPaymentMethods(paymentMethodsArray);
                    }
                }
            } catch (error) {
                console.error("Error fetching payment methods:", error);
                // Aquí puedes manejar el error como desees
            }
        };
        fetchPaymentMethods();
    }, [getPaymentMethods]);

    /**
     * Efecto para cargar BANKS desde la API al cargar el componente.
     */
    useEffect(() => {
        const fetchBanks = async () => {
            try {
                if (!getBanks || size(getBanks) === 0) {
                    const response = await ApiRemunerate.get(`/lists/listsvaluesbyid/1`);
                    const { data } = response.data;
                    if (data) {
                        const banksArray = data.values.map((type, index) => ({
                            key: type.id || index,
                            value: type.id,
                            text: type.name
                        }));
                        setGetBanks(banksArray);
                    }
                }
            } catch (error) {
                console.error("Error fetching banks:", error);
                // Aquí puedes manejar el error como desees
            }
        };
        fetchBanks();
    }, [getBanks]);

    /**
     * Efecto para cargar COMPANIES desde la API al cargar el componente.
     */
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                if (!getCompanies || size(getCompanies) === 0) {
                    const response = await ApiRemunerate.get(`/companies`);
                    const { data } = response.data;
                    if (data) {
                        const companiesArray = data.map((type, index) => ({
                            key: type.id || index,
                            value: type.id,
                            text: type.business_name
                        }));
                        setGetCompanies(companiesArray);
                    }
                }
            } catch (error) {
                console.error("Error fetching companies:", error);
                // Aquí puedes manejar el error como desees
            }
        };
        fetchCompanies();
    }, [getCompanies]);

    const validationSchema = Yup.object().shape({
        type_document: Yup.string().required("Tipo de documento es requerido"),
        document_number: Yup.string().required("Número de documento es requerido"),
        name: Yup.string().required("Nombre es requerido"),
        lastname: Yup.string().required("Apellido es requerido"),
        gender: Yup.string().required("Género es requerido"),
        civilianInformation: Yup.object().shape({
            birthdate: Yup.string().required("Fecha de nacimiento es requerida"),
            civil_status: Yup.string().required("Estado civil es requerido"),
            study_level: Yup.number().required("Nivel de estudio es requerido"),
            driver_license: Yup.number().required("Licencia de conducir es requerida"),
            profession: Yup.string().required("Profesión es requerida")
        }),
        socialInformation: Yup.object().shape({
            email: Yup.string().email('Formato de correo electrónico inválido').required('Email es requerido'),
            phone: Yup.string().required('Teléfono es requerido')
        }),
        addressInformation: Yup.array().of(
            Yup.object().shape({
                address: Yup.string().required("Dirección es requerida"),
                department_number: Yup.string().required("Número de departamento es requerido"),
                housing_type: Yup.string().required("Tipo de vivienda es requerido"),
                sys_community_id: Yup.number().required("Comunas es requerido")
            })
        ),
        healthPension: Yup.object().shape({
            sys_countries_id: Yup.number().required("ID de país es requerido"),
            family_allowance_section: Yup.string().required("Sección de asignación familiar es requerida"),
            retired: Yup.string().required("Estado de retiro es requerido"),
        }),
        paymentMethod: Yup.object().shape({
            sys_companies_id: Yup.number().required("La Empresa es requerida"),
            payment_method: Yup.number().required("Método de pago es requerido"),
            bank: Yup.number().required("Banco es requerido"),
            current_account_number: Yup.string().required("Número de cuenta corriente es requerido"),
            payment_percentage: Yup.string().required("Porcentaje de pago es requerido"),
            type_payment_method: Yup.string().required("Tipo de método de pago es requerido"),
        })
    });

    const formik = useFormik({
        initialValues,
        enableReinitialize: true, // Permite que el formulario se reinicie con los nuevos valores iniciales
        validationSchema,
        onSubmit: async (formData) => {
            console.log(formData)
            try {
                if (id) {
                    console.log(formData);
                    // Actualizar COMPANIAS existente
                    ApiRemunerate.put(`/employees/update/${id}`, {
                        ...formData,
                        phone: formData.socialInformation.phone
                    })
                    .then(response => {
                        toast.success('EMPLEADO actualizada con éxito');
                        navigate("/employees");
                    })
                    .catch((error) => {
                        toast.error('Error al actualizar EMPLEADO');
                    });
                } else {
                    // Crear una nueva EMPLEADO
                    
                    ApiRemunerate.post(`/employees/create`, {
                        ...formData,
                        phone: formData.socialInformation.phone
                    })
                    .then(response => {
                        if(response){
                            toast.success('EMPLEADO registrado con exito');
                            navigate("/employees");
                        }
                    })
                    .catch((error) => {
                        toast.warning(error.message)
                    })
                }
            } catch (error) {
                toast.warning(error.message)
            }
        }
    });

    return {
        formik,
        profile,
        getAFP,
        getBanks,
        getISAPRE,
        getRegions,
        getCommunes,
        getRelation,
        getCompanies,
        getCountries,
        getStudyLevel,
        driverLicense,
        getProfession,
        getPaymentMethods,
        occupationalLevel,
        getAllCommunes
    }
}

export default useEmployeesViewModel;
