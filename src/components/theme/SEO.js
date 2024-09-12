import React from "react";
import { Helmet } from "react-helmet-async";

export default function SEO({title, description}) {
    return (
        <Helmet>
            <title>{title} | Sample React App</title>
            <meta name="description" content={description} />
        </Helmet>
    )
}