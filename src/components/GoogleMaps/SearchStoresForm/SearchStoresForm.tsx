import React from 'react';
import Search from '@mui/icons-material/Search';
import { Card, IconButton, styled, TextField, Typography } from '@mui/material';

interface SearchStoreFormProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  setCenter: React.Dispatch<React.SetStateAction<google.maps.LatLngLiteral>>;
  setZip: React.Dispatch<React.SetStateAction<string>>;
  setRefetchStores: React.Dispatch<React.SetStateAction<boolean>>;
  refetchStores: boolean;
  stores: any[];
}

const Header = styled('span')({
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center'
});

const SearchForm = styled(Card)({
  width: '320px',
  zIndex: 3,
  top: '0',
  left: '50%',
  padding: 8,
  borderRadius: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
});

const SearchField = styled('div')({
  display: 'inline-flex',
  alignItems: 'flex-end'
});

const SearchStoresForm: React.FC<SearchStoreFormProps> = ({
  setRefetchStores,
  setZip,
  stores
}) => {
  const onTypeZip = (val: string) => {
    setZip(val);
  };

  return (
    <Header>
      <SearchForm>
        {!stores?.length ? (
          <>
            <Typography variant="h4" gutterBottom component="div">
              Enter Zip Code
            </Typography>
            <Typography variant="h5" gutterBottom component="div">
              Find Stores
            </Typography>
          </>
        ) : (
          <></>
        )}
        <SearchField>
          <TextField
            size="small"
            label="Zip"
            type="search"
            variant="standard"
            name="search"
            onChange={event => {
              onTypeZip(event.target.value);
            }}
            InputProps={{
              endAdornment: (
                <IconButton size="small" onClick={() => setRefetchStores(true)}>
                  <Search />
                </IconButton>
              )
            }}
          />
        </SearchField>
        <Typography
          style={{ marginTop: '5px' }}
          variant="caption"
          display="block"
          gutterBottom
        >
          try 90048 for example
        </Typography>
      </SearchForm>
      {!stores?.length ? (
        <div style={{ zIndex: 3, opacity: 0.5 }}>
          <Typography variant="h1">STORE FINDER</Typography>
        </div>
      ) : (
        <></>
      )}
    </Header>
  );
};

export default SearchStoresForm;
