import React from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { styled } from '@mui/material';

import { MAPS_API_TOKEN } from '../../credentials';
import { Map } from './Map/Map';
import SearchStoresForm from './SearchStoresForm/SearchStoresForm';
import Stores from './Stores/Stores';
import StoresList from './StoresList/StoresList';

const GMaps = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  margin: 'auto'
});

interface MapsProps {}

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

const GoogleMaps: React.VFC = () => {
  const [zoom, setZoom] = React.useState(3); // initial zoom
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0
  });
  const [zip, setZip] = React.useState('');
  const [refetchStores, setRefetchStores] = React.useState(false);
  const [stores, setStores] = React.useState([]);
  const [selectedStore, setSelectedStore] = React.useState([]);

  const onIdle = (m: google.maps.Map) => {
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  return (
    <GMaps>
      {StoresList({ stores, selectedStore, setSelectedStore })}
      {SearchStoresForm({
        center,
        zoom,
        setZoom,
        setCenter,
        setZip,
        setRefetchStores,
        refetchStores,
        stores
      })}
      <Wrapper apiKey={MAPS_API_TOKEN} render={render}>
        <Map
          center={center}
          zoom={zoom}
          onIdle={onIdle}
          style={{ flexGrow: '1', height: '100%' }}
        >
          <Stores
            map
            zip={zip}
            setRefetchStores={setRefetchStores}
            refetchStores={refetchStores}
            setStores={setStores}
            selectedStore={selectedStore}
            setSelectedStore={setSelectedStore}
            setCenter={setCenter}
            setZoom={setZoom}
          ></Stores>
        </Map>
      </Wrapper>
    </GMaps>
  );
};

export default GoogleMaps;
