import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashboardComp from '../components/DashboardComp';
import DashComments from '../components/DashComments';
import DashPosts from '../components/DashPosts';
import DashProfile from '../components/DashProfile';
import DashSidebar from '../components/DashSidebar';
import DashUsers from '../components/DashUsers';

export default function Dashboard() {
    const location = useLocation()
    const [tab, setTab] = useState('')
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        setTab(urlParams.get('tab'))

    }, [location.search]);

    //console.log(tab)

    return (
        <div className='min-h-screen flex flex-col  md:flex-row'>
            <div className="md:w-56">
                {/* Sidebar */}
                <DashSidebar />
            </div>
            {/* Profile */}
            {tab === 'profile' && <DashProfile />}
            {/* Posts */}
            {tab === 'posts' && <DashPosts />}
            {/* Users */}
            {tab === 'users' && <DashUsers />}
            {/* Comments */}
            {tab === 'comments' && <DashComments />}
            {/* Dashboard component */}
            {tab === 'dash' && <DashboardComp />}

        </div>
    )
}
