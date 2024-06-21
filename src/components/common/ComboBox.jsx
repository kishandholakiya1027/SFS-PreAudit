import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState } from "react";

const ComboBox = ({
  option,
  setLocation,
  location,
  color = false,
  disabled,
}) => {
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? option
      : option.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });
  return (
    <div className="mx-auto w-full p-0 relative">
      <Combobox
        disabled={disabled}
        value={location}
        onChange={(value) => setLocation(value)}
      >
        <div className="relative">
          <Combobox.Input
            className={clsx(
              "w-full border py-2 pr-8 text-[14px] text-black focus:outline-none leading-4 font-[400] px-2",
              color ? "bg-white" : "bg-white/5"
            )}
            displayValue={(person) => person?.name}
            placeholder="Select"
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDownIcon className="size-4 fill-black group-data-[hover]:fill-white" />
          </Combobox.Button>
        </div>
        <Transition
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options
            anchor="bottom"
            className="rounded border border-white/5 py-1 [--anchor-gap:var(--spacing-1)] empty:hidden flex flex-col gap-1 absolute bg-white w-full shadow-lg z-10 "
          >
            {filteredPeople?.map((person) => (
              <Combobox.Option
                key={person?.id}
                value={person}
                className={`group flex cursor-default items-center px-3 gap-2 data-[focus]:bg-white/10 relative select-none py-2 hover:bg-[#106FEC] hover:text-white ${
                  person?.id === location?.id && "bg-[#106FEC] text-white"
                }`}
              >
                <CheckIcon
                  className={`size-4  group-data-[selected]:visible ${
                    person?.id === location?.id
                      ? "visible fill-white"
                      : "invisible fill-black"
                  }`}
                />
                <div className="text-sm/6">{person?.name}</div>
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Transition>
      </Combobox>
    </div>
  );
};

export default ComboBox;
