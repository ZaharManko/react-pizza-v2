import '../scss/app.scss';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import { useState, useEffect, useContext, useRef } from 'react';
import MyLoader from '../components/PizzaBlock/sceleton';
import Pagination from '../components/Pagination/Paginetion';
import { searchContext } from '../App';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import axios from 'axios';
import debounce from 'debounce';
import { useNavigate } from 'react-router-dom';
import { optionArry } from '../components/Sort';
import { clearBuscet } from '../redux/slices/cardSlice';
import qs from 'qs'
const Home = () => {
    const isMounted = useRef(false)
    const isSearch = useRef(false)//використовується цей хук щоб не відбувався перший раз рендер при зміні стейтй не рендерився весь компонент знову
    const navigate = useNavigate()
    const sortType = useSelector(state => {
        //console.log('state from home:   ', state.filter)// state from home:Object { categoriesId: NaN, currentPage: NaN, sort: undefined }
        return (state.filter.sort.sortProperty)
    }
    )
    //const sortType = useSelector(state => state.filter.sort?.sortProperty || 'SortProperty');
    const dispatch = useDispatch()//через те що у нас цей хук є лише у редаксі нам просто тре зробити змінну якій призначити той хук

    const category = useSelector((state) => {
        //(state)
        // console.log('CATEGORY ID:   ', state.filter.categoriesId)
        return (state.filter.categoriesId)
    });
    const currentPages = useSelector((state) => {

        return (
            state.filter.currentPage
        )
    })



    //деструктаризація контексту значення пошуку
    const { searchValue, setSearchValue } = useContext(searchContext)//useContext він робить оброботчик якщо змінюється контекст (дістає з контексту штуку)
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        //console.log('Category:', category);
        //console.log('Current Page:', currentPages);

        window.scrollTo(0, 0);
        if (!isSearch.current) {
            featchPizzas();
        }
        isSearch.current = false;
    }, [category, sortType, searchValue, currentPages]);
    const featchPizzas = async () => {
        setLoading(true);

        try {
            let url = `https://658c29fd859b3491d3f59d9a.mockapi.io/items?page=${currentPages}&&limit=20&sortBy=${sortType.replace('-', '')}&order=${sortType.includes('-') ? 'asc' : 'desc'}&category=${category === 0 ? '' : category}`;

            const response = await axios.get(url);
            setItems(response.data);
            //console.log('RENDER WAS HAPPENED!!!!');
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);

        }


    };



    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const values = Object.values(params);
            //console.log('PARAMS :     ', values)
            // Check if default values need to be set
            if (values[1] === "1" && values[2] === "1" || values[1] === "0" && values[2] === "1") {
                //console.log('we changed value:  ', values)
                dispatch(setFilters(['rating', 1, 0]));

            } else {
                dispatch(setFilters(values));
            }

            isSearch.current = true;
        }
    }, []);


    useEffect(() => {
        if (isMounted.current) {
            const quaryString = qs.stringify({
                sortType,
                category,
                currentPages,
            });
            navigate(`?${quaryString}`);
            console.log('string  your url:    ', quaryString);
        }
        isMounted.current = true;
    }, [category, sortType, searchValue, currentPages]);


    const emptyArray = new Array(10).fill(undefined);
    useEffect(() => {
        window.scrollTo(0, 0);
        if (!isSearch.current) {
            featchPizzas();
        }
        isSearch.current = false

    }, [category, sortType, searchValue, currentPages]);

    const pizzas = () => {

        if (searchValue !== '') {
            const filteredItems = items.filter(item => {
                return item.title.toLowerCase().includes(searchValue.toLowerCase());
            });

            const uniqueTitles = [...new Set(filteredItems.map(item => item.title))]; // Отримання унікальних назв

            return uniqueTitles.map(title => {
                const item = filteredItems.find(item => item.title === title); // Знаходження першого об'єкта з унікальною назвою
                return (
                    <PizzaBlock id={item.id} key={item.id} title={item.title} price={item.price} url={item.imageUrl} size={item.sizes} types={item.types} />
                );
            });
        } else {
            return items.map((item, index) => (
                <PizzaBlock id={item.id} key={item.id} title={item.title} price={item.price} url={item.imageUrl} size={item.sizes} types={item.types} />
            ));
        }

    }

    return (


        <div className='container'>
            <div className="content__top">
                <Categories />
                <Sort /*active={activeType} setActiveType={setActiveType} */ />


            </div>
            <h2 className="content__title" >Всі піцци</h2>
            <div className="content__items">

                {
                    loading ?
                        emptyArray.map((item, index) => {
                            return (
                                <MyLoader key={index} />
                            )
                        })

                        : pizzas()
                }
            </div>
            <Pagination />
        </div>
    )
}
export default Home