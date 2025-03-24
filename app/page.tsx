'use client';
import { Provider } from "react-redux";
import store from "@/stores";
import dynamic from "next/dynamic";
const PhaserGame = dynamic(() => import('../components/PhaserGame'), {
  ssr: false // This ensures the component only renders on client-side
});
import HelperButtonGroup from "@/components/HelperButtonGroup";
export default function Home() {
  return (<>
  <Provider store={store}>
   <PhaserGame/>
   <HelperButtonGroup/>
   </Provider>
   </>
  );
}
