import { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const RegisterViewModel = () => {
    const [error, setError] = useState("");

    const initialValues = () => {
        return {
            name: "",
            lastname: "",
            mother_lastname: "",
            type_document: "",
            document_number: "",
            gender: "",
            phone: "",
            rol: "",
            email: "",
            password: "",
            repeatPassword: ""
        };
    }

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            name:Yup.string()
                .required("El nombre es requerido!"),
            lastname:Yup.string()
                .required("El apellido paterno es requerido!"),
            mother_lastname:Yup.string()
                .required("El apellido materno es requerido!"),
            type_document:Yup.string()
                .required("El tipo de documento es requerido!"),
            document_number:Yup.string()
                .required("El numero de documento es requerido!"),
            gender:Yup.string()
                .required("El genero es requerido!"),
            phone:Yup.string()
                .required("El teléfono es requerido!"),
            email: Yup.string()
                .email("El email es invalido!")
                .required("Email es requerido!"),
            password: Yup.string()
                .required("La contraseña es requerido!")
                .oneOf([Yup.ref("repeatPassword")], "Las contraseñas no son iguales"),
            repeatPassword: Yup.string()
                .required("La contraseña es requerido!")
                .oneOf([Yup.ref("password")], "Las contraseñas no son iguales"),
        }),
        onSubmit: async (formData) => {
            console.log(formData);
            formData = {
                "user": formData
            }
            try {
                const newUser = await axios.post(`users/register`, formData);
                const { data } = newUser;
                console.log(data)
            } catch (err) {
                setError(error.message)
                console.log(error)
            }
        }
    });

    const typeOptions = [
        { key: '1', value: 'run', text: 'RUN' },
        { key: '2', value: 'pasaporte', text: 'PASAPORTE' }
    ];

    const genderOptions = [
        { key: '1', value: 'femenino', text: 'FEMENINO' },
        { key: '2', value: 'masculino', text: 'MASCULINO' }
    ]

    return {
        formik,
        typeOptions,
        genderOptions,
        error
    }
}

export default RegisterViewModel;