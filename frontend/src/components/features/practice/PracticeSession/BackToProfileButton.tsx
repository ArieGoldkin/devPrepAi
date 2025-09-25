import { User2 } from "lucide-react";
import React from "react";

import { Button } from "@components/ui/button";

interface IBackToProfileButtonProps {
  onEditProfile: () => void;
}

export function BackToProfileButton({
  onEditProfile,
}: IBackToProfileButtonProps): React.JSX.Element {
  return (
    <Button onClick={onEditProfile} variant="outline">
      <User2 className="mr-2 h-4 w-4" />
      Edit Profile
    </Button>
  );
}
