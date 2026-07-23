import { Globe, MailIcon, MapPin, MessageCircle, UserIcon, ZapIcon } from "lucide-react";
import Image from "next/image";
export default function Home() {
  return (
    <div className="bg-orange-600 w-screen h-screen flex flex-wrap gap-8 items-center justify-center">
      <div className="border-4 rounded-full p-1">
        <div className="w-80 h-80 bg-sky-500 flex flex-col items-center justify-center rounded-full">
          <h1 className="text-[#0a0a0a] text-3xl font-bold">Hello World</h1>
          <p className="border border-amber-300 py-4 px-2 mt-4">Description</p>
        </div>
      </div>

      <div className="flex rounded-3xl h-100 w-200 overflow-hidden border-2 border-sky-500">
        <div className="flex w-1/3 justify-center items-center bg-sky-500">
          <Image src="https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww"
            alt="image" width={150} height={150} className="rounded-full object-cover w-42 h-42" />
        </div>
        <div className="flex flex-col gap-12 px-8 py-6 bg-white w-2/3">
          {/* Header */}
          <div className="flex justify-between w-full items-start">
            <h1 className="text-sky-500 text-2xl font-bold">Sarah Anderson</h1>
            <div className="rounded-full bg-[#D2E1FF] px-4 py-2">
              <p className="text-sky-500 text-sm">Product Designer</p>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-col gap-12">
            <p className="text-gray-500 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>

            <div className="flex gap-6">
              <button className=" flex items-center gap-2 rounded-full bg-sky-600 px-12 py-2">
                <MailIcon className="w-4 h-4" />
                <span className="text-white text-md">Contact</span>
              </button>
              <button className=" flex items-center gap-2 rounded-full border-2 border-sky-600 px-12 py-2">
                <UserIcon className="w-4 h-4 text-sky-600" />
                <span className="text-sky-600 text-md">Follow</span>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="flex border-t border-t-gray-500 w-full py-4">
            <div className="flex justify-between w-full items-center">
              <div className="flex gap-2">
                <div className="bg-sky-600 rounded-full p-2">
                  <ZapIcon className="w-4 h-4" />
                </div>
                <div className="bg-sky-600 rounded-full p-2">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div className="bg-sky-600 rounded-full p-2">
                  <Globe className="w-4 h-4" />
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <MapPin className="w-4 h-4 text-gray-600" />
                <span className="text-gray-600 text-sm">New York, NY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
