const useFetch = async (url, method, body) => {

    try {
        const request = await fetch(url, {
            method: method,
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const data = await request.json();

        
        console.log(data);
        return data;
    } catch(error) {
        console.log(error);
    }
}

export default useFetch;