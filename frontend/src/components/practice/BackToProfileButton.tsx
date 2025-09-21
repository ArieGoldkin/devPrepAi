import React from 'react'

import { Button } from '../ui/button'

interface IBackToProfileButtonProps {
  onEditProfile: () => void
}

export function BackToProfileButton({ onEditProfile }: IBackToProfileButtonProps): React.JSX.Element {
  return (
    <div className="text-center">
      <Button variant="outline" onClick={onEditProfile}>
        Edit Profile
      </Button>
    </div>
  )
}
