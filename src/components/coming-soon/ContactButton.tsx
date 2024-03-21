import Link from "next/link";
import { FaDiscord, FaSteam } from "react-icons/fa";

export default function ContactButton({ variant }: { variant: string }) {
  const iconSize = 25;
  const buttonLink =
    variant === "steam"
      ? "https://steamcommunity.com/id/brandonmowat"
      : "https://discord.com/invite/brandonmowat";
  const buttonText = variant === "steam" ? "Steam" : "Discord";
  const Icon =
    variant === "steam" ? (
      <FaSteam size={iconSize} color="white" />
    ) : (
      <FaDiscord size={iconSize} color="white" />
    );
  const bgColor = variant === "discord" ? "bg-[#7289da]" : "bg-[#181D24]";
  const textColor = variant === "steam" ? "text-white" : "text-black";

  return (
    <div
      className={`flex gap-2 rounded-lg p-2 pr-4 text-lg ${textColor} ${bgColor}`}
    >
      <span className="flex items-center align-text-bottom">{Icon}</span>
      <Link href={buttonLink}>{buttonText}</Link>
    </div>
  );
}
