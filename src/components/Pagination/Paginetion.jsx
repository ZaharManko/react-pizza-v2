import stylle from './Paginetion.module.scss'
import ReactPaginate from 'react-paginate';
import { setCurrentPage } from '../../redux/slices/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
const Pagination = (props) => {
    const pageState = useSelector((state) => {
        return state.filter.currentPage;
    });
    const dispatch = useDispatch();

    // Отримання загальної кількості сторінок зі state або змініть це значення відповідно до вашого потребу
    const totalPageCount = 10; // Приклад, ви можете отримати це значення зі state або іншого місця

    return (
        <ReactPaginate
            className={stylle.pagination}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(event) => {
                dispatch(setCurrentPage(event.selected + 1));
            }}
            pageRangeDisplayed={3}
            pageCount={totalPageCount}
            forcePage={pageState - 1}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    );
};
export default Pagination