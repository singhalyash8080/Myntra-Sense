import * as React from 'react'
import styles from './Card.module.css'
import { Link } from 'react-router-dom'
import SampleImage from '../../assets/sample-image.jpg'
import { ItemType } from '../../types'

export default function Index(prop: any) {
    const item: ItemType = prop.item
    return (
        <Link to={`/Item/${item._id}`}>
            <div className={styles.card}>
                <div className={styles.image}>
                    <img src={item.imageUrl} alt="item" width="170" height="125" />
                    <div className={styles.rating}>
                        <i className="fas fa-star"></i>
                        {item.rating}
                    </div>
                </div>
                <div className={styles.brand}>{item.brand}</div>
                <div className={styles.label}>{item.label}</div>
                <div className={styles.value}>
                    <div className={styles.price}>&#x20B9;  {item.price}</div>
                    {
                        item.discount && <div className={styles.discount}>(-{item.discount}%)</div>
                    }
                </div>
            </div>
        </Link>
    )
}

