import React, { useState, useEffect, useRef } from "react";
import { getAssetDetails, extractAssetUid } from "../services/contentstackAPI";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import "./ImageWithHotspots.css";

export default function ImageWithHotspots({ imageUrl, altText }) {
  const [visualMarkups, setVisualMarkups] = useState([]);
  const [originalDimensions, setOriginalDimensions] = useState(null);
  const [hoveredMarkup, setHoveredMarkup] = useState(null);
  const [loading, setLoading] = useState(true);
  const imageRef = useRef(null);

  useEffect(() => {
    const fetchAssetDetails = async () => {
      if (!imageUrl) {
        setLoading(false);
        return;
      }

      const assetUid = extractAssetUid(imageUrl);
      if (!assetUid) {
        setLoading(false);
        return;
      }

      const result = await getAssetDetails(assetUid);
      if (result.success && result.data) {
        setVisualMarkups(result.data.visual_markups || []);
        if (result.data.dimensions) {
          setOriginalDimensions(result.data.dimensions);
        }
      }
      setLoading(false);
    };

    fetchAssetDetails();
  }, [imageUrl]);

  const handleHotspotClick = (markup) => {
    if (markup.url) {
      window.location.href = markup.url;
    }
  };

  const calculatePosition = (coordinates) => {
    if (!originalDimensions || !coordinates) {
      return { left: "0%", top: "0%" };
    }

    const leftPercent = (coordinates.x / originalDimensions.width) * 100;
    const topPercent = (coordinates.y / originalDimensions.height) * 100;

    return {
      left: `${leftPercent}%`,
      top: `${topPercent}%`,
    };
  };

  return (
    <div className="image-with-hotspots-wrapper m-3">
      <div className="image-with-hotspots-container">
        <img
          ref={imageRef}
          src={imageUrl}
          alt={altText}
          className="hotspot-image"
        />

        {!loading && visualMarkups.length > 0 && originalDimensions && (
          <div className="hotspots-overlay">
            {visualMarkups.map((markup) => {
              const position = calculatePosition(markup.coordinates);

              return (
                <div
                  key={markup.id}
                  className="hotspot"
                  style={position}
                  onMouseEnter={() => setHoveredMarkup(markup.id)}
                  onMouseLeave={() => setHoveredMarkup(null)}
                  onClick={() => handleHotspotClick(markup)}
                >
                  <div className="hotspot-icon">
                    <ShoppingBagIcon fontSize="small" />
                  </div>

                  {hoveredMarkup === markup.id && (
                    <div className="hotspot-tooltip">
                      <h6>{markup.title}</h6>
                      <p>{markup.description}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
