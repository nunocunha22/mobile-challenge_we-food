import React from "react";
import { Card, CardContent } from "@mui/material";

export default function RestaurantList() {

    const [restaurants, setRestaurants] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        fetch("https://api.wefood.dev/restaurants")
            .then(response => response.json())
            .then(data => {
                setRestaurants(Array.isArray(data.docs) ? data.docs : []);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading restaurants!</p>;

    return (
        <div>
            <h1>Restaurants List</h1>
            <div className="restaurant-container">
                <ul className="restaurant-list">
                    {restaurants.length > 0 ? (restaurants.map(restaurant => (
                        <li key={restaurant._id} className="restaurant-item" onClick={() => window.open(`/restaurant/${restaurant._id}`, "_blank")}>
                            <div className="restaurant-card">

                                <h3>{restaurant.name}</h3>
                                <img src={restaurant.image?.url || "./No_image_available.png"} alt="Restaurant" />
                            </div>
                        </li>
                    ))
                    ) : (
                        <p>No restaurants found.</p>
                    )}
                </ul>
            </div>
        </div>
    );
}
