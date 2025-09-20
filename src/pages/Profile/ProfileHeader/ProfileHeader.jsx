import { useState } from "react";
import { usePrincipalState } from "../../../stores/usePrincipalState";
import ProfileCardLayout from "../ProfileCardLayout/ProfileCardLayout";
import ProfileView from "../ProfileView/ProfileView";
import ProfileEditForm from "../ProfileEditForm/ProfileEditForm";

function ProfileHeader() {
  const { principal } = usePrincipalState();
  // 프로필 수정 관리
  const [isEditing, setIsEditing] = useState(false);
  return (
    <ProfileCardLayout>
      {isEditing ? (
        <ProfileEditForm
          principal={principal}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <ProfileView
          principal={principal}
          setIsEditing={() => setIsEditing(true)}
        />
      )}
    </ProfileCardLayout>
  );
}

export default ProfileHeader;
