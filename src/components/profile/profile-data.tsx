"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  HomeIcon as House,
} from "lucide-react";
import type { Users } from "@prisma/client";
import { EditProfile } from "./edit";
import { formatDate } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { formatAvatarName } from "@/utils/format";

export function PersonalData({ userData }: { userData: Users }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Informações do Perfil
          <EditProfile userData={userData} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center mb-6">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarFallback>{formatAvatarName(userData.name)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="space-y-4 shadow-inner p-4 rounded-lg dark:bg-zinc-900">
          <div className="flex items-center space-x-4">
            <User className="w-5 h-5 text-muted-foreground" />
            <span>
              {userData.name || <Skeleton className="h-4 w-[250px]" />}
            </span>
          </div>
          {userData.email && (
            <div className="flex items-center space-x-4">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <span>
                {userData.email || <Skeleton className="h-4 w-[250px]" />}
              </span>
            </div>
          )}
          <div className="flex items-center space-x-4">
            <Phone className="w-5 h-5 text-muted-foreground" />
            <span>
              {userData.phone || <Skeleton className="h-4 w-[250px]" />}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <House className="w-5 h-5 text-muted-foreground" />
            <span>
              {userData.street ? (
                `${userData.street}, ${userData.houseNumber} - ${userData.district}`
              ) : (
                <Skeleton className="h-4 w-[250px]" />
              )}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <MapPin className="w-5 h-5 text-muted-foreground" />
            <span>
              {userData.state && userData.city ? (
                `${userData.state} - ${userData.city}`
              ) : (
                <Skeleton className="h-4 w-[250px]" />
              )}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            <span>
              {userData.birthdate ? (
                formatDate(userData.birthdate, "dd/MM/yyyy")
              ) : (
                <Skeleton className="h-4 w-[250px]" />
              )}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
