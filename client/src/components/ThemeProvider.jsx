import React from 'react'
import { useSelector } from 'react-redux'

const ThemeProvider = ({ children }) => {
    const { theme } = useSelector((state) => state.theme);

    return (
        <div className={theme}>
            {theme === 'light' && (
                <div
                    className="fixed inset-0 z-[-1] w-screen h-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]">
                </div>
            )}
            <div className='relative min-h-screen text-gray-700 dark:text-gray-200 dark:bg-black'>
                {children}
            </div>
        </div>
    );
}

export default ThemeProvider;
