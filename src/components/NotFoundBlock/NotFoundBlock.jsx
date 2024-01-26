import stylle from '../NotFoundBlock/NotFoundBlock.module.scss'
const NotFoundBlock = () => {
    return (
        < >
            <div className={stylle.notFoundContainer}>
                <span className={stylle.notFoundSmile}>😔</span>
                <h1>Нічого не знайдено </h1>
            </div>

        </>

    )
}
export default NotFoundBlock