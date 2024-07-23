import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik'
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { ApiRemunerate } from '../../../../Store/utils/ApiRemunerate';
import { useDispatch } from 'react-redux';
import { size } from 'lodash';

const useCreateInternalCategoryViewModel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [getListTypeLRE, setGetListTypeLRE] = useState([]);
    const { id } = useParams(); // Para obtener el ID de la URL
    const profile = JSON.parse(localStorage.getItem(('my_profile')));
    const [initialValues, setInitialValues] = useState({ code: '', description: '' });

    useEffect(() => {
        if (id) {
            ApiRemunerate.get(`/remunerationbook/remunerationbookbyid/${id}`)
                .then(response => {
                    const { data } = response.data;
                    setInitialValues({ type: data.type, code: data.code, description: data.description });
                })
                .catch(error => {
                    toast.error('Error al cargar los datos de del LRE');
                });
        }
    }, [id]);

    /**
     * Efecto para cargar los LRE desde la API al cargar el componente.
     */
    useEffect(() => {
        if (!getListTypeLRE || size(getListTypeLRE) === 0) {
            ApiRemunerate.get(`/remunerationbook/listtypelre`)
            .then(response => {
                const { data } = response.data;
                if (data) {
                    const typeLREArray = data.map((type, index) => {
                        return {
                            key: type.id || index,
                            value: type.id,
                            text: type.description
                        };
                    });
                    setGetListTypeLRE(typeLREArray);
                }
            });
        }
    }, [getListTypeLRE]);

    const formik = useFormik({
        initialValues,
        enableReinitialize: true, // Permite que el formulario se reinicie con los nuevos valores iniciales
        validationSchema: Yup.object({
            description: Yup.string()
                .required("La GLOSA es requerida!")
                .min(3, 'El GLOSA debe tener un minimo de 3 caracteres')
                .max(100, 'El GLOSA debe tener un maximo de 1000 caracteres'),
        }),
        onSubmit: async (formData) => {
            try {
                if (id) {
                    // Actualizar categoría interna existente
                    ApiRemunerate.put(`/remunerationbook/update/${id}`, formData)
                        .then(response => {
                            toast.success('LRE actualizada con éxito');
                            navigate("/remunerationbook");
                        })
                        .catch((error) => {
                            toast.error('Error al actualizar LRE');
                        });
                } else {
                    ApiRemunerate.post(`/remunerationbook/create`, formData)
                    .then(response => {
                        if(response){
                            toast.success('LRE registrado con exito');
                            navigate("/remunerationbook");
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
        profile,
        getListTypeLRE,
        formik
    }
}

export default useCreateInternalCategoryViewModel;
