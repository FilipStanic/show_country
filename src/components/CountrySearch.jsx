import { useState } from "react";


const CountrySearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
 
        if(value.trim() === '') {
            setFilteredCountries([]);
            setIsLoading(false);
            return;
        } 
        setIsLoading(true);
        setError(null);
    



 

    fetch( `https://restcountries.com/v3.1/name/${value}`)
    .then((response) => {
        if(!response.ok) {
            throw new Error('Response is not okay');
        }
        return response.json();
    })

    .then((data) => {
        setFilteredCountries(data);
        setIsLoading(false);
    })

    .catch((error) => {
        console.error("Error fetching countries:", error);

        setError('Country does not exist heyooo');
        setIsLoading(false);
        setFilteredCountries([]);
    });

};

const handleDropdownClick = (country) => {
    setIsLoading(true);
    setError(null);

    fetch(`https://restcountries.com/v3.1/name/${country.name.common}`)
    .then((response) => {
        if(!response.ok) {
            throw new Error('Response is not 202');
        } 
        return response.json();
    })

    .then((data) => {
        // console.log(data);
        const countryData = data[0];
        const flag = countryData.flags.png;
        setSelectedCountry({...countryData, flag});
        setIsLoading(false);
        console.log(flag);
    })

    .catch((error) => {
        console.error("Error fetching country details:", error);
        setError('Error during fetching details about the country');
        setIsLoading(false);
        setSelectedCountry(null);
    });

}
return (
    <>
        <form className="max-w-md mx-auto">
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
                </div>
                <input  
                placeholder="Search for a country..."
                onChange={handleInputChange} 
                value={searchTerm}
                type="search" 
                id="default-search" 
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                 />
            </div>
       


      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {selectedCountry && (
        <div className="mt-2 w-full max-w-md">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Country Details:</h2>
          <div className="bg-white border border-gray-200 rounded-md shadow-md p-4">
            <p><img src={selectedCountry.flag} alt={selectedCountry.flags.alt} className="w-20 h-auto mb-4" /></p>
            <p><strong>Name:</strong> {selectedCountry.name.common}</p>
            <p><strong>Capital:</strong> {selectedCountry.capital}</p>
            <p><strong>Population:</strong> {selectedCountry.population}</p>
            <p><strong>Continent:</strong> {selectedCountry.continents}</p>
            {/* OVDE DODAJ JOS NESTO OD INFO AKO ZELIS I NAMESTI DA IZGLEDA KAKO HOCES             */}
          </div>
        </div>
      )}
      
      {filteredCountries.length > 0 && (
        <div className="mt-2 w-full max-w-md">
          <ul className="bg-white border border-gray-200 rounded-md shadow-md divide-y divide-gray-200">
            {filteredCountries.map((country) => (
              <li
                key={country.name.common}
                className="px-4 py-3 cursor-pointer hover:bg-gray-100"
                onClick={() => handleDropdownClick(country)}
              >
                {country.name.common}
              </li>
            ))}
          </ul>
        </div>
         
      )}
      </form>
    </>
  );
};

export default CountrySearch;
