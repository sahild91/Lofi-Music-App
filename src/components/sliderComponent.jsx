// import * as React from 'react';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
// import VolumeDown from '@mui/icons-material/VolumeDown';
// import VolumeUp from '@mui/icons-material/VolumeUp';

/**
 * A slider component for controlling volume.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {number} props.value - The current value of the slider.
 * @param {Function} props.onVolumeChange - The callback function to be called when the slider value changes.
 * @param {string} props.className - The CSS class name for the component.
 * @returns {JSX.Element} The rendered slider component.
 */
function ContinuousSlider(props) {
   // const [value, setValue] = React.useState(30);

   const handleChange = (event, newValue) => {
      {
         /* eslint-disable-next-line react/prop-types */
      }
      props.onVolumeChange(event, newValue);
   };

   return (
      // eslint-disable-next-line react/prop-types
      <Box sx={{ width: 150 }} className={props.className}>
         <Stack spacing={2} direction='row' sx={{ mb: 1 }} alignItems='center'>
            {/* <VolumeDown /> */}
            {/* eslint-disable-next-line react/prop-types */}
            <Slider
               aria-label='Volume'
               value={props.value}
               onChange={handleChange}
            />
            {/* <VolumeUp /> */}
         </Stack>
      </Box>
   );
}

export default ContinuousSlider;
