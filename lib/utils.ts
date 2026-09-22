import { techMap } from "@/constant/techMap";

export { cn } from "cn";

export const getDeviconClassName = (techName: string) => {
  const normalizedTechName = techName.replace(/[ .]/g, "").toLowerCase();
  const iconClass = techMap[normalizedTechName];

  return Object.hasOwn(techMap, normalizedTechName)
    ? `${iconClass} colored`
    : "devicon-devicon-plain";
};
