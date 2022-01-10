import { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import axios from 'axios';

function Orders() {

    const [orderItems, setOrderItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(true);
        try {
            async function getOrders() {
                const ordersResponse = await axios.get('https://61d422528df81200178a8ac2.mockapi.io/orders');
                setOrderItems(ordersResponse.data);
            }
            getOrders();
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }, [])

    return (
        <div className='content'>
            <div className='contentHeader'>
                <h1>Мои заказы</h1>
            </div>

            {isLoading ?
                [...Array(8)].map((item, index) =>
                    <div className="sneakers">
                        <Card key={index} />
                    </div>
                ) : orderItems
                    .map(item =>
                        <>
                            <h2>Заказ #{item.id}</h2>
                            <div className="sneakers">
                                {item.items.map(obj =>
                                    <Card
                                        key={obj.url}
                                        isLoading={isLoading}
                                        isOrder={true}
                                        {...obj}
                                    />
                                )}
                            </div>
                        </>
                    )
            }
        </div>
    )
}

export default Orders;