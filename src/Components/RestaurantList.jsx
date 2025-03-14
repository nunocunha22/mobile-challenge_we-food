import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";


export default function RestaurantList() {
    const [restaurants, setRestaurants] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [offset, setOffset] = React.useState(0);
    const limit = 10;
    const [hasMore, setHasMore] = React.useState(true);
    const observer = React.useRef(null);

    const [favorites, setFavorites] = React.useState(() => {
        return JSON.parse(localStorage.getItem("favorites")) || {};
    });

    React.useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (id) => {
        setFavorites((prev) => {
            const newFavorites = { ...prev, [id]: !prev[id] };
            localStorage.setItem("favorites", JSON.stringify(newFavorites));
            return newFavorites;
        });
    };

    const fetchRestaurants = React.useCallback(() => {
        if (!hasMore) return;
        setLoading(true);
        fetch(`https://api.wefood.dev/restaurants?offset=${offset}&limit=${limit}`)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data.docs)) {
                    setRestaurants(prev => [...prev, ...data.docs]);
                    setHasMore(data.docs.length === limit);
                } else {
                    setHasMore(false);
                }
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [offset, hasMore]);

    React.useEffect(() => {
        fetchRestaurants();
    }, [offset, fetchRestaurants]);

    const lastElementRef = React.useCallback((node) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setOffset(prev => prev + limit);
            }
        });

        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    if (error) return <p>Error loading restaurants!</p>;

    return (
        <div>
            <h1>Restaurants List</h1>
            <div className="restaurant-container">
                <ul className="restaurant-list">
                    {restaurants.length > 0 ? (
                        restaurants.map((restaurant, index) => (
                            <li key={restaurant._id} className="restaurant-item" ref={index === restaurants.length - 1 ? lastElementRef : null}>
                                <div className="restaurant-card">
                                    <div onClick={() => window.open(`/restaurant/${restaurant._id}`, "_blank")}>
                                        <h3>{restaurant.name}</h3>
                                        <img src={restaurant.image?.url || "./No_image_available.png"} alt="Restaurant" />
                                    </div>
                                    <div onClick={() => toggleFavorite(restaurant._id)} className="favorite-button">
                                        {favorites[restaurant._id] ? <FaHeart className="heart-icon favorite" /> : <FaRegHeart className="heart-icon" />}
                                    </div>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>No restaurants found.</p>
                    )}
                </ul>
                {loading && <p>Loading more...</p>}
            </div>
        </div>
    );
}
