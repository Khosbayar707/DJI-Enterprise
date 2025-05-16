import { Dispatch, SetStateAction } from "react";
import { ImageIcon, SendToBack, VideoIcon } from "lucide-react";
import { SpecSideBarOptions } from "@/lib/types";
import Link from "next/link";
import { Button } from "@mui/material";
import { TfiAlignCenter } from "react-icons/tfi";
const SpecSidebar = ({
  activeSection,
  setActiveSection,
}: {
  activeSection: SpecSideBarOptions;
  setActiveSection: Dispatch<SetStateAction<SpecSideBarOptions>>;
}) => {
  return (
    <aside className="w-64 bg-muted p-6 flex flex-col gap-4 border-r">
      <h2 className="text-xl font-semibold mb-4">Эд анги</h2>
      <Link
        href={"/admin"}
        className="justify-start cursor-pointer shadow-2xl items-center flex gap-3"
      >
        <SendToBack size={20} /> <div>Буцах</div>
      </Link>
      <Button
        sx={{ justifyContent: "flex-start" }}
        color={
          activeSection === SpecSideBarOptions.GENERAL ? "primary" : "inherit"
        }
        onClick={() => setActiveSection(SpecSideBarOptions.GENERAL)}
        className="justify-start cursor-pointer shadow-2xl flex gap-3"
      >
        <TfiAlignCenter size={20} /> <div>Ерөнхий мэдээлэл</div>
      </Button>
      <Button
        sx={{ justifyContent: "flex-start" }}
        color={
          activeSection === SpecSideBarOptions.IMAGES ? "primary" : "inherit"
        }
        onClick={() => setActiveSection(SpecSideBarOptions.IMAGES)}
        className="justify-start cursor-pointer shadow-2xl flex gap-3"
      >
        <ImageIcon size={20} /> <div>Зураг</div>
      </Button>
    </aside>
  );
};

export default SpecSidebar;
