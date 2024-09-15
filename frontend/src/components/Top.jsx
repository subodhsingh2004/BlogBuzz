import React from 'react'
import { useLocation } from 'react-router-dom';

function Top() {
    const { pathname } = useLocation();

    return (

        useEffect(() => {
            window.scrollTo(0, 0);
        }, [pathname])
  )
}

export default Top