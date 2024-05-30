import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useRef } from "react";
import { LoaderIcon } from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";

const Model = ({
  isOpen,
  setIsOpen,
  title,
  img,
  buttonText,
  buttonBg,
  onSubbmit,
  buttonText2,
  button2Bg,
  onSubbmit2,
  body,
  btnW1,
  btnW2,
  boxP,
  width,
  loading,
}) => {
  const cancelButtonRef = useRef(null);
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setIsOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full ${
                  width ? "sm:max-w-2xl" : "sm:max-w-lg"
                } ${!!boxP ? boxP : "p-[30px]"}`}
              >
                <div className="absolute top-[20px] right-[20px]">
                  <button type="button" onClick={() => setIsOpen(false)}>
                    <AiOutlineClose className="w-[20px] h-[20px] text-[#999999] " />
                  </button>
                </div>
                <div className="bg-white">
                  <div className="text-center">
                    <Dialog.Title
                      as="h3"
                      className="text-[20px] font-[400] text-left leading-[33px] text-black"
                    >
                      {title}
                    </Dialog.Title>
                    {img && (
                      <div className="mt-[22px]">
                        <img src={img} alt="img" className="mx-auto" />
                      </div>
                    )}
                    {body && body}
                    <div
                      className={`flex items-center justify-center gap-[10px]`}
                    >
                      {buttonText2 && (
                        <button
                          type="button"
                          className={`inline-flex justify-center ${
                            btnW2 ? btnW2 : "w-[120px]"
                          } rounded-[2px] px-[11px] py-2 text-sm font-semibold shadow-sm mt-[26px] ${button2Bg}`}
                          onClick={onSubbmit2}
                        >
                          {buttonText2}
                        </button>
                      )}
                      <button
                        type="button"
                        className={`inline-flex justify-center ${
                          btnW1 ? btnW1 : "w-[120px]"
                        }  text-[16px] font-Roboto font-[500] leading-[18px] text-[#fff] py-[8px] px-[40px] bg-[#106FEC] rounded-[2px] flex items-center justify-center shadow-sm mt-[26px] ${buttonBg} ${
                          loading && "opacity-70"
                        }`}
                        onClick={onSubbmit}
                      >
                        {loading ? (
                          <LoaderIcon className="!w-4 !h-4" />
                        ) : (
                          buttonText
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Model;
