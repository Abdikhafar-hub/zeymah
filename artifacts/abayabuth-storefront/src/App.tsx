import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SiteChrome, StorefrontProvider } from '@/components/storefront';
import Home from '@/pages/home';
import CollectionPage from '@/pages/collection';
import ProductPage from '@/pages/product';
import NotFound from '@/pages/not-found';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Router() {
  return (
    <RoutedErrorBoundary>
      <StorefrontProvider>
        <SiteChrome>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/collections/abayas"><CollectionPage type="Abayas" /></Route>
            <Route path="/collections/hijabs"><CollectionPage type="Hijabs" /></Route>
            <Route path="/products/:slug" component={ProductPage} />
            <Route component={NotFound} />
          </Switch>
        </SiteChrome>
      </StorefrontProvider>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
