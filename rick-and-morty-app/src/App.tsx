import CharacterCard from './components/characterCard/CharacterCard'
import useApp from './hooks/useApp'
import { CharacterStatus } from './api/constants'
import { Fragment } from 'react/jsx-runtime'
import loader from './assets/loader.svg'

function App() {
  const { methods, state } = useApp()
  const {
    handleSearch,
    handleInput,
    handleStatusChange
  } = methods
  const {
    isFetchCharactersPending,
    isFetchCharactersError,
    characterList,
    name,
    status,
  } = state

  return (
    <Fragment>
    <header className="p-4 shadow-md">
      <form onSubmit={handleSearch} className='flex justify-center flex-wrap w-full gap-4'>
        <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full md:basis-[calc(33.333%-1rem)]' type="search" id='search-input' name='search' placeholder='Search' onChange={handleInput} value={name ?? ''}/>
        <select
          id="status"
          name="status"
          value={status}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  w-full md:basis-[calc(33.333%-1rem)]"
          onChange={handleStatusChange}
        >
    <option value="">Choose status</option>
    <option value={CharacterStatus.Alive}>Alive</option>
    <option value={CharacterStatus.Dead}>Dead</option>
    <option value={CharacterStatus.Unknown}>Unknown</option>
  </select>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  w-full md:basis-[calc(33.333%-1rem)] cursor-pointer'
            type='submit'
            disabled={isFetchCharactersPending}
        >
            {isFetchCharactersPending ? 'Loading...' : 'Search'}
        </button>
      </form>
      </header>
      <section className='relative p-4'>
      {isFetchCharactersPending && !isFetchCharactersError? 
          <img src={loader} alt="Loading..." className="w-12 h-12 mx-auto my-4 animate-spin" />
          : <h2 className='font-bold text-2xl text-center py-4'>Result</h2>
          }
        
        {isFetchCharactersError && <div className='my-6 text-center text-red-700'>There is an error, please try again</div>}
        
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {characterList && 
                characterList?.map((character, id) => (
                  <CharacterCard
                    key={id}
                    characterInfo={character}
                  />
                ))
          }
      </div>
      </section>
      </Fragment>
  )
  
}

export default App
