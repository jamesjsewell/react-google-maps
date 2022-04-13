import React from 'react';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

interface MarkerProps {
  options?: google.maps.MarkerOptions;
  onClick: Function;
  map: google.maps.Map;
  position: { lat: number; lng: number };
}

const Marker: React.FC<MarkerProps> = ({ onClick, ...options }) => {
  const [marker, setMarker] = React.useState<google.maps.Marker>();

  React.useEffect(() => {
    if (!marker) {
      setMarker(
        new google.maps.Marker({
          icon: {
            path: faCartShopping.icon[4] as string,
            fillColor: 'white',
            fillOpacity: 1,
            anchor: new google.maps.Point(
              faCartShopping.icon[0] / 2,
              faCartShopping.icon[1] - faCartShopping.icon[1]
            ),
            strokeWeight: 3,
            strokeColor: 'black',
            scale: 0.1
          }
        })
      );
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  React.useEffect(() => {
    if (marker) {
      ['click', 'idle'].forEach(eventName =>
        google.maps.event.clearListeners(marker, eventName)
      );

      if (onClick) {
        marker.addListener('click', onClick);
      }
    }
  }, [marker, onClick]);

  return null;
};

export default Marker;
