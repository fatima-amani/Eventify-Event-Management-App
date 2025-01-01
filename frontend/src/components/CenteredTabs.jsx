import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Events from './events/Events';
import Attendees from './attendees/Attendees';
import Tasks from './task/Tasks';

export default function CenteredTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderTabContent = () => {
    switch (value) {
      case 0:
        return <Events />;
      case 1:
        return <Attendees />;
      case 2:
        return <Tasks />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Events" sx={{ fontSize: '1.25rem' }}/>
        <Tab label="Attendees" sx={{ fontSize: '1.25rem' }}/>
        <Tab label="Tasks" sx={{ fontSize: '1.25rem' }}/>
      </Tabs>
      <Box sx={{ mt: 2 }}>
        {renderTabContent()}
      </Box>
    </Box>
  );
}
