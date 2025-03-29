'use client';
import { Provider } from "react-redux";
import store from "@/stores";
import dynamic from "next/dynamic";
import styled from 'styled-components'
import { ThemeProvider } from '@mui/material/styles'
import muiTheme from "@/MuiTheme";
const PhaserGame = dynamic(() => import('../components/PhaserGame'), {
  ssr: false // This ensures the component only renders on client-side
});
import HelperButtonGroup from "@/components/HelperButtonGroup";
import HomeScreenDialog from "@/components/HomeScreenDialog";
const Backdrop = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`
export default function Home() {
  let ui=<HomeScreenDialog/>
  return (<>
  <Provider store={store}>
  <ThemeProvider theme={muiTheme}>
    <Backdrop>
   <PhaserGame/>
   {ui}
   <HelperButtonGroup/>
   </Backdrop>
   </ThemeProvider>
   </Provider>
   </>
  );
}