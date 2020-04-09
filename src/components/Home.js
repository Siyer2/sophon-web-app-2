import React from 'react';

import Navbar from './NavBar';
import FrontPageBody from './FrontPageBody';

function Home() {
    return (
        <div>
            <Navbar />
            <div className="jumbotron vertical-center">
                <FrontPageBody />
            </div>
        </div>
    )
}

export default Home;