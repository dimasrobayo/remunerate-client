import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { allInstitutions, softDeleteInstitutions } from '../../../../Store/Slices/institutionsSlice';
import { ApiRemunerate } from '../../../../Store/utils/ApiRemunerate';
import { filter } from 'lodash';

const useInstitutionsViewModel = () => {
    const dispatch = useDispatch();
    const [institutions, setInstitutions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const profile = JSON.parse(localStorage.getItem(('my_profile')));
    const [searchTerm, setSearchTerm] = useState(''); // Estado para almacenar el término de búsqueda
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

    // Función para filtrar las categorías internas según el término de búsqueda
    const filteredInstitutions = filter(selectedInstitutions, institution => {
        return institution.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    /**
    * Función utilitaria para paginar un array.
    * @param {Array} array - El array que se desea paginar.
    * @param {number} pageSize - Tamaño de la página.
    * @param {number} pageNumber - Número de la página actual.
    * @returns {Array} - Subconjunto paginado del array original.
    */
    const paginate = (array, pageSize, pageNumber) => {
        return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
    };

    const paginatedInstitutions = paginate(filteredInstitutions, pageSize, currentPage);

    return {
        profile,
        pageSize,
        currentPage,
        institutionOptions,
        selectedInstitution,
        selectedInstitutions,
        paginatedInstitutions,
        filteredInstitutions,
        searchTerm,
        setSearchTerm,
        deleteInstitutions,
        setCurrentPage,
        handleInstitutionChange
    }
}

export default useInstitutionsViewModel;