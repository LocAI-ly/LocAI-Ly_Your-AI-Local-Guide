import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createShop } from '../../../utils/shopService';
import Router from 'next/router';

export default function CreateShop() {
    const [shop, setShop] = useState({
        shop_name: '',
        shop_description: '',
        category: '',
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setShop({ ...shop, [name]: value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await createShop(shop);
        alert('Shop created!');
        Router.push(`/shops/${id}/create/owner_details`);
    };
    
    return (
        <div>
        <h1>Create Shop</h1>
        <form onSubmit={handleSubmit}>
            <label>
            Name:
            <input
                type="text"
                name="shop_name"
                value={shop.shop_name}
                onChange={handleChange}
            />
            </label>
            <br />
            <label>
            Description:
            <input
                type="text"
                name="shop_description"
                value={shop.shop_description}
                onChange={handleChange}
            />
            </label>
            <br />
            <button type="submit">Create Shop</button>
        </form>
        </div>
    );
}