import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import api from '../api/axios';

const Cart = () => {
    const { cartItems, totalPrice, clearCart } = useContext(CartContext);
    const [customerName, setCustomerName] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleCheckout = async (e) => {
        e.preventDefault();
        if (cartItems.length === 0) return alert('Кошик порожній!');
        
        setLoading(true);
        setMessage('');

        try {
            await api.post('/orders', {
                customerName,
                items: cartItems,
                totalPrice
            });
            setMessage('✅ Замовлення успішно оформлено!');
            clearCart();
            setCustomerName('');
        } catch (error) {
            setMessage('❌ Помилка оформлення замовлення. Спробуйте ще раз.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <h1 className="text-3xl font-bold text-center mb-8 text-amber-800">🛒 Ваш Кошик</h1>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                {cartItems.length === 0 ? (
                    <p className="text-gray-500 text-center">Тут поки нічого немає...</p>
                ) : (
                    <ul className="mb-6 space-y-2">
                        {cartItems.map((item, index) => (
                            <li key={index} className="flex justify-between border-b pb-2">
                                <span>{item.name}</span>
                                <span className="font-bold">{item.price} ₴</span>
                            </li>
                        ))}
                    </ul>
                )}
                
                <div className="text-2xl font-bold text-right mb-6 text-amber-700">
                    Разом: {totalPrice} ₴
                </div>

                <form onSubmit={handleCheckout} className="space-y-4">
                    <input 
                        type="text" 
                        placeholder="Ваше ім'я" 
                        required 
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <button 
                        type="submit" 
                        disabled={loading || cartItems.length === 0}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded transition-colors disabled:bg-gray-400"
                    >
                        {loading ? 'Оформлення... ⏳' : 'Підтвердити замовлення'}
                    </button>
                </form>

                {message && <p className="mt-4 text-center font-bold">{message}</p>}
            </div>
        </div>
    );
};

export default Cart;