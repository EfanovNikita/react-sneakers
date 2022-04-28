import { useEffect, useState } from "react";
import { API } from "../api/api";
import Card from "../components/Card/Card";

function Orders() {

    const [orderItems, setOrderItems] = useState([]); // заказанные товары
    const [isLoading, setIsLoading] = useState(false)

    // получаем с сервера данные о сделанных заказах
    async function fetchOrders() {
        setIsLoading(true);
        try {
            const response = await API('get', '/orders');
            setOrderItems(response.data)
            setIsLoading(false);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchOrders()
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
                ) : orderItems.map(item =>
                    <>
                        <h2>Заказ #{item.id}</h2>
                        <div className="sneakers">
                            {item.order.map(obj =>
                                <Card
                                    key={obj.url}
                                    isOrder={true}
                                    {...obj}
                                />
                            )}
                        </div>
                    </>)
            }
        </div>
    )
}

export default Orders;