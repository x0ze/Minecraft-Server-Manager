"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserItem() {
  return (
    <div className="flex flex-col items-center">
      <Avatar className="w-20 h-20 m-2">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <p className="text-[16px] font-bold">Administrator</p>
      <p className="text-[12px] text-neutral-500">myadmin@myemail.com</p>
    </div>
  );
}
