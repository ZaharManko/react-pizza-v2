import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addItem, } from "../../redux/slices/cardSlice"
const PizzaBlock = (props) => {

    const dispatch = useDispatch()
    const items = useSelector((state) => {
        return state.cart.items
    })

    //const [Count, setCount] = useState(0)
    /*const countFn = () => {
        if (Count >= 0) {
            setCount(Count + 1)
        } else {
            setCount(Count = 0)
        }


    }*/

    const typesArry = ['традиційна', 'тонка']
    const typesArryBascet = ['традиційна', 'тонка']
    const [activeType, setActiveType] = useState(0)
    const [activeTypeSize, setActiveTypeSize] = useState(0)

    const activeTypeFn = (index) => {
        setActiveType(index)
        console.log(typesArryBascet[activeType])
    }
    const activeTypeSizeFn = (index) => {
        setActiveTypeSize(index)
    }
    const onClickAdd = () => {
        const item = {
            id: props.id,
            title: props.title,
            price: props.price,
            imageUrl: props.url,
            type: typesArryBascet[activeType],
            size: props.size[activeTypeSize],
        };
        dispatch(addItem(item));
        //console.log('your items arry:   ', items);
    };
    const countItem = useSelector((state) => {
        return state.cart.items.find((obj) => obj.id === props.id);
    });

    const addCount = countItem ? countItem.count : 0;
    useEffect(() => {
        console.log('your items arry:   ', items);
    }, [items]);
    return (
        <div className="pizza-block-wrapper">
            <div className="pizza-block">
                <img
                    className="pizza-block__image"
                    src={props.url}
                    alt="Pizza"
                />
                <h4 className="pizza-block__title">{props.title}</h4>
                <div className="pizza-block__selector">
                    <ul>
                        {
                            props.types.map((item, index) => {
                                return (
                                    <li key={item} onClick={() => { activeTypeFn(index) }} className={activeType === index ? 'active' : ''} >{typesArry[item]}</li>
                                )

                            })
                        }
                    </ul>
                    <ul>{
                        props.size.map((item, index) => {
                            return (
                                <li key={item} onClick={() => { activeTypeSizeFn(index) }} className={activeTypeSize === index ? 'active' : ''} > {item}см.</li>
                            )
                        })
                    }
                    </ul>
                </div>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">від {props.price} $</div>
                    <div className="button button--outline button--add">
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                fill="white"
                            />
                        </svg>
                        <span onClick={() => {
                            /*countFn()*/
                            onClickAdd()
                        }} >Добавити</span>
                        {addCount > 0 && <i>{/*Count*/ addCount}</i>}
                    </div>
                </div>
            </div>
        </div>
    )



    {/*<div className="pizza-block">
        <img
            className="pizza-block__image"
            src="https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
            alt="Pizza"
        />
        <h4 className="pizza-block__title">{props.title}</h4>
        <div className="pizza-block__selector">
            <ul>
                <li className="active" >тонкое</li>
                <li>традиционное</li>
            </ul>
            <ul>
                <li className="active">26 см.</li >
                <li>30 см.</li>
                <li>40 см.</li>
            </ul>
        </div>
        <div className="pizza-block__bottom">
            <div className="pizza-block__price">від {props.price}</div>
            <div className="button button--outline button--add">
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                        fill="white"
                    />
                </svg>
                <span>Добавить</span>
                <i>2</i>
            </div>
        </div>
</div>*/}
}

export default PizzaBlock