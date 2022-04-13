import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  List,
  ListItem,
  ListItemButton,
  styled,
  Typography
} from '@mui/material';
import { Expand } from '@mui/icons-material';

interface StoresListProps {
  stores: any[];
  setSelectedStore: React.Dispatch<React.SetStateAction<never[]>>;
  selectedStore: any;
}

const StoresAccordian = styled(Card)({
  width: '300px',
  position: 'absolute',
  left: 0,
  top: '90px',
  zIndex: 3
});

const StoresList: React.FC<StoresListProps> = ({
  stores,
  setSelectedStore,
  selectedStore
}) => {
  const [expanded, setExpanded] = React.useState(true);

  return stores?.length ? (
    <StoresAccordian>
      <Accordion expanded={expanded}>
        <AccordionSummary
          expandIcon={
            <Expand
              onClick={() => {
                setExpanded(expanded ? false : true);
              }}
            />
          }
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Stores</Typography>
        </AccordionSummary>
        {expanded ? (
          <AccordionDetails>
            <List>
              {stores.map((store: any) => (
                <ListItem
                  disablePadding
                  selected={store.storeName === selectedStore?.storeName}
                >
                  <ListItemButton
                    onClick={() => {
                      setSelectedStore(store);
                    }}
                  >
                    {store?.storeName?.length > 24
                      ? `${store.storeName.substring(0, 24)}...`
                      : store.storeName}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        ) : (
          <></>
        )}
      </Accordion>
    </StoresAccordian>
  ) : (
    <></>
  );
};

export default StoresList;
