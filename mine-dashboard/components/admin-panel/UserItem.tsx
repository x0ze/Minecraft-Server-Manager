"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserItemProps {
  isOpen: boolean | undefined;
}

export default function UserItem({ isOpen }: UserItemProps) {
  return (
    <div className="flex flex-col items-center">
      <Avatar className={cn("m-2", isOpen ? "w-20 h-20" : "w-10 h-10")}>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      {isOpen && (
        <>
          <p className="text-[16px] font-bold">Administrator</p>
          <p className="text-[12px] text-neutral-500">myadmin@myemail.com</p>
        </>
      )}
    </div>
  );
}
