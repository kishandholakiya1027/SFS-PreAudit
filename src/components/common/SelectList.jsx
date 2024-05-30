import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import React, { Fragment } from "react";

function classNames2(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SelectList = ({
  option,
  value,
  onchange,
  label,
  classname = "",
  field,
  disable = false,
  width = "",
  padding = "",
}) => {
  return (
    <Listbox value={value} onChange={onchange}>
      {({ open }) => (
        <>
          {label && (
            <Listbox.Label className="block tracking-wide text-black text-xs font-[600] mb-2">
              {label}
            </Listbox.Label>
          )}
          <div className="relative">
            <Listbox.Button
              className={`${classname !== "" ? classname : "bg-white"} ${
                width !== "" ? width : "w-full"
              } ${disable && "pointer-events-none"} ${
                padding !== "" ? padding : "py-2"
              } rounded-sm relative cursor-default text-sm pr-10 border-[#D2D8DD] text-left text-black border focus:outline-none sm:text-sm sm:leading-4 !p-2 !border-b`}
            >
              <span className="flex items-center">
                <span className="block truncate">
                  {field ? value[field] || value : value}
                </span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="capitalize absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {option.length > 0 &&
                  option.map((person, i) => (
                    <Listbox.Option
                      key={i}
                      className={({ active }) =>
                        classNames2(
                          active ? "bg-[#106FEC] text-white" : "text-gray-900",
                          "relative cursor-default select-none py-2 pl-3 pr-9"
                        )
                      }
                      value={person}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <span
                              className={classNames2(
                                selected ? "font-semibold" : "font-normal",
                                "ml-3 block truncate"
                              )}
                            >
                              {field ? person[field] : person}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={classNames2(
                                active ? "text-white" : "text-indigo-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default SelectList;
