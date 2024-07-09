import { useEffect, useState } from "react";

function useFetch(url) {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all?fields=name,flags`")
            .then(response => response.json())
            .then(data => setData(data.name))
    })

}