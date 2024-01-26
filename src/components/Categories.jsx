import { useState, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCategoryId } from "../redux/slices/filterSlice"

const Categories = (props) => {
    const dispach = useDispatch()
    const categoryContecst = useSelector((state) => {
        //console.log('categorys from category.jsx :   ', state.filter.categoriesId)
        return state.filter.categoriesId
    })


    const categoris = [
        'Все',
        'Мясне',
        'Вегетеріанська',
        'Гриль',
        'Гостра',
        'Закриття',

    ]
    return (
        <div className="categories">
            <ul>
                {categoris.map((item, id) => {
                    return (
                        <li key={item} onClick={() => {
                            //categoryContecst()
                            // console.log('id that you have clicked:  ', id)
                            dispach(setCategoryId(id))


                        }} className={categoryContecst === id ? 'active' : ''}>{item}</li>

                    )

                })}

            </ul>
        </div>
    )
}
export default Categories