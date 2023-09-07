import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useState } from "react";
import { Spell } from "~/config/spells";

export default function ViewSpell({ name, description, graph, image }: Spell) {
  const [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleJsonDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(graph)], {
      type: "application/json",
    });
    element.href = URL.createObjectURL(file);
    element.download = `${name}.json`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <>
      <div className="absolute right-1.5 top-1.5 flex items-center justify-center">
        <button type="button" onClick={openModal} className="magick-button">
          View Spell
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="h-[480px] w-full max-w-7xl transform overflow-hidden rounded-2xl bg-card-main p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-secondary-highlight"
                  >
                    {name}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-white">{description}</p>
                  </div>
                  <div className="relative mx-auto h-40 md:h-80 w-4/5 mt-4 rounded-md">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="mt-4 inline-flex gap-4 justify-center items-center w-full">
                    <button
                      type="button"
                      className="magick-button"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="magick-button"
                      onClick={handleJsonDownload}
                    >
                      Download
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
