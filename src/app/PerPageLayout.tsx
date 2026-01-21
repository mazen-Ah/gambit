"use client"

import React from 'react'
import Popup from '../components/common/Popup/Popup'
import MemberPopup from '../components/common/Popup/MemberPopup/MemberPopup'
import ScrollSmootherContainer from '../components/common/Animation/ScrollSmootherContainer'
import Footer from '../layout/footer'
import WorkWithUsPopup from '../components/common/Popup/WorkWithUsPopup/WorkWithUsPopup'

function PerPageLayout({ 
  children,
}: { 
  children: React.ReactNode
}) {
  return (
    <div>
      <ScrollSmootherContainer>
        {children}
        <Footer />
      </ScrollSmootherContainer>
      <Popup type='center' id='member'>
        <MemberPopup />
      </Popup>
      <Popup type='center' id='workWithUs'>
        <WorkWithUsPopup />
      </Popup>
    </div>
  )
}

export default PerPageLayout