import React from "react";
import '../styles/components/_featureItems.scss';

export default function FeatureItems({title, image,altText, description}) {
    return(
        <div className="feature-item">
            <img src={image} alt={altText} className="feature-icon" />
            <h3 className="feature-item-title">{title}</h3>
            <p>{description}</p>
        </div>
    )
}