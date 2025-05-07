import { motion } from "framer-motion";
import { MemberInformation } from ".";
import { Popover } from "antd";
import { useContext } from "react";
import { LangContext } from "../../contexts/LangContext";

type MemberProps = {
  member: MemberInformation;
  index: number;
  popover: boolean;
};

const Member = ({ member, index, popover }: MemberProps) => {
  const { trans } = useContext(LangContext);

  const emptyContent = { en: "", vi: "" };
  const isValid: boolean =
    member.interest != undefined &&
    member.major != undefined &&
    member.reasons != undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 * index }}
      viewport={{ once: true }}
      key={member.name}
      className="w-1/2 p-2 md:w-1/3 lg:w-1/5"
    >
      <Popover
        title={
          <h4 className="text-xl text-center" style={{ color: member.color }}>
            {member.name}
          </h4>
        }
        trigger={["hover", "click"]}
        className="cursor-pointer"
        content={
          popover && isValid ? (
            <div className="max-w-[400px]">
              <hr className="mb-2" />
              <p>
                <span className="font-semibold" style={{ color: member.color }}>
                  {trans({
                    en: "Interest",
                    vi: "Lĩnh vực quan tâm",
                  })}
                  :{" "}
                </span>
                {trans(member.interest || emptyContent)}
              </p>
              <p>
                <span className="font-semibold" style={{ color: member.color }}>
                  {trans({
                    en: "Reasons for participation",
                    vi: "Lý do tham gia",
                  })}
                  :{" "}
                </span>
                {trans(member.reasons || emptyContent)}
              </p>
            </div>
          ) : (
            <p>
              {trans({
                en: "This member doesn't have detail information",
                vi: "Không có nhiều thông tin về thành viên này",
              })}
            </p>
          )
        }
      >
        <motion.div
          whileTap={{ scale: 0.9, rotate: 4 }}
          className="relative h-[250px] w-full md:h-[350px] rounded-md overflow-hidden group"
        >
          <img
            src={member.img}
            className="absolute top-0 bottom-0 right-0 block object-cover object-top w-full h-full select-none drop-shadow-2xl"
          />
          <div
            className="top-[50%] transition-all absolute bottom-0 left-0 right-0 z-[-1] rounded-r-md rounded-l-md"
            style={{ backgroundColor: member.color }}
          ></div>
        </motion.div>
      </Popover>
      <div className="mt-2 text-center">
        <h4 className="p-1 mb-1 font-semibold rounded-lg bg-gray-50 text-md md:text-xl ">
          {member.name}
        </h4>
        <p>{trans(member.major || emptyContent)}</p>
      </div>
    </motion.div>
  );
};

export default Member;
