import React from "react";
import { Card, CardContent } from "@mui/material";
import { useParams } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function RestaurantDetails() {
    const { id } = useParams();
    const [restaurant, setRestaurant] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [favorites, setFavorites] = React.useState(() => {
        return JSON.parse(localStorage.getItem("favorites")) || {};
    });

    React.useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = () => {
        setFavorites((prev) => {
            const newFavorites = { ...prev, [id]: !prev[id] };
            localStorage.setItem("favorites", JSON.stringify(newFavorites));
            return newFavorites;
        });
    };

    React.useEffect(() => {
        fetch(`https://api.wefood.dev/restaurants/${id}`)
            .then(response => response.json())
            .then(data => setRestaurant(data))
            .catch(error => { setError(error); })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading details!</p>;

    return (

        <div>
            <h1>Restaurant Details</h1>
            <div className="align-center">
                <Card>
                    <CardContent>
                        <h3>{restaurant.name}</h3>
                        <img src={restaurant.image?.url || "/No_image_available.png"} alt="Restaurant" />
                        <p><strong>Address:</strong> {restaurant.addressInfo?.address}</p>
                        <p><strong>Contact:</strong> {restaurant.contacts?.phoneNumber}</p>
                        <p><strong>Email:</strong> {restaurant.contacts?.email}</p>
                        <p><strong>Cuisines:</strong> {restaurant.cuisines?.map(cuisine => cuisine.name.en).join(", ") || "No cuisines availble to show."}</p>
                        <div onClick={() => toggleFavorite(restaurant._id)} className="favorite-button">
                            {favorites[restaurant._id] ? <FaHeart className="heart-icon" /> : <FaRegHeart className="heart-icon" />}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
