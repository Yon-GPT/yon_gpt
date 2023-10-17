"use client";

import * as React from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import ChecklistIcon from '@mui/icons-material/Checklist';
import SettingsIcon from '@mui/icons-material/Settings';
import SupportIcon from '@mui/icons-material/Support';
import LogoutIcon from '@mui/icons-material/Logout';
import CreateIcon from '@mui/icons-material/Create';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MessageIcon from '@mui/icons-material/Message';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import UploadIcon from '@mui/icons-material/Upload';
import { useRouter } from 'next/navigation';



const metadata = {
  title: 'YonGPT',
  description: '',
};

const DRAWER_WIDTH = 240;


const LINKS = [
  { text: '홈', href: '/', icon: HomeIcon },
  { text: '모의면접', href: '/MockInterview', icon: MessageIcon },
  { text: '자기소개서 첨삭', href: '/ResumeEditing', icon: CreateIcon },
];

const PLACEHOLDER_LINKS = [
  { text: 'Settings', icon: SettingsIcon },
  { text: 'Support', icon: SupportIcon },
  { text: 'Logout', icon: LogoutIcon },
];


export default function RootLayout({ children }: { children: React.ReactNode }) {

  const [value, setValue] = React.useState(0)
  
  const router = useRouter();

  const onLink = (href: string) => {
    router.push(href);
  };

  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AppBar position="fixed" sx={{ zIndex: 2000 }}>
            <Toolbar sx={{ backgroundColor: 'background.primary' }}>
              <AccountBoxIcon sx={{ color: '#fff', mr: 2 }} />
              <Typography variant="h6" noWrap component="div" color="white">
                YonGPT
              </Typography>
            </Toolbar>
          </AppBar>
          {/* <Drawer
            sx={{
              width: 'auto',
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: 'auto',
                boxSizing: 'border-box',
                top: ['auto', 'auto', 'auto'],
                height: 'auto',
                bottom: '0',
              },
            }}
            variant="permanent"
            anchor="bottom"
          >
            <Divider />
            
            <List style={flexContainer}>
              {LINKS.map(({ text, href, icon: Icon }) => (
                <ListItem key={href} disablePadding>
                  <ListItemButton component={Link} href={href}>
                    <ListItemIcon>
                      <Icon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ mt: 'auto' }} />

          </Drawer> */}
          <Box
            component="main"
            sx={{
              flexGrow: 'auto',
              bgcolor: 'background.default',
              ml: `0`,
              mt: ['64px'],
              p: 3,
            }}
          >
            {children}
          </Box>
        </ThemeRegistry>
        
        <Drawer
            sx={{
              width: 'auto',
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: 'auto',
                boxSizing: 'border-box',
                top: ['auto', 'auto', 'auto'],
                height: 'auto',
                bottom: '0',
              },
            }}
            variant="permanent"
            anchor="bottom"
          >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} onClick={() => onLink("/")} />
          <BottomNavigationAction label="Interview" icon={<MessageIcon />} onClick={() => onLink("/MockInterview")}/>
          <BottomNavigationAction label="Upload" icon={<UploadIcon />} onClick={() => onLink("/ResumeEditing")}/>
        </BottomNavigation>
        </Drawer>
      </body>
    </html>
  );
}
