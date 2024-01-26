import cartEmptyImg from '../img/empty-cart.png'
import { Link } from 'react-router-dom'
const CartEmpty = () => {
    return (
        <>
            <div class="container container--cart">
                <div class="cart cart--empty">
                    <h2>Корзина пуста <icon>😕</icon></h2>
                    <p>
                        Корзина пуста бо ти не поклав в неї товар довбню<br />
                        Тож підніми свою дупу і поклади якийсь товар у корзину якщо ти хочеш щоб там був якийсь товар, а інакше то нащо ти тоді натискаєш на корзину якщо нічого туди не поклав                    </p>
                    <img src={cartEmptyImg} alt="Empty cart" />
                    <Link to="/" class="button button--black">
                        <span>Вернутисьь назад</span>
                    </Link>
                </div>
            </div>
        </>
    )
}
export default CartEmpty