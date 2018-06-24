import React from 'react';

const Header = (props) => (
    <React.Fragment>
        <header className="top">
            <h1>Catch
                <span className="ofThe">
                    <span className="of">Of</span>
                    <span className="the">The</span>
                </span>
                Day
            </h1>
            <h3 className="tagline">
                <span>{props.tagline}</span>
            </h3>
        </header>
    </React.Fragment>
)

export default Header;