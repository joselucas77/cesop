"use client";

import { CalendarIcon, House, Mail, Phone, VenusAndMars } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Users } from "@prisma/client";
import { formatAvatarName } from "@/utils/format";
import { formatDate } from "date-fns";

export function HoverCardUserDetails({ user }: { user: Users }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild className="px-0">
        <Button variant="link">Informações do Cidadão</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarFallback>{formatAvatarName(user.name)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1 w-full">
            <h4 className="text-sm font-semibold">{user.name}</h4>
            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4" />{" "}
              <span className="text-xs">
                {formatDate(user.birthdate, "dd/MM/yyyy") ?? "N/A"}
              </span>
            </div>
            <div className="flex items-center pt-2">
              <VenusAndMars className="mr-2 h-4 w-4" />{" "}
              <span className="text-xs">{user.sex}</span>
            </div>
            <div className="flex items-center pt-2">
              <Phone className="mr-2 h-4 w-4" />{" "}
              <span className="text-xs">{user.phone}</span>
            </div>
            {user.email && (
              <div className="flex items-center pt-2">
                <Mail className="mr-2 h-4 w-4" />{" "}
                <span className="text-xs">{user.email}</span>
              </div>
            )}
            <div className="flex items-center pt-2">
              <House className="mr-2 h-4 w-4" />{" "}
              <span className="text-xs">
                {user.street}, {user.houseNumber} - {user.district}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
