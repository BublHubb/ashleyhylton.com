import { RiJavascriptFill } from "react-icons/ri";
import { BiLogoTypescript } from "react-icons/bi";
import { BiLogoReact } from "react-icons/bi";
import { SiNextdotjs } from "react-icons/si";
import { BiLogoFirebase } from "react-icons/bi";
import { BiLogoNodejs } from "react-icons/bi";
import { SiAdobecreativecloud } from "react-icons/si";

type Props = {};

export const SkillsExport = (props: Props) => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 md:gap-5 justify-between z-20  text-[#341948] bg-gray-50/30 rounded-2xl backdrop-blur-2xl p-2 invisible md:visible">
      <div className="justify-center items-center flex flex-col">
        <RiJavascriptFill className="skillIcons" />
        <p className="skillText">Javascript</p>
      </div>
      <div className="justify-center items-center flex flex-col">
        <BiLogoTypescript className="skillIcons" />
        <p className="skillText invisible md:visible">Typescript</p>
      </div>
      <div className="justify-center items-center flex flex-col">
        <BiLogoReact className="skillIcons" />
        <p className="skillText">React</p>
      </div>
      <div className="justify-center items-center flex flex-col">
        <BiLogoReact className="skillIcons" />
        <p className="skillText">React Native</p>
      </div>
      <div className="justify-center items-center flex flex-col">
        <SiNextdotjs className="skillIcons" />
        <p className="skillText">Next</p>
      </div>
      <div className="justify-center items-center flex flex-col">
        <BiLogoFirebase className="skillIcons" />
        <p className="skillText">Firebase</p>
      </div>
      <div className="justify-center items-center flex flex-col">
        <BiLogoNodejs className="skillIcons" />
        <p className="skillText">Node</p>
      </div>
      <div className="justify-center items-center flex flex-col">
        <SiAdobecreativecloud className="skillIcons" />
        <p className="skillText">Adobe </p>
      </div>
    </div>
  );
};
