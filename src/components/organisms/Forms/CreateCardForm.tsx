'use client';

import { useNormalizedError } from "@/src/hooks";
import { trimObjectFields } from "@/src/lib/helpers";
import { useCreateCard } from "@/src/queries";
import { 
  ClimateType, 
  SpecialRequirementsType, 
  TripTypesType 
} from "@/src/services";
import { useForm } from "react-hook-form";
import { Divider, ErrorText, Heading5 } from "@/src/components/atoms";
import { 
  DropdownInput, 
  LocationInput, 
  SelectInput, 
  TextAreaInput, 
  TextInput,
  CheckboxInput,
  PrimaryButton,
  SquareCheckboxInput
} from "@/src/components/moleculs";
import { createCardSchema } from "@/src/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dispatch, SetStateAction } from "react";
import { RadarAutocompleteAddress } from "radar-sdk-js/dist/types";
import { ATMOSPHERES, CLIMATES, SPECIALS } from "@/src/lib/constants";

export interface CreateCardFormData {
  name: string,
  location: RadarAutocompleteAddress | null,
  tripTypes: TripTypesType[],
  climate: ClimateType,
  specialRequirements: SpecialRequirementsType[],
  description: string,
  whyThisPlace: string[],
}

type Props = {
  setNewCardId: Dispatch<SetStateAction<number | null>>,
};

const CreateCardForm: React.FC<Props> = ({ setNewCardId }) => {
  const [errorMessage, setErrorMessage] = useNormalizedError();
  
  const validationSchema = createCardSchema();
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCardFormData>({
    defaultValues: {
      name: "",
      location: null,
      tripTypes: [],
      climate: CLIMATES[0],
      specialRequirements: [],
      description: "",
      whyThisPlace: [],
    },
    resolver: yupResolver(validationSchema),
  });

  const { isPending, mutate, isError } = useCreateCard();

  const handleError = (error: any) => {
    setErrorMessage(error.message);
  };
  
  const onSubmit = async (data: CreateCardFormData) => {
    const {
      location,
      ...trimmedData
    } = trimObjectFields(data);

    mutate({
      ...trimmedData,
      populatedLocality: location?.city || '',
      country: location?.country || '',
      mapLink: `https://www.google.com/maps/search/?api=1&query=${location?.latitude},${location?.longitude}`,
    },
    {
      onError: handleError,
      onSuccess: ({id}) => setNewCardId(id),
    }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-6"
    >
      <TextInput
        type="text"
        name="name"
        control={control}
        errorText={errors.name?.message}
        disabled={isPending}
        placeholder="Cool and awesome place"
        label="Name of the place"
      />

      <LocationInput 
        placeholder="City, region, country, continent"
        label="Location"
        name="location"
        control={control}
        disabled={isPending}
        errorText={errors.location?.message}
      />

      <TextAreaInput
        name="description"
        control={control}
        errorText={errors.description?.message}
        disabled={isPending}
        placeholder="Write something about this place"
        label="Description"
      />

      <SelectInput
        name="whyThisPlace"
        control={control}
        errorText={errors.whyThisPlace?.message}
        disabled={isPending}
        placeholder="Describe why"
        label="Why should people visit this place?"
      />

      <DropdownInput
        options={ATMOSPHERES}
        name="tripTypes"
        errorText={errors.tripTypes?.message}
        control={control}
        placeholder="Select the type of this place"
        label="Type of this place" 
      />

      <div className="flex justify-between gap-5">
        <div className="flex flex-col gap-4 grow">
          <Heading5 text="Special" font="medium" />
          <Divider classes="w-full h-px" />
          <div className="flex flex-col gap-2">
            {SPECIALS.map((special) => (
              <SquareCheckboxInput
                key={special}
                control={control}
                name="specialRequirements"
                value={special}
                text={special}
              />
            ))}

            {errors.specialRequirements?.message && (
              <ErrorText errorText={errors.specialRequirements.message} />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4 grow">
          <Heading5 text="Climate" font="medium" />
          <Divider classes="w-full h-px" />
          <div className="flex flex-col gap-2">
            {CLIMATES.map((climate) => (
              <CheckboxInput
                key={climate}
                control={control}
                name="climate"
                value={climate}
                text={climate}
                radio={true}
              />
            ))}

            {errors.climate?.message && (
              <ErrorText errorText={errors.climate.message} />
            )}
          </div>
        </div>
      </div>

      <PrimaryButton text="Create" type="submit" disabled={isPending} />

      {isError && <ErrorText errorText={errorMessage} />}
    </form>
  );
};

export default CreateCardForm;