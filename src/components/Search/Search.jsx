import stylle from './Search.module.scss';
import cross from '/Users/Користувач/Desktop/react-pizza-v2/src/img/cross.svg'
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { searchContext } from '../../App';
import debounce from 'debounce';
const Search = (props) => {
    const [value, setValue] = useState('')
    const { searchValue, setSearchValue } = useContext(searchContext);
    const searchInputRef = useRef();
    const testDebouns = useCallback(

        debounce((str) => {
            //console.log('pased 1000 ms')
            setSearchValue(str)
        }, 1000),
        []


    )



    const inputonChange = (event) => {

        setValue(event.target.value)
        testDebouns(event.target.value)
    }
    const focusInput = () => {
        setSearchValue('')
        setValue('')
        searchInputRef.current.focus()

    };

    return (
        <div>
            <input
                onChange={inputonChange}
                ref={searchInputRef}
                value={value}
                placeholder='search...'
                className={stylle.search}

            />
            {value !== '' ?
                <img onClick={focusInput} className={stylle.cross} src={cross} />
                : null
            }
        </div>
    );
}

export default Search