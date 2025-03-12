import React from "react";
import { Card, CardContent } from "@mui/material";
import { useParams } from "react-router-dom";

export default function RestaurantDetails() {
    const { id } = useParams();
    const [restaurant, setRestaurant] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

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

        <div className="p-6">
            <h1>Restaurant Details</h1>
            <Card>
                <CardContent>
                    <h3>{restaurant.name}</h3>
                    <img src={restaurant.image?.url || "/No_image_available.png"} alt="Restaurant" />
                    <p><strong>Address:</strong> {restaurant.addressInfo?.address}</p>
                    <p><strong>Contact:</strong> {restaurant.contacts?.phoneNumber}</p>
                    <p><strong>Email:</strong> {restaurant.contacts?.email}</p>
                    <p><strong>Cuisines:</strong> {restaurant.cuisines?.map(cuisine => cuisine.name.en).join(", ") || "No cuisines availble to show."}</p>
                </CardContent>
            </Card>
        </div>
    );
}
