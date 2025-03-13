"use client";

import { use, useEffect, useState } from "react";
import { getUserById } from "@/lib/api/users";
import { Users } from "@prisma/client";
import { PersonalData } from "@/components/profile/profile-data";
import { ProfileActions } from "@/components/profile/profile-actions";
import LoadingAnimation from "@/app/loading";

export default function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [userData, setUserData] = useState<Users>({} as Users);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserById(id);
      setUserData(user);
    };
    fetchUser();
    setIsLoading(false);
  }, [id]);

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <h1 className="md:text-3xl text-2xl pl-4 md:pl-0 font-bold">
          Perfil do Usuário
        </h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {isLoading ? (
          <LoadingAnimation />
        ) : (
          <>
            <PersonalData userData={userData} />
            <ProfileActions userDataId={userData.id} />
          </>
        )}
      </div>
    </div>
  );
}
