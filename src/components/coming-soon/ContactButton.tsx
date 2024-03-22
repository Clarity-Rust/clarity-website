import Link from "next/link";
import { FaDiscord, FaSteam } from "react-icons/fa";

export default function ContactButton({ variant }: { variant: string }) {
  const iconSize = 25;
  const buttonLink =
    variant === "steam"
      ? "https://steamcommunity.com/groups/clarityrust"
      : "https://discord.gg/clarityrust";
  const buttonText = variant === "steam" ? "Steam" : "Discord";
  const Icon =
    variant === "steam" ? (
      <FaSteam size={iconSize} color="white" />
    ) : (
      <FaDiscord size={iconSize} color="white" />
    );
  const bgColor = variant === "discord" ? "bg-[#7289da]" : "bg-[#181D24]";

  return (
    <div
      className={`text-md flex gap-2 rounded-full p-2 pr-4 text-white ${bgColor}`}
    >
      <span className="flex items-center align-text-bottom">{Icon}</span>
      <Link className="press-start" href={buttonLink}>
        {buttonText}
      </Link>
    </div>
  );
}
