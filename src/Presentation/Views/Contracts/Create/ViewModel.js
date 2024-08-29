import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { size } from 'lodash';
import { useFormik } from 'formik'
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { ApiRemunerate } from '../../../../Store/utils/ApiRemunerate';

const useEmployeesViewModel = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Para obtener el ID de la URL
    const profile = JSON.parse(localStorage.getItem(('my_profile')));
    const [idUpdate, setIdUpdate] = useState(null);
    const [getAgrupacionSeguridad, setGetAgrupacionSeguridad] = useState([]);
    const [getArea, setGetArea] = useState([]);
    const [getCargo, setGetCargo] = useState([]);
    const [getSede, setGetSede] = useState([]);
    const [getCentroCosto, setGetCentroCosto] = useState([]);
    const [getSindicato, setGetSindicato] = useState([]);
    const [getSupervisorDirecto, setGetSupervisorDirecto] = useState([]);
    const [getCategoriasINE, setGetCategoriasINE] = useState([]);
    const [getOcupacion, setGetOcupacion] = useState([]);
    const [getZonaExtrema, setGetZonaExtrema] = useState([]);
    const [getCausalFiniquito, setGetCausalFiniquito] = useState([]);
    const [initialValues, setInitialValues] = useState({ 
        status: '',
        nombre_contrato: '',
        tipo_contrato: '',
        afecto_trato: '', 
        fecha_inicio: '',
        cambio_indefinido: '',
        agrupacion_seguridad: null,
        sueldo_base: 0,
        area: null,
        cargo: null,
        sede: null,
        centro_costo: null,
        sindicato: null,
        direccion_laboral: '',
        supervisor_directo: null,
        categoria_ine: null,
        ocupacion: null,
        modalidad_contrato: '',
        horas_semanales: '',
        distribucion_jornada: '',
        jornada_parcial: false,
        teletrabajo: false,
        fecha_incorperacion_cotiza: '',
        cotizacion: 0,
        nivel_sence: null,
        zona_extrema: null,
        cotiza_trabajo_pesado: false,
        seguro_cesantia: false,
        sueldo_patronal: false,
        fecha_termino: '',
        causal_termino: '',
        fecha_primera_renovacion: '',
        fecha_segunda_renovacion: ''
    });
    const formatDate = (dateString) => {
        return dateString ? new Date(dateString).toISOString().split('T')[0] : '';
    };

    useEffect(() => {
        if (id) {
            ApiRemunerate.get(`/contracts/${id}`)
                .then(response => {
                    const { data } = response.data;
                    (data.length > 0) && setIdUpdate(data[0].id)

                    setInitialValues({
                        status: data[0].status || 1,
                        nombre_contrato: data[0].nombre_contrato || '',
                        tipo_contrato: data[0].tipo_contrato || '',
                        afecto_trato: data[0].afecto_trato || '',
                        fecha_inicio: data[0].fecha_inicio || null,
                        cambio_indefinido: data[0].cambio_indefinido || '',
                        agrupacion_seguridad: data[0].agrupacion_seguridad || '',
                        sueldo_base: data[0].sueldo_base || 0,
                        area: data[0].area || null,
                        cargo: data[0].cargo || null,
                        sede: data[0].sede || null,
                        centro_costo: data[0].centro_costo || null,
                        sindicato: data[0].sindicato || null,
                        direccion_laboral: data[0].direccion_laboral || '',
                        supervisor_directo: data[0].supervisor_directo || null,
                        categoria_ine: data[0].categoria_ine || null,
                        ocupacion: data[0].ocupacion || null,
                        modalidad_contrato: data[0].modalidad_contrato || '',
                        horas_semanales: data[0].horas_semanales || '',
                        distribucion_jornada: data[0].distribucion_jornada || '',
                        jornada_parcial: data[0].jornada_parcial || null,
                        teletrabajo: data[0].teletrabajo || null,
                        fecha_incorperacion_cotiza: formatDate(data[0].fecha_incorperacion_cotiza) || null,
                        cotizacion: data[0].cotizacion || null,
                        nivel_sence: data[0].nivel_sence || null,
                        zona_extrema: data[0].zona_extrema || null,
                        cotiza_trabajo_pesado: data[0].cotiza_trabajo_pesado || null,
                        seguro_cesantia: data[0].seguro_cesantia || null,
                        sueldo_patronal: data[0].sueldo_patronal || null,
                        fecha_termino: formatDate(data[0].fecha_termino) || null,
                        causal_termino: data[0].causal_termino || null,
                        fecha_primera_renovacion: formatDate(data[0].fecha_primera_renovacion) || null,
                        fecha_segunda_renovacion: formatDate(data[0].fecha_segunda_renovacion) || null
                    });
                })
                .catch(error => {
                    if (error.response) {
                        if (error.response.status === 404) {
                            toast.error('Contrato no encontrado');
                            navigate(`/contrats/${id}`);
                        }
                    }
                });
        }
    }, [id, navigate]);

    /**
     * Efecto para cargar AgrupacionSeguridad desde la API al cargar el componente.
     */
    useEffect(() => {
        const fetchAgrupacionSeguridad = async () => {
            try {
                if (!getAgrupacionSeguridad || size(getAgrupacionSeguridad) === 0) {
                    const response = await ApiRemunerate.get(`/lists/listsvaluesbyid/3`);
                    const { data } = response.data;
                    if (data) {
                        const agrupacionSeguridadArray = data.values.map((type, index) => ({
                            key: type.id || index,
                            value: type.id,
                            text: type.name
                        }));
                        setGetAgrupacionSeguridad(agrupacionSeguridadArray);
                    }
                }
            } catch (error) {
                console.error("Error fetching study levels:", error);
                // Aquí puedes manejar el error como desees
            }
        };
        fetchAgrupacionSeguridad();
    }, [getAgrupacionSeguridad]);

    /**
     * Efecto para cargar getArea desde la API al cargar el componente.
     */
    useEffect(() => {
        const fetchArea = async () => {
            try {
                if (!getArea || size(getArea) === 0) {
                    const response = await ApiRemunerate.get(`/lists/listsvaluesbyid/4`);
                    const { data } = response.data;
                    if (data) {
                        const areaArray = data.values.map((type, index) => ({
                            key: type.id || index,
                            value: type.id,
                            text: type.name
                        }));
                        setGetArea(areaArray);
                    }
                }
            } catch (error) {
                console.error("Error fetching study levels:", error);
                // Aquí puedes manejar el error como desees
            }
        };
        fetchArea();
    }, [getArea]);

    /**
     * Efecto para cargar getCargo desde la API al cargar el componente.
     */
    useEffect(() => {
        const fetchCargo = async () => {
            try {
                if (!getCargo || size(getCargo) === 0) {
                    const response = await ApiRemunerate.get(`/lists/listsvaluesbyid/2`);
                    const { data } = response.data;
                    if (data) {
                        const CargoArray = data.values.map((type, index) => ({
                            key: type.id || index,
                            value: type.id,
                            text: type.name
                        }));
                        setGetCargo(CargoArray);
                    }
                }
            } catch (error) {
                console.error("Error fetching study levels:", error);
                // Aquí puedes manejar el error como desees
            }
        };
        fetchCargo();
    }, [getCargo]);

    /**
     * Efecto para cargar getSede desde la API al cargar el componente.
     */
    useEffect(() => {
        const fetchSede = async () => {
            try {
                if (!getSede || size(getSede) === 0) {
                    const response = await ApiRemunerate.get(`/lists/listsvaluesbyid/25`);
                    const { data } = response.data;
                    if (data) {
                        const SedeArray = data.values.map((type, index) => ({
                            key: type.id || index,
                            value: type.id,
                            text: type.name
                        }));
                        setGetSede(SedeArray);
                    }
                }
            } catch (error) {
                console.error("Error fetching study levels:", error);
                // Aquí puedes manejar el error como desees
            }
        };
        fetchSede();
    }, [getSede]);

    /**
     * Efecto para cargar getCentroCosto desde la API al cargar el componente.
     */
    useEffect(() => {
        const fetchCentroCosto = async () => {
            try {
                if (!getCentroCosto || size(getCentroCosto) === 0) {
                    const response = await ApiRemunerate.get(`/lists/listsvaluesbyid/13`);
                    const { data } = response.data;
                    if (data) {
                        const centroCostoArray = data.values.map((type, index) => ({
                            key: type.id || index,
                            value: type.id,
                            text: type.name
                        }));
                        setGetCentroCosto(centroCostoArray);
                    }
                }
            } catch (error) {
                console.error("Error fetching study levels:", error);
                // Aquí puedes manejar el error como desees
            }
        };
        fetchCentroCosto();
    }, [getCentroCosto]);

    /**
     * Efecto para cargar getSindicato desde la API al cargar el componente.
     */
    useEffect(() => {
        const fetchSindicato = async () => {
            try {
                if (!getSindicato || size(getSindicato) === 0) {
                    const response = await ApiRemunerate.get(`/lists/listsvaluesbyid/24`);
                    const { data } = response.data;
                    if (data) {
                        const sindicatoArray = data.values.map((type, index) => ({
                            key: type.id || index,
                            value: type.id,
                            text: type.name
                        }));
                        setGetSindicato(sindicatoArray);
                    }
                }
            } catch (error) {
                console.error("Error fetching study levels:", error);
                // Aquí puedes manejar el error como desees
            }
        };
        fetchSindicato();
    }, [getSindicato]);

    /**
     * Efecto para cargar supervisor_directo desde la API al cargar el componente.
     */
    useEffect(() => {
        const fetchSupervisorDirecto = async () => {
            try {
                if (!getSupervisorDirecto || size(getSupervisorDirecto) === 0) {
                    const response = await ApiRemunerate.get(`/employees/list`);
                    const { data } = response.data;

                    if (data) {
                        const supervisorDirecctoArray = data.map((supervisor, index) => ({
                            key: supervisor.id || index,
                            value: supervisor.id,
                            text: supervisor.name + ' ' + supervisor.lastname
                        }));
                        setGetSupervisorDirecto(supervisorDirecctoArray);
                    }
                }
            } catch (error) {
                console.error("Error fetching employees:", error);
                // Aquí puedes manejar el error como desees
            }
        };
        fetchSupervisorDirecto();
    }, [getSupervisorDirecto]);

    /**
     * Efecto para cargar getCategoriasINE desde la API al cargar el componente.
     */
    useEffect(() => {
        const fetchCategoriasINE = async () => {
            try {
                if (!getCategoriasINE || size(getCategoriasINE) === 0) {
                    const response = await ApiRemunerate.get(`/lists/listsvaluesbyid/11`);
                    const { data } = response.data;
                    if (data) {
                        const categoriasINEArray = data.values.map((type, index) => ({
                            key: type.id || index,
                            value: type.id,
                            text: type.name
                        }));
                        setGetCategoriasINE(categoriasINEArray);
                    }
                }
            } catch (error) {
                console.error("Error fetching study levels:", error);
                // Aquí puedes manejar el error como desees
            }
        };
        fetchCategoriasINE();
    }, [getCategoriasINE]);

    /**
     * Efecto para cargar getOcupacion desde la API al cargar el componente.
     */
    useEffect(() => {
        const fetchOcupacion = async () => {
            try {
                if (!getOcupacion || size(getOcupacion) === 0) {
                    const response = await ApiRemunerate.get(`/lists/listsvaluesbyid/40`);
                    const { data } = response.data;
                    if (data) {
                        const ocupacionArray = data.values.map((value, index) => ({
                            key: value.id || index,
                            value: value.id,
                            text: value.name
                        }));
                        setGetOcupacion(ocupacionArray);
                    }
                }
            } catch (error) {
                console.error("Error fetching study levels:", error);
                // Aquí puedes manejar el error como desees
            }
        };
        fetchOcupacion();
    }, [getOcupacion]);

    /**
     * Efecto para cargar getZonaExtrema desde la API al cargar el componente.
     */
    useEffect(() => {
        const fetchZonaExtrema = async () => {
            try {
                if (!getZonaExtrema || size(getZonaExtrema) === 0) {
                    const response = await ApiRemunerate.get(`/lists/listsvaluesbyid/26`);
                    const { data } = response.data;
                    if (data) {
                        const zonaExtremaArray = data.values.map((value, index) => ({
                            key: value.id || index,
                            value: value.id,
                            text: value.name
                        }));
                        setGetZonaExtrema(zonaExtremaArray);
                    }
                }
            } catch (error) {
                console.error("Error fetching study levels:", error);
                // Aquí puedes manejar el error como desees
            }
        };
        fetchZonaExtrema();
    }, [getZonaExtrema]);

    /**
     * Efecto para cargar getCausalFiniquito desde la API al cargar el componente.
     */
    useEffect(() => {
        const fetchCausalFiniquito = async () => {
            try {
                if (!getCausalFiniquito || size(getCausalFiniquito) === 0) {
                    const response = await ApiRemunerate.get(`/lists/listsvaluesbyid/12`);
                    const { data } = response.data;
                    if (data) {
                        const causalFiniquitoArray = data.values.map((value, index) => ({
                            key: value.id || index,
                            value: value.id,
                            text: value.name
                        }));
                        setGetCausalFiniquito(causalFiniquitoArray);
                    }
                }
            } catch (error) {
                console.error("Error fetching study levels:", error);
                // Aquí puedes manejar el error como desees
            }
        };
        fetchCausalFiniquito();
    }, [getCausalFiniquito]);

    const validationSchema = Yup.object().shape({
        status: Yup.string().required("El estado es requerido"),
        nombre_contrato: Yup.string().required("El nombre del contrato es requerido"),
        tipo_contrato: Yup.string().required("El tipo de contrato es requerido"),
        afecto_trato: Yup.string().required("El afecto trato es requerido"),
        fecha_inicio: Yup.date().required("La fecha de inicio es requerida"),
        cambio_indefinido: Yup.date().required("La fecha de cambio a indefinido es requerida"),
        agrupacion_seguridad: Yup.number().nullable().required("La agrupación de seguridad es requerida"),
        sueldo_base: Yup.number().required("El sueldo base es requerido"),
        area: Yup.number().nullable().required("El área es requerida"),
        cargo: Yup.number().nullable().required("El cargo es requerido"),
        sede: Yup.number().nullable().required("La sede es requerida"),
        centro_costo: Yup.number().nullable().required("El centro de costo es requerido"),
        sindicato: Yup.number().nullable().required("El sindicato es requerido"),
        supervisor_directo: Yup.number().nullable().required("El supervisor directo es requerido"),
        categoria_ine: Yup.number().nullable().required("La categoría INE es requerida"),
        ocupacion: Yup.number().nullable().required("La ocupación es requerida"),
        horas_semanales: Yup.number().nullable().required("Las horas semanales es requerida"),
    });

    const formik = useFormik({
        initialValues,
        enableReinitialize: true, // Permite que el formulario se reinicie con los nuevos valores iniciales
        validationSchema,
        onSubmit: async (formData) => {
            try {
                if (idUpdate) {
                    // Actualizar CONTRATO existente
                    ApiRemunerate.put(`/contracts/update/${idUpdate}`, {
                        ...formData
                    })
                    .then(response => {
                        toast.success('CONTRATO actualizada con éxito');
                        navigate(`/contracts/${id}`);
                    })
                    .catch((error) => {
                        toast.error('Error al actualizar CONTRATO');
                    });
                } else {
                    // Crear una nueva CONTRATO
                    ApiRemunerate.post(`/contracts/create`, {
                        ...formData,
                        user_personal_info_id: parseInt(id, 10)
                    })
                    .then(response => {
                        if(response){
                            toast.success('CONTRATO registrado con exito');
                            navigate(`/contracts/${id}`);
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
        getAgrupacionSeguridad,
        getArea,
        getCargo,
        getSede,
        getCentroCosto,
        getSindicato,
        getSupervisorDirecto,
        getCategoriasINE,
        getOcupacion,
        getZonaExtrema,
        getCausalFiniquito
    }
}

export default useEmployeesViewModel;
