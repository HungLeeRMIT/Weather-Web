import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

export function TeamMember() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage
            src="https://randomuser.me/api/portraits/women/68.jpg"
            alt="Avatar"
          />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Olivia Martin</p>
          <p className="text-sm text-muted-foreground">
            olivia.martin@email.com
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage
            src="https://randomuser.me/api/portraits/women/69.jpg"
            alt="Avatar"
          />
          <AvatarFallback>JL</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Jackson Lee</p>
          <p className="text-sm text-muted-foreground">jackson.lee@email.com</p>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage
            src="https://randomuser.me/api/portraits/women/70.jpg"
            alt="Avatar"
          />
          <AvatarFallback>IN</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
          <p className="text-sm text-muted-foreground">
            isabella.nguyen@email.com
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage
            src="https://randomuser.me/api/portraits/women/71.jpg"
            alt="Avatar"
          />
          <AvatarFallback>WK</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">William Kim</p>
          <p className="text-sm text-muted-foreground">will@email.com</p>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage
            src="https://randomuser.me/api/portraits/women/72.jpg"
            alt="Avatar"
          />
          <AvatarFallback>SD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Sofia Davis</p>
          <p className="text-sm text-muted-foreground">sofia.davis@email.com</p>
        </div>
      </div>
    </div>
  );
}
