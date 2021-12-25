function Card() {
    return (
        <div className='card'>
            <div className='favorite'>
                <img src='/img/unliked.svg' alt='unliked' />
            </div>
            <img width={133} height={112} src='/img/sneakers/1.jpg' alt='sneakers1' />
            <h5>Мужские кроссовки Nike Blazer Mid Suede</h5>
            <div className='cardInfo'>
                <div className='cardPrice'>
                    <span>Цена:</span>
                    <b>10 565 руб.</b>
                </div>
                <button>
                    <img width={11} height={11} src='/img/plus.svg' alt='plus' />
                </button>
            </div>
        </div>
    )
}

export default Card;