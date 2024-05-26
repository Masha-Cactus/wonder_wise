import { memo } from "react";
import { TextBase, TextSmall } from "@/src/components/atoms";

type Props = {
  icon: React.ReactNode;
  onClick?: () => void;
  text?: string;
  classes: string;
  size?: 'small',
  disabled?: boolean,
};

const IconButton: React.FC<Props> 
= ({ icon, onClick, text, classes, size, disabled }) => {
  return (
    <button 
      className={`flex items-center justify-center gap-1 px-2 py-1 ${classes}`} 
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      {text && (
        <>
          {size === 'small' ? (
            <TextSmall text={text} font="semibold" classes="text-inherit" />
          ) : (
            <TextBase text={text} font="normal" classes="text-inherit" />
          )}
        </>
      )}
    </button>
  );
};

export default memo(IconButton);
