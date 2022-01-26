import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { setTransitId } from '../app/transitSlice';
import { useAppDispatch } from '../app/hooks';

export interface Props {
  sx?: Object;
}

export const TransitSelect = (props: Props) => {
  const dispatch = useAppDispatch();
  const [transit, setTransit] = React.useState(
    'Edmonton Transit Service (ETS)'
  );

  const transits = [
    { id: 'o-dpz8-ttc', title: 'Toronto Transit Commission (TTC)' },
    {
      id: 'o-c3x-edmontontransitservice',
      title: 'Edmonton Transit Service (ETS)',
    },
    // { id: 'o-dxfy-halifaxtransit~hrm', title: 'Halifax Transit' },
    // {
    //   id: 'o-f25d-socitdetransportdemontral',
    //   title: 'Société de transport de Montréal (STM)',
    // },
    // { id: 'o-c3nf-calgarytransit', title: 'Calgary Transit' },
    // { id: 'o-c28-translink', title: 'Vancouver TransLink' },
  ];

  return (
    <>
      <Autocomplete
        sx={{ width: 370, ...props.sx }}
        inputValue={transit}
        onInputChange={(event, newValue) => {
          setTransit(newValue);
          const transitFilter = transits.filter(
            (t) => t.title.toLowerCase() === newValue.toLowerCase()
          );
          if (transitFilter.length === 1) {
            dispatch(setTransitId(transitFilter[0].id));
          }
        }}
        size="small"
        freeSolo
        options={transits}
        getOptionLabel={(o) => `${o.title}`}
        renderInput={(params) => <TextField {...params} label="Transit" />}
      />
    </>
  );
};
