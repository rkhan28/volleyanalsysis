import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import Navigation from './components/Layout/Navigation';
import LiveFeed    from './components/UI/LiveFeed';
import Login       from './pages/Login';
import Dashboard   from './pages/Dashboard';
import Timeline    from './pages/Timeline';
import Players     from './pages/Players';
import VideoReview from './pages/VideoReview';
import Settings    from './pages/Settings';

import { socket } from './lib/socket';

function App() {
  // Connect socket once on app start, disconnect on teardown
  useEffect(() => {
    socket.connect();
    return () => { socket.disconnect(); };
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/*"
            element={
              <>
                <Navigation />
                <main>
                  <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/timeline"  element={<Timeline />} />
                    <Route path="/players"   element={<Players />} />
                    <Route path="/video"     element={<VideoReview />} />
                    <Route path="/settings"  element={<Settings />} />
                  </Routes>
                </main>
                <LiveFeed />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
  