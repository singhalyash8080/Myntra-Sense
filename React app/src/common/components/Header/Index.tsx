import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.css'
import { HiShoppingCart } from 'react-icons/hi'


function Index() {
    return (
        <div className={styles.header}>
            <Link to="/Cart">
                <HiShoppingCart className={styles.icon} />
            </Link>
        </div>
    )
}

export default Index
