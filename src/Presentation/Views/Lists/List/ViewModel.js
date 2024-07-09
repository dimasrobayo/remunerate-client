import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { allLists, softDeleteLists } from '../../../../Store/Slices/listsSlice';
import { ApiRemunerate } from '../../../../Store/utils/ApiRemunerate';
import { filter } from 'lodash';

const useListsViewModel = () => {
    const dispatch = useDispatch();
    const [lists, setLists] = useState([]);
    const [pageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState(''); // Estado para almacenar el término de búsqueda
    const profile = JSON.parse(localStorage.getItem(('my_profile')));
    const [selectedList, setSelectedList] = useState(null);

    useEffect(() => {
        const fetchLists = async () => {
            try {
                const response = await ApiRemunerate.get(`/lists`);
                const { data } = response.data;
                setLists(data); // set to local state
                dispatch(allLists(data)); // set to global state
            } catch (error) {
                toast.error('Error fetching lists');
            }
        };
        fetchLists();
    }, [dispatch]);

    const handleListsChange = (e, { value }) => {
        setSelectedList(value);
    };

    const listsOptions = Array.isArray(lists) ? lists.map(List => ({
        key: List.id,
        text: List.name,
        value: List.id
    })) : [];

    const selectedLists = selectedList
        ? lists.find(list => list.id === selectedList)?.values || []
        : [];

    const deleteLists = async (event, id) => {
        event.preventDefault();
        const thisClick = event.currentTarget;
        const deletedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

        try {
            const response = await ApiRemunerate.delete(`/lists/delete/${id}`);

            if(response.status === 200){
                thisClick.closest('tr').remove();
                toast.success('Registro eliminado con exito!');
                dispatch(softDeleteLists({id: id, deleted_at: deletedAt}));
            }else{
                toast.warning('Algo a salido mal, intente mas tarde!');
            }
        } catch (error) {
            toast.warning(error.message);
        }
    }

    // Función para filtrar las categorías internas según el término de búsqueda
    const filteredLists = filter(selectedLists, list => {
        return list.name.toLowerCase().includes(searchTerm.toLowerCase());
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

    const paginatedLists = paginate(filteredLists, pageSize, currentPage);

    return {
        profile,
        pageSize,
        searchTerm,
        currentPage,
        listsOptions,
        selectedList,
        selectedLists,
        filteredLists,
        paginatedLists,
        setSearchTerm,
        setCurrentPage,
        deleteLists,
        handleListsChange
    }
}

export default useListsViewModel;