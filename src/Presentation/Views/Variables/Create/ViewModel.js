import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ApiRemunerate } from '../../../../Store/utils/ApiRemunerate';

const useFormRegisterViewModel = () => {
    const navigate = useNavigate();
    const profile = JSON.parse(localStorage.getItem(('my_profile')));
    const [initialValues, setInitialValues] = useState({ 
        value_uf: null,
        value_utm: null,
        renta_minima: null,
        tope_imponible_afp: null,
        tope_imponible_seguro_cesantia: null,
		seguro_invalidez_sobrevivencia: null,
		tope_imponible_sistema_antiguo: null,
		escala_1a: null
    });

    useEffect(() => {
        ApiRemunerate.get(`indicadoresprevired`)
        .then(response => {
            const { data } = response.data;

            setInitialValues({
                value_uf: data.value_uf,
                value_utm: data.value_utm,
                renta_minima: data.renta_minima,
                tope_imponible_afp: data.tope_imponible_afp,
                tope_imponible_seguro_cesantia: data.tope_imponible_seguro_cesantia,
                seguro_invalidez_sobrevivencia: data.seguro_invalidez_sobrevivencia,
                tope_imponible_sistema_antiguo: data.tope_imponible_sistema_antiguo,
                escala_1a: data.escala_1a
            });
        })
        .catch(error => {
            toast.error('Error al cargar los valores generales.');
        });
    }, []);

    const formik = useFormik({
        initialValues,
        enableReinitialize: true, // Permite que el formulario se reinicie con los nuevos valores iniciales
        validationSchema: Yup.object({
            value_uf: Yup.string()
                .required('El valor de la UF es requerido.'),
                value_utm: Yup.string()
                .required('El valor de la UTM es requerido.')
        }),
        onSubmit: async (formData) => {
            try {
                // Actualizar VALORES existente
                ApiRemunerate.get(`/indicadoresprevired`, {
                    ...formData
                })
                .then(response => {
                    const { data, message } = response.data;
                    setInitialValues({
                        value_uf: data.value_uf,
                        value_utm: data.value_utm,
                        renta_minima: data.renta_minima,
                        tope_imponible_afp: data.tope_imponible_afp,
                        tope_imponible_seguro_cesantia: data.tope_imponible_seguro_cesantia,
                        seguro_invalidez_sobrevivencia: data.seguro_invalidez_sobrevivencia,
                        tope_imponible_sistema_antiguo: data.tope_imponible_sistema_antiguo,
                        escala_1a: data.escala_1a
                    });
                    
                    toast.success(message);
                    navigate(`/variables`);
                })
                .catch((error) => {
                    toast.error('Error al actualizar los valores');
                });
            } catch (error) {
                toast.warning(error.message)
            }
        }
    });

    return {
        formik,
        profile,
    }
}

export default useFormRegisterViewModel;
