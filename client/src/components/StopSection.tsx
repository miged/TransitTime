import React from 'react';
import { StopSearch } from './StopSearch';
import { StopResults } from './StopResults';
import { TransitSelect } from './TransitSelect';
import { FavouriteList } from './FavouriteList';
import { Box, Paper, Tabs, Tab, Typography } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export const StopSection = () => {
  const [tab, setTab] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Paper sx={{ width: 550 }} elevation={1}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab} onChange={handleChange} centered>
          <Tab label="Search" />
          <Tab label="Favorites" />
        </Tabs>
      </Box>
      <TabPanel value={tab} index={0}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <TransitSelect sx={{ pb: 1.5 }} />
          <Box>
            <StopSearch />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <StopResults />
          </Box>
        </Box>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <FavouriteList />
      </TabPanel>
    </Paper>
  );
};
