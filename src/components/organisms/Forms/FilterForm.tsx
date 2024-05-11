"use client";

import { FormEvent, useState } from "react";
import { Divider } from "@/src/components/atoms";
import {
  CheckboxInput,
  FilterButton,
  FilterInput,
  RoundedButton,
} from "@/src/components/moleculs";
import LocationInput from "../../moleculs/Inputs/LocationInput";
import { Climate, SpecialRequirements, TripTypes } from "@/src/services";

type Props = {};

const distance = [
  "City",
  "Region",
  "Country",
  "Continent",
  "Wherever",
  "Specific Place",
];

const atmospheres = Object.values(TripTypes);
const climates = Object.values(Climate);
const specials = Object.values(SpecialRequirements);
const authors = ["Generated by AI", "Created by other users"];

type FormType = {
  atmosphere: string[];
  distance: string;
  climate: string[];
  special: string[];
  author: string;
  specificPlace: string;
  currentLocation: string;
};

const emptyState: FormType = {
  currentLocation: "",
  atmosphere: [],
  distance: "",
  climate: [],
  special: [],
  author: "",
  specificPlace: "",
};

const FilterForm: React.FC<Props> = ({}) => {
  const [form, setForm] = useState<FormType>(emptyState);

  const handleButtonClick = (value: string, type: keyof FormType) => {
    setForm((prevForm) => {
      const updatedForm = { ...prevForm };
      const field = updatedForm[type];

      if (Array.isArray(field)) {
        if (field.includes(value)) {
          updatedForm[type] = field.filter(
            (item) => item !== value
          ) as string[];
        } else {
          updatedForm[type] = [...field, value];
        }
      }

      return updatedForm;
    });
  };

  const handleCheckboxClick = (value: string, type: keyof FormType) => {
    setForm((prevForm) => ({
      ...prevForm,
      [type]: value,
    }));
  };

  const handleCancel = () => {
    setForm(emptyState);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setForm({
      currentLocation: "",
      atmosphere: [],
      distance: "",
      climate: [],
      special: [],
      author: "",
      specificPlace: "",
    });
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      action=""
      className="flex flex-col 
      bg-white border-2 border-gray-30 gap-8"
    >
      <div className="flex flex-col mt-8 mx-10">
        <h2 className="text-base font-semibold">Where are you now?</h2>
        <p className="text-xs text-regular mt-2">
          We need this info to build distance of your trip
        </p>
        <LocationInput
          onChange={(value) => setForm({ ...form, currentLocation: value })}
        />
      </div>

      <Divider classes="h-px w-full" />

      <div className="flex flex-col mx-10">
        <h2 className="text-base font-semibold">
          What is your preferred travel distance?
        </h2>
        <p className="text-xs text-regular mt-2">
          We need this info to figure out the scale of your trip
        </p>
        <div className="flex flex-wrap gap-3 mt-3">
          {distance.map((distance) => (
            <CheckboxInput
              key={distance}
              value={distance}
              onClick={() => handleCheckboxClick(distance, "distance")}
              selected={form.distance === distance}
            />
          ))}

          {form.distance === "Specific Place" && (
            <FilterInput
              onChange={(e) =>
                setForm({ ...form, specificPlace: e.target.value })
              }
            />
          )}
        </div>
      </div>

      <Divider classes="h-px w-full" />

      <div className="flex flex-col mx-10">
        <h2 className="text-base font-semibold">Type of your trip</h2>
        <div className="flex flex-wrap gap-2 mt-3">
          {atmospheres.map((atmosphere) => (
            <FilterButton
              key={atmosphere}
              value={atmosphere}
              selected={form.atmosphere.includes(atmosphere)}
              onClick={() => handleButtonClick(atmosphere, "atmosphere")}
            />
          ))}
        </div>
      </div>

      <Divider classes="h-px w-full" />

      <div className="flex flex-col mx-10">
        <h2 className="text-base font-semibold">Desired climate</h2>
        <div className="flex flex-wrap gap-2 mt-3">
          {climates.map((climate) => (
            <FilterButton
              key={climate}
              value={climate}
              selected={form.climate.includes(climate)}
              onClick={() => handleButtonClick(climate, "climate")}
            />
          ))}
        </div>
      </div>

      <Divider classes="h-px w-full" />

      <div className="flex flex-col mx-10">
        <h2 className="text-base font-semibold">Specials</h2>
        <div className="flex flex-wrap gap-2 mt-3">
          {specials.map((special) => (
            <FilterButton
              key={special}
              value={special}
              selected={form.special.includes(special)}
              onClick={() => handleButtonClick(special, "special")}
            />
          ))}
        </div>
      </div>

      <Divider classes="h-px w-full" />

      <div className="flex flex-col mx-10">
        <h2 className="text-base font-semibold">Cards are</h2>
        <div className="flex flex-wrap gap-2 mt-3">
          {authors.map((author) => (
            <CheckboxInput
              onClick={() => handleCheckboxClick(author, "author")}
              key={author}
              value={author}
              selected={form.author === author}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-4 mx-10 my-8">
        <RoundedButton
          text="Apply"
          type="submit"
          classes="bg-black text-white p-4 px-8"
        />
        <RoundedButton
          text="Clear"
          type="reset"
          classes="border-2 border-black rounded-full p-4 px-8"
          onClick={handleCancel}
        />
      </div>
    </form>
  );
};

export default FilterForm;
