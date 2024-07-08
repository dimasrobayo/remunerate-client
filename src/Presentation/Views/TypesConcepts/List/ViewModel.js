import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { ApiRemunerate } from '../../../../Store/utils/ApiRemunerate';
import { allTypesConcepts, softDeleteTypesConcepts } from '../../../../Store/Slices/typesConceptsSlice';
import { filter } from 'lodash';

const useTypesConceptsViewModel = () => {
    const dispatch = useDispatch();
    const [typesConcepts, setTypesConcepts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState(''); // Estado para almacenar el término de búsqueda
    const profile = JSON.parse(localStorage.getItem(('my_profile')));

    useEffect(() => {
        ApiRemunerate.get(`/typesconcepts`)
        .then(response => {
            const { data } = response.data;

            setTypesConcepts(data) // set to local state
            dispatch(allTypesConcepts(data)); // set to global state
        });
    }, [dispatch]);

    const deleteTypesConcepts = (event, typesConceptsId) => {
        event.preventDefault();
        const thisClick = event.currentTarget;
        const deletedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

        ApiRemunerate.delete(`/typesconcepts/delete/${typesConceptsId}`)
        .then(response => {
            const { status } = response

            if(status === 200){
                thisClick.closest('tr').remove();
                toast.success('Registro eliminado con exito!');
                dispatch(softDeleteTypesConcepts({id: typesConceptsId, deleted_at: deletedAt}));
            }else{
                toast.success('Algo a salido mal, intente mas tarde!');
            }
        })
        .catch((error) => {
            toast.warning((error))
        });
    }

    // Función para filtrar las categorías internas según el término de búsqueda
    const filteredTypesConcepts = filter(typesConcepts, category => {
        return category.name.toLowerCase().includes(searchTerm.toLowerCase());
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

    const paginatedTypesConcepts = paginate(filteredTypesConcepts, pageSize, currentPage);

    return {
        typesConcepts,
        profile,
        pageSize,
        searchTerm,
        currentPage,
        filteredTypesConcepts,
        paginatedTypesConcepts,
        setSearchTerm,
        setCurrentPage,
        deleteTypesConcepts
    }
}

export default useTypesConceptsViewModel;