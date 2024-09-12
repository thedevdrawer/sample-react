import React from "react";
import logo from "../../assets/logo-square.jpg"
export default function Header() {
    return (
        <div>
            <header>
                <div className="container-fluid text-center">
                    <img src={logo} alt="Logo for DevDrawer" />
                    <nav>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/about">About</a></li>
                            <li><a href="/contact">Contact</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
        </div>
    )
}