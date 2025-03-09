import React from 'react'
import { useTheme, styled } from '@mui/material/styles';
import { Grid, Card, CardHeader, CardContent, Typography, Divider, LinearProgress } from '@mui/material';
import { MdSensorOccupied } from "react-icons/md";
//project import

import SalesLineCard from 'views/Dashboard/card/SalesLineCard';
import SalesLineCardData from 'views/Dashboard/card/sale-chart-1';
import RevenuChartCard from 'views/Dashboard/card/RevenuChartCard';
// import RevenuChartCardData from 'views/Dashboard/card/revenu-chart';
import ViewModuleRoundedIcon from '@mui/icons-material/ViewModuleRounded';
import ReportCard from './ReportCard';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { gridSpacing } from 'config.js';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
// assets
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import { useEffect } from "react";
import { useState } from "react";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import MonetizationOnTwoTone from '@mui/icons-material/MonetizationOnTwoTone';
import DescriptionTwoTone from '@mui/icons-material/DescriptionTwoTone';
import ThumbUpAltTwoTone from '@mui/icons-material/ThumbUpAltTwoTone';
import CalendarTodayTwoTone from '@mui/icons-material/CalendarTodayTwoTone';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
// custom style
const FlatCardBlock = styled((props) => <Grid item sm={6} xs={12} {...props} />)(({ theme }) => ({
  padding: '25px 25px',
  borderLeft: '1px solid' + theme.palette.background.default,
  [theme.breakpoints.down('sm')]: {
    borderLeft: 'none',
    borderBottom: '1px solid' + theme.palette.background.default
  },
  [theme.breakpoints.down('md')]: {
    borderBottom: '1px solid' + theme.palette.background.default
  }
}));



import value from 'assets/scss/_themes-vars.module.scss';

import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';


// ==============================|| DASHBOARD DEFAULT ||============================== //

