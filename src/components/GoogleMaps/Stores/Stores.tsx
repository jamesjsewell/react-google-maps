import {
  Alert,
  Backdrop,
  CircularProgress,
  Snackbar,
  styled
} from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { API_URL } from '../../../constants';
import Marker from '../Map/Marker/Marker';

interface StoreProps {
  zip: string;
  setCenter: React.Dispatch<React.SetStateAction<google.maps.LatLngLiteral>>;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  refetchStores: boolean;
  setRefetchStores: React.Dispatch<React.SetStateAction<boolean>>;
  setStores: Function;
  selectedStore: any;
  setSelectedStore: React.Dispatch<React.SetStateAction<any>>;
  map: any;
}

const fetchStores = async (
  zipCode: string,
  setloadingSpinnerShowing: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setloadingSpinnerShowing(true);
  if (!zipCode?.length) return null;
  const { data } = await axios.get(`${API_URL}?zip_code=${zipCode}`);
  return data;
};

interface LatLng {
  location: { coordinates: number[] };
}

const getLatLng = (data: LatLng) => ({
  lat: data?.location?.coordinates[1],
  lng: data?.location?.coordinates[0]
});

const Stores: React.FC<StoreProps> = ({
  map,
  zip,
  refetchStores,
  setRefetchStores,
  setStores,
  selectedStore,
  setSelectedStore,
  setCenter,
  setZoom
}) => {
  const [infoWindow] = React.useState(
    new google.maps.InfoWindow({
      content: ''
    })
  );

  const openInfoWindow = (store: any) => {
    infoWindow.close();
    infoWindow.setContent(
      `<div id="content">
              <div id="siteNotice">
              </div>
              <h1 id="firstHeading" class="firstHeading">${store.storeName}</h1>
              <div id="bodyContent">
              <h3>${store?.addressLine?.length ? store.addressLine[0] : ''}, ${
        store?.addressLine?.length ? store.addressLine[1] : ''
      }</h3>
              <h4>${store?.phoneNumber ? store.phoneNumber : ''}</h4>
              <br>
              ${store?.openStatusText}
              </div>
              </div>`
    );
    infoWindow.setPosition(getLatLng(store));
    infoWindow.open({
      map,
      shouldFocus: false
    });
  };

  const [loadingSpinnerShowing, setloadingSpinnerShowing] = React.useState(
    false
  );
  const [errorMessageShowing, setErrorMessageShowing] = React.useState(false);
  const [noStoresMessageShowing, setNoStoresMessageShowing] = React.useState(
    false
  );

  // callback runs each time the value of refetchStores changes
  useEffect(() => {
    if (!refetchStores) return;
    setloadingSpinnerShowing(true);
    infoWindow.close();
    refetch();
  }, [refetchStores]);

  // callback runs when selected store changes
  useEffect(() => {
    if (!selectedStore) return;
    openInfoWindow(selectedStore);
  }, [selectedStore]);

  // fetch stores located in the zipcode entered
  const { data, error, refetch, isError, isFetching } = useQuery(
    'stores',
    () => fetchStores(zip, setloadingSpinnerShowing),
    {
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: data => {
        // sets center of map to new location
        if (!data || !data[0]?.location?.coordinates?.length) {
          setStores([]);
          return;
        }
        setCenter(getLatLng(data[0]));
        setZoom(15);

        // sets stores on parent component to be used by stores list
        setStores(data);
      },
      onError: () => {
        // show error message
        setTimeout(() => {
          setErrorMessageShowing(true);
        }, 1000);

        // hide error message after 6 second delay
        setTimeout(() => {
          setErrorMessageShowing(false);
        }, 6000);
      },
      onSettled: data => {
        setRefetchStores(false);

        // hides loading spinner after 1 second delay to ensure consistency
        setTimeout(() => {
          setloadingSpinnerShowing(false);
        }, 1000);

        // shows and hides no stores found message
        if (data?.length || data == undefined) {
          setNoStoresMessageShowing(false);
          return;
        }
        setNoStoresMessageShowing(true);
      }
    }
  );

  const err = error as any;

  return (
    <>
      <Snackbar
        open={noStoresMessageShowing && !isFetching && !isError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="info" sx={{ width: '100%' }}>
          No Stores Found
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorMessageShowing}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          {err?.message}
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={loadingSpinnerShowing}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {data && data.length ? (
        data.map(
          (
            store: {
              storeName: string;
              addressLine: string[];
              location: { coordinates: number[] };
              phoneNumber: string;
              openStatusText: string;
            },
            i: number
          ) => (
            <Marker
              onClick={() => {
                setSelectedStore(store);
                openInfoWindow(store);
              }}
              map={map}
              key={i}
              position={getLatLng(store)}
            />
          )
        )
      ) : (
        <></>
      )}
    </>
  );
};

export default Stores;
