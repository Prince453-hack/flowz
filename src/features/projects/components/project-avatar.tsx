import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  image?: string;
  name: string;
  className?: string;
  fallBackClassName?: string;
}

export const ProjectAvatar = ({
  name,
  image,
  className,
  fallBackClassName,
}: Props) => {
  if (image) {
    return (
      <div
        className={cn("size-5 relative rounded-md overflow-hidden", className)}
      >
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
    );
  }

  return (
    <Avatar className={cn("size-5 rounded-md", className)}>
      <AvatarFallback
        className={cn(
          "text-white bg-fuchsia-600 font-semibold text-sm uppercase rounded-md",
          fallBackClassName
        )}
      >
        {name[0]}
      </AvatarFallback>
    </Avatar>
  );
};
