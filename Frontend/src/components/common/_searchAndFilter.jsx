import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons'
import Input from '../formFields/_input';
import { useForm } from 'react-hook-form';

const SearchAndFilter = () => {
    const { register, formState: { errors } } = useForm()
    return (
        <div className="h-14 flex justify-between border-b-2 border-slate-50 ">
            <div className="searchBar mx-4 flex items-center">
                <label htmlFor="search" className='relative p-0 bg-red-500'>
                    <Input id="search" placeholder="SearchHere" name="search" errors={errors} register={register} inputStyle="search" />
                    <span className='absolute right-2 top-1/2 -translate-y-1/2'>
                        <FontAwesomeIcon fontSize={'1.5rem'} icon={faSearch} />
                    </span>
                </label>
                <span>
                    <FontAwesomeIcon fontSize={'1.5rem'} icon={faFilter} />
                </span>

            </div>
        </div>
    );
}

export default SearchAndFilter;