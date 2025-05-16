import { BrowserRouter, Routes, Route, Router } from 'react-router';
import { ROUTES } from '../config/routes';
import HomePage from '../pages/HomePage/HomePage';
import EventsPage from '../pages/EventsPage/EventsPage';
import LoginPage from '../pages/LoginPage/LoginPage';

const AppRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path={ROUTES.home} element={<HomePage />} />
            <Route path={ROUTES.events} element={<EventsPage />} />
            <Route path={ROUTES.login} element={<LoginPage />} />
        </Routes>
    </BrowserRouter>
);

export default AppRouter;
