import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Card, CardContent, CardHeader, Divider, Grid, Typography, useMediaQuery } from '@mui/material';

// third-party
import Chart from 'react-apexcharts';

// ==============================|| SALES LINE CARD ||============================== //

const SalesLineCard = ({ chartData }) => {
  const theme = useTheme();

  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card>
      <CardHeader
        title={
          <Typography variant="h6" className="card-header">
          Locker Usage History
          </Typography>
        }
      />
      <Divider />
      <CardContent>
        <Grid container spacing={2} direction={matchDownMd && !matchDownXs ? 'row' : 'column'}>
          {/* Main Chart */}
          <Grid item xs={12} sm={7} md={12}>
            <Chart
              {...chartData}
              options={{
                ...chartData.options,
                chart: {
                  ...chartData.options?.chart,
                  width: '100%',  // Ensures the chart takes up full width of the container
                  height: matchDownMd ? '300px' : '400px',  // Adjust height based on screen size
                },
              }}
            />
          </Grid>
          {/* Divider for responsive design */}
          <Grid item sx={{ display: { md: 'block', sm: 'none' } }}>
            <Divider />
          </Grid>
          {/* Additional grid content - can be customized */}
          <Grid
            item
            container
            direction={matchDownMd && !matchDownXs ? 'column' : 'row'}
            justifyContent="space-around"
            alignItems="center"
            xs={16}
            sm={8}
            md={16}
          >
            {/* You can add additional content or footer sections here if necessary */}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

SalesLineCard.propTypes = {
  chartData: PropTypes.object.isRequired,  // chartData must be provided
};

export default SalesLineCard;
