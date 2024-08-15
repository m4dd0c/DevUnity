import React from "react";
import DiscussionModal from "../Room/Modals/DiscussionModal";
import UsersModal from "../Room/Modals/UsersModal";

const RenderModal = ({
  icon,
  label,
  animate,
  open,
  roomId,
}: {
  icon: React.ReactNode | React.JSX.Element;
  label: string;
  animate: boolean;
  open: boolean;
  roomId?: string;
}) => {
  let Component = <h1>Nothing to show here</h1>;
  switch (label) {
    case "Discussion":
      Component = (
        <DiscussionModal
          roomId={roomId}
          icon={icon}
          label={label}
          animate={animate}
          open={open}
        />
      );
      break;
    case "Users":
      Component = (
        <UsersModal
          roomId={roomId}
          icon={icon}
          label={label}
          animate={animate}
          open={open}
        />
      );
      break;
    default:
      break;
  }
  return <div>{Component}</div>;
};

export default RenderModal;
