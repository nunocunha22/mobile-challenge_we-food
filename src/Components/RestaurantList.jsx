import { useEffect, useState } from "react";

export default function RestaurantList() {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://api.wefood.dev/restaurants")
            .then(response => response.json())
            .then(data => {
                setRestaurants(Array.isArray(data.docs) ? data.docs : []);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching restaurants:", error);
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading restaurants!</p>;

    return (
        <div>
            <h1>Restaurants</h1>
            <ul>
                {restaurants.length > 0 ? (
                    restaurants.map(restaurant => (
                        <li key={restaurant._id}>

                            <h3>{restaurant.name}</h3>
                            <p>{restaurant.addressInfo?.address}</p>
                            <p><strong>Contact:</strong> {restaurant.contacts?.phoneNumber}</p>
                            <p><strong>Contact:</strong> {restaurant.contacts?.email}</p>
                            <p><strong>City:</strong> {restaurant.city?.phoneNumber}</p>
                        </li>
                    ))
                ) : (
                    <p>No restaurants found.</p>
                )}
            </ul>
        </div>
    );
}
