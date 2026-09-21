import { useState, useEffect } from 'react';
import api from '../api/axios';

const Menu = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products');
                setProducts(response.data);
                setLoading(false); 
            } catch (err) {
                setError('Помилка з\'єднання з сервером. Перевірте, чи запущено Back-end!');
                setLoading(false); 
            }
        };
        fetchProducts();
    }, []);

    if (loading) return <div className="text-center mt-20 text-xl font-bold text-gray-600">Завантаження меню... ⏳</div>;
    
    if (error) return <div className="text-center mt-20 text-red-500 font-bold">{error} ❌</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-8 text-amber-800">☕ Наше Меню</h1>
            {/* Адаптивна сітка Tailwind (1 колонка на мобільному, 3 на комп'ютері) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.length === 0 ? (
                    <p className="text-center col-span-3 text-gray-500">Меню поки що порожнє...</p>
                ) : (
                    products.map((product) => (
                        <div key={product.id} className="bg-white rounded-lg shadow-md p-5 border border-gray-200">
                            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                            <p className="text-gray-600 mb-4 h-12">{product.description}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-2xl font-bold text-amber-700">{product.price} ₴</span>
                                <button className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-full transition-colors">
                                    В кошик
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Menu;