const Default = () => {
  const [data , setdata] = useState([])

  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://demos.wutthiphon.space/lab/ubuntu/serv/101/api/dashboard/getdata", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        const data = await response.json();
        setdata(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);



  const lockerCount = data?.lockerlist?.length || 0;
  const locker_notuse_count = data?.locker_notuse_count?.length || 0;

  

  const lockerNums = data?.lockerlist?.map(locker => `locker_num ${locker.locker_num}`) || [];
  const locker_history = data?.lockerlist?.map(locker => locker.locker_count) || [];
 


   


  const RevenuChartCardData = {
    height: 280,
    type: 'donut',
    options: {
      dataLabels: {
        enabled: false
      },
      yaxis: {
        min: 0,
        max: 100
      },
      labels: lockerNums,
      legend: {
        show: true,
        position: 'bottom',
        fontFamily: 'inherit',
        labels: {
          colors: 'inherit'
        }
      },
      itemMargin: {
        horizontal: 10,
        vertical: 10
      },
      // ใช้ colors แบบสุ่ม ตามจำนวน lockerNums แต่ไม่มีสีขาวหรือสีอ่อน
      colors: lockerNums.map(() => {
        let color;
        while (!color || parseInt(color.substring(1), 16) > 0xEEEEEE) {
          color = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
        }
        return color;
      }),
    },
    series: locker_history
  };
  

// จับคู่ locker_num และ locker_count แล้วเรียงลำดับตาม locker_count
const sortedLockerList = data?.lockerlist?.sort((a, b) => a.locker_count - b.locker_count) || [];

// ดึงข้อมูล locker_num ที่เรียงลำดับแล้ว
const locker_Nums = sortedLockerList.map(locker => `locker_num ${locker.locker_num}`);

// ดึงข้อมูล locker_count ที่เรียงลำดับแล้ว
const locker_history1 = sortedLockerList.map(locker => locker.locker_count);
const locker_status = sortedLockerList.map(locker => locker.locker_status);

// สร้าง dataSetline ที่มีข้อมูลที่เรียงลำดับแล้ว
const dataSetline = { 
  labels: locker_Nums,
  locker_history: locker_history1,
  locker_status: locker_status
};






const chartData = { 
  type: 'bar', // เปลี่ยนเป็นกราฟแท่ง (Bar chart)
  height: 300, // ความสูงของกราฟ
  options: { // การตั้งค่ากราฟ
    dataLabels: {
      enabled: true // เปิดการแสดง data labels
    },
    colors: [value.primary, value.success], // สีของกราฟ
    stroke: {
      curve: 'smooth', // ใช้เส้นโค้ง
      width: 3, // ความหนาของเส้น
    },
    yaxis: {
      min: 0, // ค่าต่ำสุดของแกน Y
      max: Math.max(...dataSetline.locker_history) + 5 // ค่าสูงสุดของแกน Y
    },
    tooltip: {
      theme: 'light', // ใช้ธีมอ่อน
      fixed: {
        enabled : false // ปิดการแสดงผลแบบติด
      },
      x: {
        title: {
          labels: {
            show: true // แสดงป้ายของแกน X
          }
        }
      },
      y: {
        title: {
          formatter: () => 'Locker Count' // ตั้งชื่อให้แกน Y
        }
      },
      marker: {
        show: false// ปิด marker
      }
    },
    xaxis: {
      categories: dataSetline.locker_num || [], // แกน X คือ locker_num
      title: {
        text: 'Locker Numbers' // ชื่อของแกน X
      }
    }
  },
  series: [
    {
      name: 'Locker Count',
      data: dataSetline.locker_history || [] 
    }
  ]
};



const lockerNotUse = data.locker_notuse_count || [];
const lockerList = data.lockerlist || [];

// สร้าง Set ของ locker_id ที่ไม่ว่าง
const notAvailableLockers = new Set(lockerNotUse.map(l => l.locker_id));

// ตรวจสอบว่าล็อกเกอร์แต่ละตัวว่างหรือไม่
const lockerStatus = lockerList.map(locker => ({
  locker_num: locker.locker_num,
  status: notAvailableLockers.has(locker.locker_id) ? '1' : '0'
})).sort((a, b) => a.locker_num - b.locker_num);


  

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={3} sm={6} xs={12}>
          <ReportCard
  primary={`${lockerCount} lockers`}
  secondary="Total Lockers"
  color={theme.palette.warning.main}
  // footerData="10% changes on profit"
  iconPrimary={ViewModuleRoundedIcon}
  // iconFooter={TrendingUpIcon}
/>



          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <ReportCard
              primary={`${lockerCount - locker_notuse_count} lockers`}
              secondary="Occupied Lockers"
              color={theme.palette.error.main}
              // footerData="28% task performance"
              iconPrimary={HttpsOutlinedIcon}
              // iconFooter={TrendingDownIcon}
            />
          </Grid>

          {/* locker_notuse_count */}
          <Grid item lg={3} sm={6} xs={12}>
            <ReportCard
               primary={`${locker_notuse_count} lockers`} 
              secondary="Available Lockers"
              color={theme.palette.success.main}
              // footerData="10k daily views"
              iconPrimary={LockOpenOutlinedIcon}
              // iconFooter={TrendingUpIcon}
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <ReportCard
              primary={`${data.user_count} users`}
              secondary="Total Users"
              color={theme.palette.primary.main}
              // footerData="1k download in App store"
              iconPrimary={PeopleOutlinedIcon}
              // iconFooter={TrendingUpIcon}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={8} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={gridSpacing}>
                  <Grid item xs={12}>
                    <SalesLineCard
                      chartData={chartData}
                      title='Locker Booking History'
                    />

                  </Grid>

               
                  {/* <Grid item xs={12} sx={{ display: { md: 'block', sm: 'none' } }}>
                    <Card>
                      <CardContent sx={{ p: '0 !important' }}>
                        <Grid container alignItems="center" spacing={0}>
                          <FlatCardBlock>
                            <Grid container alignItems="center" spacing={1}>
                              <Grid item>
                                <Typography variant="subtitle2" align="left">
                                  REALTY
                                </Typography>
                              </Grid>
                              <Grid item sm zeroMinWidth>
                                <Typography variant="h5" sx={{ color: theme.palette.error.main }} align="right">
                                  -0.99
                                </Typography>
                              </Grid>
                            </Grid> */}
                          {/* </FlatCardBlock> */}
                          {/* <FlatCardBlock>
                            <Grid container alignItems="center" spacing={1}>
                              <Grid item>
                                <Typography variant="subtitle2" align="left">
                                  INFRA
                                </Typography>
                              </Grid>
                              <Grid item sm zeroMinWidth>
                                <Typography variant="h5" sx={{ color: theme.palette.success.main }} align="right">
                                  -7.66
                                </Typography>
                              </Grid>
                            </Grid>
                          </FlatCardBlock> */}
                        {/* </Grid>
                      </CardContent> */}
                    {/* </Card> */}
                  {/* </Grid> */}
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <RevenuChartCard chartData={RevenuChartCardData} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={4} xs={12}>
            <Card>
              <CardHeader
                title={
                  <Typography component="div" className="card-header">
                    Locker Status
                  </Typography>
                }
              />
              <Divider />
              <CardContent>
                <Grid container spacing={gridSpacing}>
                  <Grid item xs={12}>
                    {lockerStatus.map((locker, index) => (
                      <Grid container key={index} alignItems="center" spacing={1}>
                        <Grid item>
                          <AppsOutlinedIcon color="primary" />
                        </Grid>
                        <Grid item sm zeroMinWidth>
                          <Typography variant="subtitle2" align="left">
                            Locker {locker.locker_num}
                          </Typography>
                        </Grid>
                        <Grid item>
                        <Typography 
  style={{
    color: locker.status === "1" ? 'red' : 'green', // 1 = ไม่ว่าง (แดง), 0 = ว่าง (เขียว)
  }}
>
  {locker.status === "1" ? 'Occupied' : 'Available'} 
</Typography>

                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Default;
