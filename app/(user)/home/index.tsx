import { LayoutProvider } from '@/components/context/LayoutContext';
import HomeScreen from '@/components/user/home-screen';

export default function Page() {
  return (
    <LayoutProvider>
      <HomeScreen />
    </LayoutProvider>
  );
}
