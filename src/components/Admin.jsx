import { useState } from 'react';
import api from '../api/axios';

const Admin = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');

    const handleAddProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus('');

        try {
            await api.post('/products', { name, description, price: Number(price) });
            setStatus('✅ Товар успішно додано до меню!');
            setName(''); setDescription(''); setPrice('');
        } catch (error) {
            setStatus('❌ Помилка додавання. Перевірте дані.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-lg">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">⚙️ Панель Адміністратора</h1>
            
            <form onSubmit={handleAddProduct} className="bg-white rounded-lg shadow-md p-6 space-y-4">
                <h2 className="text-xl font-bold mb-4">Додати новий товар</h2>
                
                <input type="text" placeholder="Назва товару" required value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" />
                <input type="text" placeholder="Опис товару" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded" />
                <input type="number" placeholder="Ціна (₴)" required value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-2 border rounded" />
                
                <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded">
                    {loading ? 'Додавання... ⏳' : 'Додати в меню'}
                </button>
                
                {status && <p className="mt-4 text-center font-bold">{status}</p>}
            </form>
        </div>
    );
};

export default Admin;