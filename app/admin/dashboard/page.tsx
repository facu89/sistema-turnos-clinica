"use client"

import { GeneralHeader } from "@/components/GeneralHeader"
import { CardStats } from "./CardStats"
import { GeneralTabList } from "./GeneralTabList"

export default function AdminDashboard() {

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <GeneralHeader></GeneralHeader>
      </header>

          <div className="container mx-auto px-4 py-6">

{/* aca iria lo de card stats de ultima */}
{/* <CardStats></CardStats> */}

        {/* Main Content */}
<GeneralTabList></GeneralTabList>
              </div>
    </div>
  )
}
