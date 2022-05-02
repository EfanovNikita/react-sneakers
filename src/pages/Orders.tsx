import { useEffect } from "react";
import Card from "../components/Card/Card";
import { useAppSelector, useAppDispatch } from "../hooks/appHooks";
import { fetchOrders, ordersSelector } from "../redux/orderSlice";

function Orders() {

    const orderItems = useAppSelector(ordersSelector.selectAll) // заказанные товары
    const isLoading = useAppSelector(state => state.orders.loading) === 'loading'
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchOrders())
    }, [dispatch])

    return (
        <div className='content'>
            <div className='contentHeader'>
                <h1>Мои заказы</h1>
            </div>

            {isLoading ?
                [...Array(8)].map((item, index) =>
                    <div className="sneakers">
                        <Card key={'order' + index} isLoading={isLoading} isOrder={true} />
                    </div>
                ) : orderItems.map(item =>
                    <>
                        <h2>Заказ #{item.id}</h2>
                        <div className="sneakers">
                            {item.order.map((obj, index) =>
                                <Card
                                    key={obj.url + index}
                                    isOrder={true}
                                    isLoading={isLoading}
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