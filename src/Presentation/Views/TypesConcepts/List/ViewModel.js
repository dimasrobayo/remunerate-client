import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { allTypesConcepts, softDeleteTypesConcepts } from '../../../../Store/Slices/typesConceptsSlice';
import { ApiRemunerate } from '../../../../Store/utils/ApiRemunerate';

const useTypesConceptsViewModel = () => {
    const dispatch = useDispatch();
    const [typesConcepts, setTypesConcepts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
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

    return {
        typesConcepts,
        profile,
        pageSize,
        currentPage,
        setCurrentPage,
        deleteTypesConcepts
    }
}

export default useTypesConceptsViewModel;