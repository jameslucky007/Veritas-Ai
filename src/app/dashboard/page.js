import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import React from 'react'

const Page = () => {
  return (
   <>
    <Sidebar/>
     <main className="ml-[220px] flex-1 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 min-h-screen overflow-y-auto">
        <Dashboard />
      </main>
   </>
  )
}

export default Page


