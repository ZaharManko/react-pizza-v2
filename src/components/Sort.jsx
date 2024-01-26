import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setSort } from "../redux/slices/filterSlice"
export const optionArry = [
    { name: 'популярності ', sortProperty: 'rating' },
    { name: 'популярності (з менш популярних)', sortProperty: '-rating' },
    { name: 'ціні', sortProperty: 'price' },
    { name: 'ціні (з дишевших)', sortProperty: '-price' },
    { name: 'алфавіту', sortProperty: 'title' },
    { name: 'алфавіту (з кінця)', sortProperty: '-title' }
]
const Sort = (props) => {

    const dispatch = useDispatch()
    const sort = useSelector((state) => {
        return (state.filter.sort)
    })
    const [open, setOpen] = useState(false)
    const [option, setOption] = useState(0)


    const openFn = () => {
        setOpen(!open)
        //console.log(!open)
    }

    const activeFn = (object) => {
        // setActiveType(index)
        dispatch(setSort(object))
        //setOpen(false)

    }

    const sortRef = useRef()
    useEffect(() => {
        const removeSortFn = (event) => {

            //console.log('click on body target :  ', event.target)
            //console.log('click on body  :  ', event)
            if (sortRef.current != null && !sortRef.current.contains(event.target)) {//використовується contsins  бо саме він провіряє чи є елемент предком
                setOpen(false)
            } else {
                setOpen(true)
            }

        }
        document.body.addEventListener('click', removeSortFn)
        return () => {
            document.body.removeEventListener('click', removeSortFn)
        }
    }, [])

    return (
        <div ref={sortRef} className="sort">
            <div className="sort__label">
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b onClick={openFn}>Сортувати по:</b>
                {/*<span onClick={openFn} >{optionArry[props.active]}</span>*/}
                <span onClick={openFn} >{sort.name}</span>


                {/*<span onClick={openFn}>{option === 0 ? 'популярності' : ''}</span>
                <span onClick={openFn}>{option === 1 ? 'ціні' : ''}</span>
    <span onClick={openFn}>{option === 2 ? 'алфавіту' : ''}</span>*/}
            </div>

            {open ?
                <div className="sort__popup">

                    <ul>
                        {optionArry.map((item, index) => {
                            //console.log(item.name)
                            return (<li onClick={() => { activeFn(item) }} key={index} className={sort === item ? 'active' : ''}>{item.name}</li>)
                            /* return (
                                 <li onClick={() => { activeFn(item.sortProperty) }} key={index} className={props.active === index ? 'active' : ''} >{item.name}</li>
                             )*/
                        })}
                        {/*<li onClick={chooseFn} id="0" className={0 === active ? 'active' : ''}>популярності</li>
                        <li onClick={chooseFn} id="1" className={1 === active ? 'active' : ''}>ціні</li>
            <li onClick={chooseFn} id="2" className={2 === active ? 'active' : ''}>алфавіту</li>*/}
                    </ul>

                </div> : null
            }


        </div>
    )
}
export default Sort