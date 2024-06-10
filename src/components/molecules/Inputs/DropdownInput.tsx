'use client';

import { memo, useState } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  useWatch,
} from "react-hook-form";
import { Heading5, Icons, TextBase, ErrorText } from "@/src/components/atoms";
import { FilterButton } from "@/src/components/molecules";
import { twMerge } from "tailwind-merge";

interface DropdownInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  errorText?: string;
  placeholder?: string;
  options: string[],
  label?: string;
}
  
const DropdownInput = <T extends FieldValues>({
  options,
  name,
  control,
  errorText,
  placeholder,
  label,
}: DropdownInputProps<T>) => {
  const [isExtended, setIsExtended] = useState(false);
  const selectedOptions = useWatch({
    control,
    name,
  });

  return (
    <div className="flex flex-col w-full gap-3">
      {!!label && (
        <Heading5 text={label} font="medium" />
      )}
      <div
        className={twMerge(
          `border border-gray-50 bg-white grow relative
            text-black flex w-full items-center
            rounded-md gap-4 placeholder:text-gray-50
            transition-colors focus:outline-none px-4 py-3`,
          errorText && 'border-error',
        )}
      >
        <div className="flex justify-between items-center grow">
          <div className="h-10 flex items-center gap-2">
            {selectedOptions.length ? (
              <>
                {selectedOptions.slice(0,3).map((option: string) => (
                  <div 
                    key={option}
                    className="text-sm rounded-full py-2 px-3 w-max 
                   text-regular bg-gray-80 text-white"
                  >
                    {option}
                  </div>
                ))}
              </>
            ) : (
              <TextBase 
                text={placeholder || ''} 
                font="normal" 
                classes="text-gray-50 h-fit" 
              />
            )}
          </div>
          {selectedOptions.length > 3 && (
            <TextBase 
              text={`+${selectedOptions.length - 3} others`} 
              font="normal" 
              classes="h-fit" 
            />
          )}
        </div>
        
        <button
          type="button"
          onClick={() => setIsExtended(isExt => !isExt)}
        >
          {isExtended ? (
            <Icons.up className="w-6 h-6" />
          ) : (
            <Icons.down className="w-6 h-6" />
          )}
        </button>
      </div>

      {isExtended && (
        <div
          className="bg-white border 
            border-gray-50 py-3 px-4 shadow-lg w-full 
            rounded-b-md flex flex-wrap gap-2"
        >
          {options.map((option: string) => (
            <FilterButton 
              key={option} 
              value={option} 
              name={name} 
              control={control} 
            />
          ))}
        </div>
      )}

      {!!errorText && <ErrorText errorText={errorText} />}
    </div>
  );
};
  
export default memo(DropdownInput) as typeof DropdownInput;