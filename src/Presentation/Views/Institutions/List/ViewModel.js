import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { allInstitutions, softDeleteInstitutions } from '../../../../Store/Slices/institutionsSlice';
import { ApiRemunerate } from '../../../../Store/utils/ApiRemunerate';

const useInstitutionsViewModel = () => {
    const dispatch = useDispatch();
    const [institutions, setInstitutions] = useState({});
    const profile = JSON.parse(localStorage.getItem(('my_profile')));
    const [selectedInstitution, setSelectedInstitution] = useState(null);

    useEffect(() => {
        const fetchInstitutions = async () => {
            try {
                const response = await ApiRemunerate.get(`/institutions`);
                const { data } = response.data;
                setInstitutions(data); // set to local state
                dispatch(allInstitutions(data)); // set to global state
            } catch (error) {
                toast.error('Error fetching institutions');
            }
        };
        fetchInstitutions();
    }, [dispatch]);

    const handleInstitutionChange = (e, { value }) => {
        setSelectedInstitution(value);
    };

    const institutionOptions = Array.isArray(institutions) ? institutions.map(institution => ({
        key: institution.id,
        text: institution.name,
        value: institution.id
    })) : [];

    const selectedInstitutions = selectedInstitution
        ? institutions.find(institution => institution.id === selectedInstitution)?.institutions || []
        : [];

    const deleteInstitutions = async (event, id) => {
        event.preventDefault();
        const thisClick = event.currentTarget;
        const deletedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

        try {
            const response = await ApiRemunerate.delete(`/institutions/delete/${id}`);

            if(response.status === 200){
                thisClick.closest('tr').remove();
                toast.success('Registro eliminado con exito!');
                dispatch(softDeleteInstitutions({id: id, deleted_at: deletedAt}));
            }else{
                toast.warning('Algo a salido mal, intente mas tarde!');
            }
        } catch (error) {
            toast.warning(error.message);
        }
    }

    return {
        profile,
        institutionOptions,
        selectedInstitutions,
        deleteInstitutions,
        handleInstitutionChange,
        selectedInstitution
    }
}

export default useInstitutionsViewModel;