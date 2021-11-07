import * as React from 'react'
import { Link } from 'react-router-dom'

export default function Capture() {
    return (
        <>
            <div>
                camera here
                <Link to="/Results">
                    <button>Capture</button>
                </Link>
            </div>
        </>
    )
}