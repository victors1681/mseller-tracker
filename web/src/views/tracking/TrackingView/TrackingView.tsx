import React from 'react';
import type { FC } from 'react';
import { makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Map from './map'; 

const useStyles = makeStyles(() => ({
  root: {}
}));

const TrackingView: FC = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Tracking"
    >
      <Map /> 
    </Page>
  );
};

export default TrackingView;