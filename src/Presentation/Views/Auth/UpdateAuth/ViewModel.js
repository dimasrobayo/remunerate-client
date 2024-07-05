import { useState } from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { ApiRemunerate } from '../../../../Store/utils/ApiRemunerate';
import { updateMyProfileGlobalState } from '../../../../Store/Slices/accountUserSlice'
import { useNavigate } from 'react-router-dom';

const UpdateProfileViewModel = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const [tabWiew, setTabWiew] = useState(0);
    const profile = JSON.parse(localStorage.getItem(('my_profile')));
    
    const {
        id,
        name, 
        lastname, 
        mother_lastname, 
        type_document, 
        document_number, 
        gender, 
        phone, 
        my_color,
        roles, 
        email,
        session_token,
        civilian_information,
        health_information
    } = profile;

    const [newColor, setNewColor] = useState(my_color);

    const handleNewColorChange = (newColor) => {
        setNewColor(newColor.hex);
    };

    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleChange = (event, newValue) => {
        setTabWiew(newValue);
    };

    const initialValues = () => {
        return {
            name: name,
            lastname: lastname,
            mother_lastname: mother_lastname,
            type_document: type_document,
            document_number: document_number,
            gender: gender,
            email: email,
            phone: phone,
            myColor: my_color,
            roles: roles,
            birthdate: civilian_information.birthdate,
            country_birth: civilian_information.country_birth,
            nationality: civilian_information.nationality,
            blood_type: health_information.blood_type,
            allergy: health_information.allergy,
            observation: health_information.observation
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
                .required("Email es requerido!")
        }),
        onSubmit: async (formData) => {
            const userUpdate = {
                "id": id,
                "name": formData.name,
                "lastname": formData.lastname,
                "mother_lastname": formData.mother_lastname,
                "type_document": formData.type_document,
                "document_number": formData.document_number,
                "gender": formData.gender,
                "phone": formData.phone, 
                "email": formData.email,
                "my_color":newColor,
                "roles":roles[0],
                "civilian_information": {
                    "birthdate": formData.birthdate,
                    "country_birth": formData.country_birth,
                    "nationality": formData.nationality
                },
                "social_information":{
                    "email": formData.email,
                    "phone": formData.phone
                },
                "health_information":{
                    "blood_type": formData.blood_type,
                    "allergy": formData.allergy,
                    "observation": formData.observation
                }
            }

            try {
                const updateProfile = await ApiRemunerate.put('users/updateWithOutImage', userUpdate);
                const { success, message, data } = updateProfile.data;
                if(success){
                    data.session_token = session_token;
                    dispatch(updateMyProfileGlobalState(data));
                    toast.success(message);
                    navigate(0, { replace: true });
                }
            } catch (error) {
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
        profile,
        formik,
        newColor,
        typeOptions,
        genderOptions,
        error,
        tabWiew, 
        setTabWiew,
        a11yProps,
        handleChange,
        setNewColor,
        handleNewColorChange
    }
}

export default UpdateProfileViewModel;