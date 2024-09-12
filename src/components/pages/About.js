import React, {useEffect, useState } from 'react';
import axios from 'axios';
import SEO from '../theme/SEO';
const About = () => {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/products');
                setData(response.data)
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        }

        fetchData();
    },[])

    if(isLoading) {
        return <div>Loading...</div>
    }

    if(error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div>
            
            <SEO title={'About Us'} description={'This is a sample description'} />
            <h1>About Us</h1>
            {data.products.map(item => {
                return <div className="product" key={item.id}>
                    {item.title}
                    <br />
                    <img src={item.thumbnail} alt={item.title} className="img-fluid"/>
                    <br />
                    <br />
                    ${item.price}
                    </div>
            })}
        </div>
    )
}

export default About